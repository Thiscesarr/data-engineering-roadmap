# Contributing / Como contribuir

Thanks for helping! Contributions in **English or Portuguese** are welcome.
Obrigado por ajudar! Contribuições em **português ou inglês** são bem-vindas.

## Good first contributions / Boas primeiras contribuições

- Fix a wrong or incomplete reference answer / Corrigir uma resposta de referência errada ou incompleta
- Replace a broken or outdated link / Trocar um link quebrado ou desatualizado
- Suggest a better resource (official docs and books first) / Sugerir uma fonte melhor (docs oficiais e livros primeiro)
- Update visa or salary information with an official source / Atualizar informações de visto ou salário com fonte oficial
- Native English translation of the content / Tradução nativa do conteúdo para inglês

## How the content is organized / Como o conteúdo está organizado

- `data/NN-*.js`: one file per phase. Each topic has `learn`, `practice`, `resources` and `questions`.
- `data/respostas/NN-*.js`: reference answers, **in the same order** as the questions of each topic.

### Important rule / Regra importante

Users' progress is stored by **question position**. Don't reorder or delete existing questions: add new ones **at the end** of the list, together with their answer at the end of the matching answers list.

O progresso dos usuários é salvo pela **posição da pergunta**. Não reordene nem remova perguntas existentes: adicione novas **no final** da lista, junto com a resposta no final da lista de respostas correspondente.

## Before opening a PR / Antes de abrir um PR

1. Run the site locally (`python -m http.server 8000`) and check the topic you changed.
2. Make sure every topic still has the same number of questions and answers:
   ```bash
   node -e 'global.window={ROADMAP_PHASES:[],ROADMAP_ANSWERS:{}};const fs=require("fs");for(const d of ["data","data/respostas"])for(const f of fs.readdirSync(d).filter(f=>/^\d.*\.js$/.test(f)))eval(fs.readFileSync(d+"/"+f,"utf8"));let bad=0;for(const p of window.ROADMAP_PHASES)for(const t of p.topics){const a=window.ROADMAP_ANSWERS[t.id]||[];if(a.length!==t.questions.length){bad++;console.log(t.id,t.questions.length,a.length)}}console.log(bad?"mismatch":"ok")'
   ```
3. Keep answers short and interview-oriented: key concept, example, trade-offs.
