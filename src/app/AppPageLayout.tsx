import type { ReactNode } from "react";

type AppPageLayoutProps = {
  actions?: ReactNode;
  children?: ReactNode;
  title: string;
};

export function AppPageLayout({
  actions,
  children,
  title,
}: AppPageLayoutProps) {
  return (
    <section className="mx-auto w-full max-w-[76.375rem] px-10 pt-7">
      <div className="flex min-h-12 items-center justify-between gap-6">
        <h1 className="shrink-0 whitespace-nowrap text-4xl leading-none font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {actions}
      </div>
      {children}
    </section>
  );
}
