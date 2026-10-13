"use client";

import { useState } from "react";
import styles from "./identity-guide.module.css";

export function CopyValue({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return <div className={styles.copyControl}>
    <button type="button" onClick={copy} aria-label={label}>{status === "copied" ? "Copiado" : "Copiar"}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M15 8V4H4v11h4" /></svg></button>
    <span role="status" className={status === "failed" ? styles.copyError : styles.hidden}>{status === "copied" ? "Copiado para a área de transferência." : status === "failed" ? "Não foi possível copiar. Selecione o código apresentado e copie manualmente." : ""}</span>
  </div>;
}
