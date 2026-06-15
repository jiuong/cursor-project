import { create } from "zustand";
import type { Category, Quiz, TestResult } from "@/types";

export interface SessionState {
  keywords: string;
  category: Category | null;
  currentQuiz: Quiz | null;
  seenQuizIds: string[];
  editorCode: string;
  testResults: TestResult[];
  isGenerating: boolean;
  isRunning: boolean;
}

export interface SessionActions {
  setKeywords: (keywords: string) => void;
  setCategory: (category: Category | null) => void;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  addSeenQuizId: (id: string) => void;
  setEditorCode: (code: string) => void;
  setTestResults: (results: TestResult[]) => void;
  setIsGenerating: (value: boolean) => void;
  setIsRunning: (value: boolean) => void;
  resetSession: () => void;
}

const initialState: SessionState = {
  keywords: "",
  category: null,
  currentQuiz: null,
  seenQuizIds: [],
  editorCode: "",
  testResults: [],
  isGenerating: false,
  isRunning: false,
};

export const useSessionStore = create<SessionState & SessionActions>((set) => ({
  ...initialState,

  setKeywords: (keywords) => set({ keywords }),
  setCategory: (category) => set({ category }),
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  addSeenQuizId: (id) =>
    set((state) => ({
      seenQuizIds: state.seenQuizIds.includes(id)
        ? state.seenQuizIds
        : [...state.seenQuizIds, id],
    })),
  setEditorCode: (code) => set({ editorCode: code }),
  setTestResults: (results) => set({ testResults: results }),
  setIsGenerating: (value) => set({ isGenerating: value }),
  setIsRunning: (value) => set({ isRunning: value }),

  resetSession: () => set(initialState),
}));
