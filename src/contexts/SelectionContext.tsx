"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Inspiration } from "@/lib/inspirations";

const STORAGE_KEY = "originalfit-selection-v1";

export interface SelectionItem {
  key: string;
  styleId: string;
  name: string;
  category: string;
  badge: string;
  size: string;
  kind: Inspiration["kind"];
  tone: string;
}

interface SelectionContextValue {
  items: SelectionItem[];
  count: number;
  isOpen: boolean;
  addItem: (style: Inspiration, size: string) => "added" | "exists";
  removeItem: (key: string) => void;
  clearSelection: () => void;
  hasItem: (styleId: string, size: string) => boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

function readStoredSelection(): SelectionItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is SelectionItem =>
        Boolean(item) &&
        typeof item.key === "string" &&
        typeof item.styleId === "string" &&
        typeof item.name === "string" &&
        typeof item.size === "string"
    );
  } catch {
    return [];
  }
}

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SelectionItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredSelection());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can be unavailable in private mode — selection still works in memory.
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const addItem = useCallback(
    (style: Inspiration, size: string) => {
      const key = `${style.id}-${size}`;
      if (items.some((item) => item.key === key)) {
        return "exists" as const;
      }

      setItems((current) => {
        if (current.some((item) => item.key === key)) return current;
        return [
          ...current,
          {
            key,
            styleId: style.id,
            name: style.name,
            category: style.category,
            badge: style.badge,
            size,
            kind: style.kind,
            tone: style.tone,
          },
        ];
      });

      return "added" as const;
    },
    [items]
  );

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const clearSelection = useCallback(() => setItems([]), []);

  const hasItem = useCallback(
    (styleId: string, size: string) =>
      items.some((item) => item.key === `${styleId}-${size}`),
    [items]
  );

  const value = useMemo<SelectionContextValue>(
    () => ({
      items,
      count: items.length,
      isOpen,
      addItem,
      removeItem,
      clearSelection,
      hasItem,
      openDrawer: () => setIsOpen(true),
      closeDrawer: () => setIsOpen(false),
    }),
    [items, isOpen, addItem, removeItem, clearSelection, hasItem]
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used inside a SelectionProvider");
  }
  return context;
}
