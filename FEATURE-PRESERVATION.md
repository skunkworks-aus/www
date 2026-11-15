# Website release — 15 November 2026

Base: `0fc9049` (the live `main` commit when the merge began). The full pre-merge repository archive is retained outside this checkout under `Business/Admin/Website Releases/2026-11-15/` in the workspace. Git history also retains the original site.

| Existing feature | Merged location |
| --- | --- |
| Free check-up booking at `book.html` | Same URL, with reviewable email draft and fallback copy action |
| Email **or phone** contact | Contact and booking forms retain either contact method |
| Preferred visit time and topic query | Booking form retains Any time/Mornings/Afternoons/After hours; old topic links fill the message |
| Public `info@skunkworksau.com` alias | Shared contact links and prepared enquiry recipient |
| `services.html` and its five anchor sections | Service directory retains `m365`, `online`, `automation`, `security`, `academy` |
| Security and practical staff training | Business IT plus service directory and Academy links |
| Homepage check-up, family, FAQ, partner and booking links | Original anchors retained with concise sections and onward links |
| Store, Academy, Africa | Shared footer and Services menu; home ecosystem links |
| Group platform/partner destinations | About page, explicitly qualified as group-wide |
| Icons, fonts, social sharing image | Existing assets preserved |
| Canonical URLs, descriptions, sitemap and robots | Extended to the new pages |
| GitHub Pages and custom domain | Existing `main` branch / root deployment and CNAME retained |
| Theme-sync automation | Existing workflow retained; new page CSS does not overwrite the synced files |

## Deliberate changes

The long homepage scroll presentation is replaced by the approved concise landing page and optional workflow animation. The new Projects page describes Forrest General Store as in development; it does not claim completed customer results. `our-work.html` forwards to `projects.html`.

The old website did not have a form backend; it opened an email app. This release preserves that capability and adds review/copy fallback. Preparing a request does not send email or confirm an appointment. No customer enquiries were sent during testing.

## Rollback

Revert the release merge commit in a new PR to restore the previous tracked source, then verify the GitHub Pages build. Avoid resetting shared history. Check for later changes before any rollback.
