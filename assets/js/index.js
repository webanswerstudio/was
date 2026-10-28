window.__DCC = (function () {
class Component_ extends DCLogic {
  state = { mode: 'once', step: 0, grow: false, hero: 0, heroRun: false };
  heroTimer() { clearInterval(this.t4); this.t4 = setInterval(() => this.setState(s => ({ hero: (s.hero + 1) % 4 })), 3800); }
  Gauge = function Gauge() {
    const h = React.createElement;
    const [v, setV] = React.useState(0);
    React.useEffect(() => {
      let raf; const t0 = performance.now();
      const loop = t => {
        const e = (t - t0) % 4800, p = Math.min(e / 1900, 1);
        setV(Math.round(100 * (1 - Math.pow(1 - p, 3))));
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }, []);
    const c = v < 50 ? '#e5534b' : v < 90 ? '#e8a33d' : '#1aa89d';
    const done = v >= 100;
    return h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 } },
      h('div', { style: { width: 250, height: 250, borderRadius: '50%', background: `conic-gradient(${c} 0 ${v}%, #1c2423 0)`, display: 'grid', placeItems: 'center', boxShadow: done ? '0 0 60px -10px rgba(26,168,157,0.55)' : 'none', transition: 'box-shadow .5s' } },
        h('div', { style: { width: 220, height: 220, borderRadius: '50%', background: '#0c0f0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 } },
          h('div', { style: { display: 'flex', alignItems: 'flex-start', fontFamily: 'Lexend', fontWeight: 700, color: '#ffffff', lineHeight: 1 } },
            h('span', { style: { fontSize: 84, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' } }, v),
            h('span', { style: { fontSize: 26, marginTop: 10, marginLeft: 2, color: c } }, '%')),
          h('span', { style: { fontSize: 12, letterSpacing: '0.18em', fontWeight: 700, color: done ? '#2cc4b6' : '#9aa5a3' } }, done ? 'SPEED TEST' : 'TESTIRANJE…'))));
  };
  componentDidMount() {
    this.t5 = setTimeout(() => this.setState({ heroRun: true }), 60);
    this.heroTimer();
    this.t1 = setInterval(() => this.setState(s => ({ step: (s.step + 1) % 3 })), 2600);
    this.t0 = setTimeout(() => this.setState({ grow: true }), 300);
    this.t2 = setInterval(() => {
      this.setState({ grow: false });
      this.t3 = setTimeout(() => this.setState({ grow: true }), 900);
    }, 5600);
  }
  componentWillUnmount() { clearInterval(this.t4); clearTimeout(this.t5); clearInterval(this.t1); clearInterval(this.t2); clearTimeout(this.t0); clearTimeout(this.t3); }
  renderVals() {
    const { mode, step, grow, hero, heroRun } = this.state;
    const heroNames = ['Razgovor o projektu', 'Izrada sajta', 'Optimizacija', 'Održavanje'];
    const heroVals = {};
    heroNames.forEach((n, i) => { heroVals['h' + i] = i === hero ? 1 : 0; heroVals['hs' + i] = i === hero ? 1 : 1.04; });
    const heroTabs = heroNames.map((label, i) => {
      const a = i === hero;
      return { label, num: '0' + (i + 1), bg: a ? '#ffffff' : 'transparent', border: a ? '#cfe9e5' : '#e3ecea', fg: a ? '#0c0f0f' : '#6b7675', numC: a ? '#0d7f76' : '#9aa5a3', bar: a && heroRun ? '100%' : '0%', dur: a && heroRun ? '3.7s' : '0s', onClick: () => { this.setState({ hero: i }); this.heroTimer(); } };
    });
    const prices = {
      once: { s: '€350', b: '€450', p: '€1.200+', unit: '', period: 'Jednokratno plaćanje', note: 'JEDNOKRATNO PLAĆANJE' },
      r6: { s: '€64', b: '€83', p: '€220', unit: '/mes', period: '6 mesečnih rata', note: 'MESEČNO PLAĆANJE NA 6 RATA (+10%)' },
      r12: { s: '€35', b: '€45', p: '€120', unit: '/mes', period: '12 mesečnih rata', note: 'MESEČNO PLAĆANJE NA 12 RATA (+20%)' }
    };
    const cur = prices[mode];
    const modes = [['once', 'Jednokratno'], ['r6', '6 rata'], ['r12', '12 rata']].map(([id, label]) => ({
      label, bg: id === mode ? '#0c0f0f' : 'transparent', fg: id === mode ? '#ffffff' : '#4a5554',
      onClick: () => this.setState({ mode: id })
    }));
    const stepsData = [
      { num: '01', icon: 'query_stats', title: 'Analiza sajta', text: 'Merimo brzinu, SEO i AI vidljivost i šaljemo vam jasan plan bez obaveze.' },
      { num: '02', icon: 'design_services', title: 'Dizajn i optimizacija', text: 'Dizajniramo, razvijamo i ubrzavamo, dok Vi samo odobravate.' },
      { num: '03', icon: 'rocket_launch', title: 'Lansiranje i merenje', text: 'Puštamo sajt uživo i pratimo rezultate i nakon objave.' }
    ];
    const steps = stepsData.map((s, i) => {
      const active = i === step, past = i < step;
      return { ...s,
        opacity: active || past ? 1 : 0.55,
        ring: active ? '#1aa89d' : past ? '#9fd9d2' : '#e3ecea',
        scale: active ? 1.08 : 1,
        glow: active ? '0 0 0 8px rgba(26,168,157,0.12), 0 18px 34px -16px rgba(13,127,118,0.6)' : '0 10px 24px -16px rgba(12,15,15,0.25)',
        inner: active || past ? '#0c0f0f' : '#f1f5f4',
        iconC: active || past ? '#2cc4b6' : '#9aa5a3',
        numC: active ? '#0d7f76' : '#9aa5a3',
        bar: active || past ? '100%' : '0%',
        barDur: active ? '2.4s' : '0s'
      };
    });
    const H = [26, 38, 50, 62, 78, 96];
    const bars = H.map((x, i) => ({
      h: grow ? x + '%' : '6%',
      delay: grow ? i * 110 + 'ms' : '0ms',
      bg: i === H.length - 1 ? 'linear-gradient(180deg,#1aa89d,#0d7f76)' : 'linear-gradient(180deg,#bfe7e2,#9fd9d2)',
      label: (i + 1) + '. mes'
    }));
    return {
      showGrid: this.props.showGrid ?? true,
      ctaDark: (this.props.ctaStyle ?? 'Tamni') === 'Tamni',
      ctaLight: (this.props.ctaStyle ?? 'Tamni') === 'Tirkizni',
      gauge: React.createElement(this.Gauge),
      ...heroVals, heroTabs, heroLabel: heroNames[hero],
      modes, modeNote: cur.note, unit: cur.unit, period: cur.period,
      starter: cur.s, biznis: cur.b, premium: cur.p,
      steps, lineW: step * 50 + '%', bars,
      ctaPoints: ['Analizu brzine učitavanja stranica', 'SEO izveštaj', 'Analizu dizajna sa konkretnim predlozima'],
      stats: [
        { icon: 'travel_explore', kicker: 'SEO SKOR 100', title: 'Bolja pozicija na Google-u', text: 'Tehnički čist sajt koji Google lako čita, indeksira i bolje rangira.' },
        { icon: 'auto_awesome', kicker: 'AI VIDLJIVOST', title: 'Citiranje u AI odgovorima', text: 'Sadržaj i struktura zbog kojih vas ChatGPT, Gemini i Google AI Overviews navode kao izvor.' },
        { icon: 'ads_click', kicker: 'KONVERZIJE', title: 'Više konverzija', text: 'Dizajn koji vodi posetioca ka pozivu, upitu ili kupovini bez lutanja.' }
      ],
      problems: [
        { icon: 'search_off', title: 'Google vas ne vidi', text: 'Bez tehničkog SEO-a sajt ostaje na drugoj strani, gde ga niko ne traži.' },
        { icon: 'smart_toy', title: 'AI vas ne preporučuje', text: 'Kada kupci pitaju ChatGPT ili Gemini, AI navodi konkurenciju jer vaš sajt ne razume.' },
        { icon: 'hourglass_top', title: 'Sajt se sporo učitava', text: 'Svaka sekunda čekanja odvodi posetioce konkurenciji pre nego što vide ponudu.' },
        { icon: 'touch_app', title: 'Nije jasan sledeći korak', text: 'Ljudi dođu, prelistaju i odu jer ne znaju da li da pozovu, pišu ili kupe.' }
      ],
      services: [
        { icon: 'brush', title: 'Web dizajn', text: 'Moderan, prepoznatljiv dizajn prilagođen vašem brendu.' },
        { icon: 'travel_explore', title: 'SEO optimizacija', text: 'Tehnički i on-page SEO za više organskih poseta.' },
        { icon: 'auto_awesome', title: 'AI optimizacija (GEO)', text: 'Optimizacija za AI pretragu da vas ChatGPT, Gemini i AI Overviews citiraju.' },
        { icon: 'speed', title: 'Optimizacija brzine', text: 'Slike, kod, keš i hosting podešeni za maksimalnu brzinu.' },
        { icon: 'monitor_heart', title: 'Core Web Vitals', text: 'LCP, CLS i INP u zelenom kako Google i traži.' },
        { icon: 'ads_click', title: 'UX i konverzije', text: 'Analiza ponašanja i izmene koje donose više upita.' },
        { icon: 'web', title: 'Landing stranice', text: 'Brze stranice za kampanje, fokusirane na jednu akciju.' },
        { icon: 'build', title: 'Održavanje', text: 'Ažuriranja, backup, bezbednost i sitne izmene.' },
        { icon: 'insights', title: 'Analitika', text: 'Praćenje poseta, upita i prodaje na jednom mestu.' }
      ],
      industries: [
        { icon: 'storefront', label: 'Lokalni biznisi' },
        { icon: 'medical_services', label: 'Ordinacije i klinike' },
        { icon: 'spa', label: 'Lepota i wellness' },
        { icon: 'apartment', label: 'Nekretnine' },
        { icon: 'shopping_bag', label: 'E-commerce' },
        { icon: 'restaurant', label: 'Ugostiteljstvo' }
      ],
      svcCards: [
        { icon: 'support_agent', kicker: 'OPTIMIZACIJA SAJTA', title: 'Konsalting SEO', text: 'Analiza, jasan plan i optimizacija postojećeg sajta, uz direktan rad sa SEO stručnjakom.', items: ['SEO audit i plan prioriteta', 'Tehnički i on-page SEO', 'Izmene koje sprovodimo mi'], cta: 'Zatraži analizu', href: 'seo-konsalting' },
        { icon: 'shopping_cart', kicker: 'OPTIMIZACIJA SAJTA', title: 'E-commerce SEO', text: 'Više porudžbina iz Google pretrage za Shopify, WooCommerce i WordPress prodavnice.', items: ['Kategorije i stranice proizvoda', 'Transakcione ključne reči', 'Schema i Google Merchant Center'], cta: 'Zatraži analizu', href: 'ecommerce-seo' },
        { icon: 'auto_awesome', kicker: 'AI PRETRAGA', title: 'GEO optimizacija', text: 'Da vas ChatGPT, Gemini i Google AI Overviews preporučuju i navode kao izvor.', items: ['GEO i AEO optimizacija tekstova', 'Schema i entitet brenda', 'Praćenje AI vidljivosti'], cta: 'Zatraži analizu', href: 'geo-optimizacija' },
        { icon: 'design_services', kicker: 'BREND OD NULE', title: 'Izrada sajtova', text: 'Sajt za lokalni biznis, online prodavnicu ili portfolio, sa SEO osnovom od prvog dana.', items: ['Dizajn po meri i mobilna verzija', 'Osnovni SEO paket', 'Blog, kategorije i više jezika'], cta: 'Zatraži ponudu', href: 'izrada-sajtova' }
      ],
      ecoSteps: [
        { num: '01', icon: 'fact_check', title: 'Audit prodavnice', text: 'Proveravamo indeksiranje, filtere, duplirane stranice i brzinu.' },
        { num: '02', icon: 'manage_search', title: 'Transakcione ključne reči', text: 'Pronalazimo pojmove koje kupci kucaju kada su spremni da kupe.' },
        { num: '03', icon: 'category', title: 'Kategorije koje se rangiraju', text: 'Struktura, tekstovi i interni linkovi za najvažnije kategorije.' },
        { num: '04', icon: 'inventory_2', title: 'Stranice proizvoda', text: 'Naslovi, opisi, slike i schema sa cenom, dostupnošću i ocenama.' },
        { num: '05', icon: 'storefront', title: 'Google Merchant Center', text: 'Proizvodi u besplatnim Shopping listinzima na Google-u.' },
        { num: '06', icon: 'auto_awesome', title: 'Vidljivost u AI pretrazi', text: 'Podaci o proizvodima koje AI alati čitaju i preporučuju.' }
      ],
      guarantees: ['Bez skrivenih troškova', 'Podrška nakon lansiranja', 'Merljivo brži sajt', 'Jasan proces i rokovi']
    };
  }
}

class Component extends Component_ {
  renderVals() {
    const v = super.renderVals ? super.renderVals() : {};
    return { ...v, navOpen: !!(this.state && this.state.navOpen), navIn: () => this.setState({ navOpen: true }), navOut: () => this.setState({ navOpen: false }) };
  }
}
return Component;
})();
