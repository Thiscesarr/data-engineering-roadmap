# Data Engineering Roadmap: do zero ao Especialista

**🔗 Acesse:** https://thiscesarr.github.io/data-engineering-roadmap/

Roadmap interativo e completo de **Engenharia de Dados**, do nível zero ao **Especialista / Staff**, com uma trilha paralela de **carreira internacional** (vagas no exterior, entrevistas em inglês, vistos e negociação).

Montei este roadmap para guiar meus próprios estudos e medir meu progresso. A meta é trabalhar como Senior/Staff Data Engineer no exterior.

> 🇺🇸 **English summary:** An interactive, self-hosted study roadmap that takes a data engineer from zero to Staff level: 15 phases, 88 topics, ~580 validation questions, hands-on exercises, a capstone project per phase, spaced-repetition review, and local progress tracking. Built with plain HTML/CSS/JS, with no build step and no dependencies, and deployed on GitHub Pages.

## O que tem aqui

| | |
|---|---|
| **15 fases** | Base → Computação → Python → SQL → Modelagem → Big Data/Spark → Pipelines → Streaming → Cloud → DataOps → Governança → Arquitetura → ML/IA → Staff+ → Carreira internacional |
| **88 tópicos** | Cada um com *por que importa*, *o que estudar*, *mão na massa* e *fontes* (docs oficiais, livros, cursos) |
| **579 perguntas de validação** | Perguntas de nível de entrevista, **cada uma com resposta de referência oculta** para conferir depois de responder |
| **15 projetos de portfólio** | Um projeto por fase, com entregáveis claros |
| **~900 conceitos e ~240 práticas** | Checklists marcáveis |

## Funcionalidades

- **Tracking de progresso** por conceito, prática, pergunta, tópico, fase e nível de senioridade
- **Responda → confira → avalie**: escreva sua resposta, revele a **resposta de referência** e se autoavalie (*Não sei / Parcial / Domino*)
- **Revisão ativa (quiz)** com repetição espaçada: prioriza pontos fracos e o que não é revisado há mais tempo (atalhos `R` revela, `1` `2` `3` avaliam)
- **Como estudar** em cada tópico: roteiro de estudo + buscas prontas (documentação, livros, aulas, cursos, artigos, GitHub, perguntas de entrevista)
- **Sincronização celular ↔ computador** com login Google (Firebase, gratuito)
- **Tradução para inglês** com um clique (PT/EN)
- **Histórico de acesso**, heatmap de atividade e sequência de dias estudando
- **Projeção de conclusão** com base nas horas semanais de estudo
- **Busca** em tópicos, conceitos e perguntas (atalho `/`)
- **Backup/restauração** do progresso em JSON (para sincronizar entre computador e celular)
- Tema claro/escuro e layout responsivo

O progresso fica salvo no `localStorage` do navegador. Com o login Google ativo, também vai para um documento privado no Firestore (só o próprio usuário lê e escreve), e cada aparelho mescla as mudanças: em cada item vale a alteração mais recente.

### Ativando a sincronização (uma vez)

1. Crie um projeto em [console.firebase.google.com](https://console.firebase.google.com/)
2. **Authentication** → ative o provedor **Google** → em *Settings → Authorized domains* adicione o domínio do site
3. **Firestore Database** → crie o banco → em *Rules* use:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
4. **Project settings → Your apps → Web** → copie o `firebaseConfig` para `data/firebase-config.js`

## Níveis

| Nível | Fases | Foco |
|---|---|---|
| Base | 0 | Método de estudo, papel do DE, inglês, matemática |
| Júnior | 1–3 | Computação, Linux, redes, Git, algoritmos, Python, SQL |
| Pleno | 4–8 | Modelagem, Spark, lakehouse, Airflow/dbt, Kafka/Flink, Cloud |
| Sênior | 9–12 | DataOps, Kubernetes, Terraform, governança, system design, dados para IA |
| Especialista / Staff | 13 | Internals de bancos e engines, open source, liderança técnica |
| Carreira (paralela) | 14 | Mercado global, vistos, currículo, entrevistas, negociação |

## Rodando localmente

Não há build. Basta servir a pasta:

```bash
python -m http.server 8000
```

E abrir `http://localhost:8000`.

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

Para editar ou adicionar conteúdo, altere os arquivos em `data/`. Cada fase é um objeto com `topics`, e cada tópico tem `learn`, `practice`, `resources` e `questions`. As respostas ficam em `data/respostas/`, na mesma ordem das perguntas.

> ⚠️ O progresso das perguntas é indexado pela posição. Ao reordenar perguntas de um tópico, as avaliações já feitas podem mudar de pergunta. Para não perder nada, adicione perguntas novas no final da lista.

## Licença

MIT
