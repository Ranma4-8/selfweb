import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthButton from "@/components/AuthButton";

export const metadata: Metadata = {
  title: "晴间有云 — 记录生活的碎片",
  description: "一个记录日常生活、思考与旅行的个人网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-[#1d1d1f]">
        <Navbar authButton={<AuthButton />} />
        <main className="flex-1 pt-12">{children}</main>
        <footer className="bg-[#f5f5f7] border-t border-black/10 py-8">
          <div className="max-w-[980px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#6e6e73]">© 2026 晴间有云</p>
            <nav className="flex items-center gap-6">
              <a href="/blog" className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">博客</a>
              <a href="/gallery" className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">相册</a>
              <a href="/about" className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">关于</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
