---
title: "Martin Luke: High-Momentum Swing Trading"
slug: "martin-luke-swing-trading"
category: "Momentum Swing Trading"
icon: "🐎"
coverImageUrl: "https://images.unsplash.com/photo-1744782211816-c5224434614f?q=80&w=1200&auto=format&fit=crop"
fileName: "martin-luke-swing-trading.docx"
excerpt: "A high-momentum swing strategy on ADR>5% stocks combining tight-range breakout entries, EMA trailing stops, and asymmetric risk sizing for a low win-rate, high-R system."
summary: "Martin Luke's swing strategy is built on trend following fast, high-volatility stocks — filtered to an Average Daily Range above 5%, his 'horse center' — and does not try to predict where a stock will go. Instead it manages risk through tight, precisely placed stops (the Low of Day, or the 5-minute entry candle low if that's more than 5% away, capped at a hard 5% ceiling) so that even a low win rate of around 23% is profitable, because winners are allowed to run using a 9/21/50 EMA trailing system while every loss is kept small. Entries come from four setup types — breakouts, earnings position squares, parabolics, and pullbacks — triggered off the Prior Day High, Opening Range High, or a re-entry at an Intraday Range High, ideally backed by a large weekly base for conviction. Position sizing is capped at 0.5% portfolio risk per trade, and Luke treats his own equity curve as a market indicator, scaling exposure up when trades are working and cutting size systematically during drawdowns."
publishedAt: "2026-07-24"
status: "PUBLISHED"
---
## Overview — Trend Following on Fast-Moving Stocks

Martin Luke's swing trading strategy produced a 283% account return in 2024 (340% specifically across the February-to-December stretch), built on trend following and catching high-momentum, fast-moving stocks. The approach is explicit about **not** trying to predict where a stock will go — instead, risk is managed through tight, precisely placed stops, and profits come from letting winners run with strong reward-to-risk asymmetry.

The strategy draws its core philosophy from two well-known growth-stock traders: Mark Minervini's breakout methodology and Christian Kullamägi's Volatility Contraction Pattern (VCP) approach. Both emphasise buying strength as it breaks out of a well-formed base, rather than buying weakness or trying to predict a bottom.

> The defining mathematical feature of this strategy is a deliberately LOW win rate (around 23%) offset by a HIGH reward-to-risk ratio. This is not a flaw to fix — it is the engine of the strategy. Most trades lose a small, controlled amount; a minority of trades produce outsized gains that more than make up for the rest.

## Stock Selection — The "Horse Center"

### Average Daily Range (ADR) Filter

Luke specifically targets stocks in what he calls the "horse center" — stocks with an Average Daily Range (ADR) greater than 5%. ADR measures a stock's typical daily price range as a percentage of its price, and a high ADR is a direct proxy for the volatility needed to produce the fast, explosive moves this strategy is built to capture. Lower-ADR stocks simply do not move fast enough to generate the reward-to-risk asymmetry the strategy depends on.

### Weekly Chart Context

While all entries are executed on the daily chart, Luke uses the weekly chart specifically to identify large bases and clean overall trends. A daily breakout that occurs against the backdrop of a large, well-formed weekly base adds significant conviction — it suggests the move is breaking out of genuine longer-term consolidation rather than a short-term, less reliable pattern.

### Four Primary Setup Types

- **Breakouts** — range expansion above a resistance level, typically following a period of tightening price action.
- **Earnings Position Squares (EPS)** — setups specifically tied to a stock's positioning around earnings events.
- **Parabolics** — explosive, fast-accelerating continuation moves, entered with the awareness that these can reverse sharply.
- **Pullbacks** — re-entry opportunities after an initial move, buying continuation rather than chasing the original breakout.

## Tightness, Inside Days, and Entry Tactics

### Tight Ranges and Inside Days

Luke places heavy emphasis on tight price ranges immediately before a breakout — specifically **inside days**, where the entire daily range falls within the previous day's range. A sequence of inside days, especially with each successive day tighter than the last, often precedes the strongest, lowest-volatility trending moves, reflecting supply drying up before the breakout.

### Three Intraday Entry Tactics

- **Prior Day High (PDH)** — the most common trigger — entering when a stock breaks above the previous day's high, signalling range expansion and the start of a potential new move.
- **Opening Range High (ORH)** — entering when a stock takes out the high of the first 1-minute or 5-minute candle of the trading session, capturing momentum right from the open.
- **Intraday Range High (Re-entry)** — if an initial ORH breakout attempt fails but the overall setup remains structurally intact, Luke looks for a re-entry at the high of a subsequent tight intraday range, often with support from the 9 EMA underneath.

## Risk Management — The Engine of the Strategy

### Stop-Loss Placement Hierarchy

- **Standard Stop**: the Low of Day (LOD) of the breakout day — the default choice whenever this distance from entry is reasonable.
- **Aggressive Stop**: if the LOD is more than 5% away from entry, use the low of the 5-minute entry candle instead — a much tighter reference point.
- **Maximum Stop**: regardless of method, the stop is generally capped at 5% — a hard ceiling, not a target.

### The "Winning Horse" Rule

Luke operates on the principle that "winning horses don't back up" — a genuine winning stock generally should not revisit the low of its breakout day. This rule functions both as a filter (a stock repeatedly testing its breakout-day low is showing weakness) and as conviction-building logic for staying in a position that is behaving as a true winner should.

> "Winning horses don't back up." — Martin Luke

### Tightening Stops for Parabolic R-Gains

The relationship between stop distance and R-multiple is not linear — tightening a stop from 3% to 1.5% (holding the target distance constant) **doubles** the resulting R-multiple, since R is defined as reward divided by risk. A smaller, well-placed stop is one of the most direct levers for improving a trade's risk-adjusted potential.

### Position Sizing

| Parameter | Specification |
| --- | --- |
| Risk Per Trade | 0.5% of total portfolio |
| Max Position — Large Caps | 35% of portfolio |
| Max Position — Small/Micro Caps | 25–30% of portfolio (lower, due to overnight gap-down risk) |

Trim 10–15% of a position if: it reaches 3R profit, the stock becomes significantly over-extended from the 9 EMA, or the position has organically grown beyond 35% of the total portfolio.

## The EMA System — Trailing Longs and Identifying Shorts

Luke uses the **9 EMA** as his primary trailing stop for long positions — as long as the stock continues closing above the 9 EMA, the position is held. For longer-term trends or earlier-stage moves, he shifts to the **21 or 50 EMA** as a wider trailing reference.

His short strategy looks for the inverse structural signature: the 9, 21, and 50 EMAs declining and converging together, forming a tight band that acts as resistance on any bounce attempt. Luke is notably more aggressive selling shorts into strength than trimming longs into strength, reflecting the faster, more violent nature of short-side moves and squeezes.

## Technical Tools and Equity Curve Feedback

Luke keeps his charts deliberately clean:

- **Exponential Moving Averages**: the 9, 21, and 50 EMA for trend identification, trailing stops, and short-side resistance.
- **Volume**: specifically dollar volume (price × shares traded), which better reflects genuine capital flow than raw share volume.
- **Anchor VWAP**: an additional reference for institutional-level support/resistance and fair value.

Beyond technical tools, Luke treats his own equity curve as a market indicator. If trades are working, he stays aggressive; if he's in a drawdown — "death by a thousand cuts" — that is itself a signal to systematically reduce position size rather than fight through the difficult stretch at full size.

## Daily Routine and Scanning Workflow

- **Pre-Market (10–15 minutes)**: scans for pre-market gappers showing high volume — the first pass for the day's candidates.
- **Potent Scanner**: identifies the best-performing stocks from the previous trading day, surfacing hot themes or sectors.
- **Leader Scan (Weekly)**: a weekly process to find stocks with the best trailing-month performance that also display a clear uptrend structure (9 EMA above 21 EMA above 50 EMA).

### Watchlist Tiers

| Tier | Description |
| --- | --- |
| Leading | Strongest relative strength, clean uptrend structure (9 > 21 > 50 EMA). Primary focus for long setups — best risk/reward, capital actively flowing in. |
| Mediocre | Moderate relative strength with a mixed or still-developing trend. Worth monitoring for a potential tier upgrade, but lower priority for new capital. |
| Lagging | Weak relative strength, choppy or declining structure. Long setups generally avoided; monitored as potential short candidates if EMAs converge and decline. |

## Pre-Trade Checklist

- [ ] The stock has an Average Daily Range (ADR) greater than 5%.
- [ ] The weekly chart shows a large, clean base or trend behind the setup.
- [ ] The setup matches one of the four primary types: breakout, EPS, parabolic, or pullback.
- [ ] Price action shows tightening ranges, ideally one or more inside days, ahead of the move.
- [ ] Entry is triggered by Prior Day High, Opening Range High, or (on re-entry) an Intraday Range High.
- [ ] Stop loss is set at the Low of Day, or the 5-minute entry candle low if LOD exceeds 5%, with an absolute maximum of 5%.
- [ ] Position size is calculated to risk 0.5% of total portfolio on this trade.
- [ ] Position size does not exceed 35% (large cap) or 25–30% (small/micro cap) of total portfolio.
- [ ] I have evaluated the resulting R-multiple — am I getting the tightest reasonable stop relative to my target?
- [ ] I am aware of my current equity curve state and have sized accordingly (aggressive if working, reduced if in drawdown).
- [ ] This stock currently sits in my "Leading" watchlist tier, or I have a specific reason to act on a Mediocre/Lagging name.

## Key Terms

| Term | Definition |
| --- | --- |
| Average Daily Range (ADR) | A measure of a stock's typical daily price range as a percentage of price. Luke targets ADR greater than 5% — the "horse center." |
| Volatility Contraction Pattern (VCP) | A base pattern where price pullbacks become progressively shallower before a breakout, reflecting supply drying up. |
| Inside Day | A trading day whose entire price range falls within the range of the previous day, signalling contracting volatility. |
| Prior Day High (PDH) | The high of the previous trading session — a common breakout trigger level. |
| Opening Range High (ORH) | The high of the first 1-minute or 5-minute candle after the market opens, used as an early-session breakout trigger. |
| Low of Day (LOD) | The lowest price reached during a session — used as the standard stop-loss reference for breakout entries. |
| R-Multiple | A trade's profit or loss expressed as a multiple of the initial risk taken. A tighter stop (for the same target) produces a higher R-multiple. |
| Winning Horse Rule | Luke's principle that a genuine winning stock should not revisit the low of its breakout day. |
| 9 / 21 / 50 EMA | Exponential Moving Averages used as the core trend and trailing-stop framework. |
| Anchor VWAP | A Volume-Weighted Average Price calculation anchored to a specific starting point, used as an institutional-level reference level. |
| Watchlist Tiers | A three-level classification (Leading, Mediocre, Lagging) used to organise candidate stocks by relative strength. |
| Equity Curve Feedback | Using one's own recent trading performance as a signal for how aggressively to size new trades. |

*This document is produced solely for educational and informational purposes, based on publicly shared commentary attributed to a trader known as Martin Luke. This document is not affiliated with or endorsed by Martin Luke. The performance figures cited are historical results attributed to a specific individual and are not representative of typical results. Nothing in this document constitutes financial advice. Trading in financial markets, particularly high-volatility and small/micro-cap stocks, involves substantial risk of loss. Always conduct your own due diligence and consult a qualified financial adviser before engaging in any trading activity.*
