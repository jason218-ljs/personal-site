---
slug: "three-flywheels"
title:
  zh: "“工程 / 数据 / 认知”三大飞轮自进化系统"
  en: "Three-Flywheel Self-Evolution System"
category: "industry"
shortDescription:
  zh: "以零侵入旁路架构为量化研究流水线提供健康检查、数据质量检测与方法论复盘的自进化系统。"
  en: "A self-evolution system providing zero-intrusion sidecar health checks, data-quality detection, and methodology reviews."
techStack: ["Python", "pytest", "CI/CD", "AST 分析"]
featured: true
order: 3
date: "2026-08-05"
tags: ["Engineering Quality", "Data Quality", "Automation"]
---

## Background

The long-term value of a quant research system lies not in any single stock pick, but in whether the **research process itself keeps improving**. During my Transwarp internship, I led the design of a three-flywheel self-evolution system that continuously surfaces problems and accumulates methodology while the pipeline runs in production.

## The Three Flywheels

- **Engineering flywheel**: CI pipelines plus AST-based static rule checks ("red-line scanning") that intercept quality risks at commit time
- **Data flywheel**: automated data-quality detection covering missing values, anomalies, and definition drift — it automatically detected real data-missing issues in production
- **Cognition flywheel**: a methodology-review mechanism that archives the rationale and outcome of every investment decision as searchable review records

## Architecture Decision

- **Zero-intrusion sidecar**: the flywheel system attaches to the main pipeline as a sidecar — no changes to core trading logic, and its own failures never block the main flow
- **62 unit tests**: the flywheels' own reliability is guarded by tests, so the "quality system" never becomes a quality risk itself

## My Role

Led design: the three-flywheel framework, the zero-intrusion sidecar architecture, and the data-quality detection and static red-line scanning implementations.
