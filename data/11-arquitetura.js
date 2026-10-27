window.ROADMAP_PHASES.push({
  id: 'arquitetura',
  num: 11,
  level: 'senior',
  title: 'Arquitetura de dados e system design',
  duration: '10–12 semanas',
  summary: 'Arquiteturas de plataforma, system design de dados em entrevistas, padrões avançados de processamento, algoritmos aproximados, performance em escala e estudos de caso de big techs.',
  why: 'A rodada de system design é a que mais pesa para definir o nível (e o salário) em entrevistas sêniores internacionais. Ela testa se você consegue desenhar sistemas com trade-offs explícitos sob ambiguidade.',
  outcomes: [
    'Conduzir uma entrevista de data system design de 45–60 min com estrutura clara',
    'Fazer estimativas de volume, throughput, storage e custo de cabeça',
    'Escolher e justificar arquiteturas (warehouse, lakehouse, Lambda/Kappa, streaming) por requisitos',
    'Explicar como grandes empresas resolveram problemas de dados em escala'
  ],
  topics: [
    {
      id: 'arquiteturas-plataforma',
      title: 'Arquiteturas de plataformas de dados',
      summary: 'Warehouse, lake, lakehouse, Lambda, Kappa, modern data stack, reverse ETL, zero-ETL, HTAP e plataformas open source vs gerenciadas.',
      hours: 15,
      learn: [
        'Evolução: warehouse on-prem → Hadoop/data lake → cloud warehouse → lakehouse',
        'Componentes de uma plataforma: ingestão, storage, catálogo, processamento, orquestração, serving, governança, observabilidade',
        'Lambda vs Kappa vs arquiteturas unificadas (streaming lakehouse)',
        'Modern data stack e o movimento de consolidação',
        'Reverse ETL e dados operacionais (CRM, marketing)',
        'Zero-ETL e HTAP: promessas e limites',
        'Plataformas open source (Spark, Iceberg, Trino, Airflow) vs gerenciadas (Snowflake, Databricks, BigQuery)',
        'Multi-cloud e portabilidade: quando valem a pena',
        'Camada de serving: APIs de dados, caches, OLAP em tempo real, feature stores',
        'Architecture Decision Records (ADRs)'
      ],
      resources: [
        ['Emerging Architectures for Modern Data Infrastructure (a16z)', 'https://a16z.com/emerging-architectures-for-modern-data-infrastructure/'],
        ['Livro: Fundamentals of Data Engineering – cap. 3', 'https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/'],
        ['ADR – Architecture Decision Records', 'https://adr.github.io/']
      ],
      questions: [
        'Quais são os componentes essenciais de uma plataforma de dados moderna e como eles se conectam?',
        'Uma startup de 30 pessoas pede uma plataforma de dados. O que você recomenda e o que NÃO faria?',
        'Um banco com 10PB e regras de residência de dados pede uma plataforma. O que muda na sua recomendação?',
        'Open source self-managed vs plataforma gerenciada: como você faria essa análise?',
        'O que é reverse ETL e quais riscos ele introduz?',
        'Escreva um ADR para a escolha de Iceberg como table format.'
      ]
    },
    {
      id: 'system-design-dados',
      title: 'System design para dados (formato de entrevista)',
      summary: 'Framework de entrevista, levantamento de requisitos, estimativas back-of-the-envelope, desenho, aprofundamento e trade-offs, praticados em problemas clássicos.',
      hours: 40,
      why: 'Essa rodada costuma definir o nível da proposta (Senior vs Staff), e com ele uma diferença de dezenas de milhares de dólares por ano.',
      learn: [
        'Framework: requisitos funcionais → não funcionais (escala, latência, frescor, consistência, custo) → estimativas → design de alto nível → aprofundamento → gargalos e trade-offs',
        'Perguntas de clarificação certas (quem consome? qual latência? qual volume? quanto histórico?)',
        'Estimativas: eventos/s, GB/dia, storage em 1 ano, tamanho de cluster, custo aproximado',
        'Problemas clássicos: analytics de clickstream; pipeline de métricas de anúncios (impressões/cliques); top-K em tempo real; deduplicação de eventos; CDC de 500 tabelas para o lake; plataforma de métricas; detecção de fraude; recomendação/feature pipeline; data lake para logs; leaderboard em tempo real',
        'Como desenhar diagramas claros ao vivo (Excalidraw)',
        'Comunicar trade-offs: sempre apresentar alternativas e o motivo da escolha',
        'Tratamento de falhas, reprocessamento, backfill e evolução no design',
        'Segurança, privacidade e custo como requisitos de primeira classe'
      ],
      practice: [
        'Fazer 10 designs completos por escrito (1 por problema clássico) no repositório de estudo',
        'Fazer 5 mock interviews de system design com outras pessoas (inglês)',
        'Gravar-se resolvendo um design em 45 minutos e assistir criticamente'
      ],
      resources: [
        ['System Design Primer', 'https://github.com/donnemartin/system-design-primer'],
        ['ByteByteGo', 'https://bytebytego.com/'],
        ['Livro: System Design Interview vol. 2 (Alex Xu) – caps. de ad click aggregation e métricas', 'https://www.amazon.com/dp/1736049119'],
        ['Excalidraw', 'https://excalidraw.com/']
      ],
      questions: [
        'Quais perguntas você faz nos primeiros 5 minutos de uma entrevista de data system design?',
        'Estime: 50M usuários ativos, 100 eventos/dia cada, 1KB por evento. Quantos eventos/s em média e no pico? Quanto storage por ano, bruto e em Parquet?',
        'Desenhe um sistema de agregação de cliques em anúncios com contagens por minuto, exatidão para cobrança e consultas em tempo real.',
        'Desenhe a ingestão via CDC de 500 tabelas de dezenas de bancos para um lakehouse.',
        'Desenhe um sistema que calcula os top 100 produtos mais vistos na última hora, atualizado a cada minuto.',
        'Como garantir deduplicação de eventos com IDs repetidos chegando com até 7 dias de atraso?',
        'Desenhe uma plataforma de métricas que garanta que "receita" tenha uma única definição na empresa.',
        'No seu design, o que acontece se o processamento ficar 6 horas fora do ar? Como o sistema se recupera?',
        'Como você apresentaria o trade-off entre latência e custo para um stakeholder não técnico?'
      ]
    },
    {
      id: 'padroes-avancados',
      title: 'Padrões avançados de processamento e algoritmos aproximados',
      summary: 'Deduplicação em escala, exactly-once de ponta a ponta, sinks idempotentes, modelagem bitemporal, HyperLogLog, Count-Min Sketch, Bloom filters, t-digest e amostragem.',
      hours: 20,
      learn: [
        'Deduplicação: por chave + janela, com estado, na escrita (MERGE) e na leitura',
        'Exactly-once ponta a ponta: fonte rejogável + processamento determinístico + sink idempotente/transacional',
        'Chaves de idempotência e upserts',
        'Ordenação e eventos fora de ordem; versionamento por sequência (LSN, offsets)',
        'HyperLogLog: contagem aproximada de distintos; erro e merge de sketches',
        'Count-Min Sketch: frequências aproximadas e heavy hitters',
        'Bloom filters: pertinência; uso em joins e em formatos de arquivo',
        't-digest/KLL: percentis aproximados em streaming',
        'Amostragem consistente (hash-based) para análises e testes',
        'Pré-agregação e cubos; rollups incrementais',
        'Join de grandes volumes: broadcast, bucketing, pré-particionamento, filtros com Bloom (runtime filters)'
      ],
      practice: [
        'Implementar HyperLogLog e Count-Min Sketch em Python e comparar com a contagem exata em 100M itens',
        'Usar `APPROX_COUNT_DISTINCT` no BigQuery/Spark e medir o ganho de custo e tempo vs `COUNT(DISTINCT)`',
        'Implementar deduplicação com estado e TTL em Flink ou Spark Streaming'
      ],
      resources: [
        ['HyperLogLog explicado (Google Research)', 'https://research.google/pubs/hyperloglog-in-practice-algorithmic-engineering-of-a-state-of-the-art-cardinality-estimation-algorithm/'],
        ['Apache DataSketches', 'https://datasketches.apache.org/'],
        ['Livro: DDIA – caps. 10–12', 'https://dataintensive.net/']
      ],
      questions: [
        'Como o HyperLogLog estima distintos com poucos KB de memória? Por que sketches podem ser combinados (merge)?',
        'Para que serve um Count-Min Sketch? Ele superestima ou subestima frequências?',
        'Quais três propriedades são necessárias para exactly-once de ponta a ponta?',
        'Como deduplicar bilhões de eventos por dia sem guardar todos os IDs para sempre?',
        'Quando é aceitável usar um resultado aproximado e quando não é (ex.: cobrança)?',
        'O que são runtime/Bloom filters num join e como eles reduzem o shuffle?'
      ]
    },
    {
      id: 'performance-escala',
      title: 'Performance e escala: troubleshooting de verdade',
      summary: 'Metodologia de diagnóstico, gargalos (CPU, memória, I/O, rede), benchmarking, capacity planning e otimização sistemática de plataformas.',
      hours: 15,
      learn: [
        'Metodologia USE (Utilização, Saturação, Erros) e RED',
        'Encontrar o gargalo antes de otimizar (lei de Amdahl)',
        'Benchmarking correto: aquecimento, variância, dados representativos',
        'Capacity planning: crescimento, picos, margens',
        'Padrões de otimização: reduzir dados lidos (pruning), reduzir dados movidos (shuffle), paralelizar, pré-computar, cachear',
        'Contenção: locks, hot partitions, small files, metastore como gargalo',
        'Trade-offs entre latência, throughput e custo',
        'Leitura de profilers e flame graphs'
      ],
      practice: [
        'Escolher o pipeline mais lento dos seus projetos, aplicar a metodologia e documentar um relatório de otimização com números',
        'Fazer um benchmark reproduzível comparando 3 engines numa mesma carga (ex.: TPC-H SF10 em DuckDB, Spark e Trino)'
      ],
      resources: [
        ['The USE Method (Brendan Gregg)', 'https://www.brendangregg.com/usemethod.html'],
        ['Flame Graphs', 'https://www.brendangregg.com/flamegraphs.html'],
        ['TPC-H benchmark', 'https://www.tpc.org/tpch/']
      ],
      questions: [
        'Descreva sua metodologia para investigar um pipeline que ficou 5x mais lento.',
        'O que é a lei de Amdahl e o que ela diz sobre paralelizar um job?',
        'Quais são as quatro formas fundamentais de acelerar uma query analítica?',
        'Como fazer um benchmark justo entre duas engines?',
        'Como planejar a capacidade de um cluster Kafka para a Black Friday?'
      ]
    },
    {
      id: 'estudos-de-caso',
      title: 'Estudos de caso de big techs',
      summary: 'Como Netflix, Uber, Airbnb, LinkedIn, Meta, Spotify e Nubank resolveram problemas de dados em escala, lidos nos blogs de engenharia e em papers.',
      hours: 20,
      why: 'Citar com propriedade como a Uber resolveu um problema parecido mostra repertório em entrevistas e em design reviews. Os blogs de engenharia funcionam como educação continuada gratuita.',
      learn: [
        'Netflix: data mesh/platform, Iceberg (criado lá), Maestro, Keystone (streaming)',
        'Uber: Hudi (criado lá), plataforma de dados em tempo real, Michelangelo (ML)',
        'Airbnb: Minerva (plataforma de métricas), Airflow (criado lá), data quality',
        'LinkedIn: Kafka (criado lá), DataHub, Pinot, Venice',
        'Meta: Presto (criado lá), arquitetura de warehouse em exabytes',
        'Spotify: pipelines de eventos e plataformas de dados',
        'Nubank: plataforma de dados em escala num banco digital (relevante para sua trajetória)',
        'Papers fundamentais: GFS, MapReduce, Bigtable, Dremel, Spanner, Kafka, Spark (RDD), Dataflow',
        'Como ler um paper técnico (método de três passadas)'
      ],
      practice: [
        'Ler 2 artigos de blogs de engenharia por semana e resumir 1 deles no learning-log (em inglês)',
        'Ler e resumir os papers de MapReduce, Dremel, Kafka e Spark RDD'
      ],
      resources: [
        ['Netflix Tech Blog', 'https://netflixtechblog.com/'],
        ['Uber Engineering', 'https://www.uber.com/blog/engineering/'],
        ['Airbnb Engineering & Data Science', 'https://medium.com/airbnb-engineering'],
        ['LinkedIn Engineering', 'https://www.linkedin.com/blog/engineering'],
        ['Nubank – Building Nubank', 'https://building.nubank.com/'],
        ['How to Read a Paper (Keshav)', 'http://ccr.sigcomm.org/online/files/p83-keshavA.pdf']
      ],
      questions: [
        'Que problema da Netflix motivou a criação do Iceberg?',
        'Que problema da Uber motivou a criação do Hudi?',
        'O que é o Minerva do Airbnb e qual problema ele resolve?',
        'Quais ideias do paper do Dremel estão presentes no BigQuery e no Parquet?',
        'Que lições da arquitetura de dados de um banco digital (ex.: Nubank) você aplicaria no Itaú?',
        'Escolha um artigo de blog de engenharia que você leu recentemente e explique o problema, a solução e os trade-offs.'
      ]
    }
  ],
  project: {
    title: 'Portfólio de system design + artigo técnico',
    description: 'Prova pública de que você pensa como arquiteto: designs escritos com rigor e um artigo técnico profundo.',
    deliverables: [
      'Repositório `data-system-design` com 10 designs completos (requisitos, estimativas, diagramas, trade-offs)',
      'Um artigo técnico longo (inglês), publicado no Medium, dev.to ou num blog próprio, sobre uma otimização ou arquitetura que você implementou',
      '5 mock interviews de system design realizadas, com feedback anotado',
      'ADRs para as principais decisões dos seus projetos de portfólio'
    ]
  }
});
