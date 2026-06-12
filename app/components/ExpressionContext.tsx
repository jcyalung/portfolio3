"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type ExpressionKey = "neutral1" | "happy1" | "happy2";

interface ExpressionContextValue {
  /** Expression currently shown (hover takes priority over pinned). */
  active: ExpressionKey;
  /** Temporary expression while hovering something; pass null to clear. */
  setHovered: (expression: ExpressionKey | null) => void;
  /** Sticky expression (e.g. set when the model is clicked). */
  setPinned: (expression: ExpressionKey) => void;
}

const ExpressionContext = createContext<ExpressionContextValue | null>(null);

const DEFAULT_EXPRESSION: ExpressionKey = "neutral1";

export function ExpressionProvider({ children }: { children: ReactNode }) {
  const [pinned, setPinned] = useState<ExpressionKey>(DEFAULT_EXPRESSION);
  const [hovered, setHovered] = useState<ExpressionKey | null>(null);

  const active = hovered ?? pinned;

  return (
    <ExpressionContext.Provider value={{ active, setHovered, setPinned }}>
      {children}
    </ExpressionContext.Provider>
  );
}

export function useExpression(): ExpressionContextValue {
  const ctx = useContext(ExpressionContext);
  if (!ctx) {
    throw new Error("useExpression must be used within an ExpressionProvider");
  }
  return ctx;
}
