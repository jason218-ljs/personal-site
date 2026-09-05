---
slug: "wartime-relocation-documentary"
title:
  zh: "《重走西迁路》· AI 历史影像复原纪录片"
  en: "Retracing the Wartime Relocation · AI-Restored Historical Documentary"
category: "creative"
shortDescription:
  zh: "校外 AI 视频创作项目：以南大前身国立中央大学抗战西迁为题材，运用 Seedance 2.0 沿“南京—武汉—宜昌—重庆—成都”路线完成约 330 条 AI 视频的提示词工程、生成与剪辑，负责从史料研究到后期剪辑的全流程。"
  en: "AI video project on the wartime relocation of Nanjing University's predecessor (National Central University): prompt engineering, generation, and editing of ~330 AI clips with Seedance 2.0 along the Nanjing–Wuhan–Yichang–Chongqing–Chengdu route."
techStack: ["Seedance 2.0", "Prompt Engineering", "CapCut", "Historical Research"]
featured: false
order: 8
date: "2026-06-24"
tags: ["AI Video Generation", "Digital Humanities", "Creative Production"]
---

## Background

From Dec 2025 to Jun 2026, I worked on an AI-generated documentary about the wartime relocation of National Central University — Nanjing University's predecessor — during the Second Sino-Japanese War (1937). With almost no historical footage surviving, the project used Seedance 2.0 to "restore" scenes along the relocation route: **Nanjing → Wuhan → Yichang → Chongqing → Chengdu**. I handled the full pipeline — historical research, scene planning, prompt writing, AI generation, and editing — producing roughly **330** AI-generated clips.

## Five Stops on the Route

- **Xiaguan Wharf (departing Nanjing)**: faculty and students boarding ships in late autumn 1937; two major version iterations, ~75 clips
- **Yuehan Wharf (Wuhan transit)**: the 6-scene transit episode, ~35 clips
- **Yichang Wharf (core episode)**: the 1938 Yichang evacuation and Lu Zuofu's Minsheng Company; expanded 6 scenes into 16 sub-scenes around the "three-stage voyage" narrative, ~77 clips
- **Chongqing (arrival and rebuilding)**: rebuilding the campus at Songlinpo in 40 days, the Buxi branch campus, and Wang Youting's "animal army" arriving in Chongqing, ~52 clips
- **Chengdu (Jinling University branch)**: joint education of five universities at Huaxiba, ~52 clips

## Prompt Engineering

- **Physical realism**: countered floating limbs and deformed hands with negative constraints ("no floating", "feet firmly on the ground", "fingers naturally bent") plus positive guidance — later versions showed markedly improved realism
- **Character consistency**: replaced first/last-frame mode (which caused clothing and position jumps) with smart multi-frame mode, locking key-frame character parameters and using subject-reference mode for continuity
- **Global visual style**: a unified production spec — every scene prefixed with "desaturated yellow-grey monochrome, 8K film grain, 4:3 aspect ratio, overcast diffused light" — keeping the whole film visually coherent
- **Content-moderation workarounds**: rephrased "Republican era" as "the 1930s / historical period" and rendered war through ambient description, passing platform review without losing historical authenticity
- **Documentation**: distilled the work into 4 technical documents (including "Four Modes of Seedance") and scene-level prompt systems of 169–195 prompts, plus multiple narration drafts

## Production Workflow

A "experiment batch → formal generation → version iteration" loop: small test batches to tune prompts first (e.g., 22 clips in week 1 at Xiaguan, 5 batches of 30 transition clips at Yichang), then bulk generation; final assembly in CapCut/Jianying with trimming, sequencing, subtitles, and sound design.

## Takeaways

AI video generation is not "one prompt, one shot" — it is an engineering discipline of constraint design, mode selection, global style rules, and batch experimentation. And to keep every scene historically defensible, I read extensively on the relocation itself. Beyond the tooling, respect for the history is what carries a project like this.
