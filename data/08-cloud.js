window.ROADMAP_PHASES.push({
  id: 'cloud',
  num: 8,
  level: 'pleno',
  title: 'Cloud para engenharia de dados',
  duration: '12–14 semanas',
  summary: 'Fundamentos de cloud (IAM, rede, storage, custos) e as plataformas de dados da AWS, GCP e Azure, além de Databricks e Snowflake. Inclui FinOps, a disciplina que reduz a conta.',
  why: 'Praticamente toda vaga internacional é cloud-native. Domine uma cloud a fundo (recomendado: AWS, a mais pedida e a usada pelo Itaú) e conheça as outras o bastante para traduzir os conceitos.',
  outcomes: [
    'Desenhar uma plataforma de dados segura numa cloud: rede, IAM, storage, compute, catálogo',
    'Obter pelo menos uma certificação de dados (ex.: AWS Data Engineer Associate ou GCP Professional Data Engineer)',
    'Operar Databricks e Snowflake com noções de custo e governança',
    'Estimar e otimizar custos de uma plataforma de dados'
  ],
  topics: [
    {
      id: 'cloud-fundamentos',
      title: 'Fundamentos de cloud',
      summary: 'Modelos de serviço, regiões e zonas, IAM, rede (VPC, subnets, endpoints privados), object storage, compute, serverless e modelo de responsabilidade compartilhada.',
      hours: 25,
      learn: [
        'IaaS, PaaS, SaaS, serverless; managed vs self-managed',
        'Regiões, zonas de disponibilidade, alta disponibilidade vs disaster recovery (RPO/RTO)',
        'Modelo de responsabilidade compartilhada',
        'IAM: identidades, roles, policies, least privilege, roles para serviços (sem chaves estáticas), federação/SSO',
        'Rede: VPC, subnets públicas/privadas, route tables, NAT gateway, security groups, VPC endpoints/PrivateLink, peering',
        'Object storage: consistência, classes de armazenamento, lifecycle policies, versionamento, criptografia',
        'Compute: VMs, containers (ECS/EKS/GKE), serverless (Lambda/Cloud Functions/Cloud Run), instâncias spot',
        'Bancos gerenciados (RDS/Cloud SQL/Aurora)',
        'Monitoramento e logs (CloudWatch, Cloud Logging) e auditoria (CloudTrail)',
        'Modelos de preço: on-demand, reservado/savings plans, spot, egress'
      ],
      practice: [
        'Criar conta free tier com alertas de orçamento ANTES de qualquer outra coisa',
        'Desenhar e provisionar uma VPC com subnets públicas/privadas e acesso privado ao S3 via VPC endpoint',
        'Criar um role IAM com política mínima para um job que lê de um bucket e escreve em outro'
      ],
      resources: [
        ['AWS Skill Builder (gratuito)', 'https://skillbuilder.aws/'],
        ['AWS Well-Architected – Data Analytics Lens', 'https://docs.aws.amazon.com/wellarchitected/latest/analytics-lens/analytics-lens.html'],
        ['Google Cloud Skills Boost', 'https://www.cloudskillsboost.google/'],
        ['Microsoft Learn', 'https://learn.microsoft.com/en-us/training/']
      ],
      questions: [
        'Por que jobs de dados devem usar roles IAM em vez de access keys estáticas?',
        'Explique subnet pública vs privada. Onde ficam um cluster Spark e um banco RDS numa arquitetura segura?',
        'O que é um VPC endpoint e por que ele reduz custo e risco no acesso ao S3?',
        'O que são RPO e RTO? Dê valores razoáveis para um data warehouse analítico vs um sistema de pagamentos.',
        'Quando usar instâncias spot em workloads de dados e como lidar com interrupções?',
        'O que significa "least privilege" na prática? Como você auditaria permissões excessivas?'
      ]
    },
    {
      id: 'aws-dados',
      title: 'AWS para dados',
      summary: 'S3, IAM, Glue (catálogo e jobs), EMR, Athena, Redshift, Kinesis, MSK, Lambda, Step Functions, Lake Formation, DMS.',
      hours: 45,
      why: 'AWS é a cloud mais pedida em vagas internacionais e a certificação AWS Data Engineer Associate é um sinal bem reconhecido.',
      learn: [
        'S3 a fundo: prefixos, performance, consistência, eventos, lifecycle, S3 Tables (Iceberg gerenciado)',
        'AWS Glue: Data Catalog, crawlers (e por que evitá-los em produção), Glue jobs (Spark), Glue Data Quality',
        'Amazon EMR (EC2, EKS, Serverless): quando usar cada um',
        'Athena: Trino serverless, custo por TB, particionamento e projeção de partições, Iceberg',
        'Redshift: provisionado vs serverless, RA3, Spectrum, data sharing, zero-ETL',
        'Kinesis Data Streams, Firehose e Amazon MSK',
        'Lambda para ingestão orientada a eventos; limites',
        'Step Functions e MWAA (Airflow gerenciado)',
        'Lake Formation: permissões finas (linha/coluna), LF-tags',
        'DMS para migração/CDC',
        'Segurança: KMS, Secrets Manager, CloudTrail',
        'Arquiteturas de referência de data lake na AWS'
      ],
      practice: [
        'Data lake na AWS: S3 (bronze/silver/gold) + Glue Catalog + Athena + Iceberg, provisionado com Terraform',
        'Ingestão orientada a eventos: arquivo chega no S3 → Lambda valida → Glue/EMR Serverless processa',
        'Tirar a certificação AWS Certified Data Engineer – Associate'
      ],
      resources: [
        ['AWS Certified Data Engineer – Associate', 'https://aws.amazon.com/certification/certified-data-engineer-associate/'],
        ['AWS Analytics', 'https://aws.amazon.com/big-data/datalakes-and-analytics/'],
        ['AWS Big Data Blog', 'https://aws.amazon.com/blogs/big-data/'],
        ['Amazon Athena – Performance tuning', 'https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html']
      ],
      questions: [
        'Desenhe um data lake na AWS do zero: ingestão, armazenamento, catálogo, processamento, consumo e segurança.',
        'EMR, EMR Serverless ou Glue para um job Spark diário de 2h? Justifique com custo e operação.',
        'Como reduzir o custo de queries no Athena?',
        'Kinesis Data Streams vs MSK: quando escolher cada um?',
        'Como dar a um analista acesso a apenas algumas colunas de uma tabela no lake?',
        'Quais são os limites do Lambda que o tornam inadequado para processar arquivos grandes?',
        'O que é zero-ETL na AWS e quais as suas limitações?'
      ]
    },
    {
      id: 'gcp-dados',
      title: 'Google Cloud para dados',
      summary: 'GCS, BigQuery a fundo, Dataflow (Beam), Pub/Sub, Dataproc, Cloud Composer, Dataplex e Datastream.',
      hours: 25,
      learn: [
        'BigQuery: arquitetura (Dremel, Colossus, Jupiter, Borg), slots, reservations vs on-demand',
        'BigQuery: particionamento, clustering, materialized views, search indexes, BI Engine',
        'BigQuery: tabelas externas, BigLake, Iceberg; Storage Write API',
        'Controle de custos no BigQuery: dry run, maximum bytes billed, quotas',
        'Dataflow e Apache Beam: pipelines unificados batch/stream',
        'Pub/Sub: tópicos, subscriptions, ordering keys, exactly-once delivery',
        'Dataproc (Spark gerenciado) e Dataproc Serverless',
        'Cloud Composer (Airflow gerenciado)',
        'Datastream (CDC), Dataplex (governança), Analytics Hub'
      ],
      practice: [
        'Pipeline Pub/Sub → Dataflow → BigQuery com janelas',
        'Otimizar uma tabela BigQuery de 100GB com particionamento e clustering e medir os bytes processados',
        'Opcional: certificação Google Professional Data Engineer'
      ],
      resources: [
        ['BigQuery docs', 'https://cloud.google.com/bigquery/docs'],
        ['Google Professional Data Engineer', 'https://cloud.google.com/learn/certification/data-engineer'],
        ['Livro: Google BigQuery – The Definitive Guide', 'https://www.oreilly.com/library/view/google-bigquery-the/9781492044451/']
      ],
      questions: [
        'Como o BigQuery executa uma query? O que são slots?',
        'On-demand vs capacity (reservations) no BigQuery: quando cada modelo é mais barato?',
        'Quais práticas evitam uma query acidentalmente cara no BigQuery?',
        'O que o Apache Beam unifica e qual o papel do runner (Dataflow)?',
        'Como garantir processamento exactly-once com Pub/Sub + Dataflow?'
      ]
    },
    {
      id: 'azure-dados',
      title: 'Azure e Microsoft Fabric para dados',
      summary: 'ADLS Gen2, Data Factory, Synapse, Microsoft Fabric (OneLake), Event Hubs e Databricks no Azure.',
      hours: 15,
      why: 'Azure domina em grandes corporações europeias e no setor financeiro. Conhecer o mapeamento dos serviços amplia as vagas acessíveis.',
      learn: [
        'Azure Data Lake Storage Gen2 (namespace hierárquico) e Entra ID (Azure AD) para identidade',
        'Azure Data Factory: pipelines, linked services, integration runtimes',
        'Synapse Analytics (dedicated vs serverless SQL pools) e seu lugar após o Fabric',
        'Microsoft Fabric: OneLake, lakehouse, warehouse, Data Factory, Real-Time Intelligence, Power BI',
        'Event Hubs (API compatível com Kafka)',
        'Azure Databricks e integração com Unity Catalog',
        'Mapeamento de serviços AWS ↔ GCP ↔ Azure'
      ],
      practice: [
        'Montar uma tabela de equivalência de serviços de dados entre AWS, GCP e Azure',
        'Construir um lakehouse simples no trial do Microsoft Fabric'
      ],
      resources: [
        ['Microsoft Fabric docs', 'https://learn.microsoft.com/en-us/fabric/'],
        ['Fabric Data Engineer Associate (DP-700)', 'https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/'],
        ['Azure Architecture Center – Data', 'https://learn.microsoft.com/en-us/azure/architecture/data-guide/']
      ],
      questions: [
        'Qual o equivalente no Azure de S3, Glue Catalog, Kinesis e EMR?',
        'O que é o OneLake e qual a proposta do Microsoft Fabric?',
        'Qual o papel de um integration runtime no Data Factory (ex.: acessar um banco on-premises)?'
      ]
    },
    {
      id: 'databricks',
      title: 'Databricks',
      summary: 'Plataforma lakehouse: workspace, compute (clusters, serverless, SQL warehouses), Unity Catalog, Lakeflow/DLT, Jobs, Photon, Auto Loader e práticas de custo.',
      hours: 25,
      why: 'Databricks é uma das plataformas de dados mais adotadas no mundo e aparece em grande parte das vagas na Europa e nos EUA. As certificações Databricks são valorizadas.',
      learn: [
        'Arquitetura: control plane vs compute plane; workspace',
        'Compute: all-purpose vs job clusters, serverless, SQL warehouses, Photon; políticas de cluster',
        'Unity Catalog: metastore, catálogos/schemas, permissões, lineage, volumes, tabelas gerenciadas vs externas',
        'Delta Lake no Databricks: OPTIMIZE, liquid clustering, predictive optimization, deletion vectors',
        'Auto Loader (cloudFiles) para ingestão incremental de arquivos',
        'Lakeflow Declarative Pipelines (antigo Delta Live Tables): expectations, streaming tables, materialized views',
        'Lakeflow Jobs (Workflows): tasks, dependências, parâmetros, repair runs',
        'Databricks Asset Bundles e CI/CD',
        'Notebooks vs código em repositório; Databricks Connect',
        'Monitoramento de custos (system tables) e boas práticas de DBUs'
      ],
      practice: [
        'Implementar um pipeline medallion com Auto Loader + Lakeflow Declarative Pipelines + expectations',
        'Deploy de um job com Databricks Asset Bundles via GitHub Actions',
        'Certificação Databricks Data Engineer Associate (e depois a Professional)'
      ],
      resources: [
        ['Databricks docs', 'https://docs.databricks.com/'],
        ['Databricks Free Edition', 'https://www.databricks.com/learn/free-edition'],
        ['Databricks Certified Data Engineer Associate', 'https://www.databricks.com/learn/certification/data-engineer-associate'],
        ['Databricks Academy', 'https://www.databricks.com/learn/training/home']
      ],
      questions: [
        'Qual a diferença entre um all-purpose cluster e um job cluster, em custo e uso?',
        'O que o Unity Catalog resolve que o Hive Metastore não resolvia?',
        'Como o Auto Loader detecta arquivos novos de forma escalável?',
        'O que são expectations em pipelines declarativos e quais ações elas permitem (warn, drop, fail)?',
        'Liquid clustering vs particionamento + Z-ORDER: quando usar cada um?',
        'Como você versionaria e faria deploy de jobs Databricks entre dev, staging e prod?'
      ]
    },
    {
      id: 'snowflake',
      title: 'Snowflake',
      summary: 'Arquitetura multi-cluster com dados compartilhados, virtual warehouses, micro-partições, Snowpipe, Streams & Tasks, Dynamic Tables, time travel, cloning, RBAC e custos.',
      hours: 20,
      learn: [
        'Arquitetura de três camadas: storage, compute (virtual warehouses), cloud services',
        'Virtual warehouses: tamanhos, auto-suspend/resume, multi-cluster, scaling up vs out',
        'Micro-partições, pruning, clustering keys, search optimization',
        'Caches: result cache, warehouse (local disk) cache, metadata cache',
        'Ingestão: COPY INTO, stages, Snowpipe, Snowpipe Streaming',
        'Streams & Tasks, Dynamic Tables',
        'Time travel, fail-safe, zero-copy cloning',
        'Semi-estruturado: VARIANT, FLATTEN',
        'RBAC: roles, hierarquia, ownership; masking policies e row access policies',
        'Snowpark (Python), tabelas Iceberg no Snowflake',
        'Monitoramento de custo: ACCOUNT_USAGE, resource monitors'
      ],
      practice: [
        'Pipeline no trial do Snowflake: S3 → Snowpipe → Streams & Tasks (ou Dynamic Tables) → mart',
        'Aplicar masking policy em coluna PII por role',
        'Opcional: certificação SnowPro Core'
      ],
      resources: [
        ['Snowflake docs', 'https://docs.snowflake.com/'],
        ['Snowflake Quickstarts', 'https://quickstarts.snowflake.com/'],
        ['Certificações Snowflake (SnowPro Core)', 'https://learn.snowflake.com/en/certifications/']
      ],
      questions: [
        'Explique a arquitetura do Snowflake e como ela permite isolar workloads.',
        'Scale up vs scale out de um virtual warehouse: quando usar cada um?',
        'Quais são os três caches do Snowflake e como cada um afeta custo e latência?',
        'Como Streams & Tasks implementam processamento incremental (CDC interno)?',
        'Como aplicar mascaramento dinâmico de CPF para todos, exceto o time de compliance?',
        'Como evitar que a conta do Snowflake exploda no fim do mês?'
      ]
    },
    {
      id: 'finops',
      title: 'FinOps e otimização de custos de dados',
      summary: 'Principais fontes de custo, visibilidade (tags, chargeback), otimização de storage e compute, unit economics e cultura de custo.',
      hours: 12,
      why: 'Em 2026, custo de cloud é tema de diretoria. O engenheiro que mostra "reduzi US$ 300k/ano" no currículo se destaca em qualquer processo seletivo.',
      learn: [
        'Principais custos: compute, storage, egress/transferência, requisições a APIs (S3 GET/PUT/LIST), licenças',
        'Visibilidade: tagging, cost allocation, dashboards de custo, system tables',
        'Showback vs chargeback',
        'Otimização de storage: lifecycle/tiers, compressão, formatos, vacuum de versões antigas, deleção de dados não usados',
        'Otimização de compute: right-sizing, auto-scaling, spot, auto-suspend, serverless vs provisionado',
        'Otimização de queries: pruning, evitar SELECT *, materializações, cache',
        'Modelos de compra: reservas, savings plans, commits',
        'Unit economics: custo por pipeline, por tabela, por consulta, por cliente',
        'Framework da FinOps Foundation (inform, optimize, operate)'
      ],
      practice: [
        'Criar um dashboard de custo por pipeline/tabela usando tags ou system tables',
        'Fazer uma auditoria de custo num projeto seu e documentar 3 otimizações com economia estimada'
      ],
      resources: [
        ['FinOps Foundation', 'https://www.finops.org/'],
        ['AWS Cost Optimization', 'https://aws.amazon.com/aws-cost-management/cost-optimization/'],
        ['Livro: Cloud FinOps, 2ª ed.', 'https://www.oreilly.com/library/view/cloud-finops-2nd/9781492098348/']
      ],
      questions: [
        'Quais são as cinco maiores fontes de custo de uma plataforma de dados em cloud?',
        'A conta do warehouse dobrou neste mês. Descreva seu processo de investigação.',
        'Como atribuir custos de uma plataforma compartilhada a cada time?',
        'Quando serverless é mais caro que compute provisionado?',
        'Como o problema de small files aumenta o custo em S3 e em engines de query?',
        'Que métricas de unit economics você reportaria para a liderança?'
      ]
    }
  ],
  project: {
    title: 'Plataforma de dados em cloud com IaC, segurança e custos sob controle',
    description: 'Leve o lakehouse da Fase 5 e o ELT da Fase 6 para uma cloud real (AWS recomendada), provisionado 100% com Terraform e com governança e custos sob controle.',
    deliverables: [
      'Infra 100% em Terraform: rede, buckets, IAM com least privilege, catálogo, compute',
      'Pipeline batch + streaming em serviços gerenciados (ex.: EMR Serverless/Glue + MSK/Kinesis + Athena/Redshift)',
      'Segredos no Secrets Manager, criptografia com KMS, sem chaves estáticas',
      'Alertas de orçamento, tags de custo e um relatório de custo mensal estimado',
      'Pelo menos uma certificação de dados obtida',
      'README em inglês com diagrama de arquitetura (C4) e instruções de deploy/destroy'
    ]
  }
});
