import type { ReactNode } from "react";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";

export function PageHeader({ title, summary, children }: { title: string; summary?: string; children?: ReactNode }) {
  return (
    <div className="page-header">
      <div className="container">
        <Breadcrumbs currentTitle={title} />
        <h1 className="page-header__title">{title}</h1>
        {summary && <p className="page-header__summary">{summary}</p>}
        {children}
      </div>
    </div>
  );
}
