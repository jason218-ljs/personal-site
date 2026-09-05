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

## Background

Backtesting is only meaningful when it approximates reality — an engine that ignores market frictions systematically overstates returns. During my Transwarp internship, I built an event-driven backtesting engine that fully models A-share market rules, serving as the validation foundation for AlphaForge's multi-factor strategies.

## Market-Friction Modeling

- **T+1 settlement**: shares bought today can only be sold tomorrow, constraining rebalancing behavior
- **Price limits**: orders at limit-up/limit-down prices cannot fill, excluding "unrealizable gains"
- **Stamp duty & slippage**: real tax rates and impact costs charged to every trade
- **Event-driven architecture**: an event sequence drives the matching logic, closely mirroring real trading flows

## Position Sizing

- **Kelly criterion**: theoretical optimal position size derived from strategy win rate and payoff ratio
- **Per-stock cap**: concentration limits on individual names to mitigate single-stock black swans
- **Industry risk factor**: dynamic position ceilings per industry based on risk levels

## Validation

Multi-factor strategies were backtested on real A-share data and achieved positive excess returns over the market benchmark; the engine simultaneously outputs risk metrics and performance attribution to support investment-committee reviews.
