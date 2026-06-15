"use client";

interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function SplitPane({ left, right }: SplitPaneProps) {
  return (
    <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[2fr_3fr]">
      <div className="overflow-y-auto border-r border-[var(--border)] bg-[var(--panel-bg)]">
        {left}
      </div>
      <div className="flex flex-col overflow-hidden">
        {right}
      </div>
    </div>
  );
}
