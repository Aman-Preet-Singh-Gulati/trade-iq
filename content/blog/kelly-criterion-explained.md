---
title: "The Kelly Criterion Explained: Optimal Bet Sizing for Traders"
slug: "kelly-criterion-explained"
category: "Risk Management"
excerpt: "A deeper, math-first look at the Kelly Criterion — how it's derived, why full Kelly is rarely tradeable in practice, and how fractional Kelly is actually used."
coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTN_cx98FyZEPQfIKMQr3gf2q_aG0tKUUdNNJIZnPi8kXDABKcouq5lQTSMKGPpu0HpN20zPOlqZyU9ud3lLNZIOU_BSHk0DNabbbi346qzsoFc5IC4M6qDPZ0v_phqi87k3s00k3NW0AM8sh71FuEMsDLmk6PkJ4IZivaJtI6fXEy1fB2mEbwWW8l7LcmCcYRmKQVYIpXm0ZA4es_vk_rg7C6btV8ayttYvAfDxacrZUPRmnB_m4"
publishedAt: "2023-08-19"
readTimeMinutes: 8
featured: false
status: "PUBLISHED"
readCount: 890
---
The Kelly Criterion was originally derived for gambling and telecommunications, not trading — but its core insight, maximizing the long-run geometric growth rate of capital, translates directly to position sizing.

## The Formula

For a simplified win/loss bet: `f* = W - (1-W)/R`, where `W` is your win probability and `R` is your win/loss payoff ratio. The output, `f*`, is the fraction of capital to risk that maximizes long-run compound growth — not a guess, a mathematically derived optimum given your actual edge.

## Why Full Kelly Feels Unbearable

Full Kelly sizing assumes your win-rate and payoff-ratio inputs are exactly correct, which they never are in live trading — they're estimates from a limited sample. Even when the inputs *are* roughly correct, full Kelly produces drawdowns of 50% or more as a completely normal, expected part of its equity curve. Almost no trader can psychologically tolerate that in practice, which means almost nobody should actually trade full Kelly.

## Fractional Kelly in Practice

Most professional risk desks that use Kelly-derived sizing trade at 25%–50% of the full Kelly fraction. This sacrifices some theoretical long-run growth rate in exchange for a dramatically smoother equity curve and a much lower chance of behavioral capitulation during a drawdown — a trade-off that is, in practice, worth making for almost everyone.

## The Real Lesson

The value of the Kelly Criterion isn't that most traders should compute `f*` and trade it directly — it's the underlying principle: position size should scale with edge and shrink with uncertainty, and oversizing a genuinely positive-expectancy strategy can still destroy an account through sheer variance.
