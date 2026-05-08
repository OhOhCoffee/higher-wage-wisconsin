export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-400">
      <div className="max-w-6xl mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} Higher Wage Wisconsin. All rights reserved.</p>
      </div>
    </footer>
  );
}
