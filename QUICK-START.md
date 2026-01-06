# BTH EDUCATION GROUP WEBSITE - QUICK START GUIDE

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Launch (Critical)
- [ ] Replace all `[Your Phone Number]` with actual phone numbers
- [ ] Replace all `[Your Address]` with actual physical address
- [ ] Update email addresses (currently using generic @btheducationgroup.com)
- [ ] Add company logo to header (replace text logo)
- [ ] Add favicon files (favicon.ico, favicon.svg)
- [ ] Add images to `/assets/images/` folder
- [ ] Configure form submission endpoints (currently client-side only)
- [ ] Set up Google Analytics tracking
- [ ] Purchase SSL certificate (or use Let's Encrypt)
- [ ] Test on multiple devices and browsers

### Domain & Hosting
- [ ] Register domain: language.btheducationgroup.com
- [ ] Choose hosting provider (Netlify/Vercel recommended for static sites)
- [ ] Point DNS to hosting provider
- [ ] Enable HTTPS/SSL
- [ ] Set up email forwarding (info@, corporate@, executive@)

### Forms Configuration
Current forms need backend connection:
1. Contact form (`contact.html`)
2. Enrollment form (`enrollment.html`)
3. Corporate inquiry form (`corporate-solutions.html`)

**Options:**
- Use Formspree.io (easiest)
- Use Netlify Forms (if hosted on Netlify)
- Build custom API endpoint
- Use Google Forms integration

### SEO Setup
- [ ] Create `sitemap.xml`
- [ ] Create `robots.txt`
- [ ] Set up Google Search Console
- [ ] Set up Google My Business
- [ ] Add social media meta tags (Open Graph, Twitter Cards)

---

## 📁 FILE STRUCTURE EXPLAINED

```
Website/
│
├── index.html                   # Homepage - main entry point
├── contact.html                 # Contact form & information
├── enrollment.html              # Student enrollment & assessment booking
├── why-bth.html                 # Why choose BTH (philosophy & differentiation)
├── diplomas.html                # Certification information
├── corporate-solutions.html     # B2B corporate training
│
├── programs/                    # All individual program pages
│   ├── literacy.html
│   ├── vocational-english.html
│   ├── corporate-english.html
│   ├── executive-english.html
│   ├── certification-english.html
│   └── german-program.html
│
├── css/
│   └── main.css                 # Complete styling (50KB)
│
├── js/
│   └── main.js                  # All JavaScript functionality
│
├── assets/
│   └── images/                  # Add your images here
│
└── README.md                    # Full documentation
```

---

## 🎨 CUSTOMIZATION QUICK REFERENCE

### Change Brand Colors
Edit `/css/main.css` (lines 11-20):
```css
--color-primary: #1a4d8f;        /* Deep Professional Blue */
--color-secondary: #d4af37;      /* Gold */
--color-accent: #c74230;         /* Warm Red */
```

### Update Navigation
Edit the `<nav class="main-nav">` section in each HTML file header.

### Add New Page
1. Copy any existing HTML file
2. Update `<title>` and meta tags
3. Update content sections
4. Add link to navigation menu
5. Update all navigation menus across site

### Modify Homepage Hero
Edit `index.html` lines 85-105 (hero section)

---

## 🔧 COMMON TASKS

### Add Google Analytics
Paste before `</head>` in ALL HTML files:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA-XXXXXXXXXX');
</script>
```

### Connect Forms to Formspree
1. Sign up at formspree.io
2. Create form endpoint
3. Update form action:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Add reCAPTCHA to Forms
1. Get reCAPTCHA keys from google.com/recaptcha
2. Add before `</head>`:
```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```
3. Add to form before submit button:
```html
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```

---

## 📱 TESTING CHECKLIST

### Functionality Testing
- [ ] All navigation links work
- [ ] Mobile menu opens/closes correctly
- [ ] All forms validate properly
- [ ] Form submissions work (if connected to backend)
- [ ] Smooth scrolling functions
- [ ] Scroll-to-top button appears/works
- [ ] Dropdown menus work on hover (desktop) and click (mobile)

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Responsive Testing
Test on these viewports:
- [ ] Mobile (375px width)
- [ ] Mobile Large (425px width)
- [ ] Tablet (768px width)
- [ ] Desktop (1024px width)
- [ ] Desktop Large (1440px width)

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Sufficient color contrast
- [ ] All images have alt text
- [ ] Forms have proper labels
- [ ] Focus states visible

---

## 💾 BACKUP & MAINTENANCE

### Regular Backups
1. Download entire website folder weekly
2. Store in secure location (cloud backup)
3. Version control with Git (recommended)

### Monthly Maintenance
- Check for broken links
- Test all forms
- Review analytics
- Update content as needed

---

## 🐛 TROUBLESHOOTING

### Mobile Menu Not Working
- Check that `main.js` is loaded
- Verify no JavaScript errors in console
- Ensure mobile breakpoint is correct in CSS

### Forms Not Validating
- Check `data-validate` attribute on form
- Verify `main.js` is loaded
- Check browser console for errors

### Styling Issues
- Clear browser cache
- Check CSS file path is correct
- Verify no CSS syntax errors

### Images Not Loading
- Check file paths (case-sensitive on Linux servers)
- Verify images are uploaded to `/assets/images/`
- Ensure proper file extensions (.jpg, .png, .svg)

---

## 📊 ANALYTICS & TRACKING

### Key Metrics to Track
1. **Traffic Sources:** Where visitors come from
2. **Page Views:** Most popular pages
3. **Bounce Rate:** Engagement level
4. **Form Submissions:** Conversion rate
5. **Mobile vs Desktop:** Device preferences

### Conversion Goals to Set Up
- Enrollment form submission
- Contact form submission
- Corporate inquiry submission
- Program page visits
- Phone number clicks
- Email clicks

---

## 🔐 SECURITY RECOMMENDATIONS

1. **Enable HTTPS** - Essential for forms
2. **Add CSP Headers** - Content Security Policy
3. **Form Protection** - Add reCAPTCHA or hCaptcha
4. **Regular Updates** - Keep software updated
5. **Strong Passwords** - For hosting admin panel
6. **Backup Regularly** - Weekly automated backups

---

## 📞 SUPPORT RESOURCES

### Documentation
- Full README.md in website root
- Inline code comments in CSS and JS
- This quick start guide

### Useful Tools
- **Responsive Testing:** Chrome DevTools, responsively.app
- **Performance:** PageSpeed Insights, GTmetrix
- **SEO:** Google Search Console, Moz, SEMrush
- **Accessibility:** WAVE, axe DevTools
- **Forms:** Formspree, Netlify Forms, Google Forms

### Learning Resources
- HTML/CSS: MDN Web Docs (developer.mozilla.org)
- JavaScript: javascript.info
- Web hosting: Netlify Docs, Vercel Docs

---

## ✅ LAUNCH DAY CHECKLIST

**Final Verification Before Going Live:**

1. [ ] All placeholder content replaced
2. [ ] Contact information correct
3. [ ] Forms tested and working
4. [ ] SSL certificate installed
5. [ ] Google Analytics tracking
6. [ ] Mobile responsive on all pages
7. [ ] All images optimized and loaded
8. [ ] Footer links all work
9. [ ] Privacy policy & terms pages created
10. [ ] Sitemap submitted to Google
11. [ ] Social media links added (if applicable)
12. [ ] Test enrollment process end-to-end
13. [ ] Test corporate inquiry process
14. [ ] Test contact form
15. [ ] Spell-check all content
16. [ ] Review on actual mobile devices
17. [ ] Test load speed (should be <3 seconds)
18. [ ] Verify no broken links
19. [ ] Check all external links open in new tab
20. [ ] Final content review with stakeholders

---

## 🎯 POST-LAUNCH PRIORITIES

### Week 1
- Monitor form submissions daily
- Check analytics setup
- Fix any reported bugs
- Gather initial user feedback

### Month 1
- Review traffic patterns
- Optimize high-traffic pages
- A/B test CTAs if needed
- Add testimonials/reviews

### Month 3
- Comprehensive SEO audit
- Content updates based on feedback
- Consider adding blog section
- Plan feature enhancements

---

## 📈 GROWTH STRATEGIES

### Content Marketing
- Start a blog about language learning
- Create downloadable resources
- Share success stories
- Publish industry insights

### SEO Optimization
- Target local search terms
- Create location-specific pages
- Build quality backlinks
- Regular content updates

### Social Media Integration
- Add social sharing buttons
- Create social media profiles
- Share website content
- Engage with audience

---

**Questions? Need help?**
Refer to the main README.md file for comprehensive documentation.

---

**Website Built: January 2026**
**Version: 1.0**
**Status: Ready for Deployment**

🎓 **Language as Power. Language as Access. Language as Transformation.** 🌍
