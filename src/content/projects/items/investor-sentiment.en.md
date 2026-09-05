---
slug: "investor-sentiment"
title:
  zh: "社交媒体投资者情绪与市场关注度研究"
  en: "Social-Media Investor Sentiment and Market Attention"
category: "research"
shortDescription:
  zh: "毓琇书院“青年科学家成长营”新生早期科研项目：担任小组爬虫开发主力，基于 Requests 与浏览器自动化分三批采集雪球网数据并完成清洗与质量说明，参与 A 股股吧帖子情绪标注与标注手册提炼。"
  en: "Early-research training project at Yuxiu College's \"Young Scientist Growth Camp\": lead crawler developer, collecting Xueqiu data with Requests and browser automation in three batches, plus A-share sentiment annotation and guideline distillation."
techStack: ["Python", "Requests", "Web Scraping", "LLM-assisted Annotation", "pandas"]
featured: false
order: 7
date: "2026-06-20"
tags: ["Investor Sentiment", "Web Scraping", "Behavioral Finance"]
---

## Background

Early-research training project at Yuxiu College's third "Young Scientist Growth Camp" (Mar – Jun 2026): a comparative study of investor sentiment and market attention across StockTwits, X, and Seeking Alpha, using LLM-assisted annotation and Python data processing. I served as the team's lead crawler developer and worked on sentiment annotation.

## Crawler Development (Lead Role)

- **Data collection**: built Xueqiu crawlers with Requests and browser automation, collecting user-follow and posting data in three batches
- **Anti-scraping handling**: dealt with dynamic content loading and platform anti-bot measures to keep collection running
- **Data governance**: deduplication and cleaning, with data-quality documentation to keep downstream research reliable

## Sentiment Annotation

- Annotated A-share forum posts as bullish / bearish / neutral
- Distilled the annotation guidelines into a quick-reference checklist, improving the team's annotation speed and consistency

## Takeaways

My first full pass through an academic research pipeline — from data collection and cleaning to guideline design and annotation. The biggest lesson: data quality caps research quality. How much data you crawl matters, but dedup, cleaning, and honest quality documentation are what make data usable and conclusions trustworthy.
