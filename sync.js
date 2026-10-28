// Camada fina sobre o Firebase: login com Google + um documento por usuário no Firestore.
// Carregado sob demanda pelo app.js somente quando data/firebase-config.js está preenchido.
const V = '11.0.2';
const BASE = `https://www.gstatic.com/firebasejs/${V}/`;

export async function createSync(config) {
  const [appMod, authMod, fsMod] = await Promise.all([
    import(BASE + 'firebase-app.js'),
    import(BASE + 'firebase-auth.js'),
    import(BASE + 'firebase-firestore.js')
  ]);
  const { initializeApp } = appMod;
  const { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } = authMod;
  const { getFirestore, doc, onSnapshot, runTransaction, serverTimestamp, deleteDoc } = fsMod;

  const app = initializeApp(config);
  const auth = getAuth(app);
  const db = getFirestore(app);
  getRedirectResult(auth).catch(() => {});

  const ref = uid => doc(db, 'users', uid);
  const parse = snap => {
    if (!snap.exists()) return null;
    try { return JSON.parse(snap.data().data); } catch (e) { return null; }
  };

  return {
    onUser(cb) {
      return onAuthStateChanged(auth, u => cb(u ? { uid: u.uid, name: u.displayName, email: u.email, photo: u.photoURL } : null));
    },
    async signIn() {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      try {
        await signInWithPopup(auth, provider);
      } catch (e) {
        if (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment') {
          await signInWithRedirect(auth, provider);
        } else if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
          throw e;
        }
      }
    },
    signOut() { return signOut(auth); },
    // Escuta mudanças vindas de outros aparelhos (ignora o eco das próprias escritas pendentes)
    subscribe(uid, onData, onError) {
      return onSnapshot(ref(uid), snap => {
        if (snap.metadata.hasPendingWrites) return;
        onData(parse(snap));
      }, onError);
    },
    // Lê o remoto, mescla com o local (mergeFn) e grava, tudo numa transação
    write(uid, mergeFn) {
      return runTransaction(db, async tx => {
        const snap = await tx.get(ref(uid));
        const merged = mergeFn(parse(snap));
        tx.set(ref(uid), { data: JSON.stringify(merged), updatedAt: serverTimestamp(), v: 1 });
        return merged;
      });
    },
    // Apaga o documento do usuário na nuvem (direito de exclusão)
    remove(uid) { return deleteDoc(ref(uid)); }
  };
}
