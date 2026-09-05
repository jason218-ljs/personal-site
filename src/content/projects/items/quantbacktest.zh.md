---
slug: "quantbacktest"
title:
  zh: "事件驱动回测引擎"
  en: "Event-Driven Backtesting Engine"
category: "industry"
shortDescription:
  zh: "完整建模 A 股交易摩擦与凯利公式仓位管理的事件驱动回测引擎。"
  en: "An event-driven backtesting engine that fully models A-share frictions and Kelly-criterion position sizing."
techStack: ["Python", "pandas", "量化建模"]
featured: true
order: 2
date: "2026-07-25"
tags: ["Backtesting", "Kelly Criterion", "Risk Management"]
---

## 项目背景

回测的意义在于"接近真实地"检验策略——如果回测引擎忽略了交易摩擦，结论就会系统性高估收益。在星环科技实习期间，我实现了完整建模 A 股市场规则的事件驱动回测引擎，作为 AlphaForge 多因子策略的验证底座。

## 交易摩擦建模

- **T+1 交易制度**：当日买入次日才能卖出，约束调仓行为
- **涨跌停限制**：触及涨跌停无法成交，避免"不可能成交的收益"
- **印花税与滑点**：按真实税率与冲击成本计入交易成本
- **事件驱动架构**：以事件序列驱动撮合逻辑，天然贴近真实交易流程

## 仓位管理

- **凯利公式仓位**：基于策略胜率与赔率计算理论最优仓位
- **单票仓位约束**：限制个股集中度，防范单一标的黑天鹅
- **行业风险系数调整**：按行业风险水平动态调整该行业持仓上限

## 验证结果

基于真实 A 股数据完成多因子策略回测，策略相对市场基准实现正向超额收益；回测引擎同步输出风险指标与业绩归因，支撑投资决策委员会的复盘。
