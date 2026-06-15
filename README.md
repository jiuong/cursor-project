# Coding Practice AI Agent

Session-scoped algorithm practice app with keyword search, category filtering, AI-generated quizzes, and an in-browser coding workspace.

## File Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main practice page
│   ├── globals.css         # Global styles
│   └── api/                # API routes
│       ├── search/         # Keyword + category search
│       ├── quiz/           # Quiz generation & navigation
│       └── run/            # Code execution & test runner
├── components/             # React UI components
│   ├── layout/             # Page shell, split pane, header
│   ├── search/             # Search bar, category dropdown
│   ├── question/           # Question panel (left block)
│   └── workspace/          # Code editor, test results (right block)
├── hooks/                  # Custom React hooks
├── lib/                    # Business logic & utilities
│   ├── agent/              # AI quiz generation pipeline
│   ├── runner/               # Code sandbox & test harness
│   └── search/             # Question bank indexing
├── types/                  # Shared TypeScript types
├── data/                   # Static question bank
└── store/                  # Zustand session store
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Requirements

1. Keyword search for algorithm questions
2. Category dropdown filter (12 DSA categories)
3. Remember selection → generate quiz
4. Split layout: question (left) + code workspace (right)
5. Next button to switch quizzes
6. Session reset on every page open
