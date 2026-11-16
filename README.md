# Jheremy Sánchez | Personal Portfolio & Tech Profile

![Status](https://img.shields.io/badge/Status-Active-success)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

Source code of my personal portfolio. I am a **Network Systems Administration (ASIR)** student at *Institut Tecnològic de Barcelona*, focused on cybersecurity, network infrastructure, and systems administration.

🌐 **Live site:** <https://jheremysanchez7e9-web.github.io/PersonalPortfolio/>

---

## 🚀 Features

Built from scratch with no frameworks, build tools, or npm dependencies.

- **Hash-based views:** Home, About, Projects, and Contact switch instantly without reloads. Each view has its own URL (`#projects`, `#contact`…), so links can be shared and the browser back button works.
- **Internationalization (i18n):** Spanish, English, Catalan, French, and German from a single JS dictionary, wired to the markup through `data-i18n` attributes. The language is detected from the browser and remembered.
- **Dark / light theme:** CSS custom properties with the preference stored in `localStorage`.
- **Responsive layout:** CSS Grid and Flexbox, full-height on desktop and mobile.
- **Accessibility:** real links for navigation, labelled controls, visible keyboard focus, and animations disabled under `prefers-reduced-motion`.
- **Contact form without a backend:** builds a correctly encoded `mailto:` link.
- **CV download:** one-click PDF.

---

## 📂 Featured Projects

| Project | Description | Links |
|---|---|---|
| **The Daily Exploit** | Real-time threat intelligence platform: CVE tracking and cybersecurity news. | [Demo](https://jheremysebastian17.github.io/the-daily-exploit/) · [Repo](https://github.com/jheremysebastian17/the-daily-exploit) |
| **Projecte Transversal ASIX** | Team design of a sustainable data center: IT infrastructure, VLANs, firewall, UPS systems, and physical and logical security. | [Demo](https://jheremysanchez7e9-web.github.io/ProjecteTransversalASIXc_25-26/) · [Repo](https://github.com/jheremysanchez7e9-web/ProjecteTransversalASIXc_25-26) |
| **The Cryptic Club** | Minimalist SPA for daily cryptic puzzles with streaks, achievements, and a time-attack mode. | [Demo](https://jheremysebastian17.github.io/TheCrypticClub/) · [Repo](https://github.com/jheremysebastian17/TheCrypticClub) |
| **Energy Calculator** | Interactive web app to calculate electricity savings. | [Demo](https://jheremysanchez7e9-web.github.io/TA08_Calculadoraestalvienergetic/) · [Repo](https://github.com/jheremysanchez7e9-web/TA08_Calculadoraestalvienergetic) |

---

## 🗂️ Structure

```text
/
├── index.html              # Layout and views
├── style.css               # Theming, layout, animations
├── script.js               # i18n, view routing, theme, contact form
├── jheremysanchezCVe.pdf   # Resume
├── img/
│   └── logo.png            # Favicon
└── README.md
```

---

## ⚙️ Run locally

It is a static site, so any static server works:

```bash
git clone https://github.com/jheremysanchez7e9-web/PersonalPortfolio.git
cd PersonalPortfolio
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly in a browser also works.

---

## 🤖 AI-Assisted Development

This portfolio was designed and refined using LLMs as pair-programming assistants, not as blind code generators. I used them to:

- **Enforce good practices:** clean code, semantic HTML, and accessibility.
- **Avoid technical debt:** a vanilla JS solution that behaves like a single-page application without frameworks or dependencies.
- **Refine UI/UX:** theme variables, transitions, and responsive breakpoints.

---

## 📫 Contact

- **Email:** jheremysebastian17@gmail.com
- **LinkedIn:** [linkedin.com/in/jheremysanchez](https://www.linkedin.com/in/jheremysanchez/)
- **GitHub:** [github.com/jheremysebastian17](https://github.com/jheremysebastian17)
- **Location:** Barcelona, Spain
