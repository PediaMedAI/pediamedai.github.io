---
title: "About"
description: "PediaMed AI builds symbiotic intelligence to support the next generation: developmental foundation models for child health monitoring and care, AI agents with child-like cognition, and frontier research on pediatric rare diseases."
# /updates/ was removed (a new news page is being planned); redirect the
# old URL here so existing links don't 404. Drop this when it returns.
aliases: ["/updates/"]
# About / main page copy, rendered by the standalone layouts/index.html.
# Data-driven so the copy lives with the content, not the template.
# (The hidden full site lives under content/pmai-x7k2q9/.)
tagline: "Where children and AI agents learn, grow, and thrive together."
# Full-bleed video hero above the About content — rendered by
# partials/video-hero.html. The bottom news bar shows the newest entry
# in data/news.yaml (title, summary, link); set barTitle to pin a
# different heading.
hero:
  pageTitle: "PediaMed AI Lab"
  brand: "PediaMed AI Lab"
  video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_204252_e2617fe0-8301-4523-af74-2fb3874a65df.mp4"
  eyebrow: "Vision of PediaMed AI Lab"
  titleLines: ["Symbiotic", "Intelligence", "Support the", "Next Generation"]
  copyLines:
    - "Children and AI agents,"
    - "growing together."
    - "We build agents that learn,"
    - "adapt, and care alongside every"
    - "child, from clinic to classroom."
  primaryCta: { label: "Partner With Us", url: "mailto:pediamedai@gmail.com" }
  secondaryCta: { label: "Dive in deeper", url: "#mission" }
  barNumber: "01"
  footerLine: "Symbiotic intelligence for the next generation."
  menu:
    - { label: "Home", url: "/" }
    - { label: "Our Mission", url: "#mission" }
    - { label: "Foundation Models", url: "#focus-01" }
    - { label: "Child-Cognitive Agents", url: "#focus-02" }
    - { label: "Rare Diseases", url: "#focus-03" }
    - { label: "Supporters & Partners", url: "#support" }
    - { label: "Publications", url: "/publications/" }
locations: "Urbana + San Jose + Singapore"
intro: >-
  Our goal is to build self-evolving symbiotic intelligence: AI that
  grows alongside children and the people who care
  for them. We work on three fronts: (1) developmental foundation
  models that support children's health monitoring and care, (2) AI
  agents designed with children's cognitive abilities, and (3) frontier
  research on pediatric rare diseases.
# "Supporters & Partners" section below the focus areas
# (layouts/index.html). `logo` files live in static/images/partners/.
support:
  - name: "Anthropic"
    logo: "/images/partners/anthropic.svg"
    program: "AI for Science Rare Disease Research Grants"
    text: "Anthropic supports our research into rare diseases of child development through its AI for Science program."
    url: "https://www.anthropic.com/news/rare-disease-research-grants"
  - name: "NYU Langone Health"
    logo: "/images/partners/nyu-langone-health.svg"
    program: "Collaboration with Dr. Megan Coffee"
    text: "We work with Dr. Megan Coffee, MD, PhD, on AI for diagnosing rare skin diseases."
    url: "https://med.nyu.edu/faculty/megan-coffee"
  - name: "Shenzhen Children's Hospital"
    logo: "/images/partners/shenzhen-childrens-hospital.png"
    program: "Children's Gait AI Agents"
    text: "Together with Shenzhen Children's Hospital, we are developing AI agents for children's gait analysis."
    url: "http://www.szkid.com.cn/"
sections:
  - num: "01"
    title: "Developmental Foundation Models for Child Health"
    body:
      - "Development is continuous, but clinical care is episodic. Conditions like autism and cerebral palsy are most treatable when caught early, yet most children are diagnosed years after the first signs appear, and families in underserved regions may never be screened at all."
      - "We develop foundation models of child development, trained on how children move, look, speak, and play, that turn everyday moments into developmental signals. These models support continuous health monitoring and care at home and in the clinic, and give pediatricians and families insight they can act on early."
  - num: "02"
    title: "AI Agents with Child-Like Cognition"
    body:
      - "Children are the most remarkable learners we know. From sparse, noisy, multimodal experience, they acquire language, common sense, and social understanding, continually and without forgetting. Today's AI systems, by contrast, are trained on adult data, aligned to adult intent, and evaluated by adult benchmarks."
      - "We design AI agents with children's cognitive abilities: agents that learn through curiosity and social interaction, understand how children think, and adapt to each child's developmental stage. Built with psychologists, pediatricians, and parents, they are meant to grow up alongside children, with safety as the foundation rather than an afterthought."
  - num: "03"
    title: "Frontier Research in Pediatric Rare Diseases"
    body:
      - "Many rare diseases first appear in childhood, and each affects too few patients for most research programs to prioritize. Families often wait years for a diagnosis, and effective treatments remain scarce."
      - "We pursue frontier research on pediatric rare diseases with clinical partners, using AI to bring together sparse, multimodal evidence, from clinical records and imaging to movement and behavior, so that rare conditions can be recognized sooner and understood better."
---
