---
slug: "mem-data-assistant"
title:
  zh: "工程商机罗盘 · 工程企业市场机会智能分析助手"
  en: "Engineering Opportunity Compass · Market-Opportunity Intelligence for Engineering Firms"
category: "teaching"
shortDescription:
  zh: "7 人团队 MEM 课程 PBL 项目（进行中）：把工程师从“人肉盯网站筛公告”中解放出来——公开渠道采集 → RAG 知识库问答 → LLM 机会抽取 → 可解释的 A/B/C 评分 → 看板与周报 Agent。我担任 AI 开发组组长。"
  en: "Ongoing 7-member MEM course PBL project: from manual tender-announcement screening to an automated pipeline — public-source collection → RAG knowledge base → LLM opportunity extraction → explainable A/B/C scoring → dashboard and weekly-report agent. I led the AI development group."
techStack: ["Python", "RAG", "Milvus Lite", "百炼 Embedding / Rerank", "Streamlit"]
featured: false
order: 6
date: "2026-09-01"
tags: ["Course Project", "RAG", "LLM Application", "Team Project"]
---

## 项目背景

南京大学 MEM《AI+工程管理：AI赋能系统工程管理》品牌课程的 **PBL 团队项目**（7 人 · 12 周 · 进行中）。

传统工程企业的市场部，日常是人工去十几个政府与行业网站上翻公告、凭经验判断哪条和自己相关。等到**招标公告**挂出来，竞争格局往往已经定了。

这个项目要做的是把市场机会的发现时点，从「招标公告期」**前移到「立项与资金落地期」**：更早看到信号、自动判断相关性、给出可解释的优先级。

## 处理链路

```
公开渠道采集(3+1)
      ↓
rag-kb 知识库（RAG 问答，带文件出处）
      ↓
机会抽取（LLM：政策 / 公告 → 结构化机会）
      ↓
机会评分（A / B / C 分级，可解释）
      ↓
可视化看板（Streamlit）  +  周报 Agent
```

## 两条能力线

### 线 A：rag-kb 知识库 Agent Skill

封装成可复用的知识库能力，分三阶段：**init**（初始化配置与向量库）→ **ingest**（父块 1000 / 子块 350 切块 → 向量化 → 入 Milvus）→ **query**（稠密 + 稀疏混合检索 → 重排 → 带出处回答）。

技术选型对齐课程统一路线：百炼 `text-embedding-v4`（**单次调用同时产出稠密与稀疏双向量**）+ `qwen3-rerank` 精排 + **Milvus Lite** 本地向量库。

> 设计要点：rag-kb **只做检索、不做生成**——这样知识库能力与上层应用解耦，看板、周报与抽取管道都能复用它。

### 线 B：机会抽取与评分管道

- **领域映射表 + 资质库**：把工程行业术语、企业资质与业务范围沉淀为结构化资产
- **机会抽取**：用 LLM 把政策文件与公告转成结构化机会（来源、时间、金额、资质要求等字段）
- **评分引擎**：按评分卡给出 A / B / C 分级，并保留**可解释的评分依据**
- **周报 Agent**：自动汇总当周新增机会与变化

## 我的职责

担任 **AI 开发组组长**，负责全部代码实现：

- **rag-kb 知识库 Agent Skill 全部开发**（init / ingest / query），确定 Embedding + Rerank + 向量库技术选型
- **机会抽取管道与评分引擎**——把政策/公告抽取为结构化机会，并实现可解释的 A/B/C 评分规则
- **周报 Agent** 工作流脚本
- 参与 **Streamlit 看板**开发与部署测试

同时主笔了项目方案文档（项目规划书、行业前沿报告、课程项目总方案、任务分解书）。

## 当前状态

项目处于开发中（2026.09 至今），预计于 2026 年 11 月结课路演交付。

仓库：<https://github.com/jason218-ljs/mem-data-assistant>
