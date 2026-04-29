"use client";

import { useState, useCallback } from "react";
import type { ContactFormData } from "@/types";

interface FormState {
  data: ContactFormData;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const INITIAL: ContactFormData = { name: "", phone: "", email: "" };

export function useContactForm() {
  const [state, setState] = useState<FormState>({
    data: INITIAL,
    loading: false,
    success: false,
    error: null,
  });

  const setField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setState((prev) => ({
        ...prev,
        data: { ...prev.data, [field]: value },
        error: null,
      }));
    },
    []
  );

  const validate = (data: ContactFormData): string | null => {
    if (!data.name.trim()) return "Name is required.";
    if (!/^\+?[\d\s\-]{8,}$/.test(data.phone)) return "Enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      return "Enter a valid email address.";
    return null;
  };

  const submit = useCallback(async () => {
    const error = validate(state.data);
    if (error) {
      setState((prev) => ({ ...prev, error }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    // Simulate API call — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1200));

    setState({ data: INITIAL, loading: false, success: true, error: null });
  }, [state.data]);

  const reset = useCallback(() => {
    setState({ data: INITIAL, loading: false, success: false, error: null });
  }, []);

  return { ...state, setField, submit, reset };
}
