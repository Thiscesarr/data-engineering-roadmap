window.ROADMAP_PHASES.push({
  id: 'base',
  num: 0,
  level: 'base',
  title: 'Base, método e mentalidade',
  duration: '3–5 semanas (e contínuo)',
  summary: 'Antes de qualquer ferramenta: como aprender de verdade, o que um engenheiro de dados faz, a matemática que sustenta tudo e o inglês, que é pré-requisito para trabalhar fora.',
  why: 'Quem estuda sem método consome conteúdo e esquece. E sem inglês fluente a meta internacional não existe, por mais técnica que a pessoa seja. Esta fase monta a estrutura que as outras usam.',
  outcomes: [
    'Ter um sistema de estudo semanal com prática deliberada, revisão espaçada e projetos',
    'Explicar o ciclo de vida dos dados e as responsabilidades de um Data Engineer vs outros papéis',
    'Ter um plano concreto para chegar a inglês C1 falado',
    'Dominar a estatística e a matemática discreta usadas no dia a dia de dados'
  ],
  topics: [
    {
      id: 'aprender-a-aprender',
      title: 'Aprender a aprender: método de estudo de alto rendimento',
      summary: 'Recuperação ativa, repetição espaçada, técnica Feynman, prática deliberada e projetos como prova de aprendizado.',
      hours: 8,
      why: 'Você vai estudar por 2 a 4 anos. Melhorar a eficiência do estudo em 2x vale mais que qualquer curso.',
      learn: [
        'Curva do esquecimento e por que reler/assistir aula é a forma menos eficiente de estudar',
        'Recuperação ativa (active recall): testar-se antes de rever o material',
        'Repetição espaçada e uso do Anki para conceitos e comandos',
        'Técnica Feynman: explicar como se fosse para um iniciante e encontrar as lacunas',
        'Prática deliberada: trabalhar no limite da habilidade, com feedback',
        'Interleaving (misturar assuntos) vs blocked practice',
        'Learning in public: escrever posts/notas no GitHub para consolidar e ganhar visibilidade',
        'Gestão de energia: blocos de foco profundo (deep work), sono e exercício como multiplicadores',
        'Tutorial hell: como sair dele (construir sem tutorial, ler documentação oficial)',
        'Como ler documentação técnica e código-fonte de projetos open source'
      ],
      practice: [
        'Montar sua rotina semanal fixa (ex.: 2h/dia úteis + 4h sábado) e registrar no calendário',
        'Criar um deck no Anki "Data Engineering" e adicionar 10 cards por tópico estudado',
        'Criar um repositório público `learning-log` com notas semanais do que aprendeu',
        'Fazer a revisão ativa deste site 1x por semana durante 30 dias seguidos'
      ],
      resources: [
        ['Learning How to Learn (Coursera, gratuito)', 'https://www.coursera.org/learn/learning-how-to-learn'],
        ['Anki – repetição espaçada', 'https://apps.ankiweb.net/'],
        ['Livro: Make It Stick (Brown, Roediger, McDaniel)', 'https://www.amazon.com/dp/0674729013'],
        ['Livro: Deep Work (Cal Newport)', 'https://www.amazon.com/dp/1455586692']
      ],
      questions: [
        'Por que reler um capítulo dá a ilusão de aprendizado? Qual técnica você usa no lugar e por quê?',
        'Como funciona a repetição espaçada e por que ela é mais eficiente que estudar tudo de uma vez?',
        'Descreva a técnica Feynman aplicada a um conceito técnico que você aprendeu recentemente.',
        'O que caracteriza prática deliberada? Dê um exemplo aplicado a SQL.',
        'O que é tutorial hell e qual é sua estratégia concreta para não cair nele?',
        'Qual é sua rotina semanal de estudo e como você mede se ela está funcionando?'
      ]
    },
    {
      id: 'papel-do-de',
      title: 'O papel do Engenheiro de Dados e o ciclo de vida dos dados',
      summary: 'O que DE faz (e não faz), como se diferencia de DS, Analytics Engineer, ML Engineer e Data Platform, e as "undercurrents" que atravessam tudo.',
      hours: 10,
      why: 'Entrevistas internacionais avaliam se você pensa como engenheiro de plataforma de dados, não só como alguém que escreve scripts de ETL.',
      learn: [
        'Ciclo de vida da engenharia de dados: geração → armazenamento → ingestão → transformação → servir (Reis & Housley)',
        'Undercurrents: segurança, gestão de dados, DataOps, arquitetura, orquestração, engenharia de software',
        'Diferenças entre Data Engineer, Analytics Engineer, Data Scientist, ML Engineer, Data Platform Engineer e Data Architect',
        'Tipos de DE: foco em SQL/analytics vs foco em software/plataforma vs streaming',
        'Sistemas fonte: bancos OLTP, APIs, eventos, arquivos, SaaS, IoT. O que muda em cada um',
        'Consumidores: BI, analytics, ML, produto (dados como feature), reverse ETL, regulatório',
        'Batch vs streaming como espectro, não como dicotomia',
        'Modern Data Stack: o que é, por que surgiu e suas críticas',
        'Data maturity: estágios de uma empresa (começando → escalando → liderando com dados)',
        'Conceito de "dados como produto" e SLAs de dados',
        'Trade-offs fundamentais: custo vs latência vs complexidade vs confiabilidade',
        'Build vs buy: quando usar ferramenta gerenciada e quando construir'
      ],
      practice: [
        'Desenhar o fluxo de dados de um sistema do seu estágio no Itaú (fonte → consumo), sem dados sensíveis',
        'Ler 5 vagas de Senior Data Engineer de empresas da Europa/EUA e listar as skills recorrentes',
        'Escrever um post de 500 palavras: "O que faz um Data Engineer", em inglês'
      ],
      resources: [
        ['Livro: Fundamentals of Data Engineering (Reis & Housley)', 'https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/'],
        ['Data Engineer Handbook (DataExpert.io)', 'https://github.com/DataExpert-io/data-engineer-handbook'],
        ['Data Engineering Zoomcamp (gratuito)', 'https://github.com/DataTalksClub/data-engineering-zoomcamp'],
        ['Start Data Engineering (blog)', 'https://www.startdataengineering.com/']
      ],
      questions: [
        'Descreva as cinco etapas do ciclo de vida da engenharia de dados e dê um exemplo de tecnologia em cada uma.',
        'Qual a diferença prática entre um Data Engineer e um Analytics Engineer? Onde as responsabilidades se sobrepõem?',
        'O que são as "undercurrents" e por que um sênior precisa pensar nelas desde o início de um projeto?',
        'Quando faz sentido comprar uma ferramenta gerenciada (ex.: Fivetran) em vez de construir a ingestão?',
        'Explique "dados como produto". Que propriedades um dataset precisa ter para ser considerado um produto?',
        'Quais trade-offs você considera ao decidir entre processamento batch e streaming para um caso de uso?',
        'O que é o Modern Data Stack e quais são as principais críticas a ele?'
      ]
    },
    {
      id: 'ingles',
      title: 'Inglês profissional (meta: C1 falado)',
      summary: 'Inglês é o filtro número 1 para vagas internacionais. Meta: fazer entrevista técnica e comportamental de 1h sem travar.',
      hours: 300,
      ongoing: true,
      why: 'Toda a sua carreira internacional passa por entrevistas, design reviews, Slack e documentação em inglês. Um candidato B2 técnico perde para um C1 um pouco menos técnico.',
      learn: [
        'Diagnóstico de nível (CEFR: B1, B2, C1) com teste padronizado (EF SET gratuito)',
        'Listening: podcasts técnicos e talks em velocidade normal, sem legenda',
        'Speaking: falar diariamente e gravar a si mesmo explicando conceitos técnicos',
        'Vocabulário técnico de dados: pipeline, throughput, backfill, idempotent, skew, trade-off, stakeholder…',
        'Pronúncia de termos técnicos comuns (cache, query, schema, data, SQL, Kubernetes, YAML)',
        'Writing: design docs, PR descriptions, mensagens de Slack assíncronas claras e concisas',
        'Expressões de reunião: discordar com educação, pedir clarificação, fazer pushback, resumir decisões',
        'Small talk e cultura de trabalho (EUA vs Europa: diretividade, feedback, hierarquia)',
        'Behavioral interview em inglês: contar histórias no formato STAR com fluidez',
        'Certificações quando o visto exige (IELTS/TOEFL/Cambridge). Verifique o país-alvo'
      ],
      practice: [
        'Fazer o EF SET e registrar a nota; repetir a cada 3 meses',
        'Conversação 2–3x por semana com professor ou nativo (Cambly, Preply, italki)',
        'Gravar 1 vídeo por semana (3 min) explicando um tópico deste roadmap em inglês',
        'Ler 100% da documentação técnica em inglês a partir de hoje',
        'Fazer mock interviews comportamentais em inglês (Pramp ou colegas)'
      ],
      resources: [
        ['EF SET – teste de nível gratuito', 'https://www.efset.org/'],
        ['YouGlish – pronúncia em contexto', 'https://youglish.com/'],
        ['BBC Learning English', 'https://www.bbc.co.uk/learningenglish'],
        ['Data Council (talks e conferência)', 'https://www.datacouncil.ai/']
      ],
      questions: [
        'Qual é o seu nível CEFR atual medido (não estimado) e qual a sua data-alvo para C1?',
        'Explique em inglês, por 2 minutos sem pausa, o que é um data pipeline idempotente.',
        'Como você discordaria, em inglês, de uma decisão técnica de um sênior numa reunião, de forma respeitosa?',
        'Escreva em inglês uma PR description clara para uma mudança que adiciona testes de qualidade a um pipeline.',
        'Conte em inglês, no formato STAR, um problema difícil que você resolveu no estágio.',
        'Quais diferenças culturais de comunicação existem entre empresas americanas e europeias (ex.: holandesas, alemãs)?'
      ]
    },
    {
      id: 'matematica-estatistica',
      title: 'Matemática e estatística essenciais para dados',
      summary: 'Teoria dos conjuntos (a base do SQL), lógica booleana, estatística descritiva, probabilidade, amostragem e noções de complexidade.',
      hours: 30,
      why: 'Joins são operações de conjuntos, testes de qualidade usam distribuições, e algoritmos aproximados (HyperLogLog, Bloom filter) dependem de probabilidade. Você usa isso o tempo todo sem perceber.',
      learn: [
        'Teoria dos conjuntos: união, interseção, diferença, produto cartesiano, e como cada um corresponde a uma operação SQL',
        'Álgebra relacional: seleção, projeção, junção, renomeação',
        'Lógica booleana, tabelas-verdade, leis de De Morgan e lógica de três valores com NULL',
        'Estatística descritiva: média, mediana, moda, variância, desvio padrão, percentis/quantis',
        'Distribuições: normal, uniforme, exponencial, Poisson, power law (por que dados reais são assimétricos e geram skew)',
        'Probabilidade básica, independência, probabilidade condicional, teorema de Bayes',
        'Amostragem: aleatória, estratificada, reservoir sampling',
        'Detecção de outliers: z-score, IQR, MAD, e uso em data quality',
        'Correlação vs causalidade; paradoxo de Simpson em agregações',
        'Logaritmos e exponenciais: por que O(log n) importa (índices, árvores, busca binária)',
        'Hashing: noções de colisão, paradoxo do aniversário, distribuição uniforme',
        'Noções de testes A/B e métricas (para conversar com DS e produto)'
      ],
      practice: [
        'Calcular p50/p95/p99 de latências de um dataset em SQL e em Python',
        'Implementar reservoir sampling em Python e testar com um stream de 1M itens',
        'Detectar outliers num dataset público com IQR e com z-score e comparar os resultados'
      ],
      resources: [
        ['Khan Academy – Statistics & Probability', 'https://www.khanacademy.org/math/statistics-probability'],
        ['Think Stats (livro gratuito)', 'https://greenteapress.com/wp/think-stats-3e/'],
        ['StatQuest (YouTube)', 'https://www.youtube.com/@statquest'],
        ['Seeing Theory – probabilidade visual', 'https://seeing-theory.brown.edu/']
      ],
      questions: [
        'Como cada tipo de JOIN (INNER, LEFT, FULL, CROSS) se relaciona com operações de teoria dos conjuntos?',
        'Por que `WHERE col <> 5` não retorna linhas onde `col` é NULL? Explique com lógica de três valores.',
        'Quando a mediana é mais útil que a média? Dê um exemplo com dados de transações financeiras.',
        'Por que p99 de latência importa mais que a média num SLA?',
        'Explique o paradoxo do aniversário e o que ele diz sobre colisões de hash em chaves surrogate.',
        'Como funciona o reservoir sampling e por que ele resolve amostragem em streams de tamanho desconhecido?',
        'O que é o paradoxo de Simpson e como ele pode aparecer num dashboard mal agregado?',
        'Por que distribuições power law causam data skew em sistemas distribuídos?'
      ]
    }
  ],
  project: {
    title: 'Setup do seu sistema de aprendizado público',
    description: 'Monte a infraestrutura de estudo e portfólio que você vai usar durante toda a trilha.',
    deliverables: [
      'Perfil do GitHub com README profissional em inglês (quem é você, o que está construindo, stack)',
      'Repositório `learning-log` com a primeira entrada semanal',
      'Deck Anki criado e rotina de estudo semanal definida no calendário',
      'Nível de inglês medido (EF SET) e plano de 6 meses até o próximo nível',
      'LinkedIn com headline em inglês: "Data Engineering | Python · SQL · Spark | Building …"'
    ]
  }
});
