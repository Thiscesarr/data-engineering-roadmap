window.ROADMAP_PHASES.push({
  id: 'governanca',
  num: 10,
  level: 'senior',
  title: 'Governança, segurança e privacidade',
  duration: '6–8 semanas',
  summary: 'Catálogo, metadados, lineage, ownership, segurança de dados (criptografia, controle de acesso fino), LGPD/GDPR, anonimização, data contracts e Data Mesh.',
  why: 'Para trabalhar na Europa, GDPR é obrigatório. E sua experiência em banco (Itaú: LGPD, BACEN, auditoria) vira um diferencial raro se você souber articulá-la. Sêniores desenham plataformas seguras por padrão.',
  outcomes: [
    'Implementar controle de acesso em nível de linha e coluna e mascaramento dinâmico',
    'Explicar as obrigações de LGPD e GDPR que afetam pipelines (ex.: direito ao esquecimento num lakehouse)',
    'Estruturar catálogo, ownership e lineage numa organização',
    'Definir e aplicar data contracts entre produtores e consumidores'
  ],
  topics: [
    {
      id: 'governanca-dados',
      title: 'Governança de dados, catálogo e lineage',
      summary: 'DAMA-DMBOK, papéis (owner, steward, custodian), catálogos de dados, metadados técnicos e de negócio, glossário, lineage e master data.',
      hours: 15,
      learn: [
        'Governança como habilitadora (não burocracia): objetivos e métricas',
        'DAMA-DMBOK: áreas de conhecimento',
        'Papéis: data owner, data steward, data custodian',
        'Metadados técnicos, operacionais e de negócio; glossário de negócio',
        'Catálogos: DataHub, OpenMetadata, Unity Catalog, Collibra, Atlan',
        'Lineage em nível de tabela e de coluna; OpenLineage',
        'Classificação de dados (público, interno, confidencial, restrito) e tags',
        'Master Data Management (MDM) e entity resolution',
        'Retenção e ciclo de vida de dados'
      ],
      practice: [
        'Subir DataHub ou OpenMetadata, ingerir metadados do seu warehouse/dbt e configurar ownership e glossário',
        'Aplicar classificação de sensibilidade automática a colunas com PII'
      ],
      resources: [
        ['DataHub docs', 'https://datahubproject.io/docs/'],
        ['OpenMetadata docs', 'https://docs.open-metadata.org/'],
        ['DAMA International (DMBOK)', 'https://www.dama.org/cpages/body-of-knowledge']
      ],
      questions: [
        'Qual a diferença entre data owner, data steward e data custodian?',
        'O que um bom catálogo de dados precisa ter para que as pessoas realmente o usem?',
        'Como lineage em nível de coluna ajuda em análise de impacto e em auditorias?',
        'Como você implementaria governança numa empresa sem criar burocracia que trave os times?',
        'O que é MDM e qual problema de "cliente duplicado" ele resolve?'
      ]
    },
    {
      id: 'seguranca-dados',
      title: 'Segurança de dados',
      summary: 'Criptografia em repouso e em trânsito, gestão de chaves e segredos, controle de acesso (RBAC/ABAC), segurança em linha/coluna, isolamento de rede e auditoria.',
      hours: 15,
      learn: [
        'Modelo de ameaças para plataformas de dados (vazamento, insider, credenciais expostas)',
        'Criptografia em repouso (SSE, KMS, envelope encryption) e em trânsito (TLS)',
        'Gestão de segredos: Vault, Secrets Manager; rotação',
        'Autenticação vs autorização; SSO, federação',
        'RBAC vs ABAC (tag-based access control)',
        'Row-level security e column-level security; mascaramento dinâmico',
        'Isolamento de rede: endpoints privados, sem acesso público',
        'Auditoria de acesso e detecção de anomalias',
        'Segurança da supply chain: dependências, imagens, SBOM',
        'Ambientes não produtivos sem dados reais'
      ],
      practice: [
        'Implementar row-level security (ex.: gerente vê só a própria agência) e masking em Postgres, Snowflake ou Unity Catalog',
        'Configurar rotação automática de um segredo de banco consumido por um pipeline'
      ],
      resources: [
        ['OWASP Top 10', 'https://owasp.org/www-project-top-ten/'],
        ['AWS KMS – Concepts', 'https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html'],
        ['PostgreSQL – Row Security Policies', 'https://www.postgresql.org/docs/current/ddl-rowsecurity.html']
      ],
      questions: [
        'O que é envelope encryption e por que ela é usada pelo KMS?',
        'RBAC vs ABAC: por que ABAC (baseado em tags) escala melhor em plataformas grandes?',
        'Como implementar "cada gerente só vê clientes da sua agência" sem duplicar tabelas?',
        'Um access key foi exposto num repositório público. Qual é o seu plano de resposta, passo a passo?',
        'Como garantir que ambientes de desenvolvimento não tenham dados pessoais reais?'
      ]
    },
    {
      id: 'privacidade-regulacao',
      title: 'Privacidade e regulação: LGPD, GDPR e setor financeiro',
      summary: 'Princípios de privacidade, bases legais, direitos dos titulares, PII, anonimização vs pseudonimização, tokenização, direito ao esquecimento em lakes e regulação financeira.',
      hours: 15,
      why: 'Empresas europeias perguntam como você lida com GDPR. Mostrar que você já implementou controles de LGPD em banco é um diferencial concreto para a sua candidatura.',
      learn: [
        'Princípios: finalidade, minimização, necessidade, transparência, segurança',
        'Bases legais (consentimento, contrato, obrigação legal, legítimo interesse)',
        'Direitos do titular: acesso, correção, portabilidade, eliminação',
        'PII, dados sensíveis, dados financeiros',
        'Anonimização vs pseudonimização (e por que dado pseudonimizado ainda é dado pessoal)',
        'Técnicas: hashing com salt, tokenização, mascaramento, generalização, k-anonimato, privacidade diferencial (conceito)',
        'Direito ao esquecimento num lakehouse: deletes, time travel, backups, crypto-shredding',
        'Retenção e descarte',
        'Transferência internacional de dados (GDPR) e residência de dados',
        'Regulação financeira: BACEN, PCI-DSS (dados de cartão), SOX, BCBS 239 (agregação de risco)',
        'Privacy by design em pipelines'
      ],
      practice: [
        'Implementar tokenização de CPF/e-mail na camada bronze, com cofre de tokens separado',
        'Implementar e documentar um processo de exclusão de titular ponta a ponta num lakehouse (incluindo time travel)'
      ],
      resources: [
        ['LGPD – Lei 13.709/2018', 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm'],
        ['GDPR – texto consolidado', 'https://gdpr-info.eu/'],
        ['ANPD', 'https://www.gov.br/anpd/'],
        ['PCI Security Standards', 'https://www.pcisecuritystandards.org/']
      ],
      questions: [
        'Qual a diferença entre anonimização e pseudonimização? Por que um hash de CPF sem salt não é anonimização?',
        'Como implementar o direito ao esquecimento numa tabela Delta/Iceberg com time travel e backups?',
        'O que é crypto-shredding e quando ele é útil?',
        'Quais princípios da LGPD/GDPR mais impactam o design de um data lake?',
        'O que o PCI-DSS exige em relação a números de cartão em sistemas de dados?',
        'O que é o BCBS 239 e por que ele importa para engenharia de dados em bancos?',
        'Como você aplicaria privacy by design num pipeline novo de dados de clientes?'
      ]
    },
    {
      id: 'data-contracts-mesh',
      title: 'Data contracts e Data Mesh',
      summary: 'Contratos entre produtores e consumidores (schema, semântica, SLAs), Data Mesh (domínios, dados como produto, plataforma self-service, governança federada) e suas críticas.',
      hours: 12,
      learn: [
        'O problema: mudanças upstream quebrando pipelines downstream',
        'Data contracts: schema, tipos, semântica, SLAs de frescor e qualidade, ownership, versionamento',
        'Especificações: Data Contract Specification, ODCS',
        'Enforcement: no CI do produtor, no Schema Registry, nos model contracts do dbt',
        'Data Mesh: os 4 princípios (domain ownership, data as a product, self-serve platform, federated computational governance)',
        'Quando Data Mesh faz sentido (tamanho e maturidade da organização) e quando é exagero',
        'Data products: descoberta, endereçabilidade, confiabilidade, interoperabilidade',
        'Papel do time de plataforma vs times de domínio'
      ],
      practice: [
        'Escrever data contracts (YAML) para duas tabelas e validá-los automaticamente no CI',
        'Escrever um artigo (inglês) com uma visão crítica do Data Mesh, com prós e contras'
      ],
      resources: [
        ['Data Mesh Principles (Zhamak Dehghani)', 'https://martinfowler.com/articles/data-mesh-principles.html'],
        ['Data Contract Specification', 'https://datacontract.com/'],
        ['Open Data Contract Standard (ODCS)', 'https://bitol-io.github.io/open-data-contract-standard/'],
        ['Livro: Data Mesh (Dehghani)', 'https://www.oreilly.com/library/view/data-mesh/9781492092384/']
      ],
      questions: [
        'O que um data contract deve conter além do schema?',
        'Onde um data contract deve ser validado para impedir quebras?',
        'Explique os quatro princípios do Data Mesh.',
        'Quando Data Mesh é uma má ideia?',
        'O que diferencia um "data product" de uma tabela comum?',
        'Como versionar um contrato quando uma mudança incompatível é inevitável?'
      ]
    }
  ],
  project: {
    title: 'Camada de governança e privacidade para a sua plataforma',
    description: 'Adicione à plataforma dos projetos anteriores tudo o que uma empresa regulada exigiria antes de entrar em produção.',
    deliverables: [
      'Catálogo (DataHub/OpenMetadata) com ownership, glossário e lineage',
      'Classificação de PII + tokenização na ingestão + masking dinâmico por role',
      'Row-level security demonstrada',
      'Processo de exclusão de titular (LGPD/GDPR) automatizado e documentado',
      'Data contracts versionados e validados no CI',
      'Documento "Security & Privacy by Design" em inglês'
    ]
  }
});
