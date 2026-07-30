---
title: "The 8020 Strategy — Okala's Nasdaq Mean Reversion System"
slug: "8020-mean-reversion-okala"
category: "Mean Reversion"
icon: "🔁"
coverImageUrl: "https://images.unsplash.com/photo-1645226880663-81561dcab0ae?q=80&w=1200&auto=format&fit=crop"
fileName: "8020-mean-reversion-okala.docx"
excerpt: "Okala's mobile-first Nasdaq mean-reversion system trading price reactions at 80/20 levels with a static 10-point stop and disciplined 4-contract scaling."
summary: "The 8020 Strategy trades Nasdaq (NQ) futures around price levels ending in 80 and 20, waiting for one of four specific structural patterns — the Fork Setup, the h-Pattern, the Cross-Section entry, or a Repair Candle target — to form at those levels before betting on a reversion back toward the mean. Every trade uses the same non-negotiable 10-point stop loss and a 4-contract scaling plan (TP1 at 15 points, TP2 at 30 points, a runner beyond 60 points), with the stop moved to breakeven the instant TP1 is hit so a winning trade can never turn into a loss. It requires no indicators, is designed to be executed entirely from a mobile phone, and is restricted to the New York open session while explicitly avoiding the low-quality, choppy lunch-hour window. The strategy's real discipline challenge is not finding setups — multiple valid signals appear per session — but refusing to take the ones that only partially meet the criteria."
publishedAt: "2026-07-05"
status: "PUBLISHED"
---
## Overview — Okala and the 8020 Strategy

The 8020 Strategy is a mean reversion trading system built around a single, repeatable observation: Nasdaq futures (NQ) consistently react to price levels ending in 80 and 20. Rather than following trends, the strategy identifies these key levels, waits for specific market structure patterns to form at them, and enters trades expecting price to revert back toward the mean.

The system is designed to be executed entirely from a mobile phone, with no order flow tools, no complex indicators, and no algorithmic assistance. The edge comes entirely from reading price structure and recognising repeatable patterns at specific price levels.

## The 80 and 20 Levels — The Foundation

### Why 80 and 20?

The Nasdaq futures market reliably respects price levels that end in 80 and 20 — for example, 25,680 and 25,620. Traders and algorithms consistently place orders around these levels, creating areas where price reacts, reverses, or at minimum shows measurable hesitation. While intermediate levels (such as 50) also matter, the 80 and 20 levels are the "big ones" — the primary zones where the highest-probability mean reversion setups occur.

### Mean Reversion, Not Trend Following

The 8020 Strategy does not chase price or look for momentum breakouts. It waits for price to arrive at a key 80 or 20 level and looks for evidence that price is about to reverse and return toward the middle of its recent range — identifying where price has moved too far, too fast, and expecting a snap-back.

### The Dual Timeframe Approach

| Timeframe | Purpose | What to Look For |
| --- | --- | --- |
| 10-Minute Chart | Overall market structure and bias | Trend direction, the 80/20 level being approached, which pattern is forming |
| 200-Second Chart | Precise entry execution | Initiation candle, entry candle confirmation, exact pattern structure detail |

The 200-second chart breaks each 10-minute candle into exactly three equal segments (600 seconds ÷ 3 = 200 seconds), giving three distinct views inside each 10-minute candle for precise entry timing without the noise of a 1- or 2-minute chart.

## The Four Entry Patterns

### The Fork Setup — Long / Mean Reversion

A long entry used after a sharp, aggressive move downward. It is named for the visual shape formed when the initiation candle's range combines with the following entry candle. Price has moved sharply lower, touched or approached an 80 or 20 level, and is expected to snap back.

1. Identify a sharp, capitulatory move downward on the 200-second chart.
2. Look for an **initiation candle** — a long wick pointing toward the 80/20 level with a very short body, signalling exhaustion of selling pressure.
3. Watch the next (entry) candle dip down to test the low of the initiation candle but **fail** to break below it.
4. Once the candle fails to break the low and begins to move higher, enter the long trade.
5. Stop loss 10 points below entry. Targets: TP1 at 15 points, TP2 at 30 points, runner for 60+ points if momentum is strong.

> The "failed test" of the low is the critical signal. The entry candle must touch or come very close to the prior low — if it immediately moves away without testing, the setup is not valid.

### The h-Pattern — Short / Continuation

Okala's preferred short entry, named for its resemblance to a lowercase "h": price drops sharply (the downstroke), bounces briefly (the curve), then fails to make a higher high before rolling back down.

1. Identify a sharp price drop on the 200-second chart — the initial downstroke.
2. Price bounces and forms a U-shaped recovery.
3. The bounce must **fail** to make a higher high than the swing high before the initial drop.
4. The rollover — price turning back down from the failed high — is the entry trigger, best when it occurs at an 80/20 level.
5. Enter short at the rollover. Stop loss 10 points above entry. TP1 at 15 points, TP2 at 30 points, runner for 60+ points.

### The Cross-Section Entry — Stacking Confluences

The highest-precision entry in the system, used when two breakdown candles overlap and create a specific meeting point that acts as a precise retest level.

1. Identify two breakdown candles — two significant bearish moves through a price zone.
2. Mark the open, high, low, and close of both candles and find where their ranges overlap.
3. Wait for price to pull back to this cross-section level and look for a rejection candle.
4. If the cross-section aligns with an 80/20 level, this is a maximum-confluence setup — enter on the rejection, stop loss 10 points beyond entry.

This entry is distinguished by very low initial drawdown — price reacts extremely precisely at the confluence point.

### Repair Candles — Price Magnets

A repair candle opens at one extreme of its range and moves powerfully in one direction, with no wick on the starting side — meaning limit orders at the open price went unfilled. Because those orders remain unfilled, price is drawn back to "repair" them, creating a magnetic effect.

- A **bullish** repair candle (opens at the low, moves up with no bottom wick) attracts price downward — used as a target for short trades.
- A **bearish** repair candle (opens at the high, moves down with no top wick) attracts price upward — used as a target for long trades.

Repair candles are used primarily as **targets**, not entry triggers — never enter a trade solely because a repair candle exists; wait for one of the four entry patterns at an 80/20 level first.

## Trade and Risk Management

### The Static Stop Loss — 10 Points

Every trade uses the same static stop loss of 10 points, non-negotiable regardless of market conditions, volatility, or confidence level. This forces the trader to only take setups where a 10-point stop is structurally rational.

### The Scaling Structure — 4 Contracts

| Level | Points | Contracts Exited | Action |
| --- | --- | --- | --- |
| TP1 | +15 pts | 2 of 4 (50%) | Exit half the position. Move stop to breakeven on the remaining 2 contracts. |
| TP2 | +30 pts | 1 of 4 (25%) | Exit one more. 1 contract remains with no risk (stop at breakeven). |
| Runner | 60+ pts | 1 of 4 (final) | Let the final contract run as long as momentum continues. Exit when structure breaks. |

The TP1 target of 15 points is specifically designed to cover the initial 10-point risk: exiting 2 contracts at 15 points (30 points gross) against 4 contracts at 10 points of risk (40 points total risk) significantly reduces — though doesn't fully cover — the total initial risk. As soon as TP1 is hit, the stop on the remaining 2 contracts moves immediately to breakeven (or slightly beyond, to cover commissions). This rule is absolute: once TP1 is reached, the worst outcome is breakeven.

### Session Rules

- **Primary session**: the New York open, when volatility is highest and 80/20 levels produce their strongest, most reliable reactions.
- **Avoid the lunch hour** (approximately 12:00–13:30 NY time): low volume, erratic, unreliable price action. The 80/20 levels do not react cleanly during this window — skip it entirely.

## Discipline and Execution

- **Avoid subpar entries**: if the pattern is not perfectly clear, or the 80/20 level is not precisely at the interaction point, skip the trade. The next setup is not far away.
- **No indicators needed**: the system is designed for pure price reading. Adding indicators often introduces conflicting signals.
- **Mobile-first design**: developed to work on a phone — this constraint forces simplicity and eliminates over-analysis.
- **Prop firm consistency**: the static 10-point stop and the breakeven rule after TP1 are calibrated for the consistency requirements of proprietary trading firms.

> The most common mistake in the 8020 Strategy is forcing entries at levels that are "close to" 80 or 20 but not precisely there, or taking a trade where the pattern is only partially formed.

## Pre-Trade Checklist

- [ ] I am in the New York open session — not the lunch hour.
- [ ] I have identified an 80 or 20 level that price is approaching or has reached.
- [ ] I am on the 10-minute chart to confirm overall market structure and identify which pattern is forming.
- [ ] I have switched to the 200-second chart for entry precision.
- [ ] ONE of the four patterns is clearly present: Fork Setup, h-Pattern, Cross-Section, or a setup with a Repair Candle target.
- [ ] For the Fork Setup: a capitulatory initiation candle with long wick and short body has formed; the next candle tested the low but failed to break it.
- [ ] For the h-Pattern: a sharp drop followed by a bounce that failed to make a higher high; the rollover is occurring at or near an 80/20 level.
- [ ] For the Cross-Section: two breakdown candles identified, the cross-section level marked, price retesting it — ideally at an 80/20 confluence.
- [ ] My stop loss is set at exactly 10 points from entry.
- [ ] TP1 is set at 15 points (2 of 4 contracts exited here).
- [ ] TP2 is set at 30 points (1 contract exited here).
- [ ] After TP1 is hit, the stop loss will be moved to breakeven immediately — no exceptions.
- [ ] I have identified any nearby repair candles that may act as targets or magnets for the move.
- [ ] I am not forcing this entry — all conditions are genuinely met, not just approximately met.

## Key Terms

| Term | Definition |
| --- | --- |
| 80/20 Levels | Price levels on the Nasdaq where the final two digits end in 80 or 20 — the primary zones where the strategy expects price reactions and entries. |
| Mean Reversion | The principle that after a sharp move away from the centre of a range, price will tend to return toward the mean. |
| Fork Setup | A long entry triggered after a sharp capitulatory drop: an initiation candle with a long wick and short body, followed by a candle that tests the low but fails to break it. |
| h-Pattern | A short entry pattern resembling a lowercase "h": a sharp drop, a bounce that fails to make a higher high, then a rollover at an 80/20 level. |
| Cross-Section | The specific price level where two breakdown candles' ranges overlap, creating a high-precision confluence point. |
| Repair Candle | A candle that opens at one extreme and moves powerfully in one direction with no wick on the starting side, indicating unfilled limit orders that create a magnetic target level. |
| Static Stop Loss | A stop loss of exactly 10 points applied to every trade, regardless of conditions. |
| TP1 / Breakeven Rule | First take-profit target at 15 points, used to exit half the position and trigger moving the stop to breakeven on the rest. |
| Runner | The final contract in the scaling structure, allowed to run for 60+ points if momentum remains strong. |
| Subpar Entry | A trade setup that partially — but not fully — meets all criteria. The primary cause of unnecessary losses in the system. |

*This document is produced solely for educational and informational purposes. The 8020 Strategy is attributed to a trader known as Okala and is presented here based on publicly available descriptions of the strategy. This document is not affiliated with or endorsed by Okala. Cited results are attributable to a specific individual's application of this system and are not representative of typical results. Trading in financial markets involves substantial risk of loss. Nothing in this document constitutes financial advice. Always conduct your own due diligence and consult a qualified financial adviser before committing real capital.*
