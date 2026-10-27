window.ROADMAP_PHASES.push({
  id: 'staff',
  num: 13,
  level: 'staff',
  title: 'Especialista / Staff+: profundidade e liderança',
  duration: '12+ meses (contínuo)',
  summary: 'Profundidade técnica rara (internals de bancos e engines), contribuição open source, liderança técnica sem autoridade, escrita, estratégia, visão de negócio e reputação pública.',
  why: 'Ser sênior é resolver bem os problemas que aparecem. Ser especialista ou Staff é escolher quais problemas resolver, influenciar dezenas de pessoas e ter profundidade que poucos têm. Nesse nível você deixa de procurar vaga e passa a ser procurado.',
  outcomes: [
    'Explicar em profundidade como um banco de dados e uma engine de query funcionam por dentro',
    'Ter contribuições aceitas em projetos open source relevantes de dados',
    'Liderar decisões técnicas por meio de design docs e alinhamento entre times',
    'Ter presença pública (artigos, talks) que atraia recrutadores',
    'Conectar decisões técnicas a impacto financeiro e de negócio'
  ],
  topics: [
    {
      id: 'internals-storage',
      title: 'Internals de bancos de dados e storage engines',
      summary: 'B-tree vs LSM-tree, WAL, buffer pool, compaction, amplificação de escrita/leitura/espaço, MVCC por dentro e storage colunar.',
      hours: 50,
      learn: [
        'Arquitetura de um SGBD: parser, otimizador, executor, storage manager, buffer pool',
        'Páginas, slotted pages, heap files',
        'B+tree em detalhe: splits, merges, concorrência (latch crabbing)',
        'LSM-tree: memtable, SSTables, compaction (leveled vs tiered), Bloom filters (RocksDB, Cassandra)',
        'Amplificação de escrita, leitura e espaço (o "RUM conjecture")',
        'WAL, ARIES (recuperação), checkpoints',
        'Implementações de MVCC (append-only vs delta storage) e garbage collection de versões',
        'Storage colunar: compressão leve, late materialization',
        'Bancos distribuídos: Spanner, CockroachDB, TiDB (consenso + transações distribuídas)'
      ],
      practice: [
        'Assistir ao curso CMU 15-445 completo e fazer os projetos do BusTub (buffer pool, B+tree)',
        'Implementar um key-value store simples com LSM-tree em Python, Go ou Rust (memtable, SSTable, compaction)'
      ],
      resources: [
        ['CMU 15-445/645 Database Systems', 'https://15445.courses.cs.cmu.edu/'],
        ['Livro: Database Internals (Alex Petrov)', 'https://www.databass.dev/'],
        ['RocksDB Wiki', 'https://github.com/facebook/rocksdb/wiki'],
        ['Build Your Own Database (Let\'s Build a Simple Database)', 'https://cstack.github.io/db_tutorial/']
      ],
      questions: [
        'Compare B-tree e LSM-tree em escrita, leitura e espaço. Por que Cassandra e RocksDB usam LSM?',
        'O que é amplificação de escrita e como a estratégia de compaction a afeta?',
        'Como um banco se recupera de um crash usando o WAL?',
        'Por que Bloom filters são essenciais em LSM-trees?',
        'Como o Spanner consegue transações distribuídas externamente consistentes (TrueTime)?',
        'O que é late materialization num banco colunar?'
      ]
    },
    {
      id: 'internals-query-engines',
      title: 'Internals de query engines e otimizadores',
      summary: 'Parsing, álgebra relacional, otimização baseada em regras e em custo, estimativa de cardinalidade, ordenação de joins, modelos de execução (volcano, vetorizado, compilado).',
      hours: 40,
      learn: [
        'Pipeline de uma query: parse → bind → plano lógico → otimização → plano físico → execução',
        'Otimização baseada em regras vs em custo; frameworks Cascades/Volcano',
        'Estimativa de cardinalidade e histogramas; por que ela erra',
        'Ordenação de joins (programação dinâmica) e algoritmos de join em detalhe',
        'Modelos de execução: iterator/volcano, vetorizado (DuckDB, Velox), compilado (HyPer, Spark codegen)',
        'Execução paralela e distribuída: exchanges, partitioning, morsel-driven parallelism',
        'Apache Arrow, DataFusion e Velox como blocos de construção de engines (composable data stack)',
        'Substrait (representação de planos entre engines)'
      ],
      practice: [
        'Assistir às aulas do CMU 15-721 (Advanced Database Systems) sobre otimização e execução',
        'Construir um mini engine SQL com Apache DataFusion (Rust ou Python), ou estender um com uma função/regra de otimização'
      ],
      resources: [
        ['CMU 15-721 Advanced Database Systems', 'https://15721.courses.cs.cmu.edu/'],
        ['Apache DataFusion', 'https://datafusion.apache.org/'],
        ['DuckDB – Papers e internals', 'https://duckdb.org/why_duckdb'],
        ['Velox', 'https://velox-lib.io/']
      ],
      questions: [
        'Descreva as etapas pelas quais uma query passa desde o texto SQL até o resultado.',
        'Por que a estimativa de cardinalidade é o ponto fraco dos otimizadores? Que impacto um erro de 1000x causa?',
        'Compare os modelos de execução volcano, vetorizado e compilado.',
        'O que é morsel-driven parallelism?',
        'O que é o "composable data stack" e por que Arrow, DataFusion e Velox estão mudando a forma de construir engines?'
      ]
    },
    {
      id: 'open-source',
      title: 'Contribuição open source e reputação técnica',
      summary: 'Contribuir com projetos como Airflow, dbt, Iceberg, Spark, DuckDB, Polars e Delta-rs; construir reputação pública que gera oportunidades.',
      hours: 60,
      why: 'Commits aceitos em projetos Apache funcionam como uma referência pública que recrutadores internacionais conseguem verificar. Também ajudam em vistos de talento (O-1, UK Global Talent).',
      learn: [
        'Como escolher um projeto: uso real, comunidade ativa, issues "good first issue"',
        'Fluxo: ler CONTRIBUTING, rodar o projeto localmente, reproduzir bugs, PRs pequenos',
        'Comunicação em issues e mailing lists (em inglês, de forma objetiva)',
        'Progressão: docs → bugs → features → reviewer → committer',
        'Projetos próprios: bibliotecas, ferramentas, providers/plugins',
        'Talks em meetups e conferências (Data Council, Current, Airflow Summit, PyData, Data+AI Summit)',
        'Comunidades: dbt Slack, Apache mailing lists, Locally Optimistic, DataTalks.Club'
      ],
      practice: [
        'Fazer 3 contribuições aceitas (podem começar por documentação) em projetos relevantes de dados',
        'Publicar uma ferramenta/biblioteca própria útil, com testes e documentação',
        'Submeter uma talk para um meetup (depois para uma conferência)'
      ],
      resources: [
        ['Apache Airflow – Contributing', 'https://github.com/apache/airflow/blob/main/contributing-docs/README.rst'],
        ['Apache Iceberg – Contribute', 'https://iceberg.apache.org/contribute/'],
        ['Polars – Contributing', 'https://docs.pola.rs/development/contributing/'],
        ['Good First Issue', 'https://goodfirstissue.dev/']
      ],
      questions: [
        'Quais foram suas contribuições open source e qual foi o maior aprendizado técnico de cada uma?',
        'Como você escolhe a primeira issue para trabalhar num projeto grande?',
        'Como você responderia a um review duro de um mantenedor no seu PR?',
        'Qual é a sua estratégia de presença pública (blog, talks, GitHub) para os próximos 12 meses?'
      ]
    },
    {
      id: 'lideranca-tecnica',
      title: 'Liderança técnica e o caminho Staff+',
      summary: 'Arquétipos de Staff, influência sem autoridade, design docs e RFCs, alinhamento entre times, mentoria, estratégia técnica, priorização e gestão de stakeholders.',
      hours: 30,
      learn: [
        'Arquétipos de Staff Engineer: tech lead, arquiteto, solver, braço direito',
        'Escopo: de tarefas → projetos → times → organização',
        'Influência sem autoridade: construir confiança, alinhar antes de decidir, "disagree and commit"',
        'Design docs e RFCs: estrutura, alternativas consideradas, conduzir revisões',
        'Estratégia técnica e visão: documentos de estratégia, roadmaps técnicos',
        'Priorização: impacto vs esforço, custo de oportunidade, dizer não',
        'Gestão de stakeholders e comunicação para executivos (começar pela conclusão, BLUF)',
        'Mentoria e sponsorship; elevar o nível do time',
        'Estimativas e gestão de risco em projetos grandes',
        'Migrações de grande escala (ex.: Hadoop → lakehouse) como projeto de liderança',
        'Glue work: tornar visível o trabalho invisível',
        'Promoção: documentar impacto, brag document'
      ],
      practice: [
        'Manter um "brag document" atualizado mensalmente com impacto mensurável',
        'Liderar uma iniciativa técnica no estágio/trabalho com design doc, alinhamento e entrega',
        'Mentorar alguém mais júnior durante 3 meses'
      ],
      resources: [
        ['StaffEng (Will Larson)', 'https://staffeng.com/'],
        ['Livro: The Staff Engineer\'s Path (Tanya Reilly)', 'https://www.oreilly.com/library/view/the-staff-engineers/9781098118723/'],
        ['Get your work recognized: write a brag document (Julia Evans)', 'https://jvns.ca/blog/brag-documents/'],
        ['The Pragmatic Engineer', 'https://blog.pragmaticengineer.com/']
      ],
      questions: [
        'Quais são os quatro arquétipos de Staff Engineer e com qual você mais se identifica?',
        'Conte uma situação em que você influenciou uma decisão técnica sem ter autoridade formal.',
        'Como você conduziria uma migração de uma plataforma legada usada por 20 times?',
        'Como você explicaria a um diretor, em 3 frases, por que o projeto precisa de mais 2 meses?',
        'Como você decide em quais problemas trabalhar quando tudo parece urgente?',
        'O que é "disagree and commit" e quando ele NÃO deve ser aplicado?',
        'O que diferencia um design doc que gera alinhamento de um que é ignorado?'
      ]
    },
    {
      id: 'comunicacao-escrita',
      title: 'Comunicação, escrita técnica e diagramas',
      summary: 'Escrita clara e concisa, documentação, diagramas (C4), apresentações técnicas, comunicação assíncrona em times remotos e storytelling com dados.',
      hours: 20,
      learn: [
        'Princípios de escrita técnica: clareza, concisão, estrutura, público-alvo',
        'BLUF (bottom line up front) e pirâmide de Minto',
        'Comunicação assíncrona em empresas remotas/distribuídas (fusos horários)',
        'Modelo C4 para diagramas de arquitetura (contexto, containers, componentes, código)',
        'Diagramas como código (Mermaid, Structurizr)',
        'Apresentações técnicas: narrativa, um ponto por slide, demonstrações',
        'Storytelling com dados para stakeholders',
        'Documentação: Diátaxis (tutoriais, how-to, referência, explicação)'
      ],
      practice: [
        'Reescrever o README do seu melhor projeto seguindo Diátaxis e com diagramas C4',
        'Publicar 1 artigo técnico por mês em inglês durante 6 meses'
      ],
      resources: [
        ['Google Technical Writing (cursos gratuitos)', 'https://developers.google.com/tech-writing'],
        ['C4 Model', 'https://c4model.com/'],
        ['Diátaxis', 'https://diataxis.fr/'],
        ['Mermaid', 'https://mermaid.js.org/']
      ],
      questions: [
        'O que é BLUF e por que ele é importante em comunicação com executivos?',
        'Descreva os quatro níveis do modelo C4. Qual nível você mostraria a um gerente de produto?',
        'Como escrever uma mensagem assíncrona que resolva um problema sem precisar de reunião?',
        'Quais são os quatro tipos de documentação do Diátaxis?'
      ]
    },
    {
      id: 'negocio-produto',
      title: 'Visão de negócio, produto e domínio',
      summary: 'Conectar dados a receita, custo e risco; pensamento de produto; métricas de negócio; domínio financeiro como especialização; ROI de iniciativas de dados.',
      hours: 20,
      why: 'Engenheiros que falam a língua do negócio recebem os problemas mais importantes, e são esses problemas que levam a promoções e às melhores propostas. Seu domínio financeiro (Itaú) pode virar uma especialização valiosa em fintechs no exterior.',
      learn: [
        'Como empresas ganham dinheiro: receita, margem, CAC, LTV, churn, unit economics',
        'Métricas de produto: DAU/MAU, retenção, conversão, North Star metric',
        'Domínio financeiro: contas, transações, crédito, risco, fraude, compliance, reconciliação, contabilidade básica (partidas dobradas)',
        'Dados como produto: usuários, problemas, adoção, feedback',
        'Calcular o ROI de uma iniciativa de dados (economia de custo, receita, risco evitado)',
        'Priorizar trabalho de plataforma por impacto de negócio',
        'Build vs buy com análise de custo total (TCO)',
        'Como contar seu impacto em números (currículo e promoções)'
      ],
      practice: [
        'Para cada projeto do estágio, escrever o impacto em números (tempo economizado, custo reduzido, risco mitigado)',
        'Escrever um business case (1 página) para uma iniciativa de dados, com ROI estimado'
      ],
      resources: [
        ['Lenny\'s Newsletter (produto e métricas)', 'https://www.lennysnewsletter.com/'],
        ['Livro: Lean Analytics', 'https://www.oreilly.com/library/view/lean-analytics/9781449335687/'],
        ['Modern Treasury – Accounting for Developers', 'https://www.moderntreasury.com/journal/accounting-for-developers-part-i']
      ],
      questions: [
        'Como você calcularia o ROI de migrar o warehouse para um lakehouse?',
        'Explique contabilidade de partidas dobradas e por que sistemas de pagamento a usam.',
        'O que são LTV e CAC? Como a engenharia de dados ajuda a calculá-los corretamente?',
        'Descreva o impacto do seu trabalho mais recente em uma frase com números.',
        'Como você priorizaria entre reduzir 30% do custo da plataforma e entregar dados em tempo real para o time de fraude?'
      ]
    }
  ],
  project: {
    title: 'Projeto de profundidade + presença pública',
    description: 'Um projeto que mostra profundidade técnica rara, mais a presença pública que faz recrutadores chegarem até você.',
    deliverables: [
      'Um projeto de internals: mini banco LSM, extensão do DataFusion/DuckDB, ou engine de streaming simplificada',
      'Pelo menos 3 contribuições aceitas em projetos open source de dados',
      'Uma talk apresentada (meetup ou conferência) e gravada',
      '6+ artigos técnicos publicados em inglês',
      'Brag document com 12 meses de impacto mensurável'
    ]
  }
});
