window.ROADMAP_PHASES.push({
  id: 'pipelines',
  num: 6,
  level: 'pleno',
  title: 'Pipelines, orquestração e transformação',
  duration: '10–12 semanas',
  summary: 'Princípios de pipelines confiáveis (idempotência, backfill, incrementalidade), ingestão e CDC, Airflow a fundo, orquestradores modernos, dbt e qualidade de dados.',
  why: 'É o trabalho do dia a dia de um DE. A diferença entre pleno e sênior aparece aqui: pipelines que se recuperam sozinhos, reprocessam sem duplicar e avisam antes que o usuário perceba o erro.',
  outcomes: [
    'Projetar pipelines idempotentes, determinísticos e reprocessáveis (backfill seguro)',
    'Implementar CDC log-based de um Postgres para o lake/warehouse',
    'Construir DAGs Airflow de produção e explicar a arquitetura do Airflow',
    'Estruturar um projeto dbt com testes, modelos incrementais, snapshots e CI',
    'Implementar uma estratégia de data quality com circuit breakers'
  ],
  topics: [
    {
      id: 'principios-pipelines',
      title: 'Princípios de pipelines confiáveis',
      summary: 'ETL vs ELT, idempotência, determinismo, cargas incrementais, backfills, late data, retries, dead-letter queues e functional data engineering.',
      hours: 20,
      why: 'Estas perguntas aparecem em toda entrevista de DE: "como você garante que rodar o pipeline duas vezes não duplica dados?" e "como faria o backfill de 2 anos?".',
      learn: [
        'ETL vs ELT e por que ELT ganhou espaço com warehouses em cloud',
        'Batch, micro-batch e streaming',
        'Idempotência: mesma entrada → mesmo resultado, independentemente de quantas execuções',
        'Padrões idempotentes: overwrite de partição, MERGE por chave, delete+insert por janela',
        'Determinismo: evitar `now()`, usar a data lógica da execução (execution date / data interval)',
        'Functional data engineering (Maxime Beauchemin): tarefas puras, partições imutáveis',
        'Carga full vs incremental; high-water mark; janelas de lookback para late data',
        'Backfill: planejamento, paralelismo, impacto em custo e nos sistemas fonte',
        'Late-arriving data e reprocessamento',
        'Retries, timeouts, dead-letter queues e quarentena de registros ruins',
        'Write-Audit-Publish (WAP): gravar → validar → publicar',
        'Dependências entre pipelines: por tempo vs por dados (data-aware scheduling)',
        'SLAs de frescor e de completude',
        'Runbooks e documentação operacional'
      ],
      practice: [
        'Transformar um pipeline com append em um pipeline idempotente por partição e provar rodando 3x',
        'Implementar carga incremental com high-water mark + lookback de 3 dias',
        'Executar um backfill de 365 partições com paralelismo controlado'
      ],
      resources: [
        ['Functional Data Engineering (Maxime Beauchemin)', 'https://maximebeauchemin.medium.com/functional-data-engineering-a-modern-paradigm-for-batch-data-processing-2327ec32c42a'],
        ['Start Data Engineering – Idempotent pipelines', 'https://www.startdataengineering.com/post/why-how-idempotent-data-pipeline/'],
        ['Livro: Fundamentals of Data Engineering – caps. 7–8', 'https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/']
      ],
      questions: [
        'O que é um pipeline idempotente? Dê três técnicas para torná-lo idempotente.',
        'Por que usar `datetime.now()` dentro de uma transformação quebra o reprocessamento? O que usar no lugar?',
        'Como você faria o backfill de 2 anos de dados sem derrubar o banco fonte nem estourar o orçamento?',
        'Como lidar com dados que chegam atrasados (late data) numa carga incremental diária?',
        'O que é o padrão Write-Audit-Publish e qual problema ele resolve?',
        'ETL ou ELT: quando cada um é mais apropriado? Considere PII e custo.',
        'Qual a diferença entre agendar por horário e agendar por disponibilidade de dados?',
        'O que é uma dead-letter queue e como você trataria os registros que caem nela?'
      ]
    },
    {
      id: 'ingestao-cdc',
      title: 'Ingestão de dados e Change Data Capture (CDC)',
      summary: 'Padrões de extração (full, incremental, CDC), Debezium, ferramentas de ingestão (Airbyte, Fivetran, dlt), arquivos e schema drift.',
      hours: 20,
      why: 'Replicar bancos transacionais para o lake com baixa latência e sem impactar a produção é uma necessidade de toda empresa grande, e muito comum em bancos.',
      learn: [
        'Padrões: snapshot completo, incremental por timestamp/ID, CDC',
        'Problemas do incremental por `updated_at`: deletes não capturados, relógios, transações longas',
        'CDC baseado em log: WAL do Postgres (logical decoding), binlog do MySQL, redo log do Oracle',
        'Debezium: arquitetura sobre Kafka Connect, snapshot inicial, formato do evento (before/after/op)',
        'Aplicar CDC no destino: MERGE, ordenação por LSN, deletes, compactação',
        'Outbox pattern como alternativa ao CDC de tabelas internas',
        'Ferramentas gerenciadas e open source: Fivetran, Airbyte, dlt, AWS DMS',
        'Ingestão de arquivos: SFTP, S3 events, validação de arquivos, arquivos de controle',
        'Schema drift: detecção, evolução automática vs falha controlada',
        'Ingestão de APIs de SaaS e limites de API',
        'Contratos com o time dono da fonte'
      ],
      practice: [
        'Postgres → Debezium → Kafka → tabela Iceberg/Delta com MERGE (Docker Compose)',
        'Pipeline de ingestão com dlt de uma API para DuckDB/BigQuery com schema evolution',
        'Testar o comportamento do pipeline quando uma coluna é adicionada e quando um tipo muda na fonte'
      ],
      resources: [
        ['Debezium docs', 'https://debezium.io/documentation/'],
        ['dlt (data load tool)', 'https://dlthub.com/docs/'],
        ['Airbyte docs', 'https://docs.airbyte.com/'],
        ['Transactional Outbox pattern', 'https://microservices.io/patterns/data/transactional-outbox.html']
      ],
      questions: [
        'Quais as limitações da extração incremental baseada em `updated_at`? Como o CDC log-based as resolve?',
        'Como o Debezium captura mudanças de um Postgres? O que é logical decoding e replication slot?',
        'Que risco operacional um replication slot inativo traz para o banco de produção?',
        'Como aplicar eventos de CDC no destino garantindo a ordem correta e tratando deletes?',
        'O que é o outbox pattern e quando ele é preferível ao CDC direto de tabelas?',
        'Fivetran, Airbyte ou código próprio: como decidir?',
        'Uma coluna mudou de INT para STRING na fonte. O que seu pipeline deve fazer?'
      ]
    },
    {
      id: 'airflow',
      title: 'Apache Airflow a fundo',
      summary: 'Arquitetura, scheduler, executors, DAGs, TaskFlow, operators, sensors, XCom, pools, dynamic task mapping, datasets/assets e boas práticas de produção (Airflow 2 e 3).',
      hours: 30,
      why: 'Airflow é o orquestrador mais usado no mundo e aparece em grande parte das vagas de DE, inclusive em bancos brasileiros. Conhecer a arquitetura, além da API, é esperado de pleno em diante.',
      learn: [
        'Arquitetura: scheduler, webserver/API server, metadata DB, executor, workers, triggerer, DAG processor',
        'Executors: Local, Celery, Kubernetes, e trade-offs',
        'Conceitos: DAG, task, operator, sensor, hook, connection, variable',
        'Data interval / logical date, catchup e backfill',
        'TaskFlow API (@task, @dag) e passagem de dados',
        'XCom: limites; por que não trafegar dados grandes',
        'Sensors: poke vs reschedule vs deferrable operators',
        'Pools, priority weights, concurrency, max_active_runs',
        'Dynamic task mapping',
        'Datasets/Assets e data-aware scheduling',
        'Trigger rules, branching, task groups',
        'Retries, SLAs/deadline alerts, callbacks e alertas',
        'Boas práticas: DAGs leves, top-level code, idempotência, Airflow como orquestrador e não como processador',
        'Testes de DAGs (integridade, unitários) e CI',
        'Deploy: Docker, Helm chart no Kubernetes, MWAA, Cloud Composer, Astronomer',
        'Novidades do Airflow 3 (DAG versioning, assets, nova UI, Task SDK)'
      ],
      practice: [
        'Subir Airflow com Docker Compose e criar uma DAG ELT completa com TaskFlow',
        'Usar dynamic task mapping para processar N arquivos descobertos em runtime',
        'Criar duas DAGs encadeadas por Assets/Datasets',
        'Escrever testes que validam a integridade de todas as DAGs no CI'
      ],
      resources: [
        ['Apache Airflow docs', 'https://airflow.apache.org/docs/'],
        ['Astronomer Learn (guias)', 'https://www.astronomer.io/docs/learn/'],
        ['Airflow – Best Practices', 'https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html'],
        ['Livro: Data Pipelines with Apache Airflow, 2ª ed.', 'https://www.manning.com/books/data-pipelines-with-apache-airflow-second-edition']
      ],
      questions: [
        'Descreva a arquitetura do Airflow e o papel de cada componente.',
        'Compare CeleryExecutor e KubernetesExecutor. Quando usar cada um?',
        'O que é o data interval (logical date)? Por que uma DAG diária de "2026-01-01" roda em 2026-01-02?',
        'Por que não se deve passar DataFrames grandes via XCom? Qual a alternativa?',
        'Qual a diferença entre um sensor em modo poke, em modo reschedule e um deferrable operator?',
        'Por que código pesado no nível superior do arquivo da DAG é um problema?',
        'O que é dynamic task mapping e quando usar?',
        'Como garantir que no máximo 5 tarefas acessem a mesma API ao mesmo tempo, entre várias DAGs?',
        'O que acontece ao ativar uma DAG com `catchup=True` e `start_date` de um ano atrás?',
        'Como você testa DAGs antes do deploy?'
      ]
    },
    {
      id: 'orquestradores-modernos',
      title: 'Orquestradores modernos: Dagster, Prefect e alternativas',
      summary: 'Asset-based orchestration (Dagster), Prefect, Kestra, Step Functions/Workflows em cloud, e como comparar orquestradores.',
      hours: 12,
      learn: [
        'Orquestração orientada a tarefas vs a assets (software-defined assets)',
        'Dagster: assets, partitions, sensors, IO managers, resources, lineage nativo, integração com dbt',
        'Prefect: flows, tasks, deployments, workers',
        'Kestra, Mage e orquestradores declarativos',
        'Orquestração gerenciada: AWS Step Functions, GCP Workflows, Databricks Workflows/Lakeflow Jobs',
        'Critérios de escolha: modelo mental, testabilidade, observabilidade, ecossistema, custo operacional'
      ],
      practice: [
        'Reimplementar a pipeline da DAG Airflow em Dagster usando assets e partições',
        'Escrever uma comparação técnica Airflow vs Dagster (blog post em inglês)'
      ],
      resources: [
        ['Dagster docs', 'https://docs.dagster.io/'],
        ['Prefect docs', 'https://docs.prefect.io/'],
        ['Kestra docs', 'https://kestra.io/docs']
      ],
      questions: [
        'Qual a diferença entre orquestração baseada em tarefas e baseada em assets?',
        'Que vantagens o Dagster oferece em testabilidade e lineage comparado ao Airflow?',
        'Quando você escolheria Step Functions em vez de Airflow?',
        'Quais critérios você usaria para escolher o orquestrador de uma nova plataforma de dados?'
      ]
    },
    {
      id: 'dbt',
      title: 'dbt: transformação como engenharia de software',
      summary: 'Models, sources, refs, materializations, modelos incrementais, snapshots, testes, macros e Jinja, packages, documentação, contratos, CI e dbt Mesh.',
      hours: 30,
      why: 'dbt virou o padrão de transformação em SQL em empresas modernas (principalmente EUA e Europa). Está em boa parte das vagas de Analytics/Data Engineer.',
      learn: [
        'Projeto dbt: dbt_project.yml, profiles, models, seeds, snapshots, macros, tests',
        'ref() e source() e a construção do DAG',
        'Materializations: view, table, incremental, ephemeral, materialized view',
        'Modelos incrementais: is_incremental(), unique_key, estratégias (append, merge, delete+insert, insert_overwrite), on_schema_change',
        'Snapshots (SCD2)',
        'Testes: genéricos (unique, not_null, accepted_values, relationships), singulares, unit tests do dbt, dbt-expectations',
        'Jinja e macros; packages (dbt_utils)',
        'Documentação e lineage (dbt docs)',
        'Model contracts, versions e access (public/protected/private)',
        'Estrutura recomendada: staging → intermediate → marts',
        'Selectors, state:modified e Slim CI (deferral)',
        'Seeds, exposures, sources freshness',
        'dbt Core vs dbt Cloud vs dbt Fusion; SQLMesh como alternativa',
        'dbt Mesh: múltiplos projetos e dependências entre times',
        'Performance e custo de modelos em warehouses'
      ],
      practice: [
        'Completar os cursos gratuitos do dbt Learn (Fundamentals, Advanced Materializations, Jinja)',
        'Construir o projeto dbt do warehouse da Fase 4 com testes, docs e snapshots',
        'Configurar Slim CI no GitHub Actions rodando só modelos modificados e dependentes',
        'Escrever 3 macros reutilizáveis e um unit test do dbt'
      ],
      resources: [
        ['dbt docs', 'https://docs.getdbt.com/'],
        ['dbt Learn (cursos gratuitos)', 'https://learn.getdbt.com/'],
        ['dbt – Best Practices', 'https://docs.getdbt.com/best-practices'],
        ['SQLMesh docs', 'https://sqlmesh.readthedocs.io/']
      ],
      questions: [
        'O que `ref()` faz além de substituir o nome da tabela?',
        'Explique as estratégias incrementais do dbt e quando usar merge vs insert_overwrite.',
        'Como um modelo incremental lida com dados que chegam atrasados?',
        'O que acontece num modelo incremental quando uma coluna nova aparece na fonte? Como `on_schema_change` ajuda?',
        'Qual a diferença entre testes genéricos, singulares e unit tests no dbt?',
        'O que é Slim CI e como `state:modified+` e `--defer` funcionam?',
        'O que são model contracts e por que são importantes entre times?',
        'Como você organizaria um projeto dbt com 500 modelos e 5 times?',
        'Quando NÃO usar dbt?'
      ]
    },
    {
      id: 'data-quality',
      title: 'Qualidade de dados',
      summary: 'Dimensões de qualidade, testes em pipelines, Great Expectations, Soda, dbt tests, detecção de anomalias, circuit breakers e gestão de incidentes de dados.',
      hours: 20,
      why: 'Dado errado é pior que dado nenhum: decisões são tomadas em cima dele. Sêniores são cobrados pela confiança nos dados, além da entrega dos pipelines.',
      learn: [
        'Dimensões: acurácia, completude, consistência, unicidade, validade, pontualidade (freshness)',
        'Onde testar: na fonte, na ingestão, na transformação, no consumo',
        'Testes de schema, de volume, de distribuição, de regras de negócio, de reconciliação (fonte vs destino)',
        'Great Expectations (expectation suites, checkpoints)',
        'Soda (SodaCL) e dbt tests/dbt-expectations',
        'Detecção de anomalias em métricas (volume, nulos, distribuição) e sazonalidade',
        'Circuit breakers: parar o pipeline vs alertar e seguir (severidade)',
        'Quarentena de dados ruins',
        'Data diff entre ambientes (ex.: Datafold, data-diff)',
        'Gestão de incidentes de dados: detecção → triagem → comunicação → correção → postmortem',
        'Métricas de qualidade e SLAs; data downtime'
      ],
      practice: [
        'Adicionar uma suíte de qualidade (GX ou Soda) ao pipeline com testes de volume, nulos e regras de negócio',
        'Implementar um circuit breaker que impede a publicação na camada gold se os testes críticos falharem',
        'Construir um check de reconciliação: contagem e soma por dia na fonte vs no destino'
      ],
      resources: [
        ['Great Expectations docs', 'https://docs.greatexpectations.io/'],
        ['Soda docs', 'https://docs.soda.io/'],
        ['dbt-expectations', 'https://github.com/metaplane/dbt-expectations'],
        ['Livro: Data Quality Fundamentals (Moses et al.)', 'https://www.oreilly.com/library/view/data-quality-fundamentals/9781098112035/']
      ],
      questions: [
        'Quais são as dimensões de qualidade de dados? Dê um teste concreto para cada uma.',
        'Quando um teste de qualidade deve bloquear o pipeline e quando deve só alertar?',
        'Como você detectaria que um arquivo diário veio com 40% menos linhas que o normal, considerando sazonalidade?',
        'O que é um teste de reconciliação e por que ele é essencial em dados financeiros?',
        'Um diretor diz que o número do dashboard está errado. Descreva seu processo de investigação.',
        'Como você mede a qualidade de dados de uma plataforma ao longo do tempo?',
        'Onde, no fluxo, é mais barato detectar um problema de qualidade? Por quê?'
      ]
    }
  ],
  project: {
    title: 'Plataforma ELT de produção: CDC + Airflow/Dagster + dbt + qualidade',
    description: 'Pipeline completo e operável que replica um banco transacional via CDC, transforma com dbt e só publica dados que passam nos testes.',
    deliverables: [
      'CDC Postgres → Debezium → Kafka → lake/warehouse com MERGE',
      'Orquestração em Airflow (ou Dagster) com DAGs testadas, data-aware e com alertas',
      'Projeto dbt com staging/intermediate/marts, incrementais, snapshots, contratos e testes',
      'Data quality com circuit breaker (Write-Audit-Publish) e reconciliação',
      'Backfill documentado e demonstrado como idempotente',
      'CI com Slim CI do dbt e testes de DAG; README em inglês com runbook'
    ]
  }
});
