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
| **~580 perguntas de validação** | Perguntas de nível de entrevista. Se você não consegue responder sem consultar, ainda não aprendeu |
| **15 projetos de portfólio** | Um projeto por fase, com entregáveis claros |
| **~900 conceitos e ~240 práticas** | Checklists marcáveis |

## Funcionalidades

- **Tracking de progresso** por conceito, prática, pergunta, tópico, fase e nível de senioridade
- **Autoavaliação** de cada pergunta (*Não sei / Parcial / Domino*) e campo **"Minha resposta"** para responder por escrito
- **Revisão ativa (quiz)** com repetição espaçada: prioriza pontos fracos e o que não é revisado há mais tempo (atalhos `1` `2` `3`)
- **Histórico de acesso**, heatmap de atividade e sequência de dias estudando
- **Projeção de conclusão** com base nas horas semanais de estudo
- **Busca** em tópicos, conceitos e perguntas (atalho `/`)
- **Backup/restauração** do progresso em JSON (para sincronizar entre computador e celular)
- Tema claro/escuro e layout responsivo

O progresso fica salvo no `localStorage` do navegador. Nada é enviado para nenhum servidor.

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
app.js            # roteamento, renderização, estado e quiz
data/             # conteúdo: um arquivo por fase
  00-base.js … 14-carreira.js
```

Para editar ou adicionar conteúdo, altere os arquivos em `data/`. Cada fase é um objeto com `topics`, e cada tópico tem `learn`, `practice`, `resources` e `questions`.

> ⚠️ O progresso das perguntas é indexado pela posição. Ao reordenar perguntas de um tópico, as avaliações já feitas podem mudar de pergunta. Para não perder nada, adicione perguntas novas no final da lista.

## Licença

MIT
