"use client";

import { SearchBar } from "@/components/search/search-bar";
import { CategorySelect } from "@/components/search/category-select";
import { NextButton } from "@/components/layout/next-button";

export function Header() {
  return (
    <header className="flex shrink-0 items-center gap-4 border-b border-[var(--border)] px-4 py-3">
      <h1 className="text-sm font-semibold tracking-tight">Coding Practice</h1>
      <SearchBar />
      <CategorySelect />
      <div className="ml-auto">
        <NextButton />
      </div>
    </header>
  );
}
