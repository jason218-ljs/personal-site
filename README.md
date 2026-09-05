# 个人学术简历网站

基于 Next.js 14 + TypeScript + Tailwind CSS 构建的个人学术主页，支持中英双语、静态生成、Vercel 部署。

## ✨ 特性

- 🌐 **中英双语** - 基于路由的 i18n (`/zh`, `/en`) 自动语言检测
- 📝 **内容即代码** - Markdown/JSON 管理内容，Git 版本控制，无需数据库
- ⚡ **静态生成 (SSG)** - 构建时预渲染，极速加载，零服务器成本
- 🎨 **学术风格设计** - 简洁专业，响应式，支持深色模式
- 📄 **PDF 简历** - 支持下载与在线预览
- 🔍 **论文/项目筛选** - 按年份、类型、标签筛选，关键词搜索
- 📚 **引用格式** - 一键复制 BibTeX / APA / MLA
- 🚀 **Vercel 零配置部署** - 推送即部署，自动 HTTPS、CDN、自定义域名

## 🚀 快速开始

### 环境要求

- Node.js 18.17+
- npm 9+ (或 pnpm/yarn)

### 安装依赖

```bash
cd personal-academic-site
npm install
```

### 本地开发

```bash
npm run dev
```

访问 `http://localhost:3000/zh` 或 `http://localhost:3000/en`

### 构建生产版本

```bash
npm run build
npm start
```

### 代码检查

```bash
npm run lint
```

## 📁 项目结构

```
personal-academic-site/
├── public/
│   ├── assets/
│   │   ├── cv/           # PDF 简历文件
│   │   ├── images/       # 头像、项目封面、论文配图
│   │   └── papers/       # 论文 PDF
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/     # 多语言路由
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # 首页 (About)
│   │   │   ├── publications/         # 论文列表/详情
│   │   │   ├── projects/             # 项目列表/详情
│   │   │   ├── teaching/             # 教学页面
│   │   │   ├── services/             # 学术服务页面
│   │   │   └── contact/              # 联系页面
│   │   ├── globals.css
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/           # 通用 UI 组件
│   │   ├── layout/       # Header, Footer, LanguageSwitcher
│   │   └── content/      # 内容渲染组件
│   ├── content/          # 📝 内容源文件 (核心管理区)
│   │   ├── config/       # 站点/导航/i18n 配置
│   │   ├── about/        # 关于我
│   │   ├── publications/ # 论文
│   │   ├── projects/     # 项目
│   │   ├── teaching/     # 教学
│   │   ├── services/     # 服务
│   │   └── contact/      # 联系
│   ├── lib/              # 工具库
│   ├── types/            # TypeScript 类型
│   └── styles/
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## ✏️ 内容更新指南

### 1. 修改基本信息

编辑 `src/content/config/site.ts`：
- 姓名、职称、单位、邮箱
- 社交链接
- 研究兴趣
- CV PDF 路径

### 2. 更新"关于我"

编辑 `src/content/about/zh.md` 和 `src/content/about/en.md`：
- 个人简介
- 教育背景
- 工作经历
- 荣誉奖项

### 3. 新增论文

1. 在 `src/content/publications/items/` 创建两个文件：
   - `paper-xxx.zh.md` (中文详情)
   - `paper-xxx.en.md` (英文详情)

2. 在 `src/content/publications/index.json` 添加元数据：
```json
{
  "slug": "paper-xxx",
  "title": { "zh": "中文标题", "en": "English Title" },
  "authors": ["Author One", "Your Name"],
  "venue": { "zh": "会议名", "en": "Conference Name" },
  "year": 2024,
  "type": "conference",
  "tags": ["Tag1", "Tag2"],
  "doi": "10.xxxx/xxxx",
  "pdfUrl": "/assets/papers/paper-xxx.pdf",
  "codeUrl": "https://github.com/...",
  "projectUrl": "https://...",
  "featured": true,
  "order": 1
}
```

3. (可选) 将 PDF 放入 `public/assets/papers/`

### 4. 新增项目

1. 在 `src/content/projects/items/` 创建 `project-xxx.zh.md` 和 `project-xxx.en.md`

2. 在 `src/content/projects/index.json` 添加元数据

3. (可选) 封面图放入 `public/assets/images/projects/project-xxx/cover.jpg`，截图放入同目录

### 5. 更新教学/服务/联系

编辑对应目录下的 `zh.json` 和 `en.json` 文件。

### 6. 更新 CV PDF

替换 `public/assets/cv/cv-zh.pdf` 和 `public/assets/cv/cv-en.pdf`

如文件名变更，同步修改 `src/content/config/site.ts` 中的 `cvPdf` 路径。

## 🌐 部署到 Vercel

### 方式一：Vercel Dashboard (推荐)

1. 将代码推送到 GitHub
2. 登录 [Vercel](https://vercel.com) → Add New Project → Import Git Repository
3. Framework Preset: Next.js (自动检测)
4. 点击 Deploy
5. 在 Settings → Domains 添加自定义域名

### 方式二：Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### 环境变量

在 Vercel Project Settings → Environment Variables 添加：
- `NEXT_PUBLIC_SITE_URL`: 你的域名 (如 `https://yourname.com`)

## 🔧 自定义配置

### 修改主题色

编辑 `src/app/globals.css` 中的 CSS 变量：
```css
:root {
  --color-primary: #1e3a5f;        /* 主色调 */
  --color-academic-gold: #c9a84c;  // 强调色
  --color-academic-blue: #1e3a5f;  // 学术蓝
}
```

### 修改字体

编辑 `src/app/layout.tsx`：
```typescript
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSansSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-noto-sans-sc' });
```

### 添加新页面

1. 在 `src/app/[locale]/` 创建新目录
2. 创建 `page.tsx` 和对应的 Content 组件
3. 在 `src/content/config/nav.ts` 添加导航项
4. 在 `src/content/` 添加内容文件

## 📦 依赖说明

### 核心依赖
- `next` 14 - React 全栈框架
- `react` 18 / `react-dom` 18
- `typescript` - 类型安全

### 内容处理
- `gray-matter` - Frontmatter 解析
- `remark` / `remark-html` / `remark-gfm` - Markdown 渲染

### UI 组件
- `tailwindcss` - 原子化 CSS
- `@radix-ui/react-*` - 无样式无障碍组件
- `lucide-react` - 图标库
- `clsx` / `tailwind-merge` - className 合并

### 功能库
- `date-fns` - 日期格式化
- `react-pdf` - PDF 预览
- `@vercel/og` - OG 图片生成 (可选)

## 🤝 贡献

欢迎提交 Issue 和 PR！

## 📄 许可证

MIT License - 可自由用于个人/商业项目

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide](https://lucide.dev/)
- 参考设计：[苏同教授主页](http://www.sutongsdv.com/)

---

**维护提示**：所有内容更新只需修改 `src/content/` 下的文件并推送到 GitHub，Vercel 将自动重新构建部署，通常 1-2 分钟内生效。