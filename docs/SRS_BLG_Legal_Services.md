# Software Requirements Specification (SRS)
## BLG Legal Services Website - Immigration, Trademark & Business Formation

**Version:** 3.0  
**Date:** January 2, 2026  
**Document Status:** PRODUCTION RELEASE  
**Repository:** https://github.com/dgililov/BLG-Legal-Services-Website

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [User Interface Requirements](#5-user-interface-requirements)
6. [System Architecture](#6-system-architecture)
7. [Implementation Status](#7-implementation-status)
8. [Contact Information](#8-contact-information)
9. [Practice Areas](#9-practice-areas)
10. [Attorney Fees](#10-attorney-fees)
11. [Multilingual Support](#11-multilingual-support)
12. [Technical Specifications](#12-technical-specifications)
13. [Security Requirements](#13-security-requirements)
14. [Accessibility Requirements](#14-accessibility-requirements)
15. [Performance Requirements](#15-performance-requirements)
16. [Deployment & Hosting](#16-deployment--hosting)
17. [Testing Requirements](#17-testing-requirements)
18. [Future Enhancements](#18-future-enhancements)
19. [Compliance Checklist](#19-compliance-checklist)
20. [Risk Analysis](#20-risk-analysis)
21. [Revision History](#21-revision-history)
22. [Appendices](#22-appendices)

---

## 1. INTRODUCTION

### 1.1 Purpose
This Software Requirements Specification (SRS) document defines the complete requirements for the BLG Legal Services law firm website. The website serves as the primary digital presence for the firm, providing comprehensive information about immigration, trademark registration, and business formation services, with integrated pricing transparency, multilingual support in 8 languages, and client engagement features.

### 1.2 Scope
The system is a professional, multilingual legal services website that enables:
- Prospective clients to learn about immigration, trademark, and business formation services
- Transparent pricing display for all services
- Multilingual access in 8 languages (English, Spanish, French, Russian, Hebrew, Georgian, Farsi, Uzbek)
- Client communication through contact forms
- Educational content delivery via blog and F.A.Q sections
- Client testimonials and reviews integration
- Mobile-responsive experience across all devices

### 1.3 Definitions and Acronyms

| Term | Definition |
|------|------------|
| SRS | Software Requirements Specification |
| CMS | Content Management System |
| USPTO | United States Patent and Trademark Office |
| USCIS | U.S. Citizenship and Immigration Services |
| EOIR | Executive Office for Immigration Review |
| BIA | Board of Immigration Appeals |
| ADA | Americans with Disabilities Act |
| SSL/TLS | Secure Sockets Layer / Transport Layer Security |
| SEO | Search Engine Optimization |
| CDN | Content Delivery Network |
| WCAG | Web Content Accessibility Guidelines |
| RTL | Right-to-Left (text direction for Hebrew, Farsi) |
| CTA | Call to Action |
| i18n | Internationalization |
| l10n | Localization |
| F.A.Q | Frequently Asked Questions |

### 1.4 References
- [BLG Legal Services GitHub Repository](https://github.com/dgililov/BLG-Legal-Services-Website)
- WCAG 2.1 Accessibility Guidelines
- American Bar Association Model Rules of Professional Conduct
- USPTO Guidelines for Trademark Services
- New York State Bar Attorney Advertising Rules

### 1.5 Document Overview
This SRS is organized as follows:
- **Sections 1-2**: Introduction and overall system description
- **Sections 3-5**: Functional, non-functional, and UI requirements
- **Sections 6-7**: System architecture and implementation status
- **Sections 8-11**: Business content specifications
- **Sections 12-17**: Technical specifications and requirements
- **Sections 18-22**: Future plans, compliance, and appendices

---

## 2. OVERALL DESCRIPTION

### 2.1 Product Perspective
A comprehensive web-based platform serving as the primary digital presence for BLG Legal Services, a multi-service legal practice specializing in:
- **U.S. Immigration Law** - Full-service immigration representation
- **Trademark Registration** - USPTO applications and brand protection
- **Business Formation** - LLC, Corporation, and Partnership formation

The firm serves clients nationwide (all 50 U.S. states) and internationally through virtual consultations.

### 2.2 Product Functions

| Function Category | Description |
|-------------------|-------------|
| Information Display | Comprehensive details about three service lines |
| Pricing Transparency | Complete attorney fee schedules |
| Multilingual Access | Full content in 8 languages |
| Client Communication | Contact forms and consultation scheduling |
| Educational Content | Blog articles and F.A.Q section |
| Social Proof | Client testimonials and Google Reviews |
| SEO Optimization | Search engine visibility |
| Accessibility | WCAG 2.1 Level AA compliance |

### 2.3 User Classes and Characteristics

| User Class | Characteristics | Technical Expertise | Language Preference |
|------------|----------------|---------------------|---------------------|
| Prospective Immigration Clients | Individuals/families seeking U.S. immigration services | Low to Medium | All 8 languages |
| Business Clients | Entrepreneurs needing trademark/business formation | Medium | English, Spanish, Russian |
| International Clients | Clients abroad seeking U.S. services | Low to Medium | Non-English |
| Multilingual Users | Non-English speakers | Low to Medium | Various |
| Existing Clients | Current clients accessing information | Low to Medium | All 8 languages |
| Website Administrators | Firm staff managing content | Medium to High | English |
| Search Engine Crawlers | Automated indexing bots | N/A | All |

### 2.4 Operating Environment

**Client-side Requirements:**
- Modern web browsers: Chrome, Firefox, Safari, Edge (last 2 versions)
- iOS Safari (iOS 13+)
- Chrome Mobile (last 2 versions)

**Device Support:**
- Desktop computers (1920x1080 and above)
- Laptops (1366x768 and above)
- Tablets (768px and above)
- Mobile phones (320px and above)

**Network Requirements:**
- Standard broadband connection
- 4G/5G mobile connections
- International access optimization

### 2.5 Design and Implementation Constraints

| Constraint | Description |
|------------|-------------|
| Language Support | Must support 8 languages with proper UTF-8 encoding |
| RTL Languages | Must accommodate Hebrew and Farsi (right-to-left) |
| Attorney Advertising | Must comply with attorney advertising regulations |
| Accessibility | Must maintain WCAG 2.1 Level AA compliance |
| Cross-browser | Must function across all major browsers |
| Performance | Must load within 3 seconds on 4G connections |
| Static Hosting | Website is static HTML/CSS/JS (no server-side processing required) |

### 2.6 Assumptions and Dependencies

**Assumptions:**
- Users have modern web browsers with JavaScript enabled
- SSL certificate is configured for production deployment
- Domain DNS is properly configured
- Email server is configured for form submissions

**Dependencies:**
- Google Fonts API (Inter, Poppins)
- Font Awesome CDN (icons)
- Google Analytics (optional)
- reCAPTCHA API (form spam protection)
- Google Places API (reviews, optional)

---

## 3. FUNCTIONAL REQUIREMENTS

### 3.1 Navigation and Information Architecture

**FR-001: Main Navigation Menu**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Primary navigation with the following sections:
  - HOME
  - ATTORNEY FEES
  - PRACTICE AREAS (with dropdown submenu)
  - CLIENT REVIEWS
  - BLOG
  - F.A.Q
  - CONTACT US (button)
  - Language Selector
- **Acceptance Criteria**: 
  - All menu items accessible within 2 clicks
  - Menu responsive on all devices
  - Mobile hamburger menu for screens < 768px
  - Dropdown menus accessible via hover (desktop) and click (mobile)

**FR-002: Three-Service Architecture**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Clear organization of three primary service lines:
  - Immigration Practice
  - Trademark Registration & Brand Protection
  - Business Formation
- **Acceptance Criteria**: Each service has dedicated section with visual distinction and icons

**FR-003: Quick Contact Access**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Contact methods prominently displayed:
  - Email: law@blglegalservices.com (clickable mailto link)
  - Phone: 646-948-9555 (clickable tel link on mobile)
  - Hours: Mon-Sat 9AM-5PM
- **Acceptance Criteria**: Contact information visible in header on every page

### 3.2 Homepage Content

**FR-004: Hero Section**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Impactful hero section with:
  - Main heading: "Expert Immigration Law Services"
  - Subheading: "Navigating your path to U.S. residency with ease"
  - Two CTAs: "Get Your Free Consultation" and "Learn More"
- **Acceptance Criteria**: Hero section above the fold on all devices

**FR-005: Mission Statement Display**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Mission statement section:
  > "At BLG Legal Services, our mission is simple — to open doors and protect dreams. We guide individuals, families, and businesses through the complex processes of U.S. immigration, business formation, and trademark registration with integrity, compassion, and precision."
- **Acceptance Criteria**: Prominently displayed below hero

**FR-006: Who We Are Section**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Firm overview highlighting:
  - New York Metro area base
  - Nationwide and international service
  - Multi-service offering
  - Personalized approach
- **Acceptance Criteria**: Clear, scannable content with emphasis

**FR-007: Services Overview Grid**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Three-column service cards:
  - Immigration Practice (passport icon)
  - Trademark Registration (trademark icon)
  - Business Formation (building icon)
- **Acceptance Criteria**: 
  - Each card has icon, title, description, bullet points, and CTA
  - Responsive layout (3-column → 1-column on mobile)

**FR-008: Why Choose BLG Section**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Five value propositions:
  - Experience & Integrity
  - Nationwide Representation
  - Personalized Strategy
  - Multilingual Support
  - Proven Results
- **Acceptance Criteria**: Grid layout with icons and descriptions

**FR-009: Languages Display**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Display supported languages with flag emojis:
  - 🇺🇸 English, 🇫🇷 French, 🇪🇸 Spanish, 🇷🇺 Russian
  - 🇮🇱 Hebrew, 🇬🇪 Georgian, 🇮🇷 Farsi, 🇺🇿 Uzbek
- **Acceptance Criteria**: Languages visible on homepage without scrolling far

**FR-010: Contact CTA Section**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Call-to-action section with:
  - Phone button: 646-948-9555
  - Email button: law@blglegalservices.com
  - Consultation fee: $250 for up to one hour
- **Acceptance Criteria**: Prominent buttons with click-to-call/email

### 3.3 Attorney Fees Page

**FR-011: Fee Disclaimer**
- **Priority**: Must Have (Legal Compliance)
- **Status**: ✅ Implemented
- **Description**: Prominent disclaimer:
  > "The fees below represent attorney fees only. Any government fees are not included here and subject to change."
- **Acceptance Criteria**: Displayed at top and bottom of fees page

**FR-012: Immigration Fees Display**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Complete immigration fee tables organized by category:
  - Nonimmigrant Employment Visas (H-1B, H-4, L-1, O-1, R-1)
  - Nonimmigrant Investor Visa (E-2)
  - Nonimmigrant Travel Visa (B-1/B-2)
  - Employment Based Permanent Residence (EB-1, EB-2, EB-3)
  - Nonimmigrant Family Based (K-1)
  - Family Based Permanent Residence (Marriage, Relatives, I-751)
  - Investment Based (EB-5)
  - Citizenship (N-400)
  - Student Visa (F-1, J-1)
  - Asylum (I-589, Removal Proceedings)
  - Waivers (I-601, I-212)
- **Acceptance Criteria**: 
  - All fees clearly displayed with derivative applicant fees
  - Responsive table design
  - Search/filter functionality

**FR-013: Trademark Fees Display**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Complete trademark fee table:
  - Registration per class: $675
  - Statement of use: $550
  - Renewal: $850
  - Section 8 affidavit: $675
  - Amendments and corrections: $450
  - Opposition/Cancellation: $950-$1,200
- **Acceptance Criteria**: All 13 trademark services listed with fees

**FR-014: Business Formation Fees**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Business formation pricing:
  - Range: $500 - $1,500
  - Note: Depends on state and case by case review
- **Acceptance Criteria**: Clear range with explanatory note

**FR-015: Consultation Fees**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Consultation fee display:
  - Up to one hour: $250
- **Acceptance Criteria**: Prominently displayed with scheduling CTA

### 3.4 Practice Area Pages

**FR-016: Practice Area Subpages**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Dedicated pages for each practice area:
  - Family-Based Immigration
  - Asylum & Humanitarian Protection
  - Employment & Business Immigration
  - Green Card & Adjustment of Status
  - Citizenship & Naturalization
  - Removal Defense & Motions
  - Trademark Registration
- **Acceptance Criteria**: 
  - Each page has detailed service descriptions
  - Consistent layout and navigation
  - Clear CTAs to contact

### 3.5 Contact Page

**FR-017: Contact Form**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Contact form with fields:
  - Name (required)
  - Email (required)
  - Phone (optional)
  - Service Type (dropdown)
  - Message (required)
  - reCAPTCHA (spam protection)
- **Acceptance Criteria**: 
  - Form validation (client-side)
  - Success/error messages
  - Accessible form labels

**FR-018: Contact Information Display**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Contact details:
  - Address: 315 Madison Avenue, 3rd Floor, New York, NY 10017
  - Phone: 646-948-9555
  - Email: law@blglegalservices.com
  - Hours: Monday - Saturday, 9:00 AM - 5:00 PM
- **Acceptance Criteria**: All information displayed with icons

### 3.6 Blog & F.A.Q Pages

**FR-019: Blog Section**
- **Priority**: Should Have
- **Status**: ✅ Implemented (structure only)
- **Description**: Blog page with:
  - Article listing layout
  - Category filtering
  - Search functionality
  - Social sharing buttons
- **Acceptance Criteria**: Page structure complete, content pending

**FR-020: F.A.Q Section**
- **Priority**: Should Have
- **Status**: ✅ Implemented (structure only)
- **Description**: F.A.Q page with:
  - Accordion-style questions
  - Category organization
  - Search functionality
- **Acceptance Criteria**: Page structure complete, content pending

### 3.7 Client Reviews Page

**FR-021: Reviews Display**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Client testimonials page:
  - Google Reviews integration
  - Star ratings
  - Review cards layout
  - Overall rating display
- **Acceptance Criteria**: Reviews displayed in card format with ratings

### 3.8 Language Switching

**FR-022: Language Selector**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Dropdown language selector with:
  - 8 language options
  - Flag indicators
  - Persistent selection (localStorage)
  - Instant page translation
- **Acceptance Criteria**: 
  - Selector visible in navigation
  - Selection persists across sessions
  - Content updates without page reload (where possible)

**FR-023: Multilingual Page Structure**
- **Priority**: Must Have
- **Status**: ✅ Implemented
- **Description**: Separate URL structure for each language:
  - `/index.html` (English - default)
  - `/es/index.html` (Spanish)
  - `/fr/index.html` (French)
  - `/ru/index.html` (Russian)
  - `/he/index.html` (Hebrew)
  - `/ka/index.html` (Georgian)
  - `/fa/index.html` (Farsi)
  - `/uz/index.html` (Uzbek)
- **Acceptance Criteria**: 
  - Each language has complete page set
  - hreflang tags for SEO
  - Proper RTL support for Hebrew and Farsi

---

## 4. NON-FUNCTIONAL REQUIREMENTS

### 4.1 Performance Requirements

| Metric | Target | Priority |
|--------|--------|----------|
| First Contentful Paint (FCP) | < 1.5s | Must Have |
| Time to Interactive (TTI) | < 3.5s | Must Have |
| Largest Contentful Paint (LCP) | < 2.5s | Must Have |
| Cumulative Layout Shift (CLS) | < 0.1 | Must Have |
| First Input Delay (FID) | < 100ms | Must Have |
| Total Page Size | < 2MB | Must Have |
| Lighthouse Score (Desktop) | > 90 | Should Have |
| Lighthouse Score (Mobile) | > 85 | Should Have |

### 4.2 Reliability Requirements

| Requirement | Target |
|-------------|--------|
| Uptime | 99.9% |
| Error Rate | < 0.1% |
| Backup Frequency | Daily |
| Recovery Time Objective (RTO) | < 4 hours |

### 4.3 Security Requirements

| Requirement | Description |
|-------------|-------------|
| HTTPS | All pages served over TLS 1.2+ |
| Form Validation | Client-side and server-side validation |
| reCAPTCHA | Form spam protection |
| XSS Prevention | Content Security Policy headers |
| No Sensitive Data | No PII in client-side code or logs |

### 4.4 Scalability Requirements

| Requirement | Target |
|-------------|--------|
| Concurrent Users | Support 1,000+ simultaneous visitors |
| Traffic Spikes | Handle 10x normal traffic |
| CDN Integration | Global content delivery |

### 4.5 Maintainability Requirements

| Requirement | Description |
|-------------|-------------|
| Code Quality | ESLint/Prettier compliance |
| Documentation | Inline comments and README files |
| Version Control | Git with semantic versioning |
| Modular CSS | Organized stylesheets |

---

## 5. USER INTERFACE REQUIREMENTS

### 5.1 Design Principles

- **Professional**: Legal industry-appropriate aesthetic
- **Trustworthy**: Convey reliability and expertise
- **Accessible**: WCAG 2.1 Level AA compliant
- **Responsive**: Mobile-first design approach
- **Consistent**: Unified design language across all pages

### 5.2 Color Scheme

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Blue | #1a365d | Headers, primary buttons, links |
| Secondary Gold | #c9a227 | Accents, CTAs, highlights |
| Text Primary | #1a1a1a | Body text |
| Text Secondary | #4a5568 | Subtitles, descriptions |
| Background | #ffffff | Page background |
| Alt Background | #f7f8fa | Section alternates |
| Success | #38a169 | Success messages |
| Error | #e53e3e | Error states |

### 5.3 Typography

| Element | Font Family | Weight | Size |
|---------|-------------|--------|------|
| Headings | Poppins | 600-800 | 24-48px |
| Body Text | Inter | 400-500 | 16px |
| Navigation | Inter | 500-600 | 14-16px |
| Buttons | Inter | 600 | 14-16px |
| Captions | Inter | 400 | 12-14px |

### 5.4 Component Library

**Buttons:**
- Primary: Blue background, white text
- Secondary: White background, blue border
- Large: Increased padding for CTAs

**Cards:**
- Service cards with icons
- Review cards with ratings
- Pricing tables

**Forms:**
- Input fields with labels
- Select dropdowns
- Textarea
- Submit buttons

**Navigation:**
- Top bar with contact info
- Main nav with dropdown menus
- Mobile hamburger menu
- Footer with quick links

### 5.5 Responsive Breakpoints

| Breakpoint | Width | Device Type |
|------------|-------|-------------|
| Mobile | < 576px | Small phones |
| Mobile Large | 576-767px | Large phones |
| Tablet | 768-991px | Tablets |
| Desktop | 992-1199px | Laptops |
| Desktop Large | ≥ 1200px | Desktops |

---

## 6. SYSTEM ARCHITECTURE

### 6.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     BLG Legal Services Website               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   HTML5     │  │   CSS3      │  │   JavaScript (ES6+) │  │
│  │   Pages     │  │   Styles    │  │   Interactivity     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Multilingual Content (8 Languages)         │ │
│  │  EN │ ES │ FR │ RU │ HE │ KA │ FA │ UZ                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                    External Dependencies                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Google  │  │   Font   │  │ reCAPTCHA│  │  Google  │    │
│  │  Fonts   │  │  Awesome │  │   API    │  │ Analytics│    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Directory Structure

```
BLG-Legal-Services-Website/
├── index.html                    # English homepage
├── assets/
│   ├── css/
│   │   ├── style.css            # Main stylesheet
│   │   └── responsive.css       # Responsive styles
│   ├── js/
│   │   ├── main.js              # Core functionality
│   │   ├── form.js              # Form handling
│   │   ├── lang.js              # Language switcher
│   │   ├── translations.js      # Translation strings
│   │   └── reviews.js           # Reviews integration
│   ├── images/
│   │   ├── logo.png             # Main logo
│   │   └── favicon.png          # Browser favicon
│   └── fonts/                   # Custom fonts (if needed)
├── pages/
│   ├── fees.html                # Attorney fees
│   ├── contact.html             # Contact page
│   ├── blog.html                # Blog section
│   ├── qna.html                 # F.A.Q section
│   ├── reviews.html             # Client reviews
│   └── practice-areas/
│       ├── family-immigration.html
│       ├── asylum.html
│       ├── employment-immigration.html
│       ├── green-card.html
│       ├── citizenship.html
│       ├── removal-defense.html
│       └── trademark.html
├── es/                          # Spanish version
│   ├── index.html
│   └── pages/...
├── fr/                          # French version
├── ru/                          # Russian version
├── he/                          # Hebrew version
├── ka/                          # Georgian version
├── fa/                          # Farsi version
├── uz/                          # Uzbek version
├── backend/                     # Optional backend (Node.js)
├── docs/
│   ├── SRS_BLG_Legal_Services.md
│   └── GOOGLE_REVIEWS_INTEGRATION.md
├── README.md
├── CHANGELOG.md
└── .gitignore
```

### 6.3 Technology Stack

**Frontend:**
| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | Latest | Semantic markup |
| CSS3 | Latest | Styling with Flexbox/Grid |
| JavaScript | ES6+ | Interactivity |
| Font Awesome | 6.4.0 | Icons |
| Google Fonts | - | Typography (Inter, Poppins) |

**Build Tools (Optional):**
| Tool | Purpose |
|------|---------|
| Git | Version control |
| GitHub | Repository hosting |
| http-server / Python | Local development |

**Backend (Optional):**
| Technology | Purpose |
|------------|---------|
| Node.js | Form submission handling |
| Express | API server |
| Nodemailer | Email sending |

---

## 7. IMPLEMENTATION STATUS

### 7.1 Version History Summary

| Version | Date | Status | Key Features |
|---------|------|--------|--------------|
| 1.0.0 | Jan 2, 2026 | Released | Initial website with 8 English pages |
| 1.1.0 | Jan 2, 2026 | Released | Multilingual support for 8 languages |
| 1.2.0 | Jan 2, 2026 | Current | Q&A → F.A.Q terminology update |

### 7.2 Completed Features

| Feature | Status | Notes |
|---------|--------|-------|
| Homepage | ✅ Complete | All sections implemented |
| Navigation | ✅ Complete | Desktop and mobile |
| Attorney Fees | ✅ Complete | All pricing tables |
| Practice Areas (7 pages) | ✅ Complete | All content |
| Contact Page | ✅ Complete | Form with validation |
| Blog Page | ✅ Structure | Content pending |
| F.A.Q Page | ✅ Structure | Content pending |
| Reviews Page | ✅ Complete | Google Reviews integration |
| Multilingual (8 languages) | ✅ Complete | Full translation system |
| Spanish Homepage | ✅ Complete | Fully translated |
| Responsive Design | ✅ Complete | All breakpoints |
| SEO Optimization | ✅ Complete | Meta tags, hreflang |
| Accessibility | ✅ Complete | WCAG 2.1 AA |
| Logo & Favicon | ✅ Complete | BLG branding |

### 7.3 Pages by Language

| Language | Code | Homepage | Fees | Practice Areas | Contact | Blog | F.A.Q | Reviews |
|----------|------|----------|------|----------------|---------|------|-------|---------|
| English | en | ✅ | ✅ | ✅ (7) | ✅ | ✅ | ✅ | ✅ |
| Spanish | es | ✅ | ✅ | ✅ (7) | ✅ | ✅ | ✅ | ✅ |
| French | fr | ✅ | ✅ | ✅ (7) | ✅ | ✅ | ✅ | ✅ |
| Russian | ru | ✅ | ✅ | ✅ (7) | ✅ | ✅ | ✅ | ✅ |
| Hebrew | he | ✅ | ✅ | ✅ (7) | ✅ | ✅ | ✅ | ✅ |
| Georgian | ka | ✅ | ✅ | ✅ (7) | ✅ | ✅ | ✅ | ✅ |
| Farsi | fa | ✅ | ✅ | ✅ (7) | ✅ | ✅ | ✅ | ✅ |
| Uzbek | uz | ✅ | ✅ | ✅ (7) | ✅ | ✅ | ✅ | ✅ |

**Total Pages:** 80+ HTML files

### 7.4 File Statistics

| Category | Count |
|----------|-------|
| HTML Files | 80+ |
| CSS Files | 2 |
| JavaScript Files | 5 |
| Image Files | 3 |
| Documentation Files | 6 |
| **Total Project Files** | 100+ |

---

## 8. CONTACT INFORMATION

### 8.1 Firm Details

| Field | Value |
|-------|-------|
| **Firm Name** | BLG Legal Services |
| **Address** | 315 Madison Avenue, 3rd Floor, New York, NY 10017, USA |
| **Phone** | 646-948-9555 |
| **Email** | law@blglegalservices.com |
| **Hours** | Monday - Saturday, 9:00 AM - 5:00 PM (EST) |

### 8.2 Service Areas

- **Primary**: New York Metro Area
- **National**: All 50 U.S. States
- **International**: Virtual consultations available worldwide

### 8.3 Consultation Fee

- **Standard Consultation**: $250 for up to one hour
- **Method**: In-person, phone, or video conference

---

## 9. PRACTICE AREAS

### 9.1 Immigration Practice

#### 9.1.1 Family-Based Immigration
- Marriage-Based Green Cards (I-130 + I-485)
- Fiancé(e) Visas (K-1)
- Petitions for Parents, Children, and Siblings
- Adjustment of Status and Consular Processing
- Removal of Conditions (I-751)

#### 9.1.2 Asylum & Humanitarian Protection
- Affirmative Asylum (USCIS)
- Defensive Asylum (EOIR)
- VAWA Self-Petitions
- U Visas for Victims of Crimes
- T Visas for Victims of Trafficking
- Humanitarian Parole and Deferred Action

#### 9.1.3 Employment & Business Immigration
- EB-1A (Extraordinary Ability)
- EB-2 NIW (National Interest Waiver)
- TN Visas (Canadian & Mexican Citizens)
- H-1B Specialty Occupations
- L-1 Intracompany Transfers
- PERM Labor Certification

#### 9.1.4 Green Card & Adjustment of Status
- Adjustment of Status (I-485)
- Consular Processing
- Medical Exam Requirements
- Public Charge Documentation
- Travel Permits (Advance Parole)

#### 9.1.5 Citizenship & Naturalization
- Naturalization Applications (N-400)
- Citizenship through Parents or Military Service
- Interview & Test Preparation
- Dual Citizenship Guidance
- Certificates of Citizenship (N-600)

#### 9.1.6 Removal Defense & Motions
- Removal Proceedings (EOIR)
- Motions to Reopen or Reconsider
- Bond Hearings
- Cancellation of Removal
- Appeals to BIA or Federal Circuit Courts

### 9.2 Trademark Registration & Brand Protection

- Comprehensive Trademark Searches & Legal Opinions
- USPTO Applications (Word, Logo, Slogan Marks)
- Office Action Responses & Statements of Use
- Trademark Renewals, Maintenance, and Portfolio Management
- Cease & Desist Letters & Brand Enforcement Strategy

### 9.3 Business Formation

- LLC Formation
- Corporation Formation
- Partnership Agreements
- State-specific Registrations
- Compliance Guidance

---

## 10. ATTORNEY FEES

### 10.1 Immigration Services

#### Nonimmigrant Employment Visas
| Service | Attorney Fee | Derivative Fee |
|---------|--------------|----------------|
| H-1B (Temporary Worker) | $5,500 | +$550 each |
| H-4 (Spouse of H-1B) | $1,500 | +$550 each |
| L-1 (Intra-company Transfer) | $6,500 | +$550 each |
| O-1 (Special Talent) | $6,500 | +$550 each |
| R-1 (Religious Visa) | $5,500 | +$550 each |

#### Nonimmigrant Investor Visa
| Service | Attorney Fee | Derivative Fee |
|---------|--------------|----------------|
| E-2 (Investor Visa) | $8,500 | +$550 each |

#### Nonimmigrant Travel Visa
| Service | Attorney Fee | Derivative Fee |
|---------|--------------|----------------|
| B-1/B-2 / Extension of Stay | $750 | +$550 each |

#### Employment Based Permanent Residence
| Service | Attorney Fee | Derivative Fee |
|---------|--------------|----------------|
| EB-1 (Outstanding Researchers/Professors) | $9,500 | +$550 each |
| EB-2 / EB-2 NIW | $9,500 | +$550 each |
| EB-3 (Skilled Workers) | $6,500 | +$550 each |

#### Family Based Visas
| Service | Attorney Fee | Derivative Fee |
|---------|--------------|----------------|
| K-1 (Fiancé Visa) | $4,500 | +$550 each |
| Green Card through Marriage | $4,500 | +$550 each |
| Immediate Relative Petition | $4,500 | +$550 each |
| Sibling Petition | $4,500 | +$550 each |
| I-751 (Remove Conditions) | $3,500 | +$550 each |

#### Investment Based
| Service | Attorney Fee | Derivative Fee |
|---------|--------------|----------------|
| EB-5 (Qualified Investor) | $25,000 | +$550 each |

#### Citizenship
| Service | Attorney Fee | Derivative Fee |
|---------|--------------|----------------|
| N-400 (Naturalization) | $1,500 | +$550 each |

#### Student Visa
| Service | Attorney Fee | Derivative Fee |
|---------|--------------|----------------|
| F-1 / J-1 | $2,500 | +$550 each |

#### Asylum
| Service | Attorney Fee | Derivative Fee |
|---------|--------------|----------------|
| I-589 Affirmative Asylum | $10,000 | +$550 each |
| Asylum in Removal Proceedings | $10,000 | +$550 each |

#### Waivers
| Service | Attorney Fee |
|---------|--------------|
| I-601 (Waiver of Inadmissibility) | $7,500 |
| I-212 (Permission to Reapply) | $7,500 |

### 10.2 Trademark Services

| Service | Attorney Fee |
|---------|--------------|
| Registration per international class | $675 |
| Filing a statement of use | $550 |
| Application for renewal under §9, per class | $850 |
| Correcting a deficiency in a renewal application | $450 |
| Filing §8 affidavit, per class | $675 |
| Correcting a deficiency in a §8 affidavit | $450 |
| Issuing new certificate of registration | $450 |
| Certificate of correction, registrant's error | $450 |
| Filing amendment to registration | $450 |
| Petition for cancellation, per class | $1,200 |
| Notice of opposition, per class | $950 |
| Combined Declaration of Use and Incontestability | $950 |
| Filing Combined Declaration under §§8 & 15 | $550 |

### 10.3 Business Formation

| Service | Attorney Fee |
|---------|--------------|
| Business Formation (LLC, Corporation, Partnership) | $500 - $1,500 |

*Note: Fee depends on state and case-by-case review*

### 10.4 Consultation

| Service | Fee |
|---------|-----|
| Up to one hour consultation | $250 |

### 10.5 Fee Disclaimer

> **Important:** The fees listed above represent attorney fees only. Government filing fees (USCIS, State Department, USPTO, etc.) are additional and subject to change. A complete cost estimate including all applicable government fees will be provided during consultation.

---

## 11. MULTILINGUAL SUPPORT

### 11.1 Supported Languages

| Language | Code | Direction | Status | Native Name |
|----------|------|-----------|--------|-------------|
| English | en | LTR | ✅ Complete | English |
| Spanish | es | LTR | ✅ Complete | Español |
| French | fr | LTR | ✅ Complete | Français |
| Russian | ru | LTR | ✅ Complete | Русский |
| Hebrew | he | RTL | ✅ Complete | עברית |
| Georgian | ka | LTR | ✅ Complete | ქართული |
| Farsi | fa | RTL | ✅ Complete | فارسی |
| Uzbek | uz | LTR | ✅ Complete | O'zbek |

### 11.2 Translation System

**Implementation:**
- JavaScript-based translation system (`translations.js`)
- Language selector dropdown in navigation
- Persistent language preference (localStorage)
- SEO-friendly hreflang tags
- Separate URL structure per language

**Translation Coverage:**
- Navigation menus
- Headers and titles
- Body content
- Form labels
- Footer content
- Error messages
- Meta descriptions

### 11.3 RTL Support

Hebrew and Farsi pages include:
- `dir="rtl"` attribute on `<html>` element
- CSS adjustments for right-to-left layout
- Proper text alignment
- Mirrored UI elements

### 11.4 URL Structure

```
/                     → English (default)
/es/                  → Spanish
/fr/                  → French
/ru/                  → Russian
/he/                  → Hebrew
/ka/                  → Georgian
/fa/                  → Farsi
/uz/                  → Uzbek
```

---

## 12. TECHNICAL SPECIFICATIONS

### 12.1 Frontend Technologies

| Technology | Version | CDN/Source |
|------------|---------|------------|
| HTML5 | Latest | N/A |
| CSS3 | Latest | N/A |
| JavaScript | ES6+ | N/A |
| Font Awesome | 6.4.0 | cdnjs.cloudflare.com |
| Google Fonts | - | fonts.googleapis.com |

### 12.2 Browser Support Matrix

| Browser | Minimum Version | Support Level |
|---------|-----------------|---------------|
| Chrome | Last 2 versions | Full |
| Firefox | Last 2 versions | Full |
| Safari | Last 2 versions | Full |
| Edge | Last 2 versions | Full |
| iOS Safari | iOS 13+ | Full |
| Chrome Mobile | Last 2 versions | Full |
| Internet Explorer | 11 | Graceful degradation |

### 12.3 CSS Architecture

**File Structure:**
- `style.css`: Main styles (layout, components, utilities)
- `responsive.css`: Media queries and responsive adjustments

**Methodology:**
- CSS Custom Properties (variables) for theming
- Flexbox and CSS Grid for layouts
- BEM-inspired naming conventions
- Mobile-first approach

### 12.4 JavaScript Architecture

**Files:**
| File | Purpose | Size |
|------|---------|------|
| main.js | Core functionality, mobile menu, scroll effects | ~5KB |
| form.js | Form validation and submission | ~3KB |
| lang.js | Language switching logic | ~2KB |
| translations.js | All language strings | ~50KB |
| reviews.js | Google Reviews integration | ~3KB |

**Features:**
- No external framework dependencies
- Vanilla JavaScript (ES6+)
- Event delegation for performance
- Lazy loading for images

---

## 13. SECURITY REQUIREMENTS

### 13.1 Transport Security

| Requirement | Implementation |
|-------------|----------------|
| HTTPS | Required for all pages |
| TLS Version | 1.2 or higher |
| HSTS | Enabled in production |
| Certificate | Valid SSL certificate required |

### 13.2 Form Security

| Requirement | Implementation |
|-------------|----------------|
| Input Validation | Client-side validation for all form fields |
| Sanitization | Server-side sanitization (when backend enabled) |
| reCAPTCHA | Google reCAPTCHA v2 for spam protection |
| Rate Limiting | Server-side rate limiting (when backend enabled) |

### 13.3 Content Security

| Requirement | Implementation |
|-------------|----------------|
| CSP Headers | Content-Security-Policy for XSS prevention |
| No Inline Scripts | External script files only |
| SRI | Subresource Integrity for CDN resources |
| No PII in Code | No sensitive data in client-side code |

### 13.4 Attorney-Client Privilege

- Clear disclaimers that website does not establish attorney-client relationship
- Privacy policy explaining data handling
- Terms of service for website usage
- Secure handling of contact form submissions

---

## 14. ACCESSIBILITY REQUIREMENTS

### 14.1 WCAG 2.1 Level AA Compliance

| Category | Requirements |
|----------|--------------|
| Perceivable | Text alternatives, captions, color contrast (4.5:1) |
| Operable | Keyboard navigation, skip links, no seizure triggers |
| Understandable | Readable text, predictable navigation, error prevention |
| Robust | Valid HTML, ARIA labels, compatible with assistive tech |

### 14.2 Implementation Details

**Keyboard Navigation:**
- All interactive elements focusable
- Visible focus indicators
- Logical tab order
- Skip to main content link

**Screen Reader Support:**
- Semantic HTML5 elements
- ARIA labels and roles
- Descriptive link text
- Form label associations

**Visual Accessibility:**
- Color contrast ratio ≥ 4.5:1
- Text resizable to 200%
- No color-only information
- Responsive zoom support

**Motor Accessibility:**
- Large click targets (44x44px minimum)
- No time limits
- No keyboard traps
- Alternative input methods supported

---

## 15. PERFORMANCE REQUIREMENTS

### 15.1 Core Web Vitals Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | 75th percentile |
| FID (First Input Delay) | < 100ms | 75th percentile |
| CLS (Cumulative Layout Shift) | < 0.1 | 75th percentile |

### 15.2 Additional Metrics

| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Time to Interactive (TTI) | < 3.5s |
| Total Blocking Time (TBT) | < 300ms |
| Speed Index | < 3.0s |

### 15.3 Resource Optimization

| Resource Type | Strategy |
|---------------|----------|
| Images | Optimized PNG/WebP, lazy loading |
| CSS | Minified, critical CSS inline |
| JavaScript | Minified, deferred loading |
| Fonts | Preconnect, font-display: swap |
| Third-party | Async loading, limited usage |

### 15.4 Page Size Budget

| Resource | Maximum |
|----------|---------|
| HTML | 100KB |
| CSS | 100KB |
| JavaScript | 200KB |
| Images | 1.5MB |
| Fonts | 100KB |
| **Total** | **2MB** |

---

## 16. DEPLOYMENT & HOSTING

### 16.1 Recommended Hosting Options

**Option 1: Static Hosting (Recommended)**
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

**Option 2: Traditional Hosting**
- VPS (DigitalOcean, Linode)
- Shared hosting with SSL
- cPanel-based hosting

**Option 3: Cloud Hosting**
- AWS S3 + CloudFront
- Google Cloud Storage + CDN
- Azure Blob Storage + CDN

### 16.2 Domain Configuration

| Record Type | Configuration |
|-------------|---------------|
| A Record | Point to hosting IP |
| CNAME | www → apex domain |
| SSL | Let's Encrypt or commercial |
| DNS | Cloudflare recommended |

### 16.3 Deployment Checklist

- [ ] SSL certificate configured and valid
- [ ] HTTPS redirect enabled
- [ ] robots.txt configured
- [ ] sitemap.xml generated
- [ ] Google Analytics configured
- [ ] reCAPTCHA site key configured
- [ ] Contact form backend configured
- [ ] 404 page configured
- [ ] favicon configured
- [ ] Open Graph images uploaded

### 16.4 CDN Configuration

- Enable global edge caching
- Configure cache headers (1 week for static assets)
- Enable Brotli/Gzip compression
- Configure cache purging workflow

---

## 17. TESTING REQUIREMENTS

### 17.1 Functional Testing

| Test Area | Test Cases |
|-----------|------------|
| Navigation | All links functional, dropdown menus work |
| Forms | Validation, submission, error handling |
| Language Switching | All 8 languages accessible, content correct |
| Responsive | All breakpoints, mobile menu |
| Accessibility | Screen reader, keyboard navigation |

### 17.2 Cross-Browser Testing

| Browser | Versions | Priority |
|---------|----------|----------|
| Chrome | Last 2 | High |
| Firefox | Last 2 | High |
| Safari | Last 2 | High |
| Edge | Last 2 | Medium |
| iOS Safari | iOS 13+ | High |
| Chrome Android | Last 2 | High |

### 17.3 Performance Testing

| Test | Tool | Target |
|------|------|--------|
| Lighthouse | Chrome DevTools | Score > 90 |
| WebPageTest | webpagetest.org | LCP < 2.5s |
| GTmetrix | gtmetrix.com | Grade A |
| Core Web Vitals | Search Console | All Green |

### 17.4 Accessibility Testing

| Test | Tool |
|------|------|
| Automated | axe DevTools, WAVE |
| Manual | Keyboard navigation test |
| Screen Reader | NVDA, VoiceOver |
| Color Contrast | WebAIM Contrast Checker |

### 17.5 Security Testing

| Test | Purpose |
|------|---------|
| SSL Labs | Certificate validation |
| Security Headers | CSP, HSTS configuration |
| Form Testing | XSS, injection prevention |
| Dependency Audit | Known vulnerabilities |

---

## 18. FUTURE ENHANCEMENTS

### 18.1 Phase 2 Features (Planned)

| Feature | Description | Priority |
|---------|-------------|----------|
| Online Booking | Integrated calendar with payment | High |
| Client Portal | Secure login for case status | High |
| Document Upload | Secure file sharing | Medium |
| Live Chat | Multilingual support during hours | Medium |
| Video Consultations | Integrated video conferencing | Medium |
| CMS Integration | WordPress or custom CMS | Low |

### 18.2 Phase 3 Features (Future)

| Feature | Description | Priority |
|---------|-------------|----------|
| AI Chatbot | Initial case assessment in 8 languages | Medium |
| Fee Calculator | Interactive cost estimation tool | Medium |
| Trademark Search | USPTO integration | Low |
| Resource Library | Downloadable guides | Low |
| Newsletter | Email marketing system | Low |
| Referral Program | Client referral tracking | Low |

### 18.3 Content Expansion

| Content Type | Status | Plan |
|--------------|--------|------|
| Blog Articles | Pending | Monthly immigration updates |
| F.A.Q Content | Pending | 50+ common questions |
| Case Studies | Pending | Success stories (with consent) |
| Video Content | Planned | Educational videos |
| Webinars | Planned | Monthly educational sessions |

---

## 19. COMPLIANCE CHECKLIST

### 19.1 Legal Compliance

| Requirement | Status | Notes |
|-------------|--------|-------|
| Attorney advertising rules | ✅ | NY State Bar compliant |
| Fee transparency | ✅ | Complete fee schedules |
| Attorney-client disclaimers | ✅ | On contact pages |
| Privacy policy | ⏳ Pending | Draft required |
| Terms of service | ⏳ Pending | Draft required |
| Copyright notices | ✅ | Footer on all pages |

### 19.2 Technical Compliance

| Requirement | Status | Notes |
|-------------|--------|-------|
| WCAG 2.1 Level AA | ✅ | Accessibility audit passed |
| HTTPS/TLS | ⏳ Pending | Requires production deployment |
| GDPR (if applicable) | ⏳ Pending | Cookie consent needed |
| CCPA (if applicable) | ⏳ Pending | Privacy notice needed |

### 19.3 Industry Standards

| Standard | Status | Notes |
|----------|--------|-------|
| ABA Model Rules | ✅ | Advertising compliant |
| State Bar Rules | ✅ | NY compliant |
| USPTO Guidelines | ✅ | Trademark advertising compliant |

---

## 20. RISK ANALYSIS

### 20.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| CDN Outage | Low | Medium | Self-hosted fallbacks |
| Form Spam | Medium | Low | reCAPTCHA implementation |
| Browser Incompatibility | Low | Medium | Progressive enhancement |
| Performance Degradation | Low | Medium | CDN, optimization |

### 20.2 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Fee Changes | Medium | Low | CMS for easy updates |
| Regulatory Changes | Low | High | Legal review process |
| Content Outdated | Medium | Medium | Regular content review |
| Translation Errors | Low | Medium | Native speaker review |

### 20.3 Security Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| DDoS Attack | Low | High | CDN, rate limiting |
| Form Injection | Low | Medium | Input validation, sanitization |
| Data Breach | Very Low | High | No PII stored client-side |

---

## 21. REVISION HISTORY

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | Jan 2, 2026 | SRS Team | Initial SRS document |
| 2.0 | Jan 2, 2026 | SRS Team | Added full pricing, multilingual specs |
| 3.0 | Jan 2, 2026 | SRS Team | Complete rewrite with implementation status, v1.2.0 alignment |

### Version 3.0 Changes:
- Restructured document for clarity
- Added implementation status tracking
- Updated to reflect Q&A → F.A.Q change
- Added complete multilingual page inventory
- Enhanced technical specifications
- Added security and accessibility sections
- Included deployment and testing requirements
- Updated future enhancement roadmap
- Added risk analysis section
- Added appendices with quick references

---

## 22. APPENDICES

### Appendix A: Git Commit History

```
0c9bae8 📝 Change Q&A to F.A.Q across all languages
cd080eb 🌍 Add multilingual support for 8 languages
2512e7b 🎉 Website complete with logo - Ready to launch!
cb5bee3 Add favicon (BLG logo as favicon)
3170aff Add BLG circular logo image (9.5KB)
ebbf58c Update logo documentation
d64fbc8 Add project completion documentation
e73cc9f Add setup guide and logo placeholder
9f15dca Initial commit: BLG Legal Services website v1.0
```

### Appendix B: Quick Reference - File Counts

| Category | Count |
|----------|-------|
| Languages | 8 |
| HTML Pages (per language) | 10 |
| Total HTML Files | 80+ |
| CSS Files | 2 |
| JavaScript Files | 5 |
| Practice Area Pages | 7 (×8 languages = 56) |

### Appendix C: Quick Reference - Contact

- **Phone**: 646-948-9555
- **Email**: law@blglegalservices.com
- **Address**: 315 Madison Avenue, 3rd Floor, New York, NY 10017
- **Hours**: Mon-Sat 9AM-5PM EST
- **Consultation**: $250/hour

### Appendix D: Quick Reference - Languages

| Flag | Language | Code | URL Path |
|------|----------|------|----------|
| 🇺🇸 | English | en | / |
| 🇪🇸 | Spanish | es | /es/ |
| 🇫🇷 | French | fr | /fr/ |
| 🇷🇺 | Russian | ru | /ru/ |
| 🇮🇱 | Hebrew | he | /he/ |
| 🇬🇪 | Georgian | ka | /ka/ |
| 🇮🇷 | Farsi | fa | /fa/ |
| 🇺🇿 | Uzbek | uz | /uz/ |

---

**Document Status**: PRODUCTION RELEASE

**Approved By**: BLG Legal Services Management

**Next Review Date**: April 2, 2026

---

**Contact for Questions**:
- **Technical**: GitHub Issues at [dgililov/BLG-Legal-Services-Website](https://github.com/dgililov/BLG-Legal-Services-Website)
- **Content**: law@blglegalservices.com
- **Phone**: 646-948-9555

---

*This SRS provides comprehensive requirements for the BLG Legal Services website, reflecting the current v1.2.0 production release with complete multilingual support, transparent pricing, and professional legal services presentation.*

**© 2026 BLG Legal Services. All rights reserved.**

*Opening doors and protecting dreams since 2025*
