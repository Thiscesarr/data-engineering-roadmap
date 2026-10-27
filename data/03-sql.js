window.ROADMAP_PHASES.push({
  id: 'sql',
  num: 3,
  level: 'junior',
  title: 'SQL e bancos de dados relacionais',
  duration: '10–12 semanas',
  summary: 'SQL do básico ao avançado (janelas, CTEs recursivas, gaps & islands), modelagem relacional, índices, planos de execução, transações, isolamento, MVCC e PostgreSQL na prática.',
  why: 'SQL é a habilidade mais cobrada em entrevistas de DE no mundo todo, com rodada dedicada ao vivo. E saber como o banco executa a query (internals) é o que separa quem escreve SQL de quem escreve SQL rápido.',
  outcomes: [
    'Resolver problemas SQL difíceis (StrataScratch/DataLemur Hard) em menos de 20 minutos',
    'Ler um EXPLAIN ANALYZE e propor índices ou reescritas',
    'Explicar níveis de isolamento e as anomalias que cada um permite',
    'Modelar um banco transacional normalizado com constraints corretas'
  ],
  topics: [
    {
      id: 'sql-fundamentos',
      title: 'SQL fundamentos',
      summary: 'SELECT, filtros, joins, agregações, subqueries, NULLs e a ordem lógica de execução de uma query.',
      hours: 25,
      why: 'Tudo o mais é construído sobre isso. Erros de semântica de NULL e de cardinalidade de JOIN geram números errados em dashboards de diretoria.',
      learn: [
        'Ordem lógica de execução: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT',
        'Tipos de dados: inteiros, NUMERIC/DECIMAL, texto, datas, timestamps (com/sem time zone), boolean, JSON',
        'Filtros: WHERE, IN, BETWEEN, LIKE/ILIKE, IS NULL',
        'JOINs: INNER, LEFT, RIGHT, FULL, CROSS, SELF JOIN; semi-join (EXISTS) e anti-join (NOT EXISTS)',
        'Explosão de cardinalidade em joins (fan-out) e como detectá-la',
        'Agregações: COUNT(*) vs COUNT(col) vs COUNT(DISTINCT), SUM, AVG, MIN, MAX, GROUP BY, HAVING',
        'NULL: lógica de três valores, COALESCE, NULLIF, NOT IN com NULL (armadilha clássica)',
        'CASE WHEN e agregação condicional (`SUM(CASE WHEN … )`, FILTER)',
        'Subqueries: escalares, correlacionadas, em FROM',
        'UNION vs UNION ALL, INTERSECT, EXCEPT',
        'Funções de data e de string mais comuns',
        'DDL e DML: CREATE, ALTER, INSERT, UPDATE, DELETE, TRUNCATE'
      ],
      practice: [
        'Completar SQLBolt e PostgreSQL Exercises (pgexercises) inteiros',
        'LeetCode SQL 50 completo',
        'Criar um banco Postgres local (Docker) e carregar um dataset real para praticar'
      ],
      resources: [
        ['SQLBolt', 'https://sqlbolt.com/'],
        ['PostgreSQL Exercises', 'https://pgexercises.com/'],
        ['LeetCode – SQL 50', 'https://leetcode.com/studyplan/top-sql-50/'],
        ['PostgreSQL Tutorial oficial', 'https://www.postgresql.org/docs/current/tutorial.html']
      ],
      questions: [
        'Qual a ordem lógica de execução de uma query SQL? Por que não dá para usar um alias do SELECT no WHERE?',
        'Diferença entre COUNT(*), COUNT(coluna) e COUNT(DISTINCT coluna)?',
        'Por que `WHERE id NOT IN (SELECT cliente_id FROM ...)` pode retornar zero linhas? Como corrigir?',
        'Diferença entre WHERE e HAVING?',
        'Um LEFT JOIN seguido de `WHERE tabela_direita.col = x` vira o quê? Por quê?',
        'Como detectar que um JOIN duplicou linhas (fan-out) e inflou uma soma?',
        'Quando usar EXISTS em vez de IN ou de JOIN?',
        'Diferença entre UNION e UNION ALL, e qual é mais performático?'
      ]
    },
    {
      id: 'sql-avancado',
      title: 'SQL avançado e analítico',
      summary: 'Window functions, CTEs (inclusive recursivas), gaps & islands, sessionização, deduplicação, pivot, JSON e padrões de entrevista.',
      hours: 40,
      why: 'Rodadas de SQL em entrevistas internacionais são quase sempre de window functions e problemas de janela temporal. É aqui que os candidatos são filtrados.',
      learn: [
        'Window functions: OVER, PARTITION BY, ORDER BY',
        'Ranking: ROW_NUMBER, RANK, DENSE_RANK, NTILE, PERCENT_RANK',
        'Navegação: LAG, LEAD, FIRST_VALUE, LAST_VALUE, NTH_VALUE',
        'Frames: ROWS vs RANGE vs GROUPS; UNBOUNDED PRECEDING; médias móveis',
        'Agregados acumulados (running totals) e percentuais do total',
        'CTEs (WITH) para legibilidade; CTEs recursivas (hierarquias, séries)',
        'Deduplicação: manter o registro mais recente por chave (ROW_NUMBER + filtro, QUALIFY)',
        'Gaps & islands: sequências consecutivas, streaks de login',
        'Sessionização: agrupar eventos com intervalo menor que N minutos',
        'Retenção e coortes; funis de conversão',
        'Pivot/unpivot (CASE, crosstab, PIVOT)',
        'GROUPING SETS, ROLLUP, CUBE',
        'LATERAL / CROSS APPLY; geração de séries (generate_series) e calendário',
        'Funções JSON/semi-estruturado (Postgres jsonb, BigQuery, Snowflake VARIANT); arrays e UNNEST',
        'MERGE / UPSERT (INSERT … ON CONFLICT)',
        'Estilo: SQL legível, CTEs nomeadas, sem SELECT * em produção'
      ],
      practice: [
        'Resolver 50 problemas Medium/Hard no DataLemur ou StrataScratch',
        'Calcular retenção semanal por coorte de cadastro num dataset de eventos',
        'Implementar sessionização (30 min de inatividade) em SQL puro',
        'Resolver gaps & islands: maior sequência de dias consecutivos com transação por cliente'
      ],
      resources: [
        ['DataLemur (SQL de entrevistas)', 'https://datalemur.com/'],
        ['StrataScratch', 'https://www.stratascratch.com/'],
        ['PostgreSQL – Window Functions', 'https://www.postgresql.org/docs/current/tutorial-window.html'],
        ['Modern SQL (Markus Winand)', 'https://modern-sql.com/']
      ],
      questions: [
        'Diferença entre ROW_NUMBER, RANK e DENSE_RANK com um exemplo de empate.',
        'Escreva uma query que retorne os 3 produtos mais vendidos por categoria.',
        'Como deduplicar uma tabela mantendo apenas o registro mais recente por `id`?',
        'Explique a diferença entre frame ROWS e RANGE. Por que LAST_VALUE "não funciona" com o frame default?',
        'Como encontrar a maior sequência de dias consecutivos em que cada usuário fez login (gaps & islands)?',
        'Como sessionizar eventos de clickstream com timeout de 30 minutos?',
        'Como calcular a variação percentual mês a mês da receita?',
        'Quando uma CTE recursiva é necessária? Dê um exemplo com hierarquia de funcionários.',
        'Como fazer um UPSERT no PostgreSQL? E num warehouse com MERGE?',
        'Como calcular um running total que reinicia a cada mês?'
      ]
    },
    {
      id: 'modelagem-relacional',
      title: 'Modelagem relacional e normalização',
      summary: 'Modelo entidade-relacionamento, chaves, constraints, formas normais (1FN–BCNF) e quando desnormalizar.',
      hours: 15,
      why: 'Sistemas fonte (OLTP) são relacionais. Entender o desenho deles é necessário para extrair dados corretamente e para conversar com engenheiros de software.',
      learn: [
        'Entidades, atributos, relacionamentos e cardinalidades (1:1, 1:N, N:N)',
        'Diagramas ER (notação crow\'s foot)',
        'Chaves: primária, estrangeira, candidata, natural vs surrogate, compostas',
        'Constraints: NOT NULL, UNIQUE, CHECK, FOREIGN KEY (ON DELETE CASCADE/RESTRICT)',
        'Formas normais: 1FN, 2FN, 3FN, BCNF e as anomalias de inserção/atualização/remoção',
        'Desnormalização: quando e por quê (leitura vs escrita)',
        'Tabelas associativas para N:N',
        'Modelagem de dados temporais e soft delete',
        'UUID vs inteiro sequencial como chave (trade-offs)'
      ],
      practice: [
        'Modelar o banco de um app de banco digital (clientes, contas, transações, cartões) até a 3FN com DDL completo',
        'Identificar e corrigir anomalias num schema mal modelado'
      ],
      resources: [
        ['Database Design – Vertabelo blog', 'https://vertabelo.com/blog/'],
        ['CMU 15-445 – Relational Model (aula)', 'https://15445.courses.cs.cmu.edu/'],
        ['dbdiagram.io (ferramenta)', 'https://dbdiagram.io/']
      ],
      questions: [
        'Explique 1FN, 2FN e 3FN com um exemplo de tabela que viola cada uma.',
        'Qual anomalia de atualização ocorre num schema não normalizado? Dê um exemplo.',
        'Chave natural vs surrogate: prós e contras de cada uma.',
        'Por que bancos OLTP são normalizados e data warehouses são desnormalizados?',
        'Como modelar um relacionamento N:N entre alunos e cursos?',
        'Quais são os prós e contras de UUID v4 vs inteiro sequencial como PK num banco com B-tree?'
      ]
    },
    {
      id: 'indices-planos',
      title: 'Índices, planos de execução e otimização de queries',
      summary: 'Como bancos executam queries: B-tree e outros índices, estatísticas, otimizador baseado em custo, algoritmos de join e leitura de EXPLAIN.',
      hours: 25,
      why: 'Query lenta é o problema número 1 em produção. Saber ler um plano e entender por que o otimizador escolheu um hash join é uma habilidade de nível sênior.',
      learn: [
        'Estrutura B-tree/B+tree: por que busca é O(log n)',
        'Tipos de índice: B-tree, hash, GIN, GiST, BRIN; índices parciais e de expressão',
        'Índices compostos e a regra do prefixo mais à esquerda',
        'Covering index / index-only scan (INCLUDE)',
        'Seletividade e cardinalidade; quando o índice NÃO é usado',
        'Custo de índices na escrita',
        'Seq scan vs index scan vs bitmap scan',
        'Algoritmos de join: nested loop, hash join, merge join, e quando cada um é escolhido',
        'Estatísticas, ANALYZE e estimativas de cardinalidade erradas',
        'EXPLAIN vs EXPLAIN ANALYZE (BUFFERS); como ler o plano de baixo para cima',
        'Anti-patterns: funções na coluna indexada, OR, LIKE "%x", conversões implícitas, SELECT *',
        'Particionamento de tabelas (range, list, hash) e partition pruning'
      ],
      practice: [
        'Carregar 10M+ linhas no Postgres e otimizar 5 queries lentas usando EXPLAIN ANALYZE',
        'Comparar o plano de uma query antes e depois de criar um índice composto',
        'Forçar o otimizador a mudar de hash join para nested loop (variando dados e estatísticas) e explicar o motivo'
      ],
      resources: [
        ['Use The Index, Luke!', 'https://use-the-index-luke.com/'],
        ['PostgreSQL – Using EXPLAIN', 'https://www.postgresql.org/docs/current/using-explain.html'],
        ['explain.dalibo.com (visualizador de planos)', 'https://explain.dalibo.com/'],
        ['CMU 15-445 Database Systems (Andy Pavlo)', 'https://15445.courses.cs.cmu.edu/']
      ],
      questions: [
        'Como funciona uma B-tree e por que ela é a estrutura padrão de índices em bancos?',
        'Você tem um índice em (pais, cidade, data). Quais filtros conseguem usá-lo? E `WHERE cidade = ?` sozinho?',
        'Por que `WHERE DATE(created_at) = \'2026-01-01\'` pode não usar o índice? Como reescrever?',
        'Explique nested loop, hash join e merge join. Quando o otimizador escolhe cada um?',
        'Por que adicionar índices em todas as colunas é uma má ideia?',
        'O que é um index-only scan?',
        'O EXPLAIN mostra estimativa de 10 linhas, mas o ANALYZE mostra 5 milhões. Qual o problema e como resolver?',
        'Quando um seq scan é melhor que um index scan?'
      ]
    },
    {
      id: 'transacoes',
      title: 'Transações, concorrência e consistência',
      summary: 'ACID, níveis de isolamento, anomalias, MVCC, locks, deadlocks e WAL.',
      hours: 20,
      why: 'CDC, exactly-once, upserts concorrentes e leituras consistentes de fontes OLTP dependem disso. É um tema clássico de entrevista sênior e do livro DDIA.',
      learn: [
        'ACID: atomicidade, consistência, isolamento, durabilidade',
        'Anomalias: dirty read, non-repeatable read, phantom read, lost update, write skew',
        'Níveis de isolamento: Read Uncommitted, Read Committed, Repeatable Read, Serializable (e Snapshot Isolation)',
        'MVCC: versões de linha, snapshots, VACUUM no Postgres',
        'Locks: linha vs tabela, shared vs exclusive, SELECT … FOR UPDATE, locking otimista vs pessimista',
        'Deadlocks: como ocorrem e como o banco os resolve',
        'WAL (write-ahead log): durabilidade, recuperação e base para replicação e CDC',
        'Checkpoints e fsync',
        'Transações distribuídas e two-phase commit (2PC), e por que são evitadas',
        'Idempotência e chaves de idempotência na escrita'
      ],
      practice: [
        'Reproduzir um lost update com duas sessões psql e corrigir com FOR UPDATE ou isolamento maior',
        'Reproduzir write skew em Repeatable Read e mostrar que Serializable impede',
        'Provocar um deadlock e ler a mensagem de erro do Postgres'
      ],
      resources: [
        ['Livro: Designing Data-Intensive Applications – cap. 7', 'https://dataintensive.net/'],
        ['PostgreSQL – Concurrency Control (MVCC)', 'https://www.postgresql.org/docs/current/mvcc.html'],
        ['Hermitage – testes de isolamento', 'https://github.com/ept/hermitage']
      ],
      questions: [
        'Explique cada letra de ACID com um exemplo de transferência bancária.',
        'Quais anomalias cada nível de isolamento previne? Qual é o default do PostgreSQL?',
        'O que é write skew? Dê um exemplo que Snapshot Isolation não previne.',
        'Como funciona o MVCC? Por que o Postgres precisa de VACUUM?',
        'Locking otimista vs pessimista: quando usar cada um?',
        'O que é o WAL e por que ele é a base tanto da durabilidade quanto do CDC?',
        'Por que two-phase commit é evitado em sistemas distribuídos modernos?'
      ]
    },
    {
      id: 'postgres-pratica',
      title: 'PostgreSQL na prática e administração básica',
      summary: 'Operação de um banco real: usuários e permissões, particionamento, replicação, connection pooling, backup, extensões e monitoramento.',
      hours: 15,
      why: 'Postgres é a fonte de dados mais comum que você vai ingerir e também é usado como serving layer. Saber operá-lo evita derrubar produção com uma extração.',
      learn: [
        'Arquitetura: processos por conexão, shared buffers, WAL',
        'Usuários, roles e GRANTs; princípio do menor privilégio',
        'Connection pooling (PgBouncer) e por que conexões são caras',
        'Replicação física (streaming) e lógica (publication/subscription)',
        'Réplicas de leitura para extração sem impactar produção',
        'Backup: pg_dump vs backup físico, PITR',
        'Particionamento declarativo',
        'Extensões úteis: pg_stat_statements, pgvector, PostGIS, TimescaleDB',
        'Monitoramento: pg_stat_activity, locks, queries lentas, bloat',
        'COPY para carga em massa vs INSERT linha a linha'
      ],
      practice: [
        'Subir Postgres primário + réplica com Docker Compose',
        'Habilitar pg_stat_statements e encontrar as 5 queries mais caras',
        'Comparar a velocidade de carga de 1M linhas com INSERT, executemany e COPY'
      ],
      resources: [
        ['PostgreSQL Documentation', 'https://www.postgresql.org/docs/current/'],
        ['The Internals of PostgreSQL', 'https://www.interdb.jp/pg/'],
        ['Crunchy Data – Postgres tutorials', 'https://www.crunchydata.com/developers/tutorials']
      ],
      questions: [
        'Por que extrair dados diretamente do primário de produção é arriscado? Quais alternativas existem?',
        'Para que serve o PgBouncer? O que acontece com 2.000 conexões diretas num Postgres?',
        'Diferença entre replicação física e lógica. Qual delas é usada por ferramentas de CDC?',
        'Por que COPY é muito mais rápido que INSERTs individuais?',
        'Como você investigaria um Postgres com CPU a 100%?',
        'O que é PITR e como funciona?'
      ]
    },
    {
      id: 'nosql',
      title: 'Bancos NoSQL e modelos de dados alternativos',
      summary: 'Key-value, documento, wide-column, grafo, time-series e search: modelos, trade-offs e quando cada um é a fonte ou o destino.',
      hours: 15,
      why: 'Você vai ingerir de MongoDB, DynamoDB e Cassandra, e servir dados por Redis ou Elasticsearch. Escolher o banco errado é um dos erros de arquitetura mais caros.',
      learn: [
        'Key-value: Redis, DynamoDB; padrões de acesso e chaves de partição',
        'Documento: MongoDB; schema flexível, embedding vs referencing',
        'Wide-column: Cassandra, HBase, Bigtable; modelagem orientada a queries',
        'Grafos: Neo4j; quando relacionamentos são o dado principal',
        'Time-series: TimescaleDB, InfluxDB',
        'Search: Elasticsearch/OpenSearch; índice invertido',
        'Modelagem single-table no DynamoDB',
        'Consistência eventual vs forte em bancos NoSQL',
        'Desafios de ingerir dados NoSQL para analytics (schema drift, aninhamento)'
      ],
      practice: [
        'Modelar no DynamoDB (local) um caso com 3 padrões de acesso usando single-table design',
        'Ingerir uma coleção MongoDB aninhada e achatá-la em tabelas analíticas'
      ],
      resources: [
        ['The DynamoDB Book (Alex DeBrie)', 'https://www.dynamodbbook.com/'],
        ['MongoDB – Data Modeling', 'https://www.mongodb.com/docs/manual/data-modeling/'],
        ['Livro: Seven Databases in Seven Weeks', 'https://pragprog.com/titles/pwrdata/seven-databases-in-seven-weeks-second-edition/']
      ],
      questions: [
        'Quando escolher um banco de documentos em vez de um relacional? E quando não?',
        'Por que a modelagem no Cassandra/DynamoDB começa pelos padrões de acesso, e não pelas entidades?',
        'O que é uma hot partition e como evitá-la?',
        'Como funciona um índice invertido no Elasticsearch?',
        'Quais desafios surgem ao levar dados do MongoDB para um warehouse analítico?',
        'Por que Redis é rápido e quais são os riscos de usá-lo como fonte da verdade?'
      ]
    }
  ],
  project: {
    title: 'Banco transacional + camada analítica de um banco digital fictício',
    description: 'Modele e opere um OLTP realista, gere carga sintética e construa consultas analíticas avançadas sobre ele.',
    deliverables: [
      'Schema normalizado (3FN) com DDL, constraints e diagrama ER',
      'Gerador de dados sintéticos (Faker) com milhões de transações e distribuição realista (skew)',
      'Conjunto de 15 queries analíticas avançadas (janelas, coortes, gaps & islands, fraude simples) documentadas',
      'Relatório de tuning: EXPLAIN ANALYZE antes e depois, índices criados e ganho medido',
      'Docker Compose com Postgres + réplica + PgBouncer'
    ]
  }
});
