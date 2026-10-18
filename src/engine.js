/* VoltDrive engine: pure, deterministic. Numbers are illustrative; precedents are real. */
(function (root) {
  const COUNTRIES = {
    V: {
      name: "Valoria", other: "S", kind: "Emerging-market democracy",
      blurb: "Election in 8 months. The opposition, leading in the polls, promises a levy on foreign EV makers. Courts are independent but slow.",
      modelledOn: "India, Brazil and Indonesia",
      profile: [["Democracy (EIU, 0–10)", "6.70"], ["Political stability (WGI)", "−0.58"], ["Rule of law (WGI)", "−0.29"], ["Corruption Perceptions (0–100)", "36"]],
      approvalMonths: { wos: 18, jv: 12 },
    },
    S: {
      name: "Solaria", other: "V", kind: "One-party emerging market",
      blurb: "The same party has ruled for 30 years. Approvals take months and subsidies are “guaranteed”. The courts follow the party.",
      modelledOn: "Vietnam and Saudi Arabia",
      profile: [["Democracy (EIU, 0–10)", "2.35"], ["Political stability (WGI)", "+0.07"], ["Rule of law (WGI)", "+0.05"], ["Corruption Perceptions (0–100)", "49"]],
      approvalMonths: { wos: 6, jv: 4 },
    },
  };

  const OWN = {
    wos: { label: "Wholly owned subsidiary", short: "Wholly owned" },
    jv: { label: "Joint venture with a state-linked partner", short: "Joint venture" },
  };
  const PROT = {
    none: { label: "No extra protection", short: "None", cost: 0, arb: false, ins: false },
    arb: { label: "Arbitration protection", short: "Arbitration", cost: 10, arb: true, ins: false },
    ins: { label: "Political risk insurance", short: "Insurance", cost: 20, arb: false, ins: true },
    both: { label: "Arbitration and insurance", short: "Both", cost: 30, arb: true, ins: true },
  };

  const BASE = 500;                      // € million committed
  const GROWTH = { wos: 60, jv: 42 };    // planned value added per year (JV partner keeps 30%)
  const APPROVAL_BONUS = { V: { wos: 0, jv: 15 }, S: { wos: 30, jv: 35 } }; // earlier production
  const G0 = { V: { sys: 70, proc: 55, dist: 40, cat: 35 }, S: { sys: 35, proc: 35, dist: 65, cat: 20 } };

  // Smaller, frequent events in the democracy; quiet years in the one-party state.
  const MINI = {
    V: [
      { d: -8, t: "A local NGO challenges your environmental permit in court. Construction pauses for two months." },
      { d: -6, t: "A state election brings in a governor who reopens the terms of your land lease." },
      { d: -5, t: "A new data-privacy law forces changes to your connected-car software." },
      { d: -4, t: "Port workers strike for a week over pay." },
    ],
    S: [
      { d: 5, t: "Approval for your second production line arrives early." },
      { d: 0, t: "A quiet year. No policy changes, no protests reported." },
      { d: 0, t: "Another quiet year, at least on the surface." },
      { d: 0, t: "" },
    ],
  };

  const SHOCKS = [
    {
      id: "s1", year: 1, risk: "sys", riskLabel: "Systemic risk",
      concept: "Concept 1 · Predictability vs adaptability",
      lecture: {
        V: "Concept 1 (slides 9–10): democracies change the rules often, but in public. You could see this coming in the polls, so the firms that adapt early do best, like BYD building inside Brazil’s EV tariff.",
        S: "Concept 1 (slides 5 and 11): one-party states change the rules rarely, but suddenly and with no appeal. Remember Country A’s “guaranteed” subsidy: a promise from a government with no independent courts is not a contract.",
      },
      title: { V: "The new coalition flips EV policy", S: "A ministry notice rewrites the subsidy rules" },
      text: {
        V: "Valoria votes and the opposition wins. The new coalition scraps the consumer EV subsidy and announces a levy on foreign-brand EVs and components, rising from 10% to 25% over two years. The polls showed this coming for months.",
        S: "No election, no warning. A ministry notice says EV subsidies will now go only to cars whose batteries come from approved local suppliers. VoltDrive’s supplier is not on the list. The rule takes effect in 30 days and there is no appeal.",
      },
      precedent: {
        V: [["Brazil reinstated its EV import tax in steps: 10% (Jan 2024), 18%, 25%, then 35% from July 2026. BYD answered by building a plant in Camaçari, Bahia; the first cars came off the line in July 2025.", "Datamar News, 2023", "https://datamarnews.com/noticias/brazil-to-resume-import-tax-for-electric-cars-gradually-in-jan-2024/"]],
        S: [["China’s battery “white list” (2015–2019): EV makers using listed batteries were more likely to get subsidies. The last list, in 2016, named 57 firms and no foreign ones. It was scrapped in June 2019.", "Quartz, 2019", "https://qz.com/1651944/china-ends-policy-steering-ev-makers-to-local-battery-firms"]],
      },
      options: [
        { key: "A", label: "Absorb the cost", hint: "Keep prices and accept thinner margins." },
        { key: "B", label: "Localise suppliers", hint: "Spend €60M switching to local suppliers to qualify as “local”." },
        { key: "C", label: { V: "Lobby the new coalition", S: "Work your relationships" }, hint: { V: "Join the carmakers’ association and push for a phase-in.", S: "Ask officials to add your supplier to the approved list." } },
      ],
      resolve(c, x, k) {
        if (c === "V") {
          if (k === "A") return { d: -70, h: "Margins squeezed for two years", b: "Buyers delay purchases without the subsidy, and the levy raises your costs. You could see this coming in the polls but chose to wait. In a democracy, adaptability means acting on visible signals." };
          if (k === "B") return { d: -30, sunk: 60, pw: -8, g: { sys: -15 }, loc: true, h: "You become a “local” producer", b: "Local suppliers lift your local content above the levy threshold. It costs €60M now, but you are treated as a domestic maker, as BYD did in Brazil. The catch: the more you build locally, the harder it is to walk away." };
          return x.jv
            ? { d: -30, pw: 4, g: { sys: -10 }, h: "Your partner adds weight to the lobbying", b: "With your partner’s connections, the coalition delays the levy and exempts locally assembled cars. Political ties are worth most when the rules are in play (Sun, Mellahi & Wright, 2012)." }
            : { d: -45, pw: 4, g: { sys: -10 }, h: "Lobbying softens the blow", b: "The association wins a two-year phase-in. Lobbying works in a democracy because the coalition needs industry support, but it only softens the shock." };
        }
        if (k === "A") return { d: -50, h: "You absorb the lost subsidy", b: "There is no court to appeal to and no election to wait for. The hit is smaller than Valoria’s, but it came with 30 days’ notice. That is the shape of risk in a one-party state: rare and sudden." };
        if (k === "B") return { d: -20, sunk: 60, pw: -8, g: { sys: -10 }, loc: true, h: "Back on the list within weeks", b: "An approved local supplier takes over your battery packs. Fast approvals are the upside of a one-party state, but your money sunk in Solaria keeps growing." };
        return x.jv
          ? { d: -10, pw: 4, h: "Your partner fixes it in a month", b: "Your partner’s ties get your supplier added to the list. In Solaria, the partner you chose at set-up is your best political protection." }
          : { d: -55, g: { proc: 10 }, h: "Your requests go nowhere", b: "Without local ties, nobody returns your calls. One official hints that a “consultancy fee” would help; you refuse. Where formal rules are weak, relationships fill the gap, and you don’t have them." };
      },
    },
    {
      id: "s2", year: 2, risk: "dist", riskLabel: "Distributive risk",
      concept: "Concept 2 · Political risk and Dependencia",
      lecture: {
        V: "Concept 2 (slides 15, 22–23): this is distributive risk, the state taking a bigger share of the value. Dependencia theory explains why resource-rich hosts push foreign firms to process at home. Indonesia, a democracy, did exactly this with nickel.",
        S: "Concept 2 (slides 15, 22–23): this is distributive risk, the state taking a bigger share of the value. Dependencia theory explains why resource-rich hosts push foreign firms to process at home, as DR Congo did with cobalt.",
      },
      title: { V: "Parliament taxes raw battery minerals", S: "A decree taxes raw battery minerals" },
      text: {
        V: "VoltDrive makes its battery cells at home, using nickel and lithium mined in Valoria. Parliament votes, with cross-party support, for a 40% export tax on unprocessed battery minerals from January. The aim is to force processing at home, and voters love it.",
        S: "VoltDrive makes its battery cells at home, using nickel and lithium mined in Solaria. A decree imposes a 40% export tax on unprocessed battery minerals, effective immediately. State media calls it “ending the colonial model of extraction”.",
      },
      precedent: {
        V: [["Indonesia, a democracy, banned nickel ore exports from January 2020 to force smelting at home. Investment in Morowali rose from about $6.7bn (2019) to a projected $18bn (2022). A WTO panel ruled against the ban in 2022; Indonesia kept it.", "AJOT, 2022; Mining.com, 2022", "https://www.ajot.com/news/export-ban-triples-nickel-investment-in-indonesiaas-morowali"]],
        S: [["DR Congo (about 70% of world cobalt) suspended cobalt exports in February 2025. CMOC and Glencore declared force majeure. Quotas of 96,600 tonnes a year replaced the ban from October 2025.", "Mining Weekly, 2025", "https://www.miningweekly.com/article/congo-to-replace-cobalt-export-ban-with-quotas-from-oct-16-2025-09-22"]],
      },
      options: [
        { key: "A", label: "Pay the tax", hint: "Keep exporting raw minerals to your home cell plant." },
        { key: "B", label: "Build a local refinery", hint: "Invest €120M to process minerals inside the country." },
        { key: "C", label: "Diversify suppliers", hint: "Buy minerals from other countries at a premium." },
      ],
      resolve(c, x, k) {
        if (c === "V") {
          if (k === "A") return { d: -60, h: "You pay on every tonne", b: "The tax passed with cross-party support, so it will outlast the next election. This is distributive risk: the state takes a bigger share of the value. Dependencia theory predicts exactly this push from resource-rich hosts." };
          if (k === "B") return { d: -15, sunk: 120, pw: -12, g: { dist: -15 }, ref: true, h: "The government welcomes your refinery", b: "You avoid the tax and become part of Valoria’s industrial strategy, as Indonesia’s nickel boom shows. But €120M more is now fixed in the country, and your bargaining power falls." };
          return { d: -35, pw: 6, g: { dist: -15 }, h: "No single government can squeeze you", b: "Buying from other countries costs more, but it protects your supply and your bargaining power." };
        }
        if (k === "A") return { d: -70, h: "The decree bites immediately", b: "No phase-in, no debate. You pay on every shipment. Dependencia theory predicts this push from resource-rich hosts; the one-party state can simply do it overnight." };
        if (k === "B") return { d: -5, sunk: 120, pw: -15, g: { dist: 10 }, ref: true, h: "Approved in weeks", b: "The refinery is approved faster than anywhere else. But you now have €120M more inside a country whose courts follow the party, so your exposure to future state action rises." };
        return { d: -35, pw: 6, g: { dist: -10 }, h: "You limit what the decree can take", b: "Diversifying costs a premium, but the state now has less leverage over your supply chain." };
      },
    },
    {
      id: "s3", year: 3, risk: "proc", riskLabel: "Procedural risk: courts and contracts",
      concept: "Concept 3 · Contracts, IP and arbitration",
      lecture: {
        V: "Concept 3 (slides 26–30): a contract or patent is only as strong as the courts that enforce it. Valoria’s courts are independent but slow. Arbitration helps if you agreed it in advance and local courts will enforce the award.",
        S: "Concept 3 (slides 26–30): a contract or patent is only as strong as the courts that enforce it, and Solaria’s courts follow the party. Arbitration helps only if you agreed it in advance, and even then the award must be enforced.",
      },
      title: { V: "Your self-driving code turns up in a rival’s car", S: "Your self-driving code turns up in a rival’s car" },
      text: {
        jv: "Your JV partner’s engineers have copied VoltDrive’s self-driving software. It appears in a new car sold by a rival brand owned by the partner’s parent group.",
        wos: "You hired a local software firm to adapt your self-driving system to local maps. It has reused your code in a rival’s new car.",
      },
      precedent: {
        V: [
          ["From today’s lecture: a squatter registered Starbucks’ name in Russia in 2002 and asked a reported $600,000 to hand it back. Starbucks fought and won its name back in 2005.", "slide 27", null],
          ["GM accused Chery of copying the Chevrolet Spark design for its QQ car. The dispute was settled in November 2005.", "CECC, 2005", "https://www.cecc.gov/publications/commission-analysis/chinese-and-us-automakers-settle-intellectual-property-dispute"],
          ["Tesla sued a former engineer in 2019 for copying Autopilot source code before he joined Xpeng’s US unit. They settled in 2021.", "CNBC, 2021", "https://www.cnbc.com/2021/04/16/tesla-ex-engineer-settle-lawsuit-over-autopilot-source-code.html"],
        ],
      },
      options: [
        { key: "A", label: "Sue in the local courts", hint: "Rely on the host country’s judges." },
        { key: "B", label: "Go to international arbitration", hint: "Use the clause you wrote into the contract.", needs: "arb" },
        { key: "C", label: "Ring-fence your code", hint: "Pull core code back to headquarters and ship locked modules only." },
      ],
      resolve(c, x, k) {
        const L = x.jv ? 130 : 70;
        const who = x.jv ? "your partner" : "the software firm";
        if (c === "V") {
          if (k === "A") return { d: -Math.round(0.6 * L), shield: "cracked", h: "You win, slowly", b: `Valoria’s courts are independent but slow. After three years you win partial damages from ${who}, but the rival has already sold its cars.` };
          if (k === "B") return { d: -Math.round(0.3 * L), shield: "award", g: { proc: -10 }, h: "The clause pays off", b: "The tribunal rules for you within 18 months, and Valoria’s courts enforce the award under the New York Convention (172 member states). The protection you bought at set-up has paid for itself." };
          return { d: -Math.round(0.75 * L), shield: "locked", g: { proc: -10 }, h: "No more leaks, nothing recovered", b: "Your core code now stays at headquarters. That stops further copying, but you get nothing back for what was taken." };
        }
        if (k === "A") return { d: -Math.round(1.1 * L), shield: "cracked", g: { proc: 10 }, h: "You lose, and pay the costs", b: `The rival is state-linked and the court follows the party. You lose the case against ${who} and pay the legal bill. A promise is not a contract when the courts aren’t independent.` };
        if (k === "B") return { d: -Math.round(0.7 * L), shield: "award", h: "You win on paper", b: "You win the arbitration, but enforcement runs through Solaria’s courts, which move slowly against a state-linked firm. You recover part of the loss from the rival’s assets abroad." };
        return x.jv
          ? { d: -Math.round(0.75 * L) - 15, shield: "locked", g: { proc: 10 }, h: "Code locked, partner offended", b: "Your core code now stays at headquarters, so the copying stops. Your partner takes it badly, and permit renewals suddenly slow down." }
          : { d: -Math.round(0.75 * L), shield: "locked", g: { proc: -5 }, h: "No more leaks, nothing recovered", b: "Your core code now stays at headquarters. It stops further copying, but you get nothing back for what was taken." };
      },
    },
    {
      id: "s4", year: 4, risk: "dist", riskLabel: "Distributive risk (expropriation)", bonus: true,
      concept: "Mitigation · Insurance, arbitration and partners",
      lecture: {
        V: "Slides 25 and 29: Vodafone v India. A democracy changed its tax law backwards. Treaty arbitration worked in the end, but it took years. Insurance doesn’t cover general tax laws.",
        S: "Slides 11 and 25: Russia’s 2023 decree took control of Danone’s and Carlsberg’s plants. Insurance and a well-connected partner are how firms limit this kind of loss.",
      },
      title: { V: "A retroactive tax bill arrives", S: "The state takes control of your factory" },
      text: {
        V: "The finance ministry amends the tax law and applies it backwards: the holding structure VoltDrive used to invest is now taxable. The bill is €150 million.",
        S: "A decree places VoltDrive’s Solaria factory under “temporary management” by a state agency. You still own the shares on paper, but you no longer control the plant or its cash.",
      },
      precedent: {
        V: [["India changed its tax law retroactively in 2012 to tax Vodafone’s 2007 deal. A tribunal under the India–Netherlands investment treaty ruled for Vodafone in September 2020, and India repealed the retroactive tax in 2021.", "Drishti IAS, 2020", "https://www.drishtiias.com/daily-updates/daily-news-analysis/pca-decision-on-retrospective-taxation-by-india/print_manually"]],
        S: [["On 16 July 2023 a Russian decree put Danone’s and Carlsberg’s Russian units under “temporary” state management. Danone expected a write-off of up to €1bn.", "Fortune/Bloomberg, 2023", "https://fortune.com/2023/07/17/moscow-takes-over-russia-subsidiaries-carlsberg-beer-danone-decree-companies-unfriendly-countries"]],
      },
      options: {
        V: [
          { key: "A", label: "Pay the bill", hint: "Accept the loss and move on." },
          { key: "B", label: "Start treaty arbitration", hint: "Your holding company is covered by an investment treaty.", needs: "arb" },
          { key: "C", label: "Negotiate a settlement", hint: "Offer to pay part of it to keep relations intact." },
        ],
        S: [
          { key: "A", label: "Claim on your insurance", hint: "Your policy covers expropriation and similar measures.", needs: "ins" },
          { key: "B", label: "Start arbitration", hint: "Claim compensation from the state.", needs: "arb" },
          { key: "C", label: "Sell at a discount and exit", hint: "Accept a state-approved buyer’s offer." },
        ],
      },
      resolve(c, x, k) {
        if (c === "V") {
          const note = x.ins ? " Your political risk insurance doesn’t help: cover usually excludes non-discriminatory measures of general application, such as most tax laws." : "";
          if (k === "A") return { d: -150, h: "You pay €150M", b: "Paying ends the dispute but rewards the government for changing the rules after the game was played." + note };
          if (k === "B") return { d: -25, g: { dist: -10 }, h: "The tribunal rules for you", b: "The tribunal finds the retroactive tax breaches fair and equitable treatment. Worried about other investors, the government repeals the law, as India did in 2021. States that lose treaty cases lose investment (Allee & Peinhardt, 2011)." + note };
          return { d: -80, h: "You settle for about half", b: "Expensive, but it keeps your relationship with the ministry intact." + note };
        }
        const E = Math.round((300 + (x.loc ? 60 : 0) + (x.ref ? 120 : 0)) * (x.jv ? 0.4 : 1));
        const jvNote = x.jv ? " Your state-linked partner keeps the plant out of the decree, but the ministry takes seats on the JV board and a share of the cash." : "";
        if (k === "A") return { d: -Math.round(0.1 * E) - 5, seized: !x.jv, pwSet: x.jv ? null : 12, h: "Your insurer pays out", b: "Your policy covers up to 90% of the insured investment. Insurance can’t keep the factory running, but it keeps the loss survivable." + jvNote };
        if (k === "B") return { d: -Math.round(0.6 * E), seized: !x.jv, pwSet: x.jv ? null : 10, h: "You win on paper", b: "Collecting is another matter: the state’s assets abroad are limited and some are immune. Expect years of enforcement work." + jvNote };
        return { d: -Math.round(0.7 * E), seized: !x.jv, sold: !x.jv, pwSet: x.jv ? null : 5, h: x.jv ? "You sell your JV stake at a discount" : "You sell and leave Solaria", b: "A state-approved buyer pays a fraction of the plant’s value. Danone and Carlsberg faced the same choice in Russia." + jvNote };
      },
    },
  ];

  const CF_MAP = { s4: { V: { A: "C", B: "B", C: "C" }, S: { A: "C", B: "B", C: "A" } } };

  function optionsFor(shock, country) {
    return Array.isArray(shock.options) ? shock.options : shock.options[country];
  }
  function available(opt, setup) {
    if (!opt.needs) return true;
    return !!PROT[setup.prot][opt.needs];
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function planSeries(country, setup, bonus) {
    const out = [BASE];
    if (!country) return out;
    let p = BASE + APPROVAL_BONUS[country][setup.own] - PROT[setup.prot].cost;
    out.push(p);
    const g = GROWTH[setup.own];
    for (let y = 1; y <= (bonus ? 4 : 3); y++) { p += g; out.push(p); }
    return out;
  }

  // Simulate a path. decisions: {s1:'A',...}. Stops at the first undecided shock.
  function simulate(country, setup, decisions, bonus) {
    const r = { values: [BASE], rounds: [], sunk: 0, power: 70, gauges: null, flags: { loc: false, ref: false, shield: "intact", seized: false, sold: false }, stage: 0 };
    if (!country || !setup.own || !setup.prot) return r;
    const P = PROT[setup.prot];
    const x = { jv: setup.own === "jv", arb: P.arb, ins: P.ins, loc: false, ref: false };
    let v = BASE + APPROVAL_BONUS[country][setup.own] - P.cost;
    r.values.push(v); r.stage = 1;
    r.sunk = BASE;
    r.power = 50 + (P.arb ? 5 : 0) + (P.ins ? 3 : 0);
    const g = Object.assign({}, G0[country]);
    if (x.jv) { g.proc -= 15; g.dist -= country === "S" ? 10 : 5; }
    if (P.arb) g.proc -= 10;
    if (P.ins) { g.cat -= 10; g.dist -= 10; }
    const growth = GROWTH[setup.own];
    const years = bonus ? 4 : 3;
    for (let y = 1; y <= years; y++) {
      const sh = SHOCKS[y - 1];
      const k = decisions[sh.id];
      if (!k) break;
      v += growth; r.power -= 4;
      const o = sh.resolve(country, x, k);
      v += o.d;
      if (o.sunk) r.sunk += o.sunk;
      if (o.pw) r.power += o.pw;
      if (o.g) for (const key in o.g) g[key] += o.g[key];
      if (o.loc) { x.loc = true; r.flags.loc = true; }
      if (o.ref) { x.ref = true; r.flags.ref = true; }
      if (o.shield) r.flags.shield = o.shield;
      if (o.seized) r.flags.seized = true;
      if (o.sold) r.flags.sold = true;
      if (o.pwSet != null) r.power = o.pwSet;
      const mini = MINI[country][y - 1];
      v += mini.d;
      r.values.push(v); r.stage = 1 + y;
      r.rounds.push({ id: sh.id, year: y, key: k, delta: o.d, mini, outcome: o });
    }
    for (const key in g) g[key] = clamp(g[key], 5, 95);
    r.gauges = g;
    r.power = clamp(r.power, 5, 95);
    return r;
  }

  function counterfactual(country, setup, decisions, bonus) {
    const oc = COUNTRIES[country].other;
    const d = Object.assign({}, decisions);
    if (d.s4) d.s4 = CF_MAP.s4[country][d.s4];
    return simulate(oc, setup, d, bonus);
  }

  root.VD = { COUNTRIES, OWN, PROT, SHOCKS, MINI, G0, BASE, GROWTH, APPROVAL_BONUS, optionsFor, available, planSeries, simulate, counterfactual };
})(typeof window !== "undefined" ? window : globalThis);
