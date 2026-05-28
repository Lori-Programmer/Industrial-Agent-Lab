export function ThemeBootScript() {
  const code = `
    try {
      var saved = localStorage.getItem('utmaxs-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
      }
    } catch (error) {}
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
