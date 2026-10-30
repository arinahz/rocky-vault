---
name: prop-metaphor-ugc-ad
description: Script and shot-list a 30-50s vertical creator ad where each customer pain is a labelled prop the creator destroys on camera, ending with one offer that covers every pain. Use for bundles, kits, or multi-feature offers with 3-5 nameable pains.
---

# Prop-Metaphor UGC Ad (V2)

## Core logic (do not break)
- **Destruction = proof.** The pain is "gone" only when its prop is visibly and audibly destroyed in under 1s by the creator's hand. That moment carries the claim, so the VO stays soft.
- **Repetition builds prediction.** Same line template, same tool, same chip in every beat. Viewers anticipate the payoff, and that keeps them watching.
- **Location changes reset attention.** Every cut moves to a new spot or angle while the creator's outfit stays identical.
- **Framing tightens toward the sale.** The hook is the widest shot and the CTA is the tightest.

## Gate
Use only if: 3-5 distinct pains, each mapped to one product or feature, and one offer/price covering all of them. Otherwise stop and pick another format.

## Inputs
`audience` · `topic` · `pains[]` (each: pain, solution, 1-word benefit) · `offer name` · `price` · `end_state` (how the viewer feels after)

## Design the prop system first
1. Pick ONE destruction tool and ONE prop type. The tool must support a pun on `topic` that is literally true on screen.
   | Prop | Tool | Pun pattern |
   |---|---|---|
   | water balloons | pin | "put a pin in ___" |
   | block tower | flick/push | "knock out ___" |
   | paper signs | hands | "tear up ___" |
   | chalk words | hose/sponge | "wash away ___" |
2. Hand-write each pain on its prop: thick black marker, caps, 1-3 words.
3. Give each prop a different saturated colour. Product packaging and props are the only designed colour in frame.
4. Order pains: most relatable first, best destruction visual last.

## Shot structure
Runtime ≈ 5 + (4.5 × pains) + 12 + 7 seconds.

| Beat | Length | Framing | Action | VO |
|---|---|---|---|---|
| Hook | ≤5s | Wide. All props lined up in front of creator, tool in hand | Show tool | "[Audience], let's talk about [topic], one [pain-unit] at a time." |
| Loop ×N | 3.5-5s each | Medium, new spot each | Hold prop to lens, destroy on last word | "[Pain]? [Solution] for [benefit]." |
| Reveal | 10-15s, longest shot | Medium, all products fanned to lens, prop debris visible | Tap each product as named | "Instead of [fragmented/costly alternative], you get them together in one [offer]: [names in loop order]. [Price]." |
| Close | 5-8s, tightest shot | Selfie close-up, products under chin, new background | Direct eye contact | "Everything [topic] throws at you in one [offer]. [End_state]... link's below." |

Loop rule: one beat may drop the question and state only the fix, to break monotony. Never more than one.

## Capture
- Phone, 9:16, daylight, one home location. No studio light, gimbal, or camera moves.
- Identical wardrobe across all takes. Pick one bold, simple pattern so cuts read as one session.
- Eyes to lens on every line. The free hand gestures on the pain word.
- Record a full take per beat. Destroy the prop only once the line is complete.

## Edit
- Hard cuts only. No transitions, zooms, B-roll, stock, or punch-ins.
- Trim dead air at both ends. Cut 0.3-0.5s after each destruction, never before it.
- Hold the final frame 1-2s after the last word.

## On-screen text (exactly two styles)
1. **Captions:** every spoken sentence. White bold rounded sans, light shadow, centred at 55-60% frame height, max 2 lines, sentence case.
2. **Chips:** dark text on one pale accent fill, rounded, placed directly above captions. Use `·` as the separator.
   - Hook (large, 0-2.5s): the pun.
   - Loop (small, enters ~1s into the shot, stays to the cut): `Pain · Solution (benefit)`.
   - Reveal (on for the full shot): `N items · 1 [offer]` / `[price]`.
   - Close (large, top third): `[End_state]· Link below`.
- Max one emoji in the video: ⬇️ after the CTA caption.

## Sound
- Sync audio from the phone mic. No separate voiceover.
- No music, or a bed under -25 dB. Keep the real destruction sound at full level and add no stock SFX.
- Delivery: peer talking to peer, casual, one take per line, small imperfections kept.

## Claims
- Soft benefit verbs ("help you feel", "for everyday", "support"). Never "cure", "fix", "treat", or guarantees.
- Say the price once and keep it on screen through the reveal.

## Ship check
- [ ] Pun matches the tool on screen
- [ ] Every loop beat: new spot, same template, ends on destruction
- [ ] Reveal is the longest shot and shows debris
- [ ] Close is the tightest shot
- [ ] Only captions + chips; no other graphics
- [ ] Topic, props, pun, and lines are new, not borrowed from any reference
