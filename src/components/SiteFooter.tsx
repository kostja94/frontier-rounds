export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-xs leading-relaxed text-muted-foreground md:flex-row md:items-start md:justify-between md:px-10">
        <p className="max-w-lg">
          Frontier Rounds tracks disclosed equity rounds for companies whose primary product is
          built on machine learning. Each round links to its primary source.
        </p>
        <p className="max-w-sm">
          Methodology: disclosed equity rounds for companies whose primary product is built on
          machine learning, converted to USD at the announcement date.
        </p>
      </div>
    </footer>
  );
}
