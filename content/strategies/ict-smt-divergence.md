---
title: "ICT SMT Divergence Strategy (BTC vs ETH)"
slug: "ict-smt-divergence"
category: "Divergence Trading"
icon: "⚡"
coverImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop"
fileName: "ict-smt-divergence.docx"
excerpt: "A correlated-asset divergence strategy that trades BTC vs ETH disagreements at swing extremes, confirmed by a 2-candle wait and 1:2 risk-to-reward targeting."
summary: "SMT (Smart Money Tool) Divergence trades the moments when two normally correlated assets — Bitcoin and Ethereum — stop agreeing with each other: when one makes a fresh Higher High or Lower Low while the other fails to confirm it, that failure is read as weakening conviction and a probable shift in momentum. On the 5-minute chart, every signal must be followed by a mandatory two-candle confirmation wait before entry, filtering out signals that resolve themselves too quickly, and every trade targets a strict 1:2 risk-to-reward ratio. A one-month, 119-trade backtest put the win rate at roughly 51% overall (57% on ETH, 44% on BTC) — a number that would lose money at 1:1 but becomes solidly profitable at 1:2, which is why the risk-management rule is treated as essential rather than optional."
publishedAt: "2026-07-12"
status: "PUBLISHED"
---
## Overview — Trading Disagreement Between Correlated Assets

The ICT SMT (Smart Money Tool) Divergence Strategy identifies moments when two normally correlated assets — most commonly Bitcoin (BTC) and Ethereum (ETH) — stop agreeing with each other. Because BTC and ETH are highly correlated and typically move in the same direction, any moment where one makes a new price extreme while the other fails to do so is treated as meaningful information: it suggests the current move in the lagging asset is running out of strength, and a shift in momentum may be coming.

This is fundamentally a divergence strategy applied across two related instruments instead of between price and a single indicator. Instead of comparing price to RSI or MACD on one chart, SMT divergence compares price action on one asset directly to price action on its correlated partner.

## Core Principle — Correlation and Divergence

In normal market conditions, BTC and ETH mirror each other closely on the chart — when BTC makes a Higher High, ETH typically does too, and vice versa for lows. A divergence occurs specifically when this mirroring breaks down at a price extreme:

- One asset reaches a **new extreme** (a fresh Higher High or a fresh Lower Low).
- The correlated asset **fails** to reach that same new extreme — instead forming a Lower High (in an up-move) or a Higher Low (in a down-move).

This failure to confirm is read as weakening conviction behind the move in the lagging asset — which, given how tightly correlated the two assets normally are, signals the broader move itself may be losing steam.

> The core insight: when two assets that normally move together suddenly disagree at a key turning point, the disagreement itself is the signal. One asset is "lying" about the strength of the move — and that weakness tends to get corrected.

## Bearish Divergence — Short Setup

**Condition**: one asset (e.g., BTC) makes a Higher High. The correlated asset (e.g., ETH) fails to break its own previous high and instead forms a Lower High.

**Interpretation**: buyers in the lagging asset (ETH) are becoming weak — sellers are starting to take control there, and by extension in the broader correlated move.

1. Wait for the SMT signal to appear (manually or via indicator).
2. Wait two additional candles to confirm the signal before entering — this avoids acting on a divergence that resolves itself immediately.
3. Enter a **short** position once the two-candle confirmation has passed.
4. Stop loss slightly above the recent high (the point that would invalidate the bearish divergence if broken).
5. Target: 1:2 risk-to-reward, or the previous swing low as an alternative reference.

## Bullish Divergence — Long Setup

**Condition**: one asset (e.g., BTC) makes a Lower Low. The correlated asset (e.g., ETH) fails to make a new low and instead forms a Higher Low.

**Interpretation**: selling pressure is exhausting in the lagging asset (ETH) — buyers are beginning to gain strength there, suggesting the broader downward move may be losing momentum.

1. Wait for the SMT signal to appear, then wait two additional candles before entering.
2. Enter a **long** position once the two-candle confirmation has passed.
3. Stop loss below the recent low (the point that would invalidate the bullish divergence if broken).
4. Target: 1:2 risk-to-reward.

> The two-candle confirmation rule exists specifically because the SMT signal — especially when read from an indicator — can occasionally flicker or shift as the most recent candle is still forming. Waiting two full candles after the signal appears filters out a meaningful share of false or premature triggers.

## Tools and Chart Settings

While SMT divergence can be identified manually by watching two charts side by side, the strategy is built around the "SMT Divergence (TFO)" indicator on TradingView, which automates detection of the divergence pattern between two specified symbols.

| Setting | Specification |
| --- | --- |
| Timeframe | 5-minute chart — specifically backtested and recommended for this strategy |
| Pivot Strength | Set to 2 in the indicator settings |
| Comparison Symbol | On the ETH chart, set the comparison symbol to BTC (and vice versa) — the indicator needs the other asset to compare against |
| Exchange Consistency | Use charts from the same exchange for both assets to ensure accurate comparison — cross-exchange price discrepancies can distort the signal |

### Manual Verification

The SMT indicator can occasionally glitch or produce an unclear signal, particularly around fast-moving or choppy price action. If a signal looks ambiguous, manually verify the divergence by directly comparing both charts side by side before committing to the trade.

## Backtest Results and Risk Management

The strategy was tested over a one-month period across 119 total trades:

| Scope | Win Rate | Notes |
| --- | --- | --- |
| Overall (119 trades) | ~51% | Profitable when paired with strict 1:2 RR |
| Ethereum (ETH) trades | 57% | Stronger-performing asset in this backtest |
| Bitcoin (BTC) trades | 44% | Weaker, but still viable given the 1:2 RR structure |

> At a 50% win rate with a strict 1:2 RR: 10 trades produce 5 wins worth +2R each (+10R total) and 5 losses worth -1R each (-5R total) — a net of +5R. The strategy's profitability comes directly from disciplined risk-reward sizing, not from a high win rate.

A roughly 50% win rate would be a losing proposition at 1:1 risk-to-reward, but becomes solidly profitable at 1:2 — precisely why the risk management rule is treated as essential, not optional.

## Pre-Trade Checklist

### Bearish (Short) Setup

- [ ] I am on the 5-minute chart for both BTC and ETH, from the same exchange.
- [ ] The SMT indicator (or manual comparison) shows one asset making a Higher High.
- [ ] The correlated asset has failed to make a Higher High — it formed a Lower High instead.
- [ ] I have waited TWO full candles after the SMT signal appeared before considering entry.
- [ ] If the signal looked unclear on the indicator, I manually verified it by comparing both charts directly.
- [ ] Stop loss is placed slightly above the recent high.
- [ ] Target is set at 1:2 risk-to-reward, or alternatively at the previous swing low.

### Bullish (Long) Setup

- [ ] I am on the 5-minute chart for both BTC and ETH, from the same exchange.
- [ ] The SMT indicator (or manual comparison) shows one asset making a Lower Low.
- [ ] The correlated asset has failed to make a Lower Low — it formed a Higher Low instead.
- [ ] I have waited TWO full candles after the SMT signal appeared before considering entry.
- [ ] If the signal looked unclear on the indicator, I manually verified it by comparing both charts directly.
- [ ] Stop loss is placed below the recent low.
- [ ] Target is set at 1:2 risk-to-reward.

## Key Terms

| Term | Definition |
| --- | --- |
| SMT (Smart Money Tool) Divergence | A trading concept where a divergence between two correlated assets — one confirming a new high/low, the other failing to — signals weakening momentum. |
| Correlated Assets | Two instruments (such as BTC and ETH) that typically move in the same direction due to shared market drivers and investor behaviour. |
| Bearish Divergence | One asset makes a Higher High while its correlated partner makes a Lower High instead — a potential short opportunity. |
| Bullish Divergence | One asset makes a Lower Low while its correlated partner makes a Higher Low instead — a potential long opportunity. |
| Higher High (HH) / Lower Low (LL) | A swing high/low that exceeds the previous one, confirming continued momentum in that direction. |
| Lower High (LH) / Higher Low (HL) | A swing high/low that fails to exceed the previous one, signalling weakening momentum. |
| Two-Candle Confirmation | Waiting for two full candles to close after an SMT signal appears before entering, to filter out premature or false signals. |
| Pivot Strength | An indicator setting controlling how many candles on each side are required to confirm a swing high or low. Set to 2 for this strategy. |
| 1:2 Risk-to-Reward (RR) | A trade structure where the profit target is twice the distance of the stop loss from entry. Central to this strategy's profitability at a near-50% win rate. |
| SMT Divergence (TFO) | The specific TradingView indicator used to automate detection of SMT divergence between two specified symbols. |

*This document is produced solely for educational and informational purposes. The strategy described herein does not constitute financial advice, a recommendation to trade, or a guarantee of any specific outcome. Cryptocurrency trading involves substantial risk of loss and is not suitable for all investors. Backtest results cited are historical and illustrative only; past performance is not indicative of future results. Always conduct your own due diligence and consult a qualified financial adviser before engaging in any trading activity.*
