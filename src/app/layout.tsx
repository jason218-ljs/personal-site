import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: '李俊森 | 个人主页',
    template: '%s | 李俊森',
  },
  description: '南京大学计算机科学与技术（计算机金融实验班）在读（GPA 4.28/5.0），聚焦 AI 应用与大模型 Agent 工程：LLM Agent 应用、AI 可信与不确定性约束、计算几何与在线路径规划、数据分析与工程实现。',
  authors: [{ name: '李俊森' }],
  creator: '李俊森',
  publisher: '李俊森',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    siteName: '李俊森 | 个人主页',
    title: '李俊森 | 个人主页',
    description: '南京大学计算机科学与技术（计算机金融实验班）在读（GPA 4.28/5.0），聚焦 AI 应用与大模型 Agent 工程：LLM Agent 应用、AI 可信与不确定性约束、计算几何与在线路径规划、数据分析与工程实现。',
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '李俊森 | 个人主页',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '李俊森 | 个人主页',
    description: '南京大学计算机科学与技术（计算机金融实验班）在读（GPA 4.28/5.0），聚焦 AI 应用与大模型 Agent 工程。',
    images: ['/assets/images/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
