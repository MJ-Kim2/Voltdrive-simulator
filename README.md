# VoltDrive Expansion Simulator

A 10-minute student simulation for **Global Business Strategies in Emerging Economies: The Rules of the Game** (political and legal environments in emerging markets).

Each student runs VoltDrive Mobility, an electric-vehicle and smart-grid company, as it builds a €500M gigafactory in an emerging market. The screen shows what each choice does to:

- **Project value** over time (solid line), against the business plan with no shocks (dotted line) and the same choices replayed in the other country (dashed line)
- **Four risk gauges**: systemic, procedural, distributive and catastrophic exposure (the Daniels et al. typology used in the coursework)
- **Bargaining power** between VoltDrive and the host government, which tips as money is sunk (the obsolescing bargain)
- **The factory itself**: production lines dim as output falls, the IP shield cracks when code is copied, and the flag changes if the state takes control

Valoria and Solaria are fictional. Their index profiles average real 2025 scores (Valoria: India, Brazil, Indonesia; Solaria: Vietnam, Saudi Arabia). Every shock is based on a real emerging-market precedent, shown on screen with its source. **The payoffs are teaching assumptions, not forecasts.**

---

## Put it on GitHub Pages (about 5 minutes)

1. Create a new repository on GitHub, for example `voltdrive-simulator`. It can be public or private (Pages on a private repo needs a paid plan).
2. Upload everything in this folder: `index.html`, `README.md`, `.nojekyll`, `build.py` and the `src` folder. On the repository page: **Add file → Upload files**, drag them in, then **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose branch `main` and folder `/ (root)`, then **Save**.
4. After a minute or two the page shows your link, in the form `https://<your-username>.github.io/voltdrive-simulator/`.
5. Turn that link into a QR code for slide 34 of the Lecture 4 deck.

## Run it offline

Double-click `index.html`. It needs no internet connection and no installation. Offline, it uses Cambria and Calibri instead of the web fonts; nothing else changes.

---

## Running it in class

Students play **on their own phone or laptop for about 10 minutes**, then the class compares results (slides 34–35 of the Lecture 4 deck).

| Stage | What happens | Lecture link shown on screen |
|---|---|---|
| Set-up | Country (Valoria or Solaria), ownership, protections | Slides 3–4, 20, 25, 30 |
| Year 1 | EV policy flips (systemic risk) | Concept 1, slides 5, 9–11 |
| Year 2 | 40% export tax on battery minerals (distributive risk) | Concept 2 and Dependencia, slides 15, 22–23 |
| Year 3 | Self-driving code copied (procedural risk: courts and contracts) | Concept 3, slides 26–30, including Starbucks in Russia |
| Year 4 | Retroactive tax in Valoria, or state takeover in Solaria | Slides 11, 25, 29 |
| Result | One-line result with a Copy button, to post on Padlet | Slide 35 |

Every round shows a yellow **Link to today’s lecture** box naming the concept and slide numbers, plus the real precedent with its source.

**Before the lecture**

1. Publish the simulation (steps above) and put its QR code on slide 34.
2. Create a dedicated Padlet board, “Lecture 4: VoltDrive results”, in Columns format with two columns, **Valoria** and **Solaria**, with anonymous posting on. Put its QR code on slide 35.

**Shorter version:** add `#short` to the end of the link (for example `https://<you>.github.io/voltdrive-simulator/#short`) to drop Year 4. Students then make six decisions instead of seven.

**Discussion questions (slide 35)**

1. Valoria vs Solaria: who lost value more often, and who lost more at once?
2. Which choice saved you most? Which real case from today does it echo?
3. For your coursework: which risk type and which mitigation would you name?

The speaker notes on slides 34 and 35 give the full script, common student questions and the answers to draw out.

---

## How the model works

All numbers are € million and deterministic: the same choices always give the same result, so the debrief is reproducible.

**Set-up**

- Investment: €500M. The business plan adds €60M of value a year (wholly owned) or €42M (joint venture, where the partner keeps 30% of profits).
- Approval speed: Valoria 18 months (12 with a JV partner); Solaria 6 months (4 with a JV). Earlier production adds value: Valoria +€0 / +€15M (JV), Solaria +€30M / +€35M (JV).
- Protections: arbitration −€10M, insurance −€20M, both −€30M.
- Smaller yearly events in Valoria (−€8M, −€6M, −€5M, −€4M: a court challenge, a regional election, a new data law, a port strike). Solaria has an early approval (+€5M) and then quiet years. This produces the “frequent and visible versus rare and sudden” pattern from Concept 1.

**Shocks** (generated from `src/engine.js`)

#### Year 1: EV policy flips (systemic risk)

| Option | Valoria, wholly owned | Valoria, JV | Solaria, wholly owned | Solaria, JV |
|---|---|---|---|---|
| A: Absorb the cost | −€70M | −€70M | −€50M | −€50M |
| B: Localise suppliers (+€60M sunk) | −€30M | −€30M | −€20M | −€20M |
| C: Lobby (Valoria) / Work your relationships (Solaria) | −€45M | −€30M | −€55M | −€10M |

#### Year 2: 40% export tax on raw battery minerals (distributive risk)

| Option | Valoria, wholly owned | Valoria, JV | Solaria, wholly owned | Solaria, JV |
|---|---|---|---|---|
| A: Pay the tax | −€60M | −€60M | −€70M | −€70M |
| B: Build a local refinery (+€120M sunk) | −€15M | −€15M | −€5M | −€5M |
| C: Diversify suppliers | −€35M | −€35M | −€35M | −€35M |

#### Year 3: self-driving code copied (legal and procedural risk)

A JV partner sees all your code (loss base €130M); a contracted local software firm sees only the localisation module (loss base €70M).

| Option | Valoria, wholly owned | Valoria, JV | Solaria, wholly owned | Solaria, JV |
|---|---|---|---|---|
| A: Sue in the local courts | −€42M | −€78M | −€77M | −€143M |
| B: International arbitration (needs arbitration protection) | −€21M | −€39M | −€49M | −€91M |
| C: Ring-fence your code | −€53M | −€98M | −€53M | −€113M |

#### Year 4 (bonus)

- **Valoria, retroactive tax of €150M:** pay −€150M; treaty arbitration (needs arbitration protection) −€25M; negotiate −€80M. Political risk insurance does not respond, because cover excludes non-discriminatory measures of general application.
- **Solaria, “temporary state management”:** exposure = €300M, plus €60M if you localised and €120M if you built the refinery. A state-linked JV partner keeps the plant out of the decree, cutting exposure to 40%. Insurance claim recovers 90% (loss = 10% of exposure + €5M); arbitration loses 60%; selling at a discount loses 70%.

**Bargaining power** starts at 70 for VoltDrive before investing and falls to 50 once €500M is committed (plus 5 for arbitration protection and 3 for insurance). Each year of operation takes 4 points; localising takes 8; a refinery 12 (15 in Solaria); diversifying adds 6; successful lobbying adds 4; a state takeover drops it to 5–12.

**Risk gauges** start from each country’s profile (Valoria: systemic 70, procedural 55, distributive 40, catastrophic 35; Solaria: 35, 35, 65, 20) and move with set-up choices and responses. They show exposure, not probability.

### Changing the model

Edit `src/engine.js` (payoffs, events, precedents) or `src/app.html` (interface text and styling), then run `python3 build.py` to regenerate `index.html`, and upload the new `index.html` to GitHub.

---

## Precedents shown on screen

- Brazil’s EV import tax, 10% (Jan 2024) rising to 35% (Jul 2026); BYD’s Camaçari plant: [Datamar News (2023)](https://datamarnews.com/noticias/brazil-to-resume-import-tax-for-electric-cars-gradually-in-jan-2024/), [CarNewsChina (2025)](https://carnewschina.com/2025/07/01/byd-start-production-in-its-brazilian-plant-the-first-seagull-rolls-off-assembly-line/)
- China’s battery “white list”, 2015–2019: [Quartz (2019)](https://qz.com/1651944/china-ends-policy-steering-ev-makers-to-local-battery-firms)
- Indonesia’s nickel ore export ban (2020) and the WTO ruling (2022): [AJOT (2022)](https://www.ajot.com/news/export-ban-triples-nickel-investment-in-indonesiaas-morowali), [Mining.com (2022)](https://www.mining.com/web/wto-backs-eu-in-dispute-with-indonesia-over-nickel-ore-ban/)
- DR Congo’s cobalt export suspension (2025) and quotas: [Mining Weekly (2025)](https://www.miningweekly.com/article/congo-to-replace-cobalt-export-ban-with-quotas-from-oct-16-2025-09-22)
- GM v Chery over the Spark/QQ design (settled 2005): [CECC](https://www.cecc.gov/publications/commission-analysis/chinese-and-us-automakers-settle-intellectual-property-dispute)
- Tesla v former engineer over Autopilot source code (settled 2021): [CNBC (2021)](https://www.cnbc.com/2021/04/16/tesla-ex-engineer-settle-lawsuit-over-autopilot-source-code.html)
- Vodafone v India, retroactive tax, treaty award (2020) and repeal (2021): [Drishti IAS (2020)](https://www.drishtiias.com/daily-updates/daily-news-analysis/pca-decision-on-retrospective-taxation-by-india/print_manually)
- Russia’s “temporary management” of Danone and Carlsberg units (2023): [Fortune/Bloomberg (2023)](https://fortune.com/2023/07/17/moscow-takes-over-russia-subsidiaries-carlsberg-beer-danone-decree-companies-unfriendly-countries)

## Research behind the mechanics

- Allee, T. and Peinhardt, C. (2011) ‘Contingent credibility: the impact of investment treaty violations on foreign direct investment’, *International Organization*, 65(3), pp. 401–432. [Link](https://ideas.repec.org/a/cup/intorg/v65y2011i03p401-432_00.html)
- Cavusgil, S.T., Ghauri, P.N. and Liu, L.A. (2021) *Doing Business in Emerging Markets*. 3rd edn. London: SAGE, Ch. 6.
- Henisz, W.J. (2000) ‘The institutional environment for multinational investment’, *Journal of Law, Economics, and Organization*, 16(2), pp. 334–364. [doi:10.1093/jleo/16.2.334](https://doi.org/10.1093/jleo/16.2.334)
- Jensen, N.M. (2008) ‘Political risk, democratic institutions, and foreign direct investment’, *Journal of Politics*, 70(4), pp. 1040–1052.
- Jiang, K., Keller, W., Qiu, L.D. and Ridley, W. (2024) ‘International joint ventures and internal technology transfer vs. external technology spillovers: evidence from China’, *Journal of International Economics*, 150. [doi:10.1016/j.jinteco.2024.103939](https://doi.org/10.1016/j.jinteco.2024.103939)
- Khanna, T. and Palepu, K. (1997) ‘Why focused strategies may be wrong for emerging markets’, *Harvard Business Review*, 75(4), pp. 41–51.
- North, D.C. and Weingast, B.R. (1989) ‘Constitutions and commitment’, *Journal of Economic History*, 49(4), pp. 803–832. [doi:10.1017/S0022050700009451](https://doi.org/10.1017/S0022050700009451)
- Ramamurti, R. (2001) ‘The obsolescing “bargaining model”? MNC–host developing country relations revisited’, *Journal of International Business Studies*, 32(1), pp. 23–39. [Link](https://ideas.repec.org/a/pal/jintbs/v32y2001i1p23-39.html)
- Sun, P., Mellahi, K. and Wright, M. (2012) ‘The contingent value of corporate political ties’, *Academy of Management Perspectives*, 26(3), pp. 68–82. [doi:10.5465/amp.2011.0164](https://doi.org/10.5465/amp.2011.0164)
- Vernon, R. (1971) *Sovereignty at Bay*. New York: Basic Books.
- Warburton, E. (2024) ‘Nationalist enclaves: industrialising the critical mineral boom in Indonesia’, *Extractive Industries and Society*, 20. [doi:10.1016/j.exis.2024.101564](https://doi.org/10.1016/j.exis.2024.101564)
- MIGA Convention, Article 11 (cover for expropriation and similar measures, excluding non-discriminatory measures of general application); MIGA covers up to 90% of an equity investment.
- New York Convention (1958) on the Recognition and Enforcement of Foreign Arbitral Awards: 172 contracting states. [newyorkconvention.org](https://www.newyorkconvention.org/countries)

Index data for the country profiles: EIU Democracy Index 2025; World Bank Worldwide Governance Indicators 2025; Transparency International Corruption Perceptions Index 2025.
