# Skunkworks Australia website

Static website published by GitHub Pages from `main` at https://www.skunkworksau.com/.

The concise home page leads to Websites, Automation & AI, Business IT, Free Tech Check-up, Projects, About and Contact. `services.html` and `book.html` retain the original service and booking URLs. `our-work.html` forwards to Projects.

Run `node scripts/validate-site.mjs` and check desktop and phone layouts before release. Forms prepare an email for review; they do not submit requests or confirm bookings. The public recipient is `info@skunkworksau.com`.

Existing fonts, icons, social image, domain configuration and theme-sync workflow are retained. The shared page styles are `clarity.css`, `pages.css` and `production.css`, with group tokens loaded from `tokens.css`. Interaction code is `simple.js` and `site-navigation.js`. The minimal homepage uses scoped `home.css` and `home.js`; its service demonstrations remain on Websites, Automation and Check-up. General FAQs are on `services.html#faq`, with earlier home bookmarks forwarded to the relevant inner pages.

See `FEATURE-PRESERVATION.md` for the merge inventory and rollback approach.
