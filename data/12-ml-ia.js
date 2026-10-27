window.ROADMAP_PHASES.push({
  id: 'ml-ia',
  num: 12,
  level: 'senior',
  title: 'Dados para Machine Learning e IA',
  duration: '8–10 semanas',
  summary: 'O que DE precisa saber de ML, feature stores, MLOps, e pipelines de dados para LLMs/GenAI: dados não estruturados, embeddings, bancos vetoriais, RAG e avaliação.',
  why: 'Em 2026, boa parte do investimento em dados vai para IA. Engenheiros de dados que constroem a fundação para ML e LLMs (dados confiáveis, features, pipelines de documentos) estão entre os mais disputados.',
  outcomes: [
    'Explicar train/serve skew, data leakage e point-in-time correctness',
    'Construir pipelines de features com feature store e consistência online/offline',
    'Construir um pipeline de ingestão de documentos para RAG com avaliação de qualidade',
    'Conversar de igual para igual com Data Scientists e ML Engineers'
  ],
  topics: [
    {
      id: 'ml-para-de',
      title: 'Fundamentos de ML para engenheiros de dados',
      summary: 'Ciclo de vida de ML, treino vs inferência, features, data leakage, train/serve skew, drift e o papel do DE em projetos de ML.',
      hours: 15,
      learn: [
        'Ciclo de vida de ML: problema → dados → features → treino → avaliação → deploy → monitoramento',
        'Aprendizado supervisionado vs não supervisionado (intuição)',
        'Features, labels, conjuntos de treino/validação/teste',
        'Data leakage (vazamento de informação do futuro) e como evitá-lo',
        'Train/serve skew: features calculadas diferente no treino e na produção',
        'Inferência batch vs online vs streaming',
        'Data drift e concept drift; monitoramento de modelos',
        'Reprodutibilidade: versionar dados, código e modelos',
        'Rules of ML do Google: começar simples, pipelines antes de modelos'
      ],
      resources: [
        ['Rules of Machine Learning (Google)', 'https://developers.google.com/machine-learning/guides/rules-of-ml'],
        ['Livro: Designing Machine Learning Systems (Chip Huyen)', 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/'],
        ['Made With ML (MLOps)', 'https://madewithml.com/']
      ],
      questions: [
        'O que é data leakage? Dê um exemplo comum em dados financeiros (ex.: modelo de inadimplência).',
        'O que é train/serve skew e como a engenharia de dados pode evitá-lo?',
        'Inferência batch vs online: como decidir para um modelo de score de crédito?',
        'Qual a diferença entre data drift e concept drift? Como detectar cada um?',
        'Por que versionar os dados de treino é necessário para reproduzir um modelo?'
      ]
    },
    {
      id: 'feature-store-mlops',
      title: 'Feature stores e MLOps',
      summary: 'Feature stores (offline/online), point-in-time joins, Feast, MLflow, model registry, pipelines de treino e de inferência.',
      hours: 20,
      learn: [
        'Feature store: offline store (treino), online store (baixa latência), registry',
        'Point-in-time correct joins para gerar datasets de treino',
        'Features batch, streaming e on-demand',
        'Feast, Tecton, Databricks Feature Engineering, SageMaker Feature Store',
        'MLflow: tracking, model registry, deploy',
        'Pipelines de treino orquestrados (Airflow/Dagster/Kubeflow) e retraining',
        'Serving: batch scoring em Spark, endpoints online',
        'Monitoramento de features e predições'
      ],
      practice: [
        'Feature store com Feast (offline em Parquet/warehouse, online em Redis) e dataset de treino point-in-time',
        'Pipeline de treino + registro no MLflow + batch scoring orquestrado'
      ],
      resources: [
        ['Feast docs', 'https://docs.feast.dev/'],
        ['MLflow docs', 'https://mlflow.org/docs/latest/'],
        ['Feature Stores for ML (featurestore.org)', 'https://www.featurestore.org/']
      ],
      questions: [
        'Qual problema uma feature store resolve? Quando ela é exagero?',
        'Explique um point-in-time join e o que acontece se você fizer um join comum para montar o dataset de treino.',
        'Por que existem offline e online stores separados? Como mantê-los consistentes?',
        'Como você calcularia "número de transações do cliente nos últimos 10 minutos" como feature online?',
        'O que é um model registry e como ele se encaixa no CI/CD?'
      ]
    },
    {
      id: 'dados-para-llm',
      title: 'Pipelines de dados para LLMs e GenAI',
      summary: 'Dados não estruturados, parsing de documentos, chunking, embeddings, bancos vetoriais, RAG, qualidade de dados para IA, avaliação e governança.',
      hours: 25,
      why: 'Quase toda empresa está construindo produtos com LLMs, e o gargalo raramente é o modelo: são os dados (documentos sujos, desatualizados, sem permissão, sem avaliação). É uma área nova em que um DE pode se destacar rápido.',
      learn: [
        'Ingestão de dados não estruturados: PDFs, HTML, e-mails, imagens; parsing e OCR',
        'Limpeza, deduplicação (near-duplicates, MinHash) e enriquecimento de metadados',
        'Chunking: por tamanho, por estrutura, semântico; overlap',
        'Embeddings: o que são, modelos, dimensionalidade, custo',
        'Bancos e índices vetoriais: pgvector, Qdrant, Weaviate, Milvus; HNSW e IVF',
        'Busca híbrida (BM25 + vetorial) e reranking',
        'RAG: arquitetura, retrieval contextual, atualização incremental do índice',
        'Permissões e segurança em RAG (respeitar ACLs dos documentos), PII e prompt injection',
        'Avaliação: datasets de avaliação, métricas de retrieval (recall@k, MRR), LLM-as-judge',
        'Dados para fine-tuning e geração de dados sintéticos',
        'LLMs como ferramenta de engenharia de dados: extração estruturada, classificação, text-to-SQL e seus riscos',
        'Custo e latência de pipelines com LLM em escala'
      ],
      practice: [
        'Pipeline incremental: documentos (ex.: regulamentos do BACEN em PDF) → parsing → chunking → embeddings → pgvector, com reprocessamento só do que mudou',
        'Construir um conjunto de avaliação de 50 perguntas e medir recall@5 com 3 estratégias de chunking',
        'Pipeline de extração estruturada com LLM (texto → JSON validado com Pydantic) com controle de custo'
      ],
      resources: [
        ['pgvector', 'https://github.com/pgvector/pgvector'],
        ['Anthropic – Contextual Retrieval', 'https://www.anthropic.com/news/contextual-retrieval'],
        ['Qdrant docs', 'https://qdrant.tech/documentation/'],
        ['Livro: AI Engineering (Chip Huyen)', 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/']
      ],
      questions: [
        'Descreva a arquitetura de um pipeline de ingestão para RAG que se mantém atualizado incrementalmente.',
        'Quais trade-offs existem ao escolher o tamanho e a estratégia de chunking?',
        'Como funciona o índice HNSW e qual o trade-off entre recall e latência?',
        'Por que busca híbrida (BM25 + vetorial) costuma superar busca apenas vetorial?',
        'Como garantir que um usuário do RAG não receba trechos de documentos que ele não tem permissão para ver?',
        'Como você avaliaria objetivamente se uma mudança no pipeline melhorou o RAG?',
        'Quais riscos existem ao usar LLMs para gerar SQL ou transformar dados em produção, e como mitigá-los?'
      ]
    }
  ],
  project: {
    title: 'Plataforma de features + RAG sobre documentos regulatórios',
    description: 'Dois artefatos que mostram que você constrói a fundação de dados para IA: uma feature store para um modelo de fraude e um pipeline RAG avaliado.',
    deliverables: [
      'Feature store (Feast) alimentada pelo pipeline de streaming da Fase 7, com dataset de treino point-in-time',
      'Modelo simples de fraude treinado e registrado no MLflow, com batch scoring orquestrado',
      'Pipeline RAG incremental sobre documentos públicos (ex.: normas do BACEN) com pgvector e busca híbrida',
      'Avaliação quantitativa do retrieval com relatório de experimentos',
      'README em inglês com arquitetura e decisões'
    ]
  }
});
