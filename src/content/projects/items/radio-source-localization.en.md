---
slug: "radio-source-localization"
title:
  zh: "2026 国赛 B 题 · 无线电干扰源的快速自动定位与清除"
  en: "2026 CUMCM Problem B · Rapid Localization and Clearance of Radio Interference Sources"
category: "research"
shortDescription:
  zh: "2026 全国大学生数学建模竞赛 B 题：以“覆盖保证定理”把 100% 清除转化为可证明的几何覆盖，用鲁棒布点与融合式在线路径规划逼近理论下界。200+600 局与 120 局演练均 100% 清除，问题四平均 542.9 s/源、仅高于理论下界 13%。"
  en: "2026 CUMCM Problem B: a coverage-guarantee theorem reduces 100% clearance to provable geometric coverage, combined with robust station layout and fused online path planning. 200 + 600 runs and 120 runs all achieved 100% clearance; Problem 4 averaged 542.9 s/source, only 13% above the theoretical lower bound."
techStack: ["Python", "NumPy", "Computational Geometry", "Online Path Planning", "LaTeX"]
thumbnail: "/assets/images/projects/radio-source-localization-thumb.jpg"
featured: true
order: 5
date: "2026-09-13"
tags: ["Mathematical Modeling", "Computational Geometry", "Path Planning"]
---

## Background

Problem B of the 2026 China Undergraduate Mathematical Contest in Modeling (CUMCM): **rapid automatic localization and clearance of radio interference sources**. Given an area containing several interference sources — omnidirectional ones, plus directional sources whose orientation is unknown — a team must take bearings from detection points (each bearing yields a 1°-half-angle sector), then localize and clear every source within a limited number of detections and movement steps, in as little time as possible.

I served as **team captain** while also acting as **modeler** and **programmer**: I derived the models for all four sub-problems, designed the algorithms, wrote all solver code, and produced **every figure plus the appendix code organization** for the paper.

## The Four Sub-Problems

- **Problem 1 · Geometric localization**: compute the intersection-localization region from several detection points and their bearings, then decide whether a given circle covers it. Each bearing becomes a half-plane constraint with half-angle 1°; intersecting these with the domain boundary yields a convex localization region containing circular arcs, and three classes of candidates give the **exact** diameter. In the representative case the region diameter is **53.23 m** and the minimum enclosing circle radius (27.11 m) exceeds the diameter radius (26.62 m) — so "a circle whose diameter is the region diameter" **cannot** cover the region. This occurred in **8.08%** of 20,000 randomized intersections, confirming statistical prevalence.
- **Problem 2 · Detection-point siting**: given one known bearing, choose a second detection point. From the first bearing sector and the unknown reception radius I **analytically construct** a "four-disc guaranteed reception domain" and a feasible bearing domain, guaranteeing the second point is always measurable; candidates are pre-screened by an area-weighted proxy score and then ranked by the **worst-case localization diameter and its bounds** over all possible second bearings, with travel time as a tie-breaker. The recommended second point is (401.59, 900.87) m with **197.26 s** travel time and a worst-case diameter interval of [114.24, 114.41] m.
- **Problem 3 · Search scheduling for omnidirectional sources**: the number of sources is unknown; all must be cleared in minimal time.
- **Problem 4 · Mixed-source environment**: directional sources of unknown orientation are introduced, so detection and clearance must work in a mixed environment.

## Key Methods

### A coverage-guarantee theorem: turning a probabilistic target into a provable geometric one

The hard part is that "clearance ratio" is inherently probabilistic. I used a **coverage-guarantee theorem** to reduce it to an **independently provable geometric coverage problem**: as long as the station layout geometrically covers the entire feasible domain — and closes the geometric blind spots of directional sources — the expected miss rate is strictly zero and no longer depends on randomness.

- Problem 3 uses a guaranteed "**center + 9-point ring @960 m**" layout with a coverage margin of **44.0 m**
- Problem 4 first derives a **geometric blind-spot criterion for directional sources**, then closes those blind spots with a guaranteed "**8-point inner ring @1000 m + 18-point outer ring @1830 m**" encirclement, driving the expected miss rate to strictly zero

### Fused online path planning: collapsing two routes into one

Separating "coverage sweep" from "source-by-source clearance" into two routes wastes a lot of travel. I fused them into a **single route**:

- Problem 3: **cheapest insertion + 2-opt**, combined with feasible-domain pruning to cut useless detections, intersection localization, and stepwise homing along each bearing
- Problem 4: **nearest neighbour + 2-opt + Or-opt**, combined with robust intersection (position deduplication + enumerating pairwise intersections + feasible-domain projection + residual criterion), three-state channel management and possibility-set pruning, backed by stepwise homing and guaranteed re-detection

## Quantitative Results

- **Problem 3**: 200 runs plus a 600-run wide-sample revalidation (fresh seed range, source counts rotating over 10–16) both reached **100% clearance**; mean localization-and-clearance time was **270.8 s/source** (P50 260.8 s, P90 331.9 s), close to the approximately **229 s/source** theoretical lower bound within this framework. The 600-run revalidation gave 275.7 s — only 1.8% off the main experiment, indicating no overfitting to a particular seed range.
- **Problem 4**: 120 fully randomized runs (source positions, channels, effective reception radii and orientations all random) achieved **100% clearance**, with a mean of **542.9 s/source** (5th–95th percentile 404.6–675.9 s), only **13%** above the approximately **480 s/source** theoretical lower bound.

The lower bound is estimated as: outer-ring encirclement 2π×1830/5 ≈ 2299 s, inner-ring coverage 2π×1000/5 ≈ 1257 s, travelling to all sources ≈ 1640 s, excluding empty channels ≈ 750 s, and channel switching plus clearance ≈ 300 s — about 6.25×10³ s in total, or roughly 480 s/source when amortized over 13 sources.

## Engineering & Compliance

- Delivered **7,131 lines** of solver code (1,683 lines for Problem 1; 1,661 for Problem 2; Problems 3 and 4 additionally include algorithm-strategy, client and paper-figure scripts), organized per problem with full reproduction instructions
- The paper is written in LaTeX source (37 `.tex` files plus a custom document class): 16 figures, 14 tables, 44 equations
- All 7 references were **individually verified online** (DOI pages, publisher sites, library OPACs); unverifiable entries were removed
- Added an **"AI tool usage statement"** as newly required by the 2026 CUMCM rules, along with error, sensitivity, and robustness analyses and a standalone conclusion section

## My Role

Team captain / modeler / programmer — all model derivations and algorithm implementations for the four sub-problems, all solver code, and every figure plus the appendix code organization for the paper. AI tooling (DeepSeek) was used to assist derivation checks and code generation; every output was adopted only after data-provenance review and result reproduction.
