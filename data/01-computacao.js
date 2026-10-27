window.ROADMAP_PHASES.push({
  id: 'computacao',
  num: 1,
  level: 'junior',
  title: 'Fundamentos de computação',
  duration: '8–10 semanas',
  summary: 'Como computadores, sistemas operacionais, Linux, redes e Git funcionam por baixo, mais estruturas de dados e algoritmos. É o que separa quem só usa ferramentas de quem entende o que elas fazem.',
  why: 'Spark, Kafka e bancos de dados são, no fim, gerenciamento de memória, disco, rede e concorrência. Sem essa base, tuning e debugging viram tentativa e erro. Empresas de ponta também cobram algoritmos em entrevista.',
  outcomes: [
    'Explicar a hierarquia de memória e as ordens de grandeza de latência (cache, RAM, SSD, rede)',
    'Trabalhar com fluência no terminal Linux e automatizar tarefas com shell script',
    'Explicar o que acontece numa requisição HTTPS, do DNS à resposta',
    'Usar Git com confiança: rebase, resolução de conflitos, histórico limpo',
    'Resolver problemas LeetCode Easy/Medium dos padrões mais comuns'
  ],
  topics: [
    {
      id: 'arquitetura-computadores',
      title: 'Como computadores funcionam',
      summary: 'CPU, hierarquia de memória, disco, representação de dados (bits, encoding, ponto flutuante) e os "latency numbers every programmer should know".',
      hours: 20,
      why: 'Formatos colunares, vetorização, compressão e o custo de shuffle só fazem sentido se você sabe quanto custa ler da RAM, do SSD ou da rede.',
      learn: [
        'CPU: ciclo fetch-decode-execute, cores, threads de hardware, pipelining (conceitual)',
        'Hierarquia de memória: registradores → L1/L2/L3 → RAM → SSD → HDD → rede',
        'Latency numbers: ordens de grandeza (ns, µs, ms) de cada nível',
        'Localidade espacial e temporal: por que dados contíguos (colunar) são mais rápidos',
        'SIMD/vetorização: processar vários valores por instrução (base do DuckDB, Polars, Photon)',
        'Leitura sequencial vs aleatória em disco e em SSD',
        'Representação: binário, hexadecimal, inteiros com e sem sinal, overflow',
        'Ponto flutuante IEEE 754: por que 0.1 + 0.2 != 0.3 e por que dinheiro usa DECIMAL',
        'Encoding de texto: ASCII, Unicode, UTF-8, UTF-16, e problemas de encoding em ingestão',
        'Endianness e serialização binária (conceitual)',
        'Compressão: entropia, dicionário, run-length (intuição)'
      ],
      practice: [
        'Medir em Python o tempo de somar uma lista de 10M itens vs um array NumPy e explicar a diferença',
        'Ler um CSV com encoding latin-1 errado, reproduzir o "mojibake" e corrigir',
        'Montar sua tabela de latency numbers e decorá-la (Anki)'
      ],
      resources: [
        ['Latency Numbers Every Programmer Should Know', 'https://gist.github.com/jboner/2841832'],
        ['Livro: Computer Systems – A Programmer\'s Perspective', 'https://csapp.cs.cmu.edu/'],
        ['Crash Course Computer Science (YouTube)', 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo'],
        ['What Every Programmer Should Know About Floating-Point', 'https://floating-point-gui.de/']
      ],
      questions: [
        'Ordene por latência e dê a ordem de grandeza: L1 cache, RAM, SSD random read, round-trip no mesmo datacenter, round-trip Brasil–Europa.',
        'Por que formatos colunares são mais eficientes para queries analíticas, do ponto de vista de hardware?',
        'O que é vetorização (SIMD) e por que engines como DuckDB e Polars são tão rápidas?',
        'Por que nunca se deve armazenar valores monetários como FLOAT? Qual tipo usar?',
        'Qual a diferença entre Unicode e UTF-8? O que acontece quando você lê UTF-8 como Latin-1?',
        'Por que leitura sequencial é muito mais rápida que leitura aleatória, mesmo em SSD?',
        'O que é localidade de referência e como ela afeta o desempenho de um loop sobre uma matriz?'
      ]
    },
    {
      id: 'sistemas-operacionais',
      title: 'Sistemas operacionais',
      summary: 'Processos, threads, memória virtual, sistemas de arquivos, I/O e page cache: os conceitos por trás de cada executor Spark e cada broker Kafka.',
      hours: 25,
      why: 'OOM kills, spill para disco, file descriptors esgotados e contenção de I/O são incidentes reais de produção. Entender o SO é o que permite diagnosticá-los.',
      learn: [
        'Processo vs thread vs corrotina; espaço de endereçamento',
        'Escalonamento, context switch e seu custo',
        'Memória virtual, paginação, swap e o OOM killer do Linux',
        'Stack vs heap; vazamento de memória',
        'System calls: o que são (read, write, fork, exec, mmap)',
        'File systems: inodes, blocos, journaling; por que muitos arquivos pequenos são ruins',
        'Page cache do SO e por que o Kafka depende dele',
        'I/O bloqueante vs não-bloqueante vs assíncrono; epoll (conceitual)',
        'Zero-copy (sendfile) e uso no Kafka',
        'Concorrência: race conditions, mutex, semáforos, deadlock (condições de Coffman)',
        'Sinais (SIGTERM, SIGKILL) e graceful shutdown',
        'File descriptors e limites (ulimit)',
        'cgroups e namespaces: a base dos containers'
      ],
      practice: [
        'Escrever um programa Python com race condition entre threads e corrigi-lo com Lock',
        'Usar `top`, `htop`, `free`, `vmstat`, `iostat` e `lsof` para observar um processo pesado',
        'Provocar um OOM num container Docker com limite de memória e ler o motivo no `dmesg`/`docker inspect`'
      ],
      resources: [
        ['Livro gratuito: Operating Systems – Three Easy Pieces (OSTEP)', 'https://pages.cs.wisc.edu/~remzi/OSTEP/'],
        ['MIT 6.1810 Operating System Engineering', 'https://pdos.csail.mit.edu/6.1810/'],
        ['Linux Performance – Brendan Gregg', 'https://www.brendangregg.com/linuxperf.html']
      ],
      questions: [
        'Qual a diferença entre processo e thread? Por que o Spark usa processos (executors) e threads (tasks)?',
        'O que é memória virtual? O que acontece quando um processo usa mais memória do que o container permite?',
        'O que é um context switch e por que milhares de threads podem degradar o desempenho?',
        'Explique as quatro condições necessárias para deadlock e como prevenir uma delas.',
        'Por que o Kafka consegue alto throughput lendo do "disco"? Explique page cache e zero-copy.',
        'Qual a diferença entre SIGTERM e SIGKILL? Por que isso importa para jobs de dados em Kubernetes?',
        'Por que milhões de arquivos pequenos degradam um sistema de arquivos (e o HDFS/S3)?',
        'O que são cgroups e namespaces e qual a relação deles com Docker?'
      ]
    },
    {
      id: 'linux-shell',
      title: 'Linux e shell',
      summary: 'Fluência total no terminal: navegação, pipes, grep/sed/awk, permissões, processos, SSH, cron e shell scripting robusto.',
      hours: 25,
      why: 'Todo servidor, container e cluster de dados roda Linux. Em incidente de produção não existe interface gráfica, só terminal.',
      learn: [
        'Hierarquia de diretórios (/etc, /var, /tmp, /home, /proc)',
        'Navegação e manipulação de arquivos: ls, cd, cp, mv, rm, find, du, df',
        'Redirecionamento (>, >>, 2>&1) e pipes (|)',
        'Processamento de texto: cat, head, tail -f, grep, sed, awk, cut, sort, uniq, wc, xargs, jq',
        'Permissões: chmod, chown, usuários, grupos, sudo',
        'Processos: ps, top/htop, kill, nohup, &, jobs, systemd/systemctl',
        'Variáveis de ambiente, PATH, .bashrc, export',
        'SSH: chaves, config, tunelamento, scp/rsync',
        'Cron: sintaxe e limitações (por que não é orquestrador)',
        'Shell script: shebang, `set -euo pipefail`, funções, loops, condicionais, exit codes',
        'Ferramentas de rede: curl, wget, ping, dig, netstat/ss, nc',
        'Compressão e arquivos: tar, gzip, zstd',
        'Editor no terminal: vim ou nano (o básico de vim é obrigatório)'
      ],
      practice: [
        'Usar Linux no dia a dia (WSL2 no Windows) como ambiente de desenvolvimento principal',
        'Script bash que baixa um dataset, valida o checksum, descompacta e conta linhas, com tratamento de erro',
        'One-liner com awk/sort/uniq que encontra os 10 IPs com mais requisições num access log',
        'Configurar acesso SSH por chave a uma VM na cloud (free tier)'
      ],
      resources: [
        ['The Missing Semester of Your CS Education (MIT)', 'https://missing.csail.mit.edu/'],
        ['The Linux Command Line (livro gratuito)', 'https://linuxcommand.org/tlcl.php'],
        ['explainshell.com', 'https://explainshell.com/'],
        ['OverTheWire: Bandit (jogo de terminal)', 'https://overthewire.org/wargames/bandit/']
      ],
      questions: [
        'O que `set -euo pipefail` faz em um script bash e por que deveria estar em todo script de produção?',
        'Como você encontraria os 10 maiores arquivos de um diretório recursivamente?',
        'Explique `2>&1` e a diferença entre `cmd > out 2>&1` e `cmd 2>&1 > out`.',
        'Como acompanhar um log em tempo real filtrando apenas linhas com "ERROR"?',
        'O que significa a permissão 750? Como você daria permissão de execução só ao dono?',
        'Por que cron não é suficiente para orquestrar pipelines de dados?',
        'Como você descobriria qual processo está escutando na porta 8080?',
        'Como copiar um diretório grande para outro servidor retomando de onde parou se a conexão cair?'
      ]
    },
    {
      id: 'redes',
      title: 'Redes de computadores',
      summary: 'TCP/IP, DNS, HTTP/HTTPS, TLS, REST, gRPC, load balancers, proxies e os conceitos de rede usados em cloud (VPC, subnets, NAT).',
      hours: 20,
      why: 'Metade dos problemas de pipeline em cloud é de rede: timeouts, DNS, firewall, private endpoints, egress caro. Arquitetos precisam desenhar redes seguras.',
      learn: [
        'Modelo TCP/IP em camadas e onde cada protocolo vive',
        'IP, portas, CIDR (ex.: 10.0.0.0/16), IPs públicos vs privados',
        'TCP vs UDP: handshake, garantias, controle de fluxo/congestionamento',
        'DNS: resolução, registros A/CNAME, TTL, problemas comuns',
        'HTTP: métodos, status codes, headers, idempotência de métodos, keep-alive, HTTP/2 e HTTP/3',
        'TLS/HTTPS: certificados, handshake (conceitual), mTLS',
        'REST vs gRPC (Protobuf, streaming) vs GraphQL vs WebSockets',
        'Load balancers L4 vs L7, reverse proxy, CDN',
        'NAT, firewall, security groups, VPN',
        'Latência vs largura de banda vs throughput; custo de egress em cloud',
        'Timeouts, retries com backoff exponencial + jitter, circuit breaker'
      ],
      practice: [
        'Usar `curl -v` e explicar cada linha da saída de uma requisição HTTPS',
        'Usar `dig` para seguir a resolução DNS de um domínio',
        'Escrever um cliente HTTP em Python com timeout, retry exponencial com jitter e tratamento de 429'
      ],
      resources: [
        ['High Performance Browser Networking (gratuito)', 'https://hpbn.co/'],
        ['Beej\'s Guide to Network Programming', 'https://beej.us/guide/bgnet/'],
        ['How DNS works (quadrinho)', 'https://howdns.works/'],
        ['AWS: Exponential Backoff and Jitter', 'https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/']
      ],
      questions: [
        'Descreva tudo o que acontece quando você roda `curl https://api.empresa.com/dados`.',
        'Qual a diferença entre TCP e UDP? Por que o Kafka usa TCP?',
        'O que significa 10.0.0.0/16? Quantos endereços ele contém?',
        'Quais métodos HTTP são idempotentes e por que isso importa para retries?',
        'Por que retries precisam de backoff exponencial com jitter? O que acontece sem jitter?',
        'Quando você usaria gRPC em vez de REST?',
        'Qual a diferença entre um load balancer L4 e um L7?',
        'Por que transferir dados entre regiões ou para fora da cloud pode ser caro, e como mitigar isso?'
      ]
    },
    {
      id: 'git',
      title: 'Git e colaboração',
      summary: 'Git por dentro (commits, árvores, refs), branching, merge vs rebase, resolução de conflitos, pull requests e fluxos de trabalho em time.',
      hours: 12,
      why: 'Todo código de dados (dbt, DAGs, IaC) vive no Git. Histórico limpo e PRs bem escritos são vistos por recrutadores no seu GitHub e por colegas todo dia.',
      learn: [
        'Modelo interno: blobs, trees, commits, refs, HEAD',
        'Staging area, commit, log, diff, show',
        'Branches, merge (fast-forward vs 3-way), rebase e rebase interativo',
        'Resolução de conflitos',
        'reset (soft/mixed/hard), revert, restore, reflog para recuperar trabalho perdido',
        'Remotes: fetch vs pull, push, upstream, forks',
        'Fluxos: trunk-based development vs GitFlow',
        'Pull requests: PRs pequenos, descrição, code review',
        'Conventional Commits e versionamento semântico',
        '.gitignore, git-lfs, nunca commitar segredos (e o que fazer se acontecer)',
        'Hooks e pre-commit'
      ],
      practice: [
        'Completar o Learn Git Branching inteiro',
        'Simular um conflito de merge entre duas branches e resolvê-lo',
        'Usar `git reflog` para recuperar um commit "perdido" após `reset --hard`',
        'Configurar `pre-commit` com ruff e detecção de segredos num repositório'
      ],
      resources: [
        ['Pro Git (livro oficial gratuito)', 'https://git-scm.com/book/en/v2'],
        ['Learn Git Branching (interativo)', 'https://learngitbranching.js.org/'],
        ['Conventional Commits', 'https://www.conventionalcommits.org/'],
        ['pre-commit', 'https://pre-commit.com/']
      ],
      questions: [
        'O que é um commit internamente no Git? O que é HEAD?',
        'Qual a diferença entre merge e rebase? Quando você NÃO deveria fazer rebase?',
        'Qual a diferença entre `git reset --soft`, `--mixed` e `--hard`?',
        'Você deu `reset --hard` e perdeu commits. Como recupera?',
        'Qual a diferença entre `git fetch` e `git pull`?',
        'Você commitou uma chave de API e deu push. Quais são os passos corretos (em ordem)?',
        'Por que PRs pequenos são melhores? O que uma boa descrição de PR contém?',
        'Compare trunk-based development e GitFlow. Qual é mais adequado para times de dados com CI/CD?'
      ]
    },
    {
      id: 'dsa',
      title: 'Estruturas de dados e algoritmos',
      summary: 'Complexidade Big-O, arrays, hash maps, árvores, heaps, grafos, ordenação, busca e os padrões que aparecem em entrevistas.',
      hours: 80,
      why: 'Big techs e boa parte das empresas internacionais aplicam rodada de coding (LeetCode) também para Data Engineers. Além disso, B-trees, hash joins e DAGs são estruturas de dados aplicadas.',
      learn: [
        'Notação Big-O: tempo e espaço; melhor, médio e pior caso; complexidade amortizada',
        'Arrays e arrays dinâmicos; strings',
        'Hash maps e hash sets: funcionamento, colisões, load factor',
        'Listas ligadas, pilhas, filas, deques',
        'Árvores: binária, BST, balanceadas, B-tree/B+tree (conceitual), trie',
        'Heaps e priority queues: top-K',
        'Grafos: representação, BFS, DFS, ordenação topológica (a base dos DAGs), detecção de ciclos',
        'Ordenação: quicksort, mergesort, external merge sort (dados maiores que a memória)',
        'Busca binária e variações',
        'Padrões: two pointers, sliding window, prefix sum, hashing, BFS/DFS, backtracking, intervalos, top-K',
        'Programação dinâmica (noções e problemas clássicos)',
        'Estruturas probabilísticas: Bloom filter, HyperLogLog, Count-Min Sketch',
        'Como se comunicar numa entrevista de coding: clarificar, propor, codar, testar'
      ],
      practice: [
        'Resolver o NeetCode 150 (ou no mínimo o Blind 75), em Python',
        'Implementar do zero: hash map, LRU cache, min-heap, ordenação topológica',
        'Implementar external merge sort para ordenar um arquivo de 5GB com 512MB de RAM',
        'Implementar um Bloom filter e medir a taxa de falsos positivos'
      ],
      resources: [
        ['NeetCode Roadmap', 'https://neetcode.io/roadmap'],
        ['LeetCode', 'https://leetcode.com/'],
        ['Tech Interview Handbook – Algorithms', 'https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/'],
        ['Livro: Grokking Algorithms', 'https://www.manning.com/books/grokking-algorithms-second-edition']
      ],
      questions: [
        'Qual a complexidade de busca, inserção e remoção em hash map, BST balanceada e array ordenado?',
        'Como um hash map lida com colisões? O que acontece quando o load factor fica alto?',
        'Como encontrar os top-K elementos mais frequentes de um stream enorme? Qual a complexidade?',
        'Explique ordenação topológica e como ela se relaciona com a execução de um DAG no Airflow.',
        'Como ordenar um arquivo de 100GB numa máquina com 8GB de RAM?',
        'Implemente (mentalmente ou no papel) um LRU cache com O(1) em get e put. Quais estruturas usar?',
        'O que é um Bloom filter, qual a sua garantia (falso positivo ou falso negativo?) e onde ele é usado em sistemas de dados?',
        'Como detectar um ciclo num grafo dirigido?',
        'Quando usar sliding window vs two pointers? Dê um problema típico de cada.'
      ]
    }
  ],
  project: {
    title: 'CLI de análise de logs em Python + Bash',
    description: 'Ferramenta de linha de comando que processa arquivos de log grandes (GBs) em streaming, sem carregar tudo na memória, e gera estatísticas.',
    deliverables: [
      'Script bash que baixa logs públicos (ex.: NASA HTTP logs) com validação e retries',
      'CLI Python que lê em streaming e calcula top IPs, p95 de tamanho de resposta e erros por hora',
      'Top-K com heap e contagem aproximada de IPs únicos com HyperLogLog (implementação própria)',
      'Testes automatizados e README em inglês com instruções e benchmark de memória/tempo',
      'Histórico Git limpo com Conventional Commits e PRs no próprio repositório'
    ]
  }
});
