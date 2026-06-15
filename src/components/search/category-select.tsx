"use client";

import { useSessionStore } from "@/store/session-store";
import { useQuizActions } from "@/hooks";
import { CATEGORIES } from "@/types";
import type { Category } from "@/types";

export function CategorySelect() {
  const category = useSessionStore((s) => s.category);
  const setCategory = useSessionStore((s) => s.setCategory);
  const { generateQuiz } = useQuizActions();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selected = value === "" ? null : (value as Category);
    setCategory(selected);
    generateQuiz({ category: selected });
  };

  return (
    <select
      value={category ?? ""}
      onChange={handleChange}
      className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm outline-none focus:border-[var(--accent)]"
    >
      <option value="">All categories</option>
      {CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
