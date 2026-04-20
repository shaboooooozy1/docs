# Proposed maintenance tasks

## 1) Fix a typo
**Task:** Correct the misspelling `seperate` to `separate` in the curl-generation comment.

**Why:** This is a straightforward spelling error in an inline code comment and is easy to fix with no behavioral risk.

**Location:** `src/rest/components/get-rest-code-samples.ts`.

---

## 2) Fix a bug
**Task:** Update link-check batching logic so the final partial batch is processed.

**Why:** The current loop uses `Math.floor(docsLinksFiles.length / BATCH_SIZE)`, which skips any remainder items. If the number of links is not an exact multiple of `BATCH_SIZE`, some links are never checked.

**Location:** `src/links/scripts/check-github-github-links.ts`.

---

## 3) Fix a code comment / documentation discrepancy
**Task:** Align the `checkURL` function comment with actual return behavior.

**Why:** The comment says the function returns `undefined` for known pages, but the implementation returns `null`. This mismatch can mislead maintainers and test authors.

**Location:** `src/tests/helpers/check-url.ts`.

---

## 4) Improve a test
**Task:** Add a regression test for the link-check batching edge case (remainder items).

**Why:** There appears to be no direct test coverage for `check-github-github-links.ts` batching behavior, and this is exactly where a remainder-handling bug can hide.

**Suggested approach:**
- Extract batch slicing into a small pure helper (or expose an internal utility), then unit test cases like:
  - exact multiple of batch size
  - one-item remainder
  - empty input
- Alternatively, mock a short link list in a script-level test and assert all links are attempted.

**Related locations:** `src/links/scripts/check-github-github-links.ts`, existing links tests in `src/links/tests/`.
