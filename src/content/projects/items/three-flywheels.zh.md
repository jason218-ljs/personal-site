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

## 项目背景

量化研究系统的长期价值不在于某一次选股结果，而在于**研究流程本身能否持续自我改进**。在星环科技实习期间，我主导设计了"工程 / 数据 / 认知"三大飞轮自进化系统，让研究流水线在真实运行中不断发现问题、沉淀方法论。

## 三大飞轮

- **工程飞轮**：CI 流水线 + 静态红线扫描（基于 AST 的代码规则检查），在提交阶段拦截质量风险
- **数据飞轮**：数据质量自动检测，覆盖缺失、异常、口径漂移等问题——真实运行中自动检出了数据缺失问题
- **认知飞轮**：方法论复盘机制，将每次投资决策的依据与结果沉淀为可检索的复盘记录

## 架构决策

- **零侵入旁路架构**：飞轮系统以旁路方式接入主流程，不改动核心交易逻辑，失败也不阻塞主流程
- **62 个单元测试**：飞轮自身的可靠性由测试保障，避免"质量系统本身成为质量风险"

## 我的角色

主导设计：三大飞轮体系设计、零侵入旁路架构、数据质量检测与静态红线扫描实现。
