export default function Footer() {
  return (
    <footer className="border-t border-border py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-lg gold-text font-bold">Alnora</p>
            <p className="font-body text-sm text-muted-foreground mt-1">
              A curated journey through the ages of art
            </p>
          </div>
          <p className="font-body text-sm text-muted-foreground">
            © {new Date().getFullYear()} Alnora. All masterpieces within.
          </p>
        </div>
      </div>
    </footer>
  );
}
