window.ROADMAP_PHASES.push({
  id: 'streaming',
  num: 7,
  level: 'pleno',
  title: 'Streaming e dados em tempo real',
  duration: '10–12 semanas',
  summary: 'Fundamentos de stream processing, Kafka a fundo, ecossistema (Connect, Schema Registry), Flink, Spark Structured Streaming, serviços gerenciados e arquiteturas orientadas a eventos.',
  why: 'Detecção de fraude, PIX, pricing dinâmico e personalização dependem de streaming. Engenheiros com experiência real em Kafka/Flink são escassos e bem pagos no mercado internacional.',
  outcomes: [
    'Explicar event time, watermarks, janelas e estado com clareza',
    'Operar Kafka: particionamento, consumer groups, replicação, garantias de entrega',
    'Construir um job Flink ou Spark Streaming com estado e exactly-once ponta a ponta',
    'Desenhar uma arquitetura orientada a eventos com evolução de schema segura'
  ],
  topics: [
    {
      id: 'streaming-fundamentos',
      title: 'Fundamentos de stream processing',
      summary: 'Event time vs processing time, janelas, watermarks, triggers, estado, semânticas de entrega, backpressure e o modelo Dataflow.',
      hours: 20,
      why: 'Sem esses conceitos, streaming vira "batch rodando a cada minuto", com resultados errados quando eventos chegam atrasados ou fora de ordem.',
      learn: [
        'Dados bounded vs unbounded',
        'Event time vs ingestion time vs processing time e o skew entre eles',
        'Janelas: tumbling, sliding (hopping), session, global',
        'Watermarks: o que são, heurísticas, trade-off entre latência e completude',
        'Triggers e allowed lateness; atualização de resultados (retractions)',
        'Operações stateless vs stateful; state stores; TTL de estado',
        'Joins em streams: stream-stream (janelado) e stream-table',
        'Semânticas: at-most-once, at-least-once, exactly-once (efetivo); sinks idempotentes e transacionais',
        'Backpressure',
        'Checkpointing e recuperação de falhas',
        'O modelo Dataflow (Google) e o Apache Beam',
        'Streaming vs micro-batch'
      ],
      resources: [
        ['Streaming 101 (Tyler Akidau)', 'https://www.oreilly.com/radar/the-world-beyond-batch-streaming-101/'],
        ['Streaming 102 (Tyler Akidau)', 'https://www.oreilly.com/radar/the-world-beyond-batch-streaming-102/'],
        ['Livro: Streaming Systems', 'https://www.oreilly.com/library/view/streaming-systems/9781491983867/'],
        ['Paper: The Dataflow Model', 'https://research.google/pubs/the-dataflow-model-a-practical-approach-to-balancing-correctness-latency-and-cost-in-massive-scale-unbounded-out-of-order-data-processing/']
      ],
      questions: [
        'Qual a diferença entre event time e processing time? Por que agregar por processing time costuma dar resultados errados?',
        'O que é uma watermark e qual o trade-off ao configurá-la?',
        'Compare janelas tumbling, sliding e session, com um caso de uso para cada.',
        'O que acontece com um evento que chega depois da watermark? Que opções existem?',
        'Como se consegue exatamente-uma-vez "efetivo" de ponta a ponta? Qual o papel do sink?',
        'O que é backpressure e como um sistema de streaming lida com ela?',
        'Por que o estado é o maior desafio operacional de jobs de streaming?',
        'Quando micro-batch é suficiente e quando você precisa de streaming verdadeiro?'
      ]
    },
    {
      id: 'kafka',
      title: 'Apache Kafka a fundo',
      summary: 'Log distribuído, tópicos, partições, offsets, consumer groups, replicação e ISR, acks, producer idempotente, transações, compactação, retenção e KRaft.',
      hours: 35,
      why: 'Kafka é o sistema nervoso de dados de quase toda empresa de tecnologia. Perguntas sobre partições, ordering e consumer groups são clássicas em entrevistas.',
      learn: [
        'O log como abstração central (artigo "The Log" de Jay Kreps)',
        'Brokers, tópicos, partições, offsets, segmentos',
        'Ordenação: garantida apenas dentro da partição; escolha da chave de particionamento',
        'Producers: batching, linger.ms, compressão, acks (0, 1, all), retries',
        'Producer idempotente e transações (exactly-once no Kafka)',
        'Consumers e consumer groups; rebalance (eager vs cooperative); commit de offsets (auto vs manual)',
        'Lag de consumo e como monitorar',
        'Replicação: líder, followers, ISR, min.insync.replicas, unclean leader election',
        'Retenção por tempo/tamanho vs log compaction',
        'KRaft (sem ZooKeeper)',
        'Dimensionamento: número de partições, throughput, impacto em rebalance',
        'Segurança: TLS, SASL, ACLs',
        'Tiered storage',
        'Alternativas compatíveis: Redpanda, WarpStream, MSK, Confluent Cloud'
      ],
      practice: [
        'Subir um cluster Kafka de 3 brokers (KRaft) com Docker e testar falha de broker com acks=all e min.insync.replicas=2',
        'Escrever producer e consumer em Python com commit manual e processamento at-least-once idempotente',
        'Observar um rebalance ao adicionar consumers a um group e medir o lag',
        'Criar um tópico compactado e demonstrar a compactação por chave'
      ],
      resources: [
        ['Apache Kafka docs', 'https://kafka.apache.org/documentation/'],
        ['Confluent Developer (cursos gratuitos)', 'https://developer.confluent.io/'],
        ['Livro: I Heart Logs (Jay Kreps)', 'https://www.oreilly.com/library/view/i-heart-logs/9781491909379/'],
        ['Livro: Kafka – The Definitive Guide, 2ª ed.', 'https://www.oreilly.com/library/view/kafka-the-definitive/9781492043072/']
      ],
      questions: [
        'Como o Kafka garante ordenação? Como garantir a ordem de todos os eventos de uma mesma conta?',
        'O que acontece quando há mais consumers num group do que partições no tópico?',
        'Explique acks=0, 1 e all e o papel de min.insync.replicas na durabilidade.',
        'O que é a ISR e o que acontece numa unclean leader election?',
        'Como funciona o producer idempotente? E as transações do Kafka?',
        'Commit automático vs manual de offsets: qual o risco de cada um?',
        'O que é log compaction e para que serve (ex.: tópicos de estado/changelog)?',
        'Como escolher o número de partições de um tópico? Qual o custo de partições demais?',
        'O consumer lag está crescendo sem parar. Quais são as causas possíveis e o que fazer?',
        'Por que o Kafka removeu a dependência do ZooKeeper (KRaft)?'
      ]
    },
    {
      id: 'kafka-ecossistema',
      title: 'Ecossistema Kafka: Connect, Schema Registry e Streams',
      summary: 'Kafka Connect (sources/sinks, SMTs), Schema Registry com Avro/Protobuf e regras de compatibilidade, Kafka Streams e ksqlDB.',
      hours: 20,
      learn: [
        'Kafka Connect: workers, connectors, tasks, modos standalone/distribuído, converters, SMTs',
        'Conectores comuns: Debezium (source), S3/Iceberg sink, JDBC',
        'Tratamento de erros no Connect: DLQ, tolerância',
        'Schema Registry: subjects, versões, IDs no payload',
        'Avro vs Protobuf vs JSON Schema',
        'Compatibilidade: BACKWARD, FORWARD, FULL (e transitive); que mudanças são seguras',
        'Kafka Streams: KStream vs KTable, state stores, changelog topics, exactly-once',
        'ksqlDB/Flink SQL para processamento declarativo'
      ],
      practice: [
        'Configurar Schema Registry com Avro e testar uma mudança compatível e uma incompatível',
        'Pipeline com Kafka Connect: Debezium source → S3/Iceberg sink',
        'App Kafka Streams (Java) ou equivalente que agrega transações por conta em janelas de 5 minutos'
      ],
      resources: [
        ['Kafka Connect – Confluent docs', 'https://docs.confluent.io/platform/current/connect/index.html'],
        ['Schema Evolution and Compatibility', 'https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html'],
        ['Kafka Streams docs', 'https://kafka.apache.org/documentation/streams/']
      ],
      questions: [
        'Por que usar um Schema Registry em vez de mandar JSON sem schema?',
        'Explique compatibilidade BACKWARD e FORWARD. Adicionar um campo obrigatório sem default é compatível?',
        'Em que ordem fazer deploy de producers e consumers numa mudança de schema BACKWARD?',
        'Diferença entre KStream e KTable?',
        'O que são SMTs no Kafka Connect e quando NÃO usá-las?',
        'Como tratar mensagens "venenosas" (poison pills) num conector?'
      ]
    },
    {
      id: 'flink',
      title: 'Apache Flink',
      summary: 'O principal motor de stream processing com estado: DataStream API, Table API/SQL, state backends, checkpoints, savepoints e exactly-once.',
      hours: 30,
      why: 'Flink é o padrão em streaming de baixa latência com estado (Uber, Netflix, Alibaba, bancos). É uma das skills mais escassas e valorizadas do mercado.',
      learn: [
        'Arquitetura: JobManager, TaskManagers, slots, paralelismo',
        'DataStream API: sources, transformações, keyBy, janelas, process functions, timers',
        'Table API e Flink SQL',
        'Event time, watermarks e lateness no Flink',
        'Estado: keyed state, operator state; state backends (HashMap, RocksDB)',
        'Checkpoints (algoritmo de Chandy-Lamport/barreiras), savepoints e upgrades de jobs',
        'Exactly-once com two-phase commit sinks',
        'Joins: regular, interval, temporal (versioned tables), lookup',
        'Deploy: Kubernetes Operator, modos application/session; Flink gerenciado (AWS, Confluent)',
        'Tuning: paralelismo, backpressure, tamanho do estado, checkpoints incrementais'
      ],
      practice: [
        'Job Flink SQL que lê transações do Kafka e detecta mais de 5 transações por cartão em 1 minuto',
        'Job DataStream com estado e timers (ex.: alertar se uma conta não envia heartbeat em 10 min)',
        'Parar um job com savepoint, alterar o código e retomar sem perder estado'
      ],
      resources: [
        ['Apache Flink docs', 'https://nightlies.apache.org/flink/flink-docs-stable/'],
        ['Flink Learning (Confluent)', 'https://developer.confluent.io/courses/apache-flink/intro/'],
        ['Livro: Stream Processing with Apache Flink', 'https://www.oreilly.com/library/view/stream-processing-with/9781491974285/']
      ],
      questions: [
        'Como o Flink implementa checkpoints consistentes de forma distribuída (barreiras)?',
        'Diferença entre checkpoint e savepoint?',
        'Quando usar RocksDB como state backend?',
        'Como o Flink garante exactly-once escrevendo no Kafka?',
        'O que é um temporal join e quando ele é necessário (ex.: converter moeda com a cotação vigente)?',
        'Seu job Flink está com backpressure. Como encontrar o operador gargalo?',
        'Flink ou Spark Structured Streaming: como decidir?'
      ]
    },
    {
      id: 'spark-streaming-cloud',
      title: 'Spark Structured Streaming e streaming gerenciado em cloud',
      summary: 'Structured Streaming (micro-batch, estado, watermarks, foreachBatch), Kinesis, Pub/Sub, Event Hubs, Dataflow e Pulsar.',
      hours: 15,
      learn: [
        'Structured Streaming: modelo de tabela ilimitada, output modes (append, update, complete)',
        'Triggers: processingTime, availableNow, continuous',
        'Watermarks e agregações com estado; RocksDB state store',
        'foreachBatch para escrita idempotente (MERGE em Delta/Iceberg)',
        'Checkpoints e recuperação',
        'Auto Loader / ingestão incremental de arquivos',
        'AWS Kinesis Data Streams e Firehose; GCP Pub/Sub e Dataflow (Beam); Azure Event Hubs',
        'Apache Pulsar (conceitos) e comparação com Kafka'
      ],
      practice: [
        'Job Structured Streaming Kafka → Delta/Iceberg com watermark e MERGE em foreachBatch',
        'Pipeline Pub/Sub → Dataflow → BigQuery (template ou Beam) no free tier'
      ],
      resources: [
        ['Structured Streaming Programming Guide', 'https://spark.apache.org/docs/latest/streaming/index.html'],
        ['Apache Beam docs', 'https://beam.apache.org/documentation/'],
        ['Amazon Kinesis docs', 'https://docs.aws.amazon.com/kinesis/']
      ],
      questions: [
        'Explique os output modes append, update e complete e quando cada um é permitido.',
        'Como garantir escrita idempotente usando foreachBatch?',
        'O que o trigger availableNow permite fazer (streaming como batch incremental)?',
        'Kinesis vs Kafka (MSK): trade-offs de operação, custo e funcionalidades.',
        'Para que serve o checkpoint location e o que acontece se você apagá-lo?'
      ]
    },
    {
      id: 'event-driven',
      title: 'Arquiteturas orientadas a eventos e tempo real',
      summary: 'Event sourcing, CQRS, outbox, Lambda vs Kappa, design de eventos, analytics em tempo real e feature serving.',
      hours: 15,
      learn: [
        'Eventos vs comandos vs mensagens; eventos de domínio',
        'Design de eventos: granularidade, envelope (id, tipo, timestamp, versão), chave',
        'Event sourcing e CQRS',
        'Outbox pattern e consistência entre banco e broker',
        'Arquitetura Lambda vs Kappa',
        'Streaming para lakehouse (camada bronze em tempo real)',
        'Real-time analytics: Kafka → Pinot/ClickHouse/Druid',
        'Casos de uso: fraude, notificações, personalização, monitoramento, IoT',
        'Desafios: reprocessamento, ordenação global, duplicatas, evolução de eventos'
      ],
      resources: [
        ['Martin Fowler – Event Sourcing', 'https://martinfowler.com/eaaDev/EventSourcing.html'],
        ['Questioning the Lambda Architecture (Jay Kreps)', 'https://www.oreilly.com/radar/questioning-the-lambda-architecture/'],
        ['Livro: Designing Event-Driven Systems (Confluent, gratuito)', 'https://www.confluent.io/resources/ebook/designing-event-driven-systems/']
      ],
      questions: [
        'Compare as arquiteturas Lambda e Kappa. Por que a Kappa ganhou espaço?',
        'O que é event sourcing? Quais os benefícios e os custos?',
        'Como você reprocessaria 6 meses de eventos numa arquitetura Kappa?',
        'Quais campos todo evento deveria ter e por quê?',
        'Desenhe uma arquitetura de detecção de fraude em tempo real para transações de cartão, com latência < 200ms.',
        'Como lidar com eventos duplicados de ponta a ponta?'
      ]
    }
  ],
  project: {
    title: 'Detecção de fraude em tempo real',
    description: 'Simule transações de cartão, processe em streaming com estado e gere alertas e métricas em tempo real, com garantias de entrega documentadas.',
    deliverables: [
      'Gerador de transações (Python) publicando em Kafka com Avro + Schema Registry',
      'Job Flink (ou Spark Streaming) com regras de fraude com estado (velocidade, geolocalização impossível, valor atípico)',
      'Sink exactly-once para Iceberg/Delta (histórico) e para ClickHouse/Pinot (dashboard em tempo real)',
      'Demonstração de recuperação de falha (matar um TaskManager) sem perda nem duplicação',
      'Evolução de schema compatível em produção demonstrada',
      'README em inglês com diagrama, garantias de entrega e métricas de latência'
    ]
  }
});
