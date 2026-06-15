"use client";

import { Header } from "@/components/layout/header";
import { SplitPane } from "@/components/layout/split-pane";
import { QuestionPanel } from "@/components/question/question-panel";
import { CodeWorkspace } from "@/components/workspace/code-workspace";
import { useSessionInit } from "@/hooks";

export default function PracticePage() {
  useSessionInit();

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <SplitPane
        left={<QuestionPanel />}
        right={<CodeWorkspace />}
      />
    </div>
  );
}
