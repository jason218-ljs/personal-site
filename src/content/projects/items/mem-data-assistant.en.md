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
## Background

A **PBL team project** for the Nanjing University MEM course *AI + Engineering Management* (7 members · 12 weeks · ongoing).

Marketing teams at traditional engineering firms spend their days manually trawling a dozen government and industry websites for announcements, judging by experience which ones matter. By the time a **tender announcement** appears, the competitive landscape is usually already settled.

This project moves opportunity discovery **earlier in the timeline** — from the tender-announcement stage back to the project-approval and funding-landing stage: see signals sooner, judge relevance automatically, and attach an explainable priority.

## Pipeline

```
Public-source collection (3+1)
      ↓
rag-kb knowledge base (RAG Q&A with citations)
      ↓
Opportunity extraction (LLM: policies / notices → structured opportunities)
      ↓
Opportunity scoring (A / B / C, explainable)
      ↓
Streamlit dashboard  +  Weekly-report agent
```

## Two Capability Lines

### Line A: the rag-kb knowledge-base Agent Skill

Packaged as a reusable knowledge-base capability in three stages: **init** (configuration and vector store) → **ingest** (parent chunks of 1000 / child chunks of 350 → embedding → Milvus) → **query** (dense + sparse hybrid retrieval → rerank → answers with citations).

Stack aligned with the course's unified track: Bailian `text-embedding-v4` (**one call yields both dense and sparse vectors**) + `qwen3-rerank` for reranking + **Milvus Lite** as the local vector store.

> Design note: rag-kb performs **retrieval only, never generation** — keeping the knowledge-base capability decoupled so the dashboard, weekly-report agent and extraction pipeline can all reuse it.

### Line B: opportunity extraction and scoring pipeline

- **Domain mapping table + qualification dictionary** — engineering terminology, corporate qualifications and business scopes distilled into structured assets
- **Opportunity extraction** — LLM turns policy documents and notices into structured opportunities (source, date, amount, qualification requirements)
- **Scoring engine** — A / B / C grading with a retained, **explainable rationale**
- **Weekly-report agent** — automatically summarises the week's new opportunities and changes

## My Role

As **lead of the AI development group** I owned all code implementation:

- **The entire rag-kb knowledge-base Agent Skill** (init / ingest / query), including the embedding, rerank and vector-store technology choices
- **The opportunity-extraction pipeline and scoring engine** — turning policy documents and notices into structured opportunities with explainable A/B/C rules
- **The weekly-report agent** workflow script
- Co-development and deployment testing of the **Streamlit dashboard**

I also authored the project's planning documents (project plan, industry frontier report, master project plan, and work-breakdown structure).

## Status

Under development (since Sep 2026), due for the course roadshow in November 2026.

Repository: <https://github.com/jason218-ljs/mem-data-assistant>
