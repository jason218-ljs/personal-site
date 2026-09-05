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

## 项目背景

全国大学生数学建模竞赛（国赛备赛中）的训练项目，担任编程手。题目为定日镜场的光学效率建模：塔式太阳能热发电站中，数千面定日镜将阳光反射聚集至吸热塔顶的集热器，需要计算镜场在不同时刻的整体光学效率。

## 四项效率模型

- **余弦效率**：入射光线与镜面法线夹角引起的投影损失
- **阴影遮挡效率**：镜面被前方定日镜或塔影遮挡、以及反射光被邻近镜面拦截的损失
- **大气透射效率**：光程穿过大气时的衰减
- **截断效率**：反射光锥落在集热器接收范围内的比例

## 性能优化

全场仿真的朴素实现需要在每个时段对镜对做两两遮挡判断，计算量随镜面数量平方增长。通过两项优化大幅压缩了全场仿真耗时：

- **KD 树空间邻近搜索**：只为空间上可能相互遮挡的镜对计算遮挡，跳过绝大多数无交互的镜对
- **NumPy 向量化**：将逐镜循环改写为矩阵运算，充分利用底层并行

## 我的角色

编程手：全部建模代码实现、性能优化与仿真结果可视化。
