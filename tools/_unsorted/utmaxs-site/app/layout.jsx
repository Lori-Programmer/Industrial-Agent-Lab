import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeBootScript } from "@/components/theme-boot-script";

export const metadata = {
  title: {
    default: "UTMAXS-尤迈 | 工业智能库",
    template: "%s | UTMAXS-尤迈"
  },
  description:
    "UTMAXS-尤迈：自动化专业提供 PLC、通信、仿真、MARL 学习路线、项目模板和开源工具的网站。",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" }
    ],
    apple: [{ url: "/apple-icon.png" }]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans text-slate-950 antialiased dark:text-slate-100">
        <ThemeBootScript />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
