# Skunkworks Australia website

Skunkworks Africa design authority: https://github.com/skunkworks-africa/theme
Main visual reference: https://github.com/skunkworks-africa/www

Canonical currently configured: https://www.skunkworksau.com.au/
Existing CNAME: www.skunkworksau.com.au
Requested new country domain: https://www.skunkworksau.au/

**IMPORTANT: do not switch GitHub Pages CNAME/canonical until DNS and HTTPS for www.skunkworksau.au are configured and verified.** GitHub Pages supports one custom domain for this repository. Coordinate an HTTP 301 redirect for the legacy .com.au host at its DNS/hosting provider when switching.

Existing store from source: https://store.skunkworksau.com.au/ ; do not silently move catalogues or assume new region-specific Shopify domain.
Existing contact address from source: info@skunkworksau.com.au.

No fake entities, offices or local pricing have been added. The landing-page "Technology partners" section lists partnerships held across the Skunkworks group (as listed by Skunkworks Academy), styled in partners.css so the theme sync does not overwrite it. Run node scripts/validate-site.mjs then test 320px/desktop, dark/light contrast and GitHub Pages after publish.
