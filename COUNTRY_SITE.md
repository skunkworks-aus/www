# Skunkworks Australia website

Skunkworks Africa design authority: https://github.com/skunkworks-africa/theme
Main visual reference: https://github.com/skunkworks-africa/www

Main domain: https://www.skunkworksau.com/ (CNAME www.skunkworksau.com, set Nov 2026).
skunkworksau.com.au and skunkworksau.au should 301-forward to https://www.skunkworksau.com at the DNS/registrar (GoDaddy). GitHub Pages supports one custom domain per repository.

Existing store from source: https://store.skunkworksau.com.au/ ; do not silently move catalogues or assume new region-specific Shopify domain.
Public contact address: info@skunkworksau.com (Microsoft 365 alias on the .com domain).

No fake entities, offices or local pricing have been added. The landing-page "Technology partners" section lists partnerships held across the Skunkworks group (as listed by Skunkworks Academy), styled in partners.css so the theme sync does not overwrite it. Run node scripts/validate-site.mjs then test 320px/desktop, dark/light contrast and GitHub Pages after publish.
