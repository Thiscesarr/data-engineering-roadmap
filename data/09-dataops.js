window.ROADMAP_PHASES.push({
  id: 'dataops',
  num: 9,
  level: 'senior',
  title: 'DataOps, DevOps e infraestrutura',
  duration: '10–12 semanas',
  summary: 'Docker, Kubernetes, Terraform, CI/CD para dados, observabilidade (logs, métricas, traces, data observability), SRE para dados e engenharia de software aplicada.',
  why: 'Sênior entrega sistemas, não só scripts. Saber containerizar, provisionar, fazer deploy automatizado e monitorar é o que torna você autônomo e confiável. E um engenheiro autônomo é o que justifica US$ 10K/mês.',
  outcomes: [
    'Containerizar qualquer aplicação de dados com imagens pequenas e seguras',
    'Fazer deploy e operar workloads de dados em Kubernetes (Spark, Airflow)',
    'Provisionar infraestrutura reprodutível com Terraform, módulos e state remoto',
    'Construir CI/CD completo para dados com ambientes isolados',
    'Definir SLIs/SLOs de dados e conduzir postmortems'
  ],
  topics: [
    {
      id: 'docker',
      title: 'Docker e containers',
      summary: 'Imagens, camadas, Dockerfile otimizado, multi-stage builds, volumes, redes, Docker Compose e segurança de containers.',
      hours: 15,
      learn: [
        'Container vs VM; namespaces e cgroups',
        'Imagens, camadas, cache de build e ordem das instruções',
        'Dockerfile: FROM, RUN, COPY, ENTRYPOINT vs CMD, ARG vs ENV, USER',
        'Multi-stage builds e imagens slim/distroless',
        'Volumes e bind mounts; redes',
        'Docker Compose para ambientes locais multi-serviço',
        'Registries (ECR, GCR, Docker Hub) e tags imutáveis',
        'Segurança: rodar como não-root, scanning de vulnerabilidades (Trivy), segredos fora da imagem',
        'Limites de recursos e health checks'
      ],
      practice: [
        'Reduzir uma imagem Python de dados de 1,5GB para menos de 300MB com multi-stage e cache',
        'Docker Compose com Postgres, Kafka, Airflow e MinIO para desenvolvimento local',
        'Escanear imagens com Trivy no CI'
      ],
      resources: [
        ['Docker – Get Started', 'https://docs.docker.com/get-started/'],
        ['Dockerfile best practices', 'https://docs.docker.com/build/building/best-practices/'],
        ['Trivy', 'https://trivy.dev/']
      ],
      questions: [
        'Qual a diferença entre um container e uma VM?',
        'Por que a ordem das instruções no Dockerfile afeta o tempo de build?',
        'O que é um multi-stage build e qual o benefício?',
        'Diferença entre ENTRYPOINT e CMD?',
        'Por que não rodar containers como root?',
        'Como passar segredos para um container sem colocá-los na imagem?'
      ]
    },
    {
      id: 'kubernetes',
      title: 'Kubernetes para dados',
      summary: 'Pods, deployments, services, configmaps, secrets, jobs, Helm, operators e como rodar Spark, Airflow e Flink no Kubernetes.',
      hours: 30,
      why: 'Plataformas de dados modernas rodam em Kubernetes (Airflow, Spark, Flink, Trino). Sêniores de plataforma precisam operá-lo e depurá-lo.',
      learn: [
        'Arquitetura: control plane (API server, etcd, scheduler, controllers) e nodes (kubelet)',
        'Objetos: Pod, Deployment, StatefulSet, DaemonSet, Job, CronJob, Service, Ingress',
        'ConfigMaps e Secrets; External Secrets',
        'Requests vs limits; QoS classes; OOMKilled; autoscaling (HPA, cluster autoscaler, Karpenter)',
        'Volumes persistentes (PV, PVC, StorageClass)',
        'Namespaces, RBAC, service accounts e IRSA/Workload Identity',
        'kubectl para depuração: describe, logs, exec, events, top',
        'Helm: charts, values, releases',
        'Operators: Spark Operator, Flink Kubernetes Operator, Strimzi (Kafka)',
        'Airflow com KubernetesExecutor e KubernetesPodOperator',
        'GitOps com Argo CD (conceitos)'
      ],
      practice: [
        'Cluster local com kind ou minikube; deploy de Airflow via Helm',
        'Rodar um job Spark no Kubernetes via Spark Operator',
        'Depurar um pod em CrashLoopBackOff e outro OOMKilled'
      ],
      resources: [
        ['Kubernetes Basics (tutorial oficial)', 'https://kubernetes.io/docs/tutorials/kubernetes-basics/'],
        ['Kubernetes the Hard Way', 'https://github.com/kelseyhightower/kubernetes-the-hard-way'],
        ['Spark on Kubernetes', 'https://spark.apache.org/docs/latest/running-on-kubernetes.html'],
        ['Helm docs', 'https://helm.sh/docs/']
      ],
      questions: [
        'Diferença entre Deployment, StatefulSet e Job? Qual usar para um broker Kafka e qual para um batch?',
        'O que acontece quando um pod ultrapassa o limite de memória? E o limite de CPU?',
        'Requests vs limits: como eles afetam o agendamento e a estabilidade?',
        'Um pod está em CrashLoopBackOff. Quais comandos você roda e em que ordem?',
        'Como um pod acessa o S3 de forma segura sem access keys (IRSA/Workload Identity)?',
        'O que é um Operator e por que ele é útil para sistemas com estado como Kafka e Flink?',
        'Quais as vantagens de rodar Spark no Kubernetes em vez de YARN/EMR?'
      ]
    },
    {
      id: 'terraform',
      title: 'Infrastructure as Code com Terraform',
      summary: 'Providers, recursos, state, plan/apply, módulos, workspaces/ambientes, backends remotos, drift, import e boas práticas.',
      hours: 20,
      learn: [
        'Por que IaC: reprodutibilidade, revisão, auditoria, ambientes idênticos',
        'HCL: providers, resources, data sources, variables, outputs, locals',
        'State: o que é, backend remoto (S3 + lock), sensibilidade do state',
        'plan/apply/destroy; lifecycle (prevent_destroy, ignore_changes)',
        'Módulos reutilizáveis e versionados',
        'Ambientes: diretórios vs workspaces vs Terragrunt',
        'Drift e `terraform import`',
        'for_each, count, dynamic blocks',
        'CI/CD de Terraform (plan no PR, apply no merge), policy as code (OPA/Checkov)',
        'Alternativas: OpenTofu, Pulumi, CDK'
      ],
      practice: [
        'Módulo Terraform reutilizável "data-lake" (buckets, catálogo, IAM) usado em dev e prod',
        'Pipeline no GitHub Actions: `terraform plan` comentado no PR e apply após aprovação',
        'Importar um recurso criado manualmente para o state'
      ],
      resources: [
        ['Terraform tutorials', 'https://developer.hashicorp.com/terraform/tutorials'],
        ['Livro: Terraform: Up & Running, 3ª ed.', 'https://www.terraformupandrunning.com/'],
        ['OpenTofu', 'https://opentofu.org/docs/']
      ],
      questions: [
        'O que é o state do Terraform e por que ele deve ficar num backend remoto com lock?',
        'Por que o state é sensível do ponto de vista de segurança?',
        'O que é drift e como você o detecta e corrige?',
        'Como estruturar o Terraform para dev, staging e prod sem duplicar código?',
        'Como você impediria que alguém destruísse um bucket de produção com dados acidentalmente?',
        'count vs for_each: qual o problema de usar count numa lista que muda?'
      ]
    },
    {
      id: 'cicd-dados',
      title: 'CI/CD e ambientes para dados',
      summary: 'GitHub Actions, estratégias de teste para pipelines, ambientes dev/staging/prod, deploy de DAGs e dbt, data diff, blue/green de dados e versionamento.',
      hours: 15,
      learn: [
        'GitHub Actions: workflows, jobs, matrix, cache, secrets, OIDC para cloud (sem chaves)',
        'O que testar no CI de dados: lint, tipos, unitários, integridade de DAGs, compilação dbt, testes de dados em amostra',
        'Ambientes isolados: dados de dev (amostras, clones zero-copy, branches de dados com Nessie/lakeFS)',
        'Promoção entre ambientes e deploy contínuo de DAGs e modelos dbt',
        'Data diff: comparar outputs antes/depois de uma mudança',
        'Blue/green para tabelas (swap de views/tabelas) e rollback',
        'Versionamento de dados e de modelos',
        'Feature flags e migrações de schema sem downtime (expand/contract)',
        'Pre-commit e padronização entre times'
      ],
      practice: [
        'Pipeline CI completo: ruff + mypy + pytest + dbt build em ambiente efêmero + data diff + deploy',
        'Usar OIDC do GitHub para autenticar na AWS sem segredos',
        'Implementar blue/green numa tabela gold com swap atômico'
      ],
      resources: [
        ['GitHub Actions docs', 'https://docs.github.com/en/actions'],
        ['lakeFS – Git para dados', 'https://docs.lakefs.io/'],
        ['Project Nessie', 'https://projectnessie.org/'],
        ['GitHub OIDC com AWS', 'https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services']
      ],
      questions: [
        'O que um CI de um repositório de dados deve validar antes do merge?',
        'Como dar a desenvolvedores um ambiente com dados realistas sem expor PII de produção?',
        'O que é data diff e por que ele é mais útil que testes unitários para mudanças em modelos SQL?',
        'Como fazer uma mudança de schema destrutiva (renomear coluna) sem quebrar consumidores?',
        'Como o OIDC elimina a necessidade de guardar chaves de cloud no GitHub?',
        'Descreva uma estratégia de rollback para um deploy que publicou dados errados.'
      ]
    },
    {
      id: 'observabilidade',
      title: 'Observabilidade e SRE para dados',
      summary: 'Logs, métricas e traces, Prometheus/Grafana, OpenTelemetry, data observability (freshness, volume, schema, distribuição, lineage), SLIs/SLOs, alertas, on-call e postmortems.',
      hours: 20,
      why: 'Na prática, sênior é quem descobre o problema antes do usuário, sabe priorizar alertas e conduz incidentes com calma. Isso é cobrado nas entrevistas comportamentais e técnicas.',
      learn: [
        'Os três pilares: logs (estruturados), métricas, traces',
        'Prometheus (pull, métricas, PromQL) e Grafana (dashboards, alertas)',
        'OpenTelemetry e tracing distribuído',
        'Métricas de pipelines: duração, sucesso/falha, linhas processadas, lag, custo',
        'Data observability: freshness, volume, schema, distribuição, lineage',
        'Ferramentas: Monte Carlo, Elementary, Datadog, OpenLineage/Marquez',
        'SLI, SLO, SLA e error budgets aplicados a dados',
        'Alertas acionáveis: sintomas vs causas, fadiga de alertas, roteamento e severidade',
        'On-call: runbooks, escalonamento',
        'Gestão de incidentes e postmortems sem culpa (blameless)'
      ],
      practice: [
        'Instrumentar um pipeline com métricas Prometheus e montar um dashboard Grafana',
        'Configurar Elementary (dbt) ou OpenLineage + Marquez para lineage e monitoramento',
        'Definir SLOs de frescor e completude para 3 tabelas críticas e criar os alertas',
        'Escrever um postmortem completo de um incidente simulado'
      ],
      resources: [
        ['Google SRE Book (gratuito)', 'https://sre.google/sre-book/table-of-contents/'],
        ['OpenTelemetry docs', 'https://opentelemetry.io/docs/'],
        ['OpenLineage', 'https://openlineage.io/'],
        ['Elementary (dbt data observability)', 'https://docs.elementary-data.com/']
      ],
      questions: [
        'Qual a diferença entre monitoramento e observabilidade?',
        'Quais são os cinco pilares de data observability? Dê um exemplo de alerta para cada um.',
        'Defina SLI, SLO e SLA com um exemplo de tabela crítica de dados.',
        'Como evitar fadiga de alertas num time de dados?',
        'O que é um postmortem blameless e quais seções ele deve ter?',
        'Como o lineage ajuda a avaliar o impacto de um incidente?',
        'Por que logs estruturados (JSON) são melhores que logs em texto livre?'
      ]
    },
    {
      id: 'engenharia-software-dados',
      title: 'Engenharia de software aplicada a dados',
      summary: 'Design de sistemas de código, code review, design docs, monorepo vs polyrepo, versionamento de APIs/dados, débito técnico e práticas de times de alta performance.',
      hours: 15,
      learn: [
        'Princípios: DRY (com cautela), KISS, YAGNI, separação de responsabilidades',
        'Arquitetura hexagonal/ports & adapters em aplicações de dados',
        'Code review: o que procurar, como dar e receber feedback',
        'Design docs/RFCs antes de grandes mudanças',
        'Monorepo vs polyrepo para código de dados',
        'Versionamento semântico de bibliotecas e de datasets/contratos',
        'Gestão de débito técnico e refatoração contínua',
        'Métricas DORA (lead time, frequência de deploy, MTTR, change failure rate)',
        'Documentação viva: READMEs, ADRs, docs como código'
      ],
      practice: [
        'Escrever um design doc (em inglês) para a plataforma do seu projeto de portfólio',
        'Revisar 10 PRs de projetos open source de dados e anotar o que aprendeu'
      ],
      resources: [
        ['Google Engineering Practices – Code Review', 'https://google.github.io/eng-practices/review/'],
        ['Design Docs at Google', 'https://www.industrialempathy.com/posts/design-docs-at-google/'],
        ['Livro: Software Engineering at Google (gratuito)', 'https://abseil.io/resources/swe-book'],
        ['DORA metrics', 'https://dora.dev/']
      ],
      questions: [
        'O que você procura ao revisar um PR de pipeline de dados?',
        'Quando escrever um design doc e quais seções ele deve ter?',
        'Quais são as métricas DORA e como adaptá-las para um time de dados?',
        'Como você convenceria a liderança a investir tempo em pagar débito técnico?',
        'Monorepo ou polyrepo para uma plataforma de dados com 8 times? Justifique.'
      ]
    }
  ],
  project: {
    title: 'Plataforma de dados como produto interno (self-service)',
    description: 'Transforme seus projetos anteriores numa plataforma operável: tudo containerizado, deployado em Kubernetes com GitOps, observável e com SLOs.',
    deliverables: [
      'Airflow + Spark em Kubernetes (kind local ou EKS/GKE) via Helm/Operators',
      'Terraform modular com state remoto e CI de plan/apply',
      'CI/CD com OIDC, testes, data diff e deploy automatizado',
      'Dashboards Grafana + lineage (OpenLineage/Marquez) + alertas de SLO',
      'Runbook e um postmortem de incidente simulado',
      'Design doc em inglês publicado no repositório'
    ]
  }
});
