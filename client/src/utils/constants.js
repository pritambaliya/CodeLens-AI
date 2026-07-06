export const SUPPORTED_LANGUAGES = [
  // C / C++
  { value: 'c', label: 'C', extension: '.c' },
  { value: 'cpp', label: 'C++', extension: '.cpp' },

  // Java
  { value: 'java', label: 'Java', extension: '.java' },

  // Python
  { value: 'python', label: 'Python', extension: '.py' },

  // JavaScript / TypeScript
  { value: 'javascript', label: 'JavaScript', extension: '.js' },
  { value: 'typescript', label: 'TypeScript', extension: '.ts' },

  // Web
  { value: 'html', label: 'HTML', extension: '.html' },
  { value: 'css', label: 'CSS', extension: '.css' },
  { value: 'scss', label: 'SCSS', extension: '.scss' },
  { value: 'less', label: 'LESS', extension: '.less' },

  // Data
  { value: 'json', label: 'JSON', extension: '.json' },
  { value: 'xml', label: 'XML', extension: '.xml' },
  { value: 'yaml', label: 'YAML', extension: '.yaml' },
  { value: 'markdown', label: 'Markdown', extension: '.md' },

  // JVM Languages
  { value: 'kotlin', label: 'Kotlin', extension: '.kt' },
  { value: 'scala', label: 'Scala', extension: '.scala' },

  // Microsoft
  { value: 'csharp', label: 'C#', extension: '.cs' },
  { value: 'vb', label: 'Visual Basic', extension: '.vb' },

  // Systems
  { value: 'go', label: 'Go', extension: '.go' },
  { value: 'rust', label: 'Rust', extension: '.rs' },
  { value: 'swift', label: 'Swift', extension: '.swift' },

  // Scripting
  { value: 'php', label: 'PHP', extension: '.php' },
  { value: 'ruby', label: 'Ruby', extension: '.rb' },
  { value: 'perl', label: 'Perl', extension: '.pl' },
  { value: 'lua', label: 'Lua', extension: '.lua' },
  { value: 'powershell', label: 'PowerShell', extension: '.ps1' },
  { value: 'shell', label: 'Shell', extension: '.sh' },

  // Functional
  { value: 'haskell', label: 'Haskell', extension: '.hs' },
  { value: 'fsharp', label: 'F#', extension: '.fs' },
  { value: 'clojure', label: 'Clojure', extension: '.clj' },

  // Database
  { value: 'sql', label: 'SQL', extension: '.sql' },

  // Others
  { value: 'r', label: 'R', extension: '.r' },
  { value: 'dart', label: 'Dart', extension: '.dart' },
  { value: 'objectivec', label: 'Objective-C', extension: '.m' },
  { value: 'pascal', label: 'Pascal', extension: '.pas' },
  { value: 'dockerfile', label: 'Dockerfile', extension: '.dockerfile' },
  { value: 'graphql', label: 'GraphQL', extension: '.graphql' },
  { value: 'apex', label: 'Apex', extension: '.cls' },
  { value: 'bat', label: 'Batch', extension: '.bat' },
  { value: 'plaintext', label: 'Plain Text', extension: '.txt' },
];

export const SUPPORTED_EXTENSIONS = [
  // C / C++
  '.c',
  '.cpp',
  '.cc',
  '.cxx',
  '.h',
  '.hpp',

  // Java
  '.java',

  // Python
  '.py',

  // JavaScript / TypeScript
  '.js',
  '.mjs',
  '.cjs',
  '.jsx',
  '.ts',
  '.tsx',

  // Web
  '.html',
  '.htm',
  '.css',
  '.scss',
  '.sass',
  '.less',

  // Data
  '.json',
  '.xml',
  '.yaml',
  '.yml',

  // PHP
  '.php',

  // C#
  '.cs',

  // Go
  '.go',

  // Rust
  '.rs',

  // Swift
  '.swift',

  // Kotlin
  '.kt',
  '.kts',

  // Dart
  '.dart',

  // Ruby
  '.rb',

  // Perl
  '.pl',

  // Lua
  '.lua',

  // Shell
  '.sh',
  '.bash',
  '.zsh',

  // PowerShell
  '.ps1',

  // SQL
  '.sql',

  // R
  '.r',

  // Scala
  '.scala',

  // Haskell
  '.hs',

  // Objective-C
  '.m',
  '.mm',

  // Pascal
  '.pas',

  // Visual Basic
  '.vb',

  // Markdown
  '.md',

  // Docker
  '.dockerfile',

  // GraphQL
  '.graphql',
  '.gql',

  // Plain text
  '.txt',

  // Config files
  '.ini',
  '.toml',
  '.env',
];

export const MONACO_LANGUAGE_MAP = {
  // Web
  javascript: "javascript",
  typescript: "typescript",
  html: "html",
  css: "css",
  scss: "scss",
  less: "less",
  json: "json",
  xml: "xml",
  yaml: "yaml",
  markdown: "markdown",

  // C / C++
  c: "c",
  cpp: "cpp",

  // JVM
  java: "java",
  kotlin: "kotlin",
  scala: "scala",

  // Python
  python: "python",

  // Microsoft
  csharp: "csharp",
  vb: "vb",

  // Systems
  rust: "rust",
  go: "go",
  swift: "swift",

  // Scripting
  php: "php",
  ruby: "ruby",
  perl: "perl",
  lua: "lua",
  powershell: "powershell",
  shell: "shell",

  // Functional
  haskell: "haskell",
  fsharp: "fsharp",
  clojure: "clojure",

  // Database
  sql: "sql",

  // Others
  r: "r",
  dart: "dart",
  objectivec: "objective-c",
  pascal: "pascal",
  plaintext: "plaintext",
  ini: "ini",
  dockerfile: "dockerfile",
  graphql: "graphql",
  apex: "apex",
  bat: "bat",
};

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Highlights', href: '#highlights' },
];