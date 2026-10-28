# Data Engineering Roadmap: do zero ao Especialista

[English](README.md) · **Português**

**🔗 Acesse:** https://thiscesarr.github.io/data-engineering-roadmap/

[![Data Engineering Roadmap: desktop e celular](assets/cover.png)](https://thiscesarr.github.io/data-engineering-roadmap/)

Roadmap de estudos interativo, gratuito e open source de **Engenharia de Dados**, do zero ao nível **Especialista / Staff**, com uma trilha paralela para construir uma **carreira internacional** (vagas no exterior, entrevistas em inglês, vistos e negociação).

Criei este roadmap para guiar meus próprios estudos e medir se eu aprendi de verdade cada tópico, e não só assisti conteúdo sobre ele. Se você está no mesmo caminho, use, faça um fork e ajude a melhorar.

## O que tem aqui

| | |
|---|---|
| **15 fases** | Base → Computação → Python → SQL → Modelagem → Big Data/Spark → Pipelines → Streaming → Cloud → DataOps → Governança → Arquitetura → ML/IA → Staff+ → Carreira internacional |
| **88 tópicos** | Cada um com *por que importa*, *o que estudar*, *mão na massa*, *como estudar* (roteiro + buscas prontas) e *fontes* (docs oficiais, livros, cursos) |
| **579 perguntas de validação** | Perguntas de nível de entrevista, **cada uma com resposta de referência oculta**, que você revela só depois de responder |
| **15 projetos de portfólio** | Um projeto por fase, com entregáveis claros |
| **~900 conceitos e ~240 práticas** | Checklists marcáveis |

## Funcionalidades

![Escreva sua resposta, revele a resposta de referência e se autoavalie](assets/demo.gif)

<sub>As telas mostram dados de progresso de demonstração.</sub>

- **Responda → confira → avalie**: escreva sua resposta, revele a resposta de referência e se autoavalie (*Não sei / Parcial / Domino*)
- **Revisão ativa (quiz)** com repetição espaçada: perguntas fracas e as que você não vê há mais tempo voltam com mais frequência (`R` revela, `1` `2` `3` avaliam)
- **Progresso** por conceito, prática, pergunta, tópico, fase e nível de senioridade
- **Mapa de atividade**, sequência de dias, histórico de acessos e data prevista de conclusão com base nas suas horas semanais
- **Sincronização entre celular e computador** com login Google (opcional)
- **Tradução para inglês** com um clique (PT/EN)
- **Busca** em tópicos, conceitos e perguntas (`/`)
- **Backup e restauração** em JSON, tema claro/escuro e layout para celular

## Privacidade

Sem login, todo o progresso fica no `localStorage` do seu navegador. Nada sai do seu aparelho.

Se você entrar com Google para sincronizar aparelhos, seu progresso (itens marcados, avaliações, respostas escritas e histórico) fica num documento do Firestore que **só a sua conta consegue ler ou alterar**. Dá para apagá-lo a qualquer momento na página *Progresso & sincronização*. Se preferir não depender do Firebase deste projeto, faça um fork e use o seu (veja abaixo).

## Aviso

O conteúdo foi escrito com ajuda de IA e revisado por mim, mas ainda pode ter erros ou detalhes desatualizados. Regras de visto e faixas salariais mudam com frequência: confirme sempre em fontes oficiais e dados atuais (ex.: levels.fyi). Correções são muito bem-vindas.

## Rodando localmente

Não há build nem dependências. Basta servir a pasta:

```bash
python -m http.server 8000
```

E abrir `http://localhost:8000`.

## Hospedando com sua própria sincronização (opcional)

1. Faça um fork e ative o **GitHub Pages** (Settings → Pages → branch `main`, pasta `/`).
2. Crie um projeto em [console.firebase.google.com](https://console.firebase.google.com/).
3. **Authentication** → ative o provedor **Google**. Em *Settings → Authorized domains*, adicione o domínio do seu Pages.
4. **Firestore Database** → crie o banco e use estas **Rules**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid} {
         allow read, delete: if request.auth != null && request.auth.uid == uid;
         allow create, update: if request.auth != null && request.auth.uid == uid
           && request.resource.data.data is string
           && request.resource.data.data.size() < 800000;
       }
     }
   }
   ```
5. **Project settings → Your apps → Web**: copie os valores do `firebaseConfig` para `data/firebase-config.js`. Use `null` para desativar a sincronização.

A configuração web do Firebase não é secreta: quem protege os dados são as regras acima. No plano gratuito (Spark) não há cobrança; se a cota diária acabar, a sincronização pausa até o dia seguinte e o progresso local continua funcionando.

## Estrutura

```
index.html        # shell da aplicação
styles.css        # estilos (tema claro/escuro)
app.js            # roteamento, renderização, estado, merge e quiz
sync.js           # login Google + Firestore (carregado só se configurado)
data/
  00-base.js … 14-carreira.js   # conteúdo: um arquivo por fase
  respostas/                    # respostas de referência (mesma ordem das perguntas)
  kw.js                         # termos de busca em inglês por tópico
  firebase-config.js            # config pública do Firebase (ou null)
```

## Contribuindo

Achou uma resposta errada, um link quebrado ou um tópico faltando? Abra uma issue ou um pull request. Veja o [CONTRIBUTING.md](CONTRIBUTING.md).

## Licença

MIT
