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

## 项目背景

星环科技（Transwarp）实习期间，在 AI-Native 组合投资项目中担任量化研究员，作为 5 人投资决策委员会成员（持风控否决权）负责因子打分与组合构建。AlphaForge 是我为项目主导开发的多因子选股回测系统，解决的核心问题是：如何让选股结论**可解释、可追溯、可复盘**，而不是黑箱输出。

## 核心设计

- **三层 100 分制评分体系**：基本面 / 技术面 / 资金面三层打分，各层因子权重显式可调，每一分的扣减都能回溯到具体因子与规则
- **21 个二级行业自适应阈值**：不同行业的因子分布差异巨大，固定阈值会造成系统性偏差；系统按二级行业自适应调整打分阈值
- **两段式选股**："形态预过滤 + 质量打分"——先用形态规则过滤掉不合格标的，再对候选池做质量评分，兼顾效率与精度

## 工程化保障

- **214 个自动化测试**：pytest 覆盖打分逻辑、阈值调整、数据边界等关键路径，保证规则迭代不引入回归
- **Web 可视化看板**：打分结果、因子暴露、筛选漏斗全流程可视化，支撑投资决策委员会的复盘讨论

## 我的角色

主导开发：评分体系与行业阈值设计、两段式选股逻辑实现、自动化测试体系与可视化看板搭建。
