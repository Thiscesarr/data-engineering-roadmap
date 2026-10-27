window.ROADMAP_PHASES.push({
  id: 'distribuido',
  num: 5,
  level: 'pleno',
  title: 'Big data e processamento distribuído',
  duration: '12–14 semanas',
  summary: 'Fundamentos de sistemas distribuídos, formatos de arquivo, o ecossistema Hadoop, Apache Spark do básico ao tuning avançado, table formats (Delta, Iceberg, Hudi), query engines e uma linguagem da JVM.',
  why: 'Esta fase separa o DE de SQL do DE de plataforma. Entender por que um job Spark é lento (shuffle, skew, spill) e como o Iceberg faz ACID sobre S3 é o que as empresas internacionais pagam caro para ter.',
  outcomes: [
    'Explicar replicação, particionamento, consistência e consenso com os termos do DDIA',
    'Escolher formato de arquivo e table format com justificativa',
    'Diagnosticar e corrigir jobs Spark lentos usando a Spark UI (skew, shuffle, spill, small files)',
    'Implementar upserts, time travel e compaction num lakehouse com Delta ou Iceberg'
  ],
  topics: [
    {
      id: 'sistemas-distribuidos',
      title: 'Fundamentos de sistemas distribuídos',
      summary: 'Replicação, particionamento, consistência, CAP/PACELC, consenso, relógios, falhas parciais: os capítulos centrais do DDIA.',
      hours: 40,
      why: 'Todos os sistemas que você vai operar (Kafka, Spark, Cassandra, Snowflake) são distribuídos. DDIA é considerado leitura obrigatória por praticamente todo entrevistador sênior.',
      learn: [
        'Por que distribuir: escala, disponibilidade, latência; e o custo da complexidade',
        'Escalabilidade vertical vs horizontal',
        'Replicação: líder-seguidor, multi-líder, sem líder (quórum); síncrona vs assíncrona',
        'Lag de replicação e garantias: read-your-writes, monotonic reads',
        'Particionamento (sharding): por range vs por hash; rebalanceamento; consistent hashing',
        'Hot spots e skew',
        'Modelos de consistência: linearizabilidade, causal, eventual',
        'Teorema CAP (e suas limitações) e PACELC',
        'Consenso: problema, Raft (líder, termos, log replicado), ZooKeeper/etcd, KRaft',
        'Relógios: físicos vs lógicos, Lamport clocks, vector clocks; por que não confiar em timestamps',
        'Falhas parciais, timeouts, split brain, fencing tokens',
        'Semântica de entrega: at-most-once, at-least-once, exactly-once (e o que isso realmente significa)',
        'Batch como computação determinística sobre dados imutáveis'
      ],
      practice: [
        'Ler DDIA (pelo menos capítulos 1–9) e escrever um resumo por capítulo no `learning-log`',
        'Implementar consistent hashing em Python e medir a redistribuição de chaves ao adicionar um nó',
        'Fazer os labs de Raft do MIT 6.5840 (opcional, nível avançado)'
      ],
      resources: [
        ['Livro: Designing Data-Intensive Applications (Kleppmann)', 'https://dataintensive.net/'],
        ['The Raft Consensus Algorithm (visualização)', 'https://raft.github.io/'],
        ['Jepsen – Consistency Models', 'https://jepsen.io/consistency'],
        ['MIT 6.5840 Distributed Systems', 'https://pdos.csail.mit.edu/6.824/']
      ],
      questions: [
        'Compare replicação síncrona e assíncrona. O que acontece com cada uma quando o líder cai?',
        'Particionamento por range vs por hash: vantagens e desvantagens de cada um.',
        'O que é consistent hashing e qual problema ele resolve?',
        'Explique o teorema CAP. Por que "escolha 2 de 3" é uma simplificação enganosa?',
        'O que é linearizabilidade e por que ela é cara?',
        'Como o Raft elege um líder e garante que o log é consistente?',
        'Por que você não pode usar timestamps de relógio de máquinas diferentes para ordenar eventos?',
        'O que é split brain e como fencing tokens o evitam?',
        'O que "exactly-once" significa de verdade num sistema distribuído?'
      ]
    },
    {
      id: 'formatos-arquivo',
      title: 'Formatos de arquivo, compressão e layout de dados',
      summary: 'CSV, JSON, Avro, Parquet, ORC; encodings colunares; compressão; particionamento; o problema dos small files.',
      hours: 15,
      why: 'Trocar CSV por Parquet bem particionado pode reduzir custo e tempo em 10–100x. É a otimização mais barata e de maior impacto que existe.',
      learn: [
        'Orientado a linha (CSV, JSON, Avro) vs colunar (Parquet, ORC)',
        'Parquet por dentro: row groups, column chunks, pages, footer com metadados e estatísticas',
        'Encodings: dictionary, RLE, bit-packing, delta',
        'Predicate pushdown e projection pushdown',
        'Avro: schema embutido, evolução de schema, uso em streaming/Kafka',
        'Compressão: snappy, gzip, zstd, lz4 (razão vs velocidade); formatos splittable',
        'Particionamento estilo Hive (`dt=2026-01-01/`) e cardinalidade da chave de partição',
        'Problema dos small files e estratégias de compaction',
        'Tamanho ideal de arquivo (~128MB–1GB) e de row group',
        'Ordenação/clustering dentro dos arquivos (Z-order, Hilbert) para data skipping',
        'Formatos semi-estruturados e nested types (struct, array, map)'
      ],
      practice: [
        'Converter 10GB de CSV para Parquet (snappy e zstd) e comparar tamanho e tempo de query',
        'Inspecionar metadados de um Parquet com pyarrow (row groups, estatísticas)',
        'Criar o cenário de "small files" (100k arquivos) e medir o impacto, depois compactar'
      ],
      resources: [
        ['Apache Parquet – Documentation', 'https://parquet.apache.org/docs/'],
        ['Apache Avro – Specification', 'https://avro.apache.org/docs/'],
        ['Apache ORC', 'https://orc.apache.org/docs/']
      ],
      questions: [
        'Por que Parquet é mais eficiente que CSV para analytics? Cite pelo menos 4 motivos.',
        'Como funciona o predicate pushdown no Parquet? Que metadados permitem pular row groups?',
        'Quando Avro é melhor escolha que Parquet?',
        'Como escolher a coluna de particionamento? O que acontece se você particionar por `user_id`?',
        'O que é o problema de small files e por que ele degrada o desempenho? Como resolvê-lo?',
        'Compare snappy, gzip e zstd. Qual você usaria como padrão hoje?',
        'O que é dictionary encoding e em que tipo de coluna ele é mais eficiente?'
      ]
    },
    {
      id: 'hadoop',
      title: 'Ecossistema Hadoop (histórico e conceitos)',
      summary: 'HDFS, MapReduce, YARN e Hive: tecnologias em declínio, mas cujos conceitos estão em tudo, e que ainda rodam em muitos bancos.',
      hours: 8,
      why: 'Grandes bancos (inclusive no Brasil) ainda têm clusters Hadoop/Cloudera. E os conceitos (localidade de dados, map/shuffle/reduce, metastore) vivem dentro do Spark e dos lakehouses.',
      learn: [
        'Papers do Google: GFS, MapReduce, Bigtable, e como inspiraram o Hadoop',
        'HDFS: NameNode, DataNodes, blocos, replicação, localidade de dados',
        'MapReduce: map → shuffle/sort → reduce; combiners',
        'YARN: ResourceManager, NodeManager, containers',
        'Hive: SQL sobre arquivos, Hive Metastore (ainda usado como catálogo)',
        'Por que o mercado migrou para object storage + Spark/engines em cloud',
        'HBase, Sqoop, Oozie (nomes que você vai encontrar em sistemas legados)'
      ],
      resources: [
        ['Paper: MapReduce (Dean & Ghemawat)', 'https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/'],
        ['Apache Hadoop docs', 'https://hadoop.apache.org/docs/stable/'],
        ['Hive Metastore (conceitos)', 'https://cwiki.apache.org/confluence/display/hive/design']
      ],
      questions: [
        'Explique as fases map, shuffle e reduce com o exemplo de word count.',
        'O que é localidade de dados e por que ela importava no HDFS? Ela ainda existe com S3?',
        'Qual é o papel do NameNode e por que ele era um ponto único de falha?',
        'Por que o Hive Metastore sobreviveu ao declínio do Hadoop?',
        'Por que o MapReduce é lento comparado ao Spark?'
      ]
    },
    {
      id: 'spark-fundamentos',
      title: 'Apache Spark: fundamentos',
      summary: 'Arquitetura (driver, executors, cluster manager), lazy evaluation, DAG, jobs/stages/tasks, partições, DataFrame API e Spark SQL.',
      hours: 35,
      why: 'Spark é a ferramenta de processamento mais pedida em vagas de DE no mundo, e aparece em praticamente toda entrevista que envolve big data.',
      learn: [
        'Arquitetura: driver, executors, cluster manager (standalone, YARN, Kubernetes)',
        'SparkSession, RDD vs DataFrame vs Dataset',
        'Transformações (lazy) vs ações',
        'Transformações narrow vs wide (shuffle)',
        'Hierarquia job → stage → task; limites de stage nos shuffles',
        'Partições: número, tamanho, repartition vs coalesce',
        'DataFrame API (PySpark): select, filter, withColumn, groupBy, agg, join, window',
        'Spark SQL e views temporárias',
        'UDFs vs funções nativas vs pandas UDFs (Arrow); por que evitar UDFs Python',
        'Leitura e escrita: Parquet, partitionBy, modos de escrita (overwrite, append, dynamic partition overwrite)',
        'Cache/persist e níveis de storage',
        'Spark UI: jobs, stages, tasks, SQL tab, storage, executors',
        'Spark Connect e PySpark em notebooks vs jobs (spark-submit)'
      ],
      practice: [
        'Instalar Spark localmente (ou Docker) e processar o dataset NYC Taxi com PySpark',
        'Reescrever a mesma pipeline em DataFrame API e em Spark SQL e comparar os planos (`explain`)',
        'Identificar na Spark UI quantos stages e shuffles um job gerou e por quê'
      ],
      resources: [
        ['Spark – documentação oficial', 'https://spark.apache.org/docs/latest/'],
        ['Livro: Learning Spark, 2ª ed. (gratuito via Databricks)', 'https://www.oreilly.com/library/view/learning-spark-2nd/9781492050032/'],
        ['Livro: Spark – The Definitive Guide', 'https://www.oreilly.com/library/view/spark-the-definitive/9781491912201/'],
        ['Databricks Community Edition / Free Edition', 'https://www.databricks.com/learn/free-edition']
      ],
      questions: [
        'Descreva a arquitetura do Spark. O que roda no driver e o que roda nos executors?',
        'O que é lazy evaluation e quais vantagens ela traz ao otimizador?',
        'Diferença entre transformação narrow e wide. Dê dois exemplos de cada uma.',
        'Como o Spark divide um job em stages?',
        'repartition vs coalesce: quando usar cada um?',
        'Por que UDFs Python são lentas? Quais são as alternativas?',
        'O que acontece se você chamar `.collect()` num DataFrame de 100GB?',
        'Quando cache/persist ajuda e quando atrapalha?',
        'Como escrever num destino particionado sobrescrevendo apenas as partições processadas?'
      ]
    },
    {
      id: 'spark-avancado',
      title: 'Spark avançado: internals e tuning',
      summary: 'Catalyst, Tungsten, AQE, shuffle, estratégias de join, skew e salting, gerenciamento de memória, spill e dimensionamento de cluster.',
      hours: 40,
      why: 'Uma pergunta típica de entrevista sênior é "seu job Spark passou de 1h para 6h, o que você faz?". Responder bem exige conhecer internals.',
      learn: [
        'Catalyst optimizer: plano lógico → otimizado → físico; predicate pushdown, column pruning, constant folding',
        'Tungsten: geração de código (whole-stage codegen), formato binário off-heap',
        'Adaptive Query Execution (AQE): coalescing de partições, troca de estratégia de join, skew join',
        'Shuffle por dentro: escrita/leitura, spark.sql.shuffle.partitions, custo de rede/disco',
        'Estratégias de join: broadcast hash join, shuffle hash join, sort-merge join; thresholds e hints',
        'Data skew: como identificar na UI (task outlier) e resolver (salting, AQE skew join, broadcast, isolamento de chaves)',
        'Gerenciamento de memória: unified memory (execution vs storage), overhead, off-heap',
        'Spill para disco e OutOfMemory: causas e soluções',
        'Dimensionamento: executors, cores por executor, memória, dynamic allocation',
        'Partition sizing (~128–200MB por partição) e paralelismo',
        'Bucketing e particionamento para evitar shuffles repetidos',
        'Leitura eficiente: partition pruning, filter pushdown, schema explícito',
        'Speculative execution, retries e falhas de tasks',
        'Photon/Velox/Gluten: engines vetorizadas nativas'
      ],
      practice: [
        'Criar um dataset com skew artificial (1 chave com 50% dos dados), observar na UI e resolver com salting e com AQE',
        'Comparar broadcast join vs sort-merge join em tabelas de tamanhos diferentes',
        'Provocar spill e OOM, ajustar a configuração e documentar o antes/depois',
        'Ler o `explain(mode="formatted")` de 3 queries complexas e explicar cada nó'
      ],
      resources: [
        ['Spark SQL Performance Tuning', 'https://spark.apache.org/docs/latest/sql-performance-tuning.html'],
        ['The Internals of Spark SQL (Jacek Laskowski)', 'https://books.japila.pl/spark-sql-internals/'],
        ['Databricks – Comprehensive guide to optimize workloads', 'https://www.databricks.com/discover/pages/optimize-data-workloads-guide'],
        ['Spark – Tuning Guide', 'https://spark.apache.org/docs/latest/tuning.html']
      ],
      questions: [
        'Explique as fases do Catalyst optimizer.',
        'O que é AQE e quais três otimizações principais ele faz em tempo de execução?',
        'Como identificar data skew na Spark UI? Cite três formas de resolvê-lo.',
        'Como funciona o salting? Qual é o custo dele?',
        'Quando o Spark escolhe broadcast hash join? Qual o risco de forçar broadcast numa tabela grande?',
        'Seu job está com muito spill para disco. Quais são as causas prováveis e o que você ajusta?',
        'Como dimensionar executors (cores e memória) para um cluster de 10 nós com 16 cores e 64GB cada?',
        'Por que `spark.sql.shuffle.partitions=200` (padrão) costuma estar errado? Como escolher o valor?',
        'O que é bucketing e quando ele evita shuffles?',
        'Seu job passou de 1h para 6h sem mudança de código. Descreva seu processo de investigação.'
      ]
    },
    {
      id: 'table-formats',
      title: 'Table formats e lakehouse: Delta Lake, Iceberg, Hudi',
      summary: 'Transações ACID sobre object storage, metadados, time travel, schema evolution, MERGE, compaction, copy-on-write vs merge-on-read, e catálogos.',
      hours: 30,
      why: 'Iceberg e Delta viraram o padrão das plataformas de dados modernas (Netflix, Apple, Uber, Databricks, Snowflake, AWS). Saber operá-los é um diferencial forte no mercado de 2026.',
      learn: [
        'Problema: object storage não tem transações nem atomicidade de diretórios',
        'Delta Lake: transaction log (_delta_log), checkpoints, optimistic concurrency',
        'Apache Iceberg: metadata files, manifest lists, manifests, snapshots; hidden partitioning; partition evolution',
        'Apache Hudi: timeline, copy-on-write vs merge-on-read, índices',
        'Operações: MERGE/UPSERT, DELETE (GDPR/LGPD), UPDATE',
        'Time travel e rollback',
        'Schema evolution e enforcement',
        'Manutenção: compaction/OPTIMIZE, Z-ORDER/liquid clustering, VACUUM/expire snapshots, remove orphan files',
        'Copy-on-write vs merge-on-read e deletion vectors',
        'Catálogos: Hive Metastore, AWS Glue, Unity Catalog, Polaris, Nessie (Git para dados); REST catalog',
        'Interoperabilidade: UniForm, XTable; leitura por Trino, Snowflake, DuckDB, BigQuery',
        'Comparação Delta vs Iceberg vs Hudi e o cenário de mercado'
      ],
      practice: [
        'Criar uma tabela Iceberg com Spark + catálogo REST (ou Glue) e fazer MERGE, time travel e partition evolution',
        'Repetir com Delta Lake e comparar a estrutura de arquivos de metadados',
        'Simular escrita concorrente e observar o controle de concorrência otimista',
        'Rodar compaction e expire snapshots e medir o efeito no tempo de query'
      ],
      resources: [
        ['Apache Iceberg docs', 'https://iceberg.apache.org/docs/latest/'],
        ['Delta Lake docs', 'https://docs.delta.io/'],
        ['Apache Hudi docs', 'https://hudi.apache.org/docs/overview'],
        ['Livro: Apache Iceberg – The Definitive Guide', 'https://www.oreilly.com/library/view/apache-iceberg-the/9781098148614/']
      ],
      questions: [
        'Que problema os table formats resolvem que Parquet puro em S3 não resolve?',
        'Como o Delta Lake implementa transações ACID usando apenas arquivos no object storage?',
        'Explique a hierarquia de metadados do Iceberg (metadata → manifest list → manifest → data files).',
        'O que é hidden partitioning no Iceberg e por que ele é melhor que o particionamento estilo Hive?',
        'Copy-on-write vs merge-on-read: quando usar cada um?',
        'Por que tabelas Delta/Iceberg precisam de manutenção (compaction, vacuum/expire)? O que acontece sem ela?',
        'Como deletar todos os dados de um cliente (direito ao esquecimento) num lakehouse, incluindo o histórico de time travel?',
        'Qual é o papel do catálogo num lakehouse? Compare Glue, Unity Catalog e um REST catalog.',
        'Delta, Iceberg ou Hudi para uma nova plataforma multi-engine? Justifique.'
      ]
    },
    {
      id: 'query-engines',
      title: 'Query engines e OLAP em tempo real',
      summary: 'Trino/Presto, DuckDB, ClickHouse, Druid e Pinot: engines MPP, execução vetorizada e OLAP de baixa latência.',
      hours: 15,
      learn: [
        'Arquitetura MPP: coordinator e workers; execução em pipeline',
        'Trino/Presto: conectores, federação de queries, uso com Iceberg',
        'Athena (Trino gerenciado) e modelo de custo por TB escaneado',
        'DuckDB: OLAP embarcado; quando substitui um cluster',
        'ClickHouse: MergeTree, ordenação, materialized views, ingestão em tempo real',
        'Apache Druid e Pinot: OLAP de baixa latência voltado ao usuário final',
        'Execução vetorizada vs geração de código (DuckDB vs Spark/Hyper)',
        'Como escolher: latência, concorrência, custo, frescor dos dados'
      ],
      practice: [
        'Subir Trino com Docker apontando para tabelas Iceberg e para um Postgres, e fazer uma query federada',
        'Carregar 100M linhas no ClickHouse e comparar latência com Postgres e DuckDB'
      ],
      resources: [
        ['Trino docs', 'https://trino.io/docs/current/'],
        ['ClickHouse docs', 'https://clickhouse.com/docs'],
        ['DuckDB – Why DuckDB', 'https://duckdb.org/why_duckdb'],
        ['Apache Pinot docs', 'https://docs.pinot.apache.org/']
      ],
      questions: [
        'O que é uma engine MPP? Como o Trino executa uma query distribuída?',
        'Quando usar Trino/Athena sobre o lake em vez de carregar os dados num warehouse?',
        'Por que ClickHouse e Pinot são usados para analytics voltado ao cliente (dashboards dentro do produto)?',
        'O que torna o DuckDB tão rápido numa única máquina?',
        'Como o motor de tabelas MergeTree do ClickHouse organiza os dados?'
      ]
    },
    {
      id: 'jvm-segunda-linguagem',
      title: 'Segunda linguagem: JVM (Scala/Java) e noções de Go/Rust',
      summary: 'Spark, Kafka e Flink são escritos na JVM. Ler stack traces, ajustar a JVM e escrever Scala/Java básico é um diferencial forte. Rust e Go estão em alta para ferramentas de dados.',
      hours: 40,
      why: 'Muitas vagas sêniores em empresas de ponta (especialmente de streaming e plataforma) pedem Scala ou Java. E entender GC e heap ajuda a debugar executors e brokers.',
      learn: [
        'JVM: bytecode, JIT, heap vs stack, garbage collection (G1, ZGC), heap sizing',
        'Ler stack traces Java e identificar a causa raiz em erros do Spark',
        'Java moderno: records, streams, Optional, generics',
        'Scala: val/var, case classes, pattern matching, collections, Option, funções de alta ordem',
        'Ferramentas de build: sbt, Maven, Gradle; fat jars e conflitos de dependência',
        'Spark com Scala: Dataset API e type safety',
        'Noções de Go (concorrência com goroutines, ferramentas CLI) ou Rust (ownership; base do Polars, DataFusion, Delta-rs)',
        'Quando vale escrever uma ferramenta em Rust/Go em vez de Python'
      ],
      practice: [
        'Reescrever um job PySpark em Scala e empacotar com sbt',
        'Escrever um pequeno consumidor Kafka em Java ou Go',
        'Completar o Tour of Go ou os primeiros 10 capítulos do Rust Book'
      ],
      resources: [
        ['Tour of Scala', 'https://docs.scala-lang.org/tour/tour-of-scala.html'],
        ['A Tour of Go', 'https://go.dev/tour/'],
        ['The Rust Programming Language (livro)', 'https://doc.rust-lang.org/book/'],
        ['Oracle – Java GC Tuning Guide', 'https://docs.oracle.com/en/java/javase/21/gctuning/']
      ],
      questions: [
        'Por que um executor Spark pode morrer por "GC overhead limit exceeded"? O que fazer?',
        'Qual a diferença entre heap e off-heap na JVM e por que o Spark usa off-heap?',
        'Por que usar Scala em vez de PySpark em alguns casos? Quais as vantagens e desvantagens?',
        'O que é um fat jar e qual problema de conflito de dependências ele pode causar?',
        'Por que tantas ferramentas novas de dados (Polars, DataFusion, Delta-rs) são escritas em Rust?'
      ]
    }
  ],
  project: {
    title: 'Lakehouse local com Spark + Iceberg + Trino',
    description: 'Monte um mini lakehouse open source com Docker Compose (MinIO como S3, Spark, Iceberg com catálogo REST, Trino) e rode uma pipeline de dados volumosa e otimizada.',
    deliverables: [
      'Docker Compose com MinIO, Spark, catálogo Iceberg REST e Trino',
      'Pipeline PySpark bronze → silver → gold sobre um dataset de dezenas de GB',
      'MERGE incremental, time travel e rotina de manutenção (compaction, expire snapshots)',
      'Relatório de tuning: skew, joins, partições e shuffle, com prints da Spark UI e ganhos medidos',
      'Queries de consumo via Trino e README em inglês com arquitetura e trade-offs'
    ]
  }
});
