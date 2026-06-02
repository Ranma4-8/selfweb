import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthButton from "@/components/AuthButton";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
    <html lang="zh-CN" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-800 font-sans">
        <Navbar authButton={<AuthButton />} />
        <main className="flex-1 pt-16">{children}</main>
        <footer className="bg-amber-50 border-t border-amber-100 py-8 text-center text-sm text-stone-500">
          <p>© 2024 晴间有云 · 用文字留住流逝的时光</p>
        </footer>
      </body>
    </html>
  );
}
