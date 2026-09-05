---
slug: "buffett-value-agent"
title:
  zh: "Buffett-Value-Agent · 价值投资智能体"
  en: "Buffett-Value-Agent · Value-Investing AI Agent"
category: "industry"
shortDescription:
  zh: "人机边界协议（HABP）下的价值投资智能体，负责财务计算与风控校验等确定性任务的规则实现。"
  en: "A value-investing AI agent under a Human-AI Boundary Protocol (HABP); rule-based implementation of deterministic tasks."
techStack: ["Python", "LLM Agent", "规则引擎"]
featured: false
order: 4
date: "2026-08-10"
tags: ["AI Agent", "Human-AI Collaboration", "Value Investing"]
---

## 项目背景

星环科技实习期间参与研发的价值投资智能体 Buffett-Value-Agent：以大语言模型为认知核心、以巴菲特式价值投资框架为方法论，辅助投研流程。项目的关键设计是**人机边界协议（HABP，Human-AI Boundary Protocol）**——明确划分哪些任务交给模型、哪些必须由确定性规则与人来兜底。

## 我的工作

负责人机边界协议下**确定性任务的规则实现**：

- **财务计算模块**：估值与财务指标计算不经过大模型，全部以规则化代码实现，保证数字精确可复算
- **风控校验模块**：投资建议在输出前经过规则化风控校验（仓位、集中度、负面清单等），不合规建议直接拦截

## 设计思考

大模型擅长语义理解与开放式推理，但**不适合承担要求 100% 精确的计算与校验**。把确定性任务从模型中剥离为规则模块，是让 AI 系统在金融场景可信落地的关键一步——这也与我在专利工作中关注的"智能体可信约束"一脉相承。
