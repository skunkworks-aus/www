# Skunkworks Australia website

Static website published by GitHub Pages from `main` at https://www.skunkworksau.com/.

The concise home page leads to Websites, Automation & AI, Business IT, Free Tech Check-up, About and Contact. Projects is temporarily hidden, with its route retained and marked noindex. `services.html` and `book.html` retain the original service and booking URLs. `our-work.html` forwards to Projects.

Run `node scripts/validate-site.mjs` and check desktop and phone layouts before release. Contact and booking forms submit directly through FormSubmit; a successful request does not confirm a booking. Inbox activation was confirmed during setup. The public recipient is `info@skunkworksau.com`.

Existing fonts, icons, social image, domain configuration and theme-sync workflow are retained. The shared page styles are `clarity.css`, `pages.css` and `production.css`, with group tokens loaded from `tokens.css`. Interaction code is `simple.js` and `site-navigation.js`. The minimal homepage uses scoped `home.css` and `home.js`; its service demonstrations remain on Websites, Automation and Check-up. General FAQs are on `services.html#faq`, with earlier home bookmarks forwarded to the relevant inner pages.

See `FEATURE-PRESERVATION.md` for the merge inventory and rollback approach.

Run `node --test scripts/test-enquiry.mjs` to verify enquiry success, failure, duplicate-send prevention and topic/contact handling without sending email. The native form action provides a non-JavaScript fallback; AJAX stays on the page. Never report delivery on an unsuccessful provider response.
