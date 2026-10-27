window.ROADMAP_PHASES.push({
  id: 'modelagem',
  num: 4,
  level: 'pleno',
  title: 'Modelagem de dados e data warehousing',
  duration: '8–10 semanas',
  summary: 'OLTP vs OLAP, Kimball a fundo, SCDs, Data Vault, modelagem moderna (OBT, medallion, semantic layer) e a arquitetura dos warehouses colunares em cloud.',
  why: 'Modelagem é a habilidade mais duradoura de um DE: ferramentas mudam, mas o star schema continua o mesmo há 30 anos. Toda entrevista sênior tem uma rodada de "modele este negócio".',
  outcomes: [
    'Modelar um processo de negócio com star schema, definindo grão, fatos e dimensões',
    'Implementar SCD Tipo 2 com MERGE de forma idempotente',
    'Explicar quando usar Kimball, Data Vault, OBT ou medallion',
    'Explicar como Snowflake e BigQuery separam storage e compute e como isso afeta custo e performance'
  ],
  topics: [
    {
      id: 'oltp-olap',
      title: 'OLTP vs OLAP e conceitos de data warehouse',
      summary: 'Por que analytics precisa de um sistema separado, as escolas de Inmon e Kimball, ODS, data marts, data lake e lakehouse.',
      hours: 10,
      learn: [
        'OLTP vs OLAP: padrões de acesso, volume por query, concorrência, normalização',
        'Armazenamento orientado a linha vs a coluna',
        'Definição de data warehouse (Inmon): orientado a assunto, integrado, não volátil, variante no tempo',
        'Abordagem Inmon (CIF, 3FN corporativa) vs Kimball (bus architecture, dimensional)',
        'ODS, staging, data marts',
        'Data lake: schema-on-read, promessas e o "data swamp"',
        'Lakehouse: warehouse sobre armazenamento aberto (table formats)',
        'Sistemas MPP e o histórico (Teradata → Redshift → Snowflake/BigQuery)',
        'Camadas típicas: raw/staging → intermediate → marts'
      ],
      resources: [
        ['Livro: The Data Warehouse Toolkit, 3ª ed. (Kimball)', 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-dw-toolkit/'],
        ['Kimball Group – Design Tips', 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/']
      ],
      questions: [
        'Por que não rodar analytics diretamente no banco OLTP de produção?',
        'Compare as abordagens de Inmon e Kimball. Qual predomina hoje e por quê?',
        'O que é schema-on-read vs schema-on-write? Quais os trade-offs?',
        'O que levou ao surgimento do lakehouse? Que problemas do data lake ele resolve?',
        'Descreva as camadas de um warehouse moderno e a responsabilidade de cada uma.'
      ]
    },
    {
      id: 'kimball',
      title: 'Modelagem dimensional (Kimball) a fundo',
      summary: 'O processo de 4 passos, grão, tipos de fatos, dimensões conformadas, bus matrix e todos os tipos especiais de dimensão.',
      hours: 30,
      why: 'É a base de 90% dos warehouses do mundo e o tema central da rodada de data modeling em entrevistas (Meta, Airbnb, Netflix, bancos).',
      learn: [
        'Processo de 4 passos: processo de negócio → grão → dimensões → fatos',
        'Grão: a decisão mais importante; grão atômico vs agregado',
        'Tipos de fato: transacional, snapshot periódico, snapshot acumulado, factless',
        'Medidas aditivas, semi-aditivas (saldos) e não aditivas (razões, percentuais)',
        'Star schema vs snowflake schema',
        'Dimensões conformadas e bus matrix (integração entre processos)',
        'Surrogate keys em dimensões; o membro "desconhecido" (-1)',
        'Dimensão data e dimensão tempo (role-playing)',
        'Dimensões degeneradas, junk dimensions, mini-dimensions, outriggers',
        'Bridge tables para relações muitos-para-muitos (ex.: conta com vários titulares)',
        'Hierarquias (fixas, variáveis, ragged)',
        'Fatos de grãos diferentes e o problema de "fan trap"/"chasm trap"',
        'Late arriving facts e late arriving dimensions',
        'Tabelas de agregados e consolidated fact tables'
      ],
      practice: [
        'Modelar o star schema de um e-commerce (pedidos, itens, pagamentos, entregas) com bus matrix',
        'Modelar o domínio de cartões de crédito de um banco (transações, faturas, limites, saldos) com fatos de grãos diferentes',
        'Resolver 5 exercícios de data modeling de entrevista (ex.: "modele o Uber/Spotify/Airbnb") e escrever as respostas'
      ],
      resources: [
        ['Kimball – Dimensional Modeling Techniques', 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/'],
        ['Livro: The Data Warehouse Toolkit (Kimball & Ross)', 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-dw-toolkit/'],
        ['Livro: Agile Data Warehouse Design (Corr)', 'https://www.amazon.com/dp/0956817203']
      ],
      questions: [
        'Quais são os 4 passos do design dimensional de Kimball? Por que o grão vem antes das dimensões?',
        'Diferença entre fato transacional, snapshot periódico e snapshot acumulado, com exemplo de cada um num banco.',
        'Por que saldo de conta é uma medida semi-aditiva? Como agregá-lo corretamente ao longo do tempo?',
        'O que é uma dimensão conformada e por que ela é essencial para integrar processos?',
        'O que é uma dimensão degenerada? Dê um exemplo.',
        'Como modelar uma conta conjunta com múltiplos titulares (relação N:N com a dimensão cliente)?',
        'O que é uma factless fact table? Dê dois casos de uso.',
        'Como você lida com um fato que chega antes da sua dimensão (late arriving dimension)?',
        'Modele em 10 minutos o star schema de um app de streaming de música.',
        'Por que o star schema é preferido ao snowflake schema na maioria dos casos?'
      ]
    },
    {
      id: 'scd',
      title: 'Slowly Changing Dimensions e dados históricos',
      summary: 'SCD Tipos 0 a 7, implementação de Tipo 2 com MERGE, snapshots, modelagem bitemporal e point-in-time.',
      hours: 15,
      why: 'Responder "qual era o segmento do cliente no momento da transação" é requisito regulatório em bancos. SCD2 mal implementado gera relatório errado.',
      learn: [
        'SCD Tipo 0 (fixo), 1 (sobrescreve), 2 (nova linha), 3 (coluna anterior), 4 (mini-dimensão/histórico), 6 (híbrido 1+2+3), 7',
        'Colunas de SCD2: valid_from, valid_to, is_current, hash de atributos',
        'Implementação de SCD2 com MERGE (SQL) e com dbt snapshots',
        'Idempotência e reprocessamento de SCD2',
        'Detecção de mudança: hash (MD5/SHA) de atributos vs comparação coluna a coluna',
        'Join de fato com dimensão SCD2: point-in-time (between valid_from e valid_to)',
        'Modelagem bitemporal: tempo de validade vs tempo de transação/sistema',
        'Snapshots diários completos vs SCD2 (custo de storage vs simplicidade)'
      ],
      practice: [
        'Implementar SCD2 em SQL com MERGE para uma dimensão de clientes, reprocessável sem duplicar',
        'Implementar o mesmo com `dbt snapshot` e comparar',
        'Escrever a query point-in-time que junta transações à versão correta do cliente'
      ],
      resources: [
        ['Kimball – Slowly Changing Dimension Techniques', 'https://www.kimballgroup.com/2008/08/slowly-changing-dimensions/'],
        ['dbt – Snapshots', 'https://docs.getdbt.com/docs/build/snapshots'],
        ['Martin Fowler – Bitemporal History', 'https://martinfowler.com/articles/bitemporal-history.html']
      ],
      questions: [
        'Explique os SCD Tipos 1, 2 e 3 e quando usar cada um.',
        'Quais colunas uma dimensão SCD2 precisa e por quê?',
        'Como implementar SCD2 de forma idempotente (rodar duas vezes não gera linhas duplicadas)?',
        'Como juntar uma tabela fato a uma dimensão SCD2 para obter o atributo vigente na data do evento?',
        'O que é modelagem bitemporal e quando ela é necessária (ex.: correções retroativas em finanças)?',
        'Quando snapshots diários completos são preferíveis ao SCD2?',
        'Por que usar hash dos atributos para detectar mudanças? Qual o risco?'
      ]
    },
    {
      id: 'data-vault',
      title: 'Data Vault 2.0',
      summary: 'Hubs, links e satellites; hash keys; carga paralela e auditável; business vault e quando o Data Vault compensa.',
      hours: 12,
      why: 'Muito usado em bancos e seguradoras europeias (Holanda, Alemanha), justamente pelo foco em auditabilidade e integração de muitas fontes.',
      learn: [
        'Motivação: integração de muitas fontes, auditabilidade, agilidade na mudança',
        'Hubs (chaves de negócio), Links (relacionamentos), Satellites (atributos e histórico)',
        'Hash keys vs sequências; hash diff',
        'Load date, record source',
        'Raw Vault vs Business Vault; PIT e bridge tables',
        'Information marts (dimensional) por cima do vault',
        'Paralelismo de carga e insert-only',
        'Críticas: complexidade, número de joins, curva de aprendizado',
        'Ferramentas: dbt packages (AutomateDV/datavault4dbt)'
      ],
      practice: [
        'Modelar em Data Vault o domínio de clientes/contas/transações e construir um mart dimensional por cima',
        'Implementar hubs, links e satellites com o pacote AutomateDV no dbt'
      ],
      resources: [
        ['Data Vault Alliance', 'https://datavaultalliance.com/'],
        ['AutomateDV (dbt package)', 'https://automate-dv.readthedocs.io/'],
        ['Livro: Building a Scalable Data Warehouse with Data Vault 2.0', 'https://www.amazon.com/dp/0128025107']
      ],
      questions: [
        'Explique hub, link e satellite com um exemplo bancário.',
        'Por que o Data Vault usa hash keys? Quais são os riscos de colisão e como mitigá-los?',
        'Quais problemas o Data Vault resolve melhor que Kimball? E quais ele cria?',
        'O que são PIT tables e por que existem?',
        'Por que o Data Vault é "insert-only" e como isso ajuda em auditoria?',
        'Quando você NÃO recomendaria Data Vault?'
      ]
    },
    {
      id: 'modelagem-moderna',
      title: 'Modelagem moderna: OBT, medallion, métricas e semantic layer',
      summary: 'One Big Table, wide tables, arquitetura medallion (bronze/silver/gold), activity schema, camadas de métricas e semantic layer.',
      hours: 12,
      learn: [
        'One Big Table (OBT) e wide tables: por que funcionam em warehouses colunares',
        'Trade-offs OBT vs star schema (custo de storage, governança, reuso)',
        'Arquitetura medallion: bronze (raw), silver (limpo/conformado), gold (negócio)',
        'Activity schema (conceitual)',
        'Métricas: definição única, aditividade, métricas derivadas',
        'Semantic layer: dbt Semantic Layer/MetricFlow, Cube, LookML',
        'Modelagem para ML (feature tables) vs para BI',
        'Convenções de nomes (stg_, int_, fct_, dim_) e documentação de modelos',
        'Entity-centric modeling e cumulative tables (padrão usado em big techs)'
      ],
      practice: [
        'Construir camadas bronze/silver/gold para um dataset público',
        'Definir 5 métricas no dbt Semantic Layer ou no Cube e consultá-las',
        'Implementar uma cumulative table (estado acumulado diário por usuário)'
      ],
      resources: [
        ['Databricks – Medallion Architecture', 'https://www.databricks.com/glossary/medallion-architecture'],
        ['dbt Semantic Layer', 'https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl'],
        ['Cube docs', 'https://cube.dev/docs'],
        ['Data Engineer Handbook – modelagem', 'https://github.com/DataExpert-io/data-engineer-handbook']
      ],
      questions: [
        'Por que OBT funciona bem em BigQuery/Snowflake e seria uma má ideia em Postgres?',
        'Qual a responsabilidade de cada camada medallion? Onde aplicar deduplicação e regras de negócio?',
        'O que é uma semantic layer e qual problema ela resolve ("o número de receita de cada dashboard é diferente")?',
        'Star schema ou OBT para um time de BI com 200 analistas? Justifique.',
        'O que é uma cumulative table e por que ela é eficiente para métricas de atividade (DAU/MAU)?'
      ]
    },
    {
      id: 'cloud-dw',
      title: 'Data warehouses colunares em cloud',
      summary: 'Arquitetura de Snowflake, BigQuery, Redshift e Databricks SQL: separação storage/compute, micro-partições, clustering, cache e modelos de custo.',
      hours: 20,
      why: 'É onde a maioria dos dados analíticos vive em empresas internacionais. Saber otimizar custo nesses sistemas vale dinheiro real, e entrevistadores sabem disso.',
      learn: [
        'Separação de storage e compute; elasticidade',
        'Formato colunar + compressão + metadados de min/max (zone maps) para pruning',
        'Snowflake: micro-partições, virtual warehouses, clustering keys, result cache',
        'BigQuery: Dremel, slots, particionamento e clustering, custo on-demand vs capacity',
        'Redshift: distribution styles (KEY, EVEN, ALL), sort keys, RA3, Spectrum',
        'Materialized views e estratégias de refresh',
        'Concorrência e isolamento de workloads',
        'Modelos de custo e como uma query mal escrita custa milhares de dólares',
        'Data sharing, zero-copy cloning e time travel'
      ],
      practice: [
        'Criar conta no BigQuery sandbox e comparar bytes processados de uma query com e sem particionamento/clustering',
        'No trial do Snowflake, medir o efeito de clustering e do result cache'
      ],
      resources: [
        ['BigQuery – Partitioned and clustered tables', 'https://cloud.google.com/bigquery/docs/partitioned-tables'],
        ['Snowflake – Micro-partitions & Clustering', 'https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions'],
        ['Amazon Redshift – Best practices', 'https://docs.aws.amazon.com/redshift/latest/dg/best-practices.html'],
        ['Paper: The Snowflake Elastic Data Warehouse', 'https://dl.acm.org/doi/10.1145/2882903.2903741']
      ],
      questions: [
        'O que significa separar storage e compute e quais vantagens isso traz?',
        'Como partition pruning e clustering reduzem custo no BigQuery?',
        'O que são micro-partições no Snowflake e como o clustering as afeta?',
        'Explique os distribution styles do Redshift e quando usar KEY vs ALL.',
        'Uma query no BigQuery custou US$ 500. Como você investigaria e evitaria que isso se repita?',
        'Materialized view vs tabela agregada mantida por pipeline: trade-offs?',
        'O que é zero-copy cloning e para que ele serve em ambientes de dev/teste?'
      ]
    }
  ],
  project: {
    title: 'Data warehouse dimensional de ponta a ponta',
    description: 'Construa um warehouse completo para um domínio realista (ex.: e-commerce ou cartões de crédito) em BigQuery, Snowflake ou DuckDB, documentado como um projeto profissional.',
    deliverables: [
      'Bus matrix e documento de design com grão de cada fato e justificativas',
      'Star schema com pelo menos 3 fatos (incluindo um snapshot) e dimensões conformadas',
      'Dimensão cliente em SCD2 com carga idempotente',
      'Camadas staging → intermediate → marts e camada de métricas',
      'Análise de custo/performance (particionamento, clustering) com números',
      'README em inglês com diagrama do modelo'
    ]
  }
});
