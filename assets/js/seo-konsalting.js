window.__DCC = (function () {
class Component extends DCLogic {
  state = { navOpen: false, open: 0, got: 0, gotRun: false };
  gotGo(i) {
    clearTimeout(this.gt1); clearInterval(this.gt0);
    this.setState({ got: i, gotRun: false });
    this.gt1 = setTimeout(() => this.setState({ gotRun: true }), 60);
    this.gt0 = setInterval(() => this.gotGo((this.state.got + 1) % 3), 4400);
  }
  componentDidMount() { this.gotGo(0); }
  componentWillUnmount() { clearTimeout(this.gt1); clearInterval(this.gt0); }
  renderVals() {
    const { open, got, gotRun } = this.state;
    const on = i => got === i && gotRun;
    const gv = {};
    [0, 1, 2].forEach(i => { gv['p' + i] = got === i ? 1 : 0; gv['py' + i] = got === i ? '0px' : '14px'; });
    const prioRows = [['Ispraviti greške u indeksiranju', 'Visok', '94%'], ['Prepisati naslove i opise', 'Visok', '82%'], ['Ubrzati mobilnu verziju', 'Srednji', '60%'], ['Povezati srodne stranice', 'Srednji', '46%']].map(([label, lvl, w], i) => ({
      n: '0' + (i + 1), label, lvl, w: on(1) ? w : '0%', op: on(1) ? 1 : 0, x: on(1) ? '0px' : '-10px', delay: i * 160 + 'ms',
      chipBg: lvl === 'Visok' ? '#0c0f0f' : '#e6f5f3', chipC: lvl === 'Visok' ? '#2cc4b6' : '#0d7f76'
    }));
    const doneRows = ['Tehnički SEO i indeksiranje', 'Naslovi i meta opisi', 'Brzina učitavanja', 'Interno povezivanje'].map((label, i) => ({
      label, bg: on(2) ? '#1aa89d' : '#e3ecea', ic: on(2) ? '#ffffff' : '#9aa5a3', op: on(2) ? 1 : 0, delay: 250 + i * 550 + 'ms'
    }));
    const gotTabs = [['videocam', 'Snimak i rezime'], ['format_list_numbered', 'Lista prioriteta'], ['build', 'Optimizacija']].map(([icon, label], i) => {
      const a = got === i;
      return { icon, label, bg: a ? '#ffffff' : 'transparent', border: a ? '#9fd9d2' : '#e3ecea', fg: a ? '#0c0f0f' : '#6b7675', ic: a ? '#0d7f76' : '#9aa5a3', bar: on(i) ? '100%' : '0%', dur: on(i) ? '4.3s' : '0s', onClick: () => this.gotGo(i) };
    });
    const faq = [
      { q: 'Šta radi SEO konsultant?', a: 'SEO konsultant analizira sajt, podatke i konkurenciju, pronalazi šta sprečava bolje pozicije na Google-u i pravi plan izmena. Kod nas konsultant može i da sprovede te izmene, pa ne morate tražiti posebnog izvođača.' },
      { q: 'Po čemu prepoznati dobrog SEO konsultanta?', a: 'Dobar konsultant objašnjava jasno i bez žargona, oslanja se na podatke, ne obećava prvu poziciju za kratko vreme i ne koristi rizične taktike. Pitajte za konkretne primere i način merenja rezultata.' },
      { q: 'Koliko košta SEO konsultacija?', a: 'Cena zavisi od veličine sajta i obima posla. Nakon početne analize dobijate jasnu ponudu za konsultaciju, a po želji i za optimizaciju koju sprovodimo mi.' },
      { q: 'Da li je bolje angažovati agenciju ili konsultanta?', a: 'Konsultant vam daje direktan kontakt sa stručnjakom, a agencija kapacitet za izvođenje. Kod nas dobijate oba: razgovarate direktno sa osobom koja vodi vaš SEO, a tim sprovodi izmene.' },
      { q: 'Kako se SEO uklapa u content marketing?', a: 'SEO pokazuje šta ljudi pretražuju i kako, a sadržaj na to odgovara. Zajedno određujemo teme, strukturu stranica i interno povezivanje, da svaki tekst ima šansu da se rangira.' },
      { q: 'Kada se vide rezultati SEO optimizacije?', a: 'Zavisi od stanja sajta, konkurencije i obima izmena. Tehničke ispravke često brže pokažu efekat, dok sadržaj i autoritet rastu postepeno. Napredak pratimo kroz Search Console i jasne izveštaje.' }
    ];
    const faqItems = faq.map((f, i) => ({ ...f, open: i === open, icon: i === open ? 'remove' : 'add', iconBg: i === open ? '#0c0f0f' : '#eef3f2', iconC: i === open ? '#2cc4b6' : '#0c0f0f', onClick: () => this.setState({ open: i === open ? -1 : i }) }));
    const stepsData = [
      ['Pošaljete upit', 'Popunite kontakt formu i ostavite link do sajta. Javljamo se da dogovorimo termin.'],
      ['Pripremamo se za razgovor', 'Tražimo dodatne informacije i pristup Search Console-u i analitici, da razgovor bude konkretan.'],
      ['Online konsultacija', 'Sastajemo se preko Google Meet-a u dogovoreno vreme i prolazimo kroz sajt i vaša pitanja.'],
      ['Plan i rešenja', 'Rešavamo konkretne probleme i pravimo listu izmena poređanih po uticaju.'],
      ['Snimak i sledeći koraci', 'Šaljemo snimak i pisani rezime. Izmene sprovodite sami ili ih prepuštate nama.']
    ];
    const steps = stepsData.map(([title, text], i) => ({ num: '0' + (i + 1), title, text, circle: i === 0 ? 'linear-gradient(150deg,#1aa89d,#0d7f76)' : '#0c0f0f', numC: i === 0 ? '#ffffff' : '#2cc4b6', line: i === stepsData.length - 1 ? 'transparent' : '#cfe5e2' }));
    return {
      showGrid: this.props.showGrid ?? true,
      navOpen: this.state.navOpen,
      navIn: () => this.setState({ navOpen: true }),
      navOut: () => this.setState({ navOpen: false }),
      consultItems: ['SEO audit sajta', 'Analiza konkurencije', 'Pregled trenutne strategije', 'Odgovori na sva vaša pitanja'],
      optimizeItems: ['Tehnički SEO i indeksiranje', 'On-page optimizacija stranica', 'Brzina i Core Web Vitals', 'Sadržaj i interno povezivanje'],
      promises: [
        { icon: 'handshake', title: 'Bez dugoročnog ugovora', text: 'Saradnja se nastavlja jer donosi rezultat, ne zato što ste potpisali obavezu.' },
        { icon: 'verified_user', title: 'Bez rizičnih taktika', text: 'Samo metode koje Google preporučuje, bez kupljenih linkova i prečica koje kasnije koštaju.' },
        { icon: 'description', title: 'Izveštaji koje razumete', text: 'Jasno pišemo šta je urađeno, zašto i kakav je efekat.' }
      ],
      problems: [
        { icon: 'article', title: 'Slab on-page SEO', text: 'Naslovi, opisi i struktura stranica ne govore Google-u o čemu je sajt.' },
        { icon: 'bug_report', title: 'Tehničke greške', text: 'Spori delovi, greške u indeksiranju i duplirane stranice koje Google preskače.' },
        { icon: 'link_off', title: 'Loši linkovi', text: 'Sumnjivi linkovi ka sajtu koji mogu da povuku pozicije nadole.' }
      ],
      audience: [
        { icon: 'shopping_bag', label: 'Online prodavnice' },
        { icon: 'storefront', label: 'Uslužni biznisi' },
        { icon: 'location_on', label: 'Lokalne firme' },
        { icon: 'groups', label: 'Agencije' },
        { icon: 'link', label: 'Affiliate sajtovi' },
        { icon: 'help', label: 'Konkretan SEO problem' }
      ],
      topics: ['SEO audit', 'E-commerce SEO', 'Tehnički SEO', 'On-page optimizacija', 'Optimizacija sadržaja', 'Lokalni SEO', 'Link profil', 'Pregled trenutne strategije', 'AI pretraga (GEO)'],
      steps, faq, faqItems,
      ...gv, prioRows, doneRows, gotTabs, gotNum: '0' + (got + 1),
      vidW: on(0) ? '100%' : '0%', vidDur: on(0) ? '4.3s' : '0s', docW: on(0) ? '100%' : '0%'
    };
  }
}
return Component;
})();
