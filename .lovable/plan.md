

## Plan: Fix duplicate article keys and correct software names

### Problem
1. **Build errors**: The `articleContent` object has duplicate keys for `software-thuisverpleging`, `patienten-thuisverpleegkundige`, and `administratie-thuisverpleging` (old versions at lines ~156-511, new versions at lines ~513-762). JavaScript objects can't have duplicate keys.
2. **Incorrect software names**: The old article block mentions "Babelway", "Nona", "Soft4Care", "KiMo" — these are not real package names. Should be **Softn** and **CareForNurse** (van Corilus).

### Solution

**Step 1: Remove old duplicate article blocks**
- Delete the old `software-thuisverpleging` block (lines ~156-278)
- Delete the old `patienten-thuisverpleegkundige` block (lines ~279-395)
- Delete the old `administratie-thuisverpleging` block (lines ~396-511)
- Keep only the new versions (lines 513+)

**Step 2: Fix software names in the new software article**
- The new software article (starting line ~513) is generic and doesn't mention specific package names — good.
- In the section "Welke software bestaat er?" (line ~544), add mention of real packages: **Softn** and **CareForNurse van Corilus** as examples of gehomologeerde pakketten, without making it an exhaustive list.

### Files changed
- `src/pages/BlogArticle.tsx` — remove duplicate blocks, add correct software names

