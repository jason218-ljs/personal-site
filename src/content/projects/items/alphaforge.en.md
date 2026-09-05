---
slug: "alphaforge"
title:
  zh: "AlphaForge · 多因子选股系统"
  en: "AlphaForge · Multi-Factor Stock Screening System"
category: "industry"
shortDescription:
  zh: "面向 A 股的三层 100 分制选股评分体系，配套 214 个自动化测试与 Web 可视化看板。"
  en: "A three-layer 100-point stock-scoring framework for A-shares with 214 automated tests and a web dashboard."
techStack: ["Python", "pandas", "NumPy", "pytest", "数据可视化"]
featured: true
order: 1
date: "2026-07-15"
tags: ["Quantitative Finance", "Multi-Factor Model", "A-Share"]
---

## Background

During my quantitative researcher internship at Transwarp Technology, I served on a five-person investment committee (with risk veto) in an AI-native portfolio program, owning factor scoring and portfolio construction. AlphaForge is the multi-factor stock-screening and backtesting system I led for this program. The core problem it solves: making stock-selection conclusions **explainable, traceable, and reviewable** rather than black-box outputs.

## Key Design

- **Three-layer 100-point scoring framework**: fundamental / technical / money-flow layers with explicitly adjustable factor weights — every point deducted can be traced back to a specific factor and rule
- **Adaptive thresholds across 21 sub-industries**: factor distributions differ sharply across industries; fixed thresholds introduce systematic bias, so thresholds adapt per sub-industry
- **Two-stage selection**: "pattern pre-filter + quality scoring" — first filter out unqualified candidates with pattern rules, then score the remaining pool, balancing efficiency and precision

## Engineering Quality

- **214 automated tests**: pytest coverage over scoring logic, threshold adjustments, and data edge cases, preventing regressions as rules evolve
- **Web dashboard**: end-to-end visualization of scores, factor exposures, and the screening funnel, supporting investment-committee reviews

## My Role

Led development: scoring framework and industry-threshold design, two-stage selection logic, automated test infrastructure, and the visualization dashboard.
