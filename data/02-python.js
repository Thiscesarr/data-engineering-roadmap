window.ROADMAP_PHASES.push({
  id: 'python',
  num: 2,
  level: 'junior',
  title: 'Python para engenharia de dados',
  duration: '10–12 semanas',
  summary: 'Python em nível de engenharia de software: linguagem a fundo, design, testes, tipagem, empacotamento, concorrência, manipulação de dados (pandas, Polars, DuckDB, Arrow) e integração com APIs.',
  why: 'Python é a língua franca da engenharia de dados. A diferença entre júnior e sênior não é saber pandas: é escrever código testado, tipado, legível e que roda em produção sem dar dor de cabeça.',
  outcomes: [
    'Escrever código Python idiomático, tipado e testado, com estrutura de projeto profissional',
    'Escolher entre threading, multiprocessing e asyncio com justificativa',
    'Processar datasets maiores que a memória com Polars, DuckDB ou em streaming',
    'Construir clientes de API robustos (paginação, rate limit, retries, autenticação)',
    'Empacotar e distribuir uma biblioteca/CLI Python'
  ],
  topics: [
    {
      id: 'python-core',
      title: 'Python a fundo: a linguagem',
      summary: 'Modelo de dados, mutabilidade, iteradores, geradores, decorators, context managers, closures, exceções e as estruturas built-in.',
      hours: 40,
      why: 'Geradores permitem processar 100GB com 100MB de RAM; decorators e context managers estão em todo framework de dados (Airflow, Dagster, Prefect).',
      learn: [
        'Tipos built-in e mutabilidade: list, tuple, dict, set, frozenset; identidade vs igualdade',
        'Modelo de objetos: tudo é objeto, referências, passagem de argumentos ("call by sharing")',
        'Armadilha do argumento default mutável',
        'Comprehensions (list, dict, set) e generator expressions',
        'Iteradores e o protocolo de iteração (`__iter__`, `__next__`)',
        'Geradores, `yield`, `yield from` e pipelines de geradores (lazy evaluation)',
        'Funções de primeira classe, closures, `*args/**kwargs`, keyword-only args',
        'Decorators (com e sem parâmetros), `functools.wraps`, `lru_cache`',
        'Context managers: `with`, `__enter__/__exit__`, `contextlib.contextmanager`',
        'Exceções: hierarquia, exceções customizadas, `raise from`, quando capturar e quando deixar propagar',
        'Módulo `collections` (defaultdict, Counter, deque, namedtuple) e `itertools`',
        'Dunder methods (`__repr__`, `__eq__`, `__hash__`, `__len__`)',
        'datetime e timezones (`zoneinfo`): naive vs aware, UTC como padrão',
        'Logging com o módulo `logging` (níveis, handlers, logs estruturados) em vez de print',
        'pathlib, json, csv, gzip e leitura de arquivos em chunks'
      ],
      practice: [
        'Pipeline de geradores que lê um CSV de 5GB, filtra, transforma e grava JSONL com uso de memória constante',
        'Decorator `@retry(times, backoff)` com testes',
        'Context manager que abre conexão com banco, faz commit em sucesso e rollback em exceção',
        'Resolver 30 exercícios no Exercism (trilha Python)'
      ],
      resources: [
        ['Livro: Fluent Python, 2ª ed. (Ramalho)', 'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/'],
        ['Python Tutorial oficial', 'https://docs.python.org/3/tutorial/'],
        ['Real Python', 'https://realpython.com/'],
        ['Exercism – Python', 'https://exercism.org/tracks/python']
      ],
      questions: [
        'Qual a diferença entre uma lista e um gerador em termos de memória? Quando usar cada um?',
        'Explique o problema de `def f(x, acc=[])` e como corrigi-lo.',
        'Como funciona um decorator por baixo? Por que usar `functools.wraps`?',
        'Escreva (mentalmente) um context manager que mede o tempo de execução de um bloco.',
        'Qual a diferença entre `is` e `==`? Por que `a is b` pode ser True para inteiros pequenos?',
        'Por que objetos mutáveis não podem ser chaves de dicionário? O que `__hash__` tem a ver com isso?',
        'Por que você deve sempre trabalhar com datetimes timezone-aware em UTC num pipeline?',
        'Quando capturar uma exceção e quando deixá-la propagar num job de dados?',
        'O que é `raise ... from e` e por que ele melhora a depuração?'
      ]
    },
    {
      id: 'python-design',
      title: 'Orientação a objetos e design de código',
      summary: 'Classes, dataclasses, Protocols, composição vs herança, SOLID e padrões de projeto úteis em dados.',
      hours: 25,
      why: 'Código de dados que cresce sem design vira um emaranhado de scripts. Sêniores escrevem módulos reutilizáveis, extensíveis e fáceis de testar.',
      learn: [
        'Classes, atributos de instância vs classe, métodos de classe e estáticos, properties',
        'dataclasses (frozen, slots, field defaults) e Pydantic para validação',
        'Herança, MRO, `super()` e por que preferir composição',
        'Classes abstratas (ABC) vs `typing.Protocol` (duck typing estrutural)',
        'SOLID aplicado a pipelines',
        'Padrões: Strategy, Factory, Adapter, Template Method, Repository, Builder',
        'Injeção de dependência simples (passar dependências pelo construtor) para testabilidade',
        'Separação entre I/O e lógica pura (functional core, imperative shell)',
        'Clean Code: nomes, funções pequenas, efeitos colaterais explícitos',
        'Configuração: variáveis de ambiente, pydantic-settings, 12-factor'
      ],
      practice: [
        'Refatorar um script de ETL monolítico em módulos (extract/transform/load) com interfaces (Protocol)',
        'Implementar conectores plugáveis (Postgres, CSV, API) com Strategy/Factory',
        'Validar registros de entrada com Pydantic e enviar inválidos para uma dead-letter list'
      ],
      resources: [
        ['Livro: Architecture Patterns with Python (gratuito online)', 'https://www.cosmicpython.com/'],
        ['Refactoring Guru – Design Patterns', 'https://refactoring.guru/design-patterns/python'],
        ['Pydantic docs', 'https://docs.pydantic.dev/'],
        ['The Twelve-Factor App', 'https://12factor.net/']
      ],
      questions: [
        'Por que "composição sobre herança"? Dê um exemplo em um conector de dados.',
        'Qual a diferença entre ABC e Protocol? Quando usar cada um?',
        'Como você estruturaria um pipeline para que a lógica de transformação seja testável sem banco de dados?',
        'Explique o princípio da inversão de dependência com um exemplo de pipeline.',
        'Quando usar dataclass e quando usar Pydantic?',
        'Que padrão de projeto você usaria para suportar múltiplas fontes de dados com a mesma interface? Por quê?',
        'O que é "functional core, imperative shell" e qual o benefício para testes?'
      ]
    },
    {
      id: 'python-qualidade',
      title: 'Tipagem, qualidade e testes',
      summary: 'Type hints e mypy, linters e formatters (ruff), pytest a fundo, mocks, testes de dados e pirâmide de testes.',
      hours: 25,
      why: 'Em empresas internacionais, PR sem teste não é aprovado. Saber testar pipelines é um dos sinais mais claros de senioridade.',
      learn: [
        'Type hints: tipos básicos, generics, Optional/Union, TypedDict, Literal, Callable, TypeVar',
        'mypy/pyright em modo estrito',
        'ruff (lint + format) e pre-commit',
        'pytest: asserts, fixtures, escopos, parametrize, marks, conftest.py',
        'Mocks e fakes: `unittest.mock`, monkeypatch, quando NÃO mockar',
        'Testes de integração com containers (testcontainers) para bancos reais',
        'Property-based testing com Hypothesis',
        'Cobertura (coverage) e por que 100% não é a meta',
        'Pirâmide de testes aplicada a dados: unitário (transformação), integração (I/O), contrato (schema), end-to-end',
        'Testando transformações: dados de entrada pequenos e explícitos, saída esperada',
        'TDD na prática'
      ],
      practice: [
        'Adicionar type hints e mypy estrito a um projeto existente até zerar os erros',
        'Escrever testes com fixtures e parametrize para funções de transformação',
        'Teste de integração com testcontainers + PostgreSQL',
        'Configurar CI no GitHub Actions rodando ruff, mypy e pytest'
      ],
      resources: [
        ['pytest docs', 'https://docs.pytest.org/'],
        ['mypy docs', 'https://mypy.readthedocs.io/'],
        ['Ruff', 'https://docs.astral.sh/ruff/'],
        ['Hypothesis', 'https://hypothesis.readthedocs.io/'],
        ['Testcontainers Python', 'https://testcontainers-python.readthedocs.io/']
      ],
      questions: [
        'Como você testaria uma função que lê de uma API, transforma e grava no banco?',
        'O que é uma fixture do pytest e o que significam os escopos function, module e session?',
        'Quando um mock é prejudicial? Qual a alternativa?',
        'O que é property-based testing? Dê um exemplo de propriedade para uma função de deduplicação.',
        'Descreva a pirâmide de testes para um projeto de dados.',
        'Por que type hints ajudam mesmo numa linguagem dinâmica? O que mypy detecta que testes podem não detectar?',
        'Por que 100% de cobertura não garante qualidade?'
      ]
    },
    {
      id: 'python-ambientes',
      title: 'Ambientes, dependências e empacotamento',
      summary: 'venv, uv, poetry, pyproject.toml, lockfiles, versionamento semântico, construção de pacotes e CLIs.',
      hours: 10,
      why: '"Na minha máquina funciona" não é aceito em produção. Dependências reprodutíveis e pacotes internos são rotina em plataformas de dados.',
      learn: [
        'Ambientes virtuais (venv) e por que nunca instalar no Python do sistema',
        'pip, requirements.txt e suas limitações',
        'uv (moderno, rápido) e poetry: pyproject.toml, lockfile, grupos de dependências',
        'Versionamento semântico e ranges de versão (pinning em app vs em library)',
        'Estrutura de projeto: src layout, `__init__.py`, imports absolutos',
        'Build de pacote (wheel, sdist) e publicação (PyPI ou repositório interno)',
        'CLIs com Typer ou Click; entry points',
        'Gerenciar versões de Python (pyenv, uv python)',
        'Dependências nativas e problemas de compatibilidade (wheels, manylinux)'
      ],
      practice: [
        'Criar um projeto com `uv init` em src layout, com testes, lint e CLI Typer',
        'Publicar um pacote seu no TestPyPI',
        'Criar Makefile/justfile com tarefas: install, lint, test, build'
      ],
      resources: [
        ['uv docs', 'https://docs.astral.sh/uv/'],
        ['Python Packaging User Guide', 'https://packaging.python.org/'],
        ['Typer', 'https://typer.tiangolo.com/']
      ],
      questions: [
        'Por que uma aplicação deve fixar versões exatas (lockfile) e uma biblioteca deve usar ranges?',
        'O que é um wheel e qual a vantagem sobre instalar a partir do código-fonte?',
        'Qual o problema do `requirements.txt` sem lock de dependências transitivas?',
        'O que é o src layout e qual problema de import ele evita?',
        'Como garantir que o ambiente do CI seja idêntico ao local?'
      ]
    },
    {
      id: 'python-concorrencia',
      title: 'Concorrência, paralelismo e performance',
      summary: 'GIL, threading, multiprocessing, asyncio, concurrent.futures, profiling e otimização de memória e CPU.',
      hours: 25,
      why: 'Ingerir 500 endpoints de API em sequência leva horas; com asyncio, minutos. Mas a ferramenta errada (threads em código CPU-bound) não ajuda em nada.',
      learn: [
        'GIL: o que é, por que existe, o que ele bloqueia e o que não bloqueia; Python free-threaded (3.13+)',
        'I/O-bound vs CPU-bound',
        'threading e ThreadPoolExecutor para I/O',
        'multiprocessing e ProcessPoolExecutor para CPU; custo de serialização (pickle)',
        'asyncio: event loop, coroutines, `await`, `gather`, semáforos para limitar concorrência',
        'httpx/aiohttp assíncronos',
        'Profiling: cProfile, py-spy, line_profiler; memória com tracemalloc e memray',
        'Otimizações: estruturas certas, vetorização (NumPy/Arrow), evitar loops Python em dados grandes',
        'Quando sair do Python: extensões em Rust (PyO3), Cython, Numba',
        'Processamento em chunks e streaming para dados maiores que a memória'
      ],
      practice: [
        'Baixar 1.000 URLs de forma sequencial, com threads e com asyncio, e comparar os tempos',
        'Paralelizar uma tarefa CPU-bound com ProcessPoolExecutor e medir o speedup',
        'Fazer profiling de um script lento com py-spy, encontrar o gargalo e otimizar'
      ],
      resources: [
        ['Real Python – Concurrency', 'https://realpython.com/python-concurrency/'],
        ['asyncio docs', 'https://docs.python.org/3/library/asyncio.html'],
        ['py-spy', 'https://github.com/benfred/py-spy'],
        ['Livro: High Performance Python, 2ª ed.', 'https://www.oreilly.com/library/view/high-performance-python/9781492055013/']
      ],
      questions: [
        'O que é o GIL? Por que threads ajudam em I/O-bound mas não em CPU-bound?',
        'Você precisa chamar uma API 10.000 vezes respeitando um limite de 50 requisições simultâneas. Como implementaria?',
        'Qual o custo escondido de usar multiprocessing com objetos grandes?',
        'Qual a diferença entre concorrência e paralelismo?',
        'Como você descobriria por que um script Python está lento? E por que está consumindo muita memória?',
        'Por que operações vetorizadas (NumPy/Polars) são ordens de grandeza mais rápidas que loops Python?',
        'O que muda com o Python free-threaded (sem GIL) para bibliotecas de dados?'
      ]
    },
    {
      id: 'dataframes',
      title: 'Manipulação de dados: pandas, Polars, DuckDB e Arrow',
      summary: 'DataFrames em memória, avaliação lazy, processamento out-of-core e o formato colunar Arrow que conecta tudo.',
      hours: 30,
      why: 'Muitos problemas de "big data" cabem numa máquina com Polars ou DuckDB, por uma fração do custo e da complexidade de um cluster Spark. Saber quando NÃO usar Spark é sinal de senioridade.',
      learn: [
        'pandas: Series/DataFrame, índice, dtypes, groupby, merge, pivot, apply (e por que evitar), operações com datas',
        'Problemas do pandas: memória (~5–10x o tamanho do arquivo), single-thread, dtypes object',
        'Polars: expressions API, lazy vs eager, query optimization, streaming engine',
        'DuckDB: SQL OLAP embarcado; consultar Parquet/CSV/S3 diretamente; integração com pandas/Polars',
        'Apache Arrow: formato colunar em memória, zero-copy, pyarrow, Arrow Flight (conceitual)',
        'Leitura e escrita de Parquet com particionamento',
        'Tipos de dados: categóricos, nullable dtypes, decimal, timestamps com timezone',
        'Joins, janelas e agregações em DataFrames vs SQL',
        'Quando usar pandas vs Polars vs DuckDB vs Spark (volume, latência, time, infraestrutura)'
      ],
      practice: [
        'Processar o dataset NYC Taxi (vários GB) com pandas, Polars e DuckDB e comparar tempo e memória',
        'Reescrever um código pandas cheio de `apply` com expressões vetorizadas do Polars',
        'Consultar arquivos Parquet no S3/GCS diretamente com DuckDB'
      ],
      resources: [
        ['Polars User Guide', 'https://docs.pola.rs/'],
        ['DuckDB docs', 'https://duckdb.org/docs/'],
        ['Apache Arrow – Python', 'https://arrow.apache.org/docs/python/'],
        ['pandas User Guide', 'https://pandas.pydata.org/docs/user_guide/'],
        ['NYC TLC Trip Record Data', 'https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page']
      ],
      questions: [
        'Por que o pandas usa muito mais memória que o tamanho do arquivo CSV? Como reduzir?',
        'Explique a diferença entre avaliação eager e lazy no Polars e o que o otimizador faz com o plano lazy.',
        'O que é o Apache Arrow e por que ele permite troca de dados "zero-copy" entre ferramentas?',
        'Você tem 50GB de Parquet e precisa de uma agregação diária. Spark, DuckDB ou Polars? Justifique.',
        'Por que `df.apply(lambda ...)` é lento e como substituí-lo?',
        'Como o DuckDB consegue consultar Parquet remoto sem baixar o arquivo inteiro?',
        'Quais cuidados ter com timestamps e timezones ao ler e gravar Parquet?'
      ]
    },
    {
      id: 'apis-integracao',
      title: 'Integração com APIs e fontes externas',
      summary: 'Consumo robusto de APIs REST/GraphQL: autenticação, paginação, rate limiting, retries, webhooks, extração incremental e boas práticas de scraping.',
      hours: 15,
      why: 'Ingestão de APIs de SaaS (Salesforce, Stripe, HubSpot) é uma das tarefas mais comuns de um DE, e uma das que mais quebram em produção.',
      learn: [
        'requests vs httpx; sessões e connection pooling',
        'Autenticação: API key, Basic, OAuth 2.0 (client credentials, authorization code), JWT',
        'Paginação: offset, cursor, keyset, links (HATEOAS)',
        'Rate limiting: headers (Retry-After, X-RateLimit), 429, token bucket',
        'Retries com backoff exponencial + jitter (tenacity); quais erros são "retryable"',
        'Extração incremental: `updated_since`, cursores, high-water mark',
        'Webhooks: recebimento, verificação de assinatura, idempotência',
        'Validação de schema da resposta (Pydantic) e tratamento de schema drift',
        'Gerenciamento de segredos (nunca hardcoded)',
        'Web scraping: ética, robots.txt, termos de uso',
        'Construir APIs simples com FastAPI (para servir dados)'
      ],
      practice: [
        'Cliente para uma API pública com paginação por cursor, rate limit e retries, carregando incrementalmente no DuckDB/Postgres',
        'Endpoint FastAPI que serve métricas agregadas de um banco, com testes',
        'Receptor de webhook com verificação HMAC e deduplicação por event id'
      ],
      resources: [
        ['HTTPX', 'https://www.python-httpx.org/'],
        ['Tenacity (retries)', 'https://tenacity.readthedocs.io/'],
        ['OAuth 2.0 simplificado', 'https://www.oauth.com/'],
        ['FastAPI', 'https://fastapi.tiangolo.com/']
      ],
      questions: [
        'Compare paginação por offset e por cursor. Por que offset pode perder ou duplicar registros?',
        'Como você implementaria extração incremental de uma API que só oferece filtro `updated_at`?',
        'Quais códigos HTTP você trataria com retry e quais não? Por quê?',
        'Explique o fluxo OAuth 2.0 client credentials.',
        'Como garantir que um webhook recebido duas vezes não gere dados duplicados?',
        'A API mudou e adicionou/removeu campos sem avisar. Como seu pipeline deveria reagir?',
        'Onde e como você guarda credenciais de API num pipeline de produção?'
      ]
    }
  ],
  project: {
    title: 'Biblioteca de ingestão de APIs, empacotada e testada',
    description: 'Um pacote Python (`pip install`) que extrai dados de 2–3 APIs públicas de forma incremental e grava em Parquet/DuckDB, com qualidade de produção.',
    deliverables: [
      'Pacote em src layout com uv, pyproject, CLI Typer e versão semântica',
      'Conectores plugáveis (Strategy/Protocol) com paginação, rate limit, retries e estado incremental',
      'Validação com Pydantic e dead-letter para registros inválidos',
      'Testes unitários + integração (testcontainers), mypy estrito, ruff, CI no GitHub Actions',
      'Benchmark comparando pandas vs Polars vs DuckDB nas transformações',
      'README em inglês com diagrama de arquitetura e decisões técnicas'
    ]
  }
});
