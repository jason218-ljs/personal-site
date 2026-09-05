---
slug: "heliostat-simulation"
title:
  zh: "定日镜场光学效率建模仿真"
  en: "Heliostat-Field Optical Efficiency Simulation"
category: "research"
shortDescription:
  zh: "数学建模竞赛备赛项目：定日镜场四项光学效率模型与全场仿真性能优化。"
  en: "CUMCM preparation project: four optical-efficiency models for a heliostat field with full-field simulation optimization."
techStack: ["Python", "NumPy", "SciPy", "Matplotlib"]
featured: true
order: 5
date: "2026-08-20"
tags: ["Mathematical Modeling", "Simulation", "Optimization"]
---

## Background

A training project for the China Undergraduate Mathematical Contest in Modeling (CUMCM, in preparation), where I serve as the programmer. The problem: modeling the optical efficiency of a heliostat field — in a solar tower power plant, thousands of heliostats reflect sunlight onto a receiver at the top of the tower, and the field's overall optical efficiency must be computed across time slots.

## Four Efficiency Models

- **Cosine efficiency**: projection loss from the angle between incident light and the mirror normal
- **Shadowing & blocking efficiency**: losses from mirrors shadowed by neighbors or the tower, and reflected rays blocked by adjacent mirrors
- **Atmospheric transmission efficiency**: attenuation along the optical path through the atmosphere
- **Truncation efficiency**: fraction of the reflected light cone falling within the receiver aperture

## Performance Optimization

A naive full-field simulation checks every mirror pair for shadowing at every time slot, with cost growing quadratically. Two optimizations dramatically cut the runtime:

- **KD-tree neighbor search**: shadowing is only computed for spatially adjacent mirror pairs, skipping the vast majority of non-interacting pairs
- **NumPy vectorization**: per-mirror loops rewritten as matrix operations to exploit low-level parallelism

## My Role

Programmer: all modeling code, performance optimization, and visualization of simulation results.
