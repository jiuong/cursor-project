coding-practice-agent/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── README.md
│
└── src/
    ├── app/                              # Next.js App Router
    │   ├── layout.tsx                    # Root layout + metadata
    │   ├── page.tsx                      # Main practice page (Req #4, #6)
    │   ├── globals.css                   # Global styles
    │   └── api/
    │       ├── search/route.ts           # POST — keyword + category search (Req #1)
    │       ├── quiz/
    │       │   ├── generate/route.ts     # POST — generate quiz from filters (Req #3)
    │       │   └── next/route.ts         # POST — next unseen quiz (Req #5)
    │       └── run/route.ts              # POST — execute code + run tests (Req #4)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── header.tsx                # Top bar: search + category + Next
    │   │   ├── split-pane.tsx            # Two-column horizontal layout (Req #4)
    │   │   └── next-button.tsx           # Next quiz button (Req #5)
    │   ├── search/
    │   │   ├── search-bar.tsx            # Debounced keyword input (Req #1)
    │   │   └── category-select.tsx       # Category dropdown (Req #2)
    │   ├── question/
    │   │   └── question-panel.tsx        # Left block: problem + examples
    │   └── workspace/
    │       ├── code-workspace.tsx        # Right block: editor + run + results
    │       ├── monaco-editor.tsx         # Monaco code editor
    │       └── test-results.tsx          # Pass/fail test output
    │
    ├── hooks/
    │   ├── use-session-init.ts           # Reset state on mount (Req #6)
    │   ├── use-quiz-actions.ts           # generateQuiz / nextQuiz
    │   └── use-code-runner.ts            # runTests
    │
    ├── lib/
    │   ├── search/
    │   │   └── question-index.ts         # Fuse.js fuzzy search + filters
    │   ├── agent/
    │   │   └── quiz-generator.ts         # Quiz generation pipeline (Phase 3)
    │   └── runner/
    │       └── code-runner.ts            # Sandbox test execution (Phase 4)
    │
    ├── store/
    │   └── session-store.ts              # Zustand ephemeral session state
    │
    ├── types/
    │   ├── index.ts                      # Quiz, TestCase, Category, etc.
    │   └── schemas.ts                    # Zod validation schemas
    │
    └── data/
        └── question-bank.ts              # Seed question corpus
