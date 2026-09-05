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

## Background

Buffett-Value-Agent is a value-investing AI agent I contributed to during my Transwarp internship: an LLM-powered cognitive core guided by a Buffett-style value-investing framework to assist investment research. Its key design is the **Human-AI Boundary Protocol (HABP)** — an explicit division of which tasks go to the model and which must be handled by deterministic rules and humans.

## My Work

Rule-based implementation of deterministic tasks under the boundary protocol:

- **Financial computation module**: valuation and financial-metric calculations never pass through the LLM — all implemented as rule-based code, ensuring numbers are exact and reproducible
- **Risk-validation module**: before any recommendation is surfaced, rule-based risk checks (position sizing, concentration, exclusion lists) intercept non-compliant suggestions

## Design Reflection

LLMs excel at semantic understanding and open-ended reasoning, but are **not suited for calculations and checks that demand 100% precision**. Extracting deterministic tasks into rule modules is a key step toward trustworthy AI in finance — a theme that continues in my patent work on trustworthy constraints for agents.
