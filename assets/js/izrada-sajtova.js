window.__DCC = (function () {
class Component extends DCLogic {
  state = { navOpen: false, open: 0, ph: 0, run: false, mode: 0 };
  go(i) {
    clearTimeout(this.t1); clearInterval(this.t0);
    this.setState({ ph: i, run: false });
    this.t1 = setTimeout(() => this.setState({ run: true }), 60);
    this.t0 = setInterval(() => this.go((this.state.ph + 1) % 4), 2800);
  }
  componentDidMount() { this.go(0); }
  componentWillUnmount() { clearTimeout(this.t1); clearInterval(this.t0); }
  renderVals() {
    const { open, ph, run } = this.state;
    const col = ph >= 1;
    const cards = [0, 1, 2].map(i => ({ bg: col ? (i === 1 ? '#e6f5f3' : '#f6faf9') : '#ffffff', dash: col ? 'transparent' : '#cfd8d6', delay: i * 120 + 'ms' }));
    const buildTabs = ['Struktura', 'Dizajn', 'Mobilna verzija', 'Lansiranje'].map((label, i) => {
      const a = i === ph;
      return { label, num: '0' + (i + 1), bg: a ? '#ffffff' : 'transparent', border: a ? '#9fd9d2' : '#e3ecea', fg: a ? '#0c0f0f' : '#6b7675', numC: a ? '#0d7f76' : '#9aa5a3', bar: a && run ? '100%' : '0%', dur: a && run ? '2.7s' : '0s', onClick: () => this.go(i) };
    });
    const faq = [
      { q: 'Koliko košta izrada sajta?', a: 'Cena zavisi od broja stranica, funkcija i vrste sajta. Posle kratkog razgovora o vašim potrebama šaljemo jasnu ponudu, bez skrivenih troškova.' },
      { q: 'Koliko traje izrada sajta?', a: 'Zavisi od obima projekta i brzine pripreme sadržaja. Tačan plan i rokove dogovaramo u ponudi, pre početka rada.' },
      { q: 'Da li mogu sam da menjam sadržaj na sajtu?', a: 'Da, ako želite. Kod sajta po meri birate: izmene radim ja, ili dobijate admin panel u kome sami menjate tekstove, slike i objave. Shopify i WordPress imaju svoj admin panel. Uz samostalne izmene dobijate video uputstvo i pisani vodič.' },
      { q: 'Zašto sajt po meri, a ne WordPress?', a: 'Sajt po meri čine gotove stranice, bez baze podataka i dodataka, pa je veoma brz, ne zahteva stalna ažuriranja i teško ga je hakovati. WordPress preporučujem kada planirate mnogo sadržaja, na primer blog, i želite sve da menjate sami.' },
      { q: 'Da li je SEO uključen u izradu?', a: 'Da, svaki sajt dobija osnovni SEO paket: meta podatke, sitemap, robots.txt, canonical tagove, schema oznake i povezivanje sa Search Console-om. Za dalji rast nudimo SEO i GEO paket uz nastavak saradnje.' },
      { q: 'Da li radite višejezične sajtove?', a: 'Da. Sajt može imati više jezičkih verzija, sa ispravno podešenim oznakama da Google svakom posetiocu prikaže pravu verziju.' },
      { q: 'Da li pravite i online prodavnice?', a: 'Da, na Shopify-ju. Proizvode, cene, zalihe i porudžbine vodite sami, a ja podešavam izgled i strukturu prodavnice tako da bude spremna za Google. Mesečna pretplata ide direktno Shopify-ju. Za dalji rast prodaje tu je E-commerce SEO.' },
      { q: 'Šta dobijam ako ne nastavimo saradnju?', a: 'Sajt je u potpunosti vaš. Domen, hosting i admin panel su na vaše ime, pa sve ostaje kod vas i kada prestanemo da sarađujemo.' }
    ];
    const editModes = [
      { icon: 'support_agent', title: 'Izmene radim ja', text: 'Pošaljete mi šta treba da se promeni, a ja to uradim, kroz mesečno održavanje ili po dogovoru. Ne morate ništa da učite.' },
      { icon: 'dashboard', title: 'Dobijate admin panel', text: 'Tekstove, slike i objave menjate sami u jednostavnom uređivaču, bez diranja koda. Kad sačuvate izmenu, sajt se sam osveži i nova verzija je online za minut-dva. Sajt pritom ostaje jednako brz.' }
    ].map((m, i) => {
      const a = i === this.state.mode;
      return { ...m, num: 'OPCIJA ' + (i + 1), active: a, onClick: () => this.setState({ mode: i }),
        bg: a ? '#0c0f0f' : '#ffffff', fg: a ? '#ffffff' : '#0c0f0f', border: a ? '#0c0f0f' : '#e3ecea', shadow: a ? '0 30px 60px -36px rgba(12,15,15,0.6)' : 'none',
        iconBg: a ? '#1aa89d' : 'linear-gradient(150deg,#1b2625,#0c0f0f)', iconC: a ? '#0c0f0f' : '#2cc4b6', accent: a ? '#2cc4b6' : '#0d7f76', body: a ? '#c3cecc' : '#4a5554' };
    });
    const faqItems = faq.map((f, i) => ({ ...f, open: i === open, icon: i === open ? 'remove' : 'add', iconBg: i === open ? '#0c0f0f' : '#eef3f2', iconC: i === open ? '#2cc4b6' : '#0c0f0f', onClick: () => this.setState({ open: i === open ? -1 : i }) }));
    const light = { bg: '#ffffff', fg: '#0c0f0f', border: '#e3ecea', iconBg: 'linear-gradient(150deg,#1b2625,#0c0f0f)', iconC: '#2cc4b6', accent: '#0d7f76', body: '#2b3433' };
    const dark = { bg: '#0c0f0f', fg: '#ffffff', border: '#0c0f0f', iconBg: '#1aa89d', iconC: '#0c0f0f', accent: '#2cc4b6', body: '#e6eceb' };
    const pkg = [
      { ...light, num: '01', icon: 'design_services', title: 'Dizajn i struktura', items: ['Dizajn po meri vašeg brenda', 'Mobilna i tablet verzija', 'Struktura stranica i navigacija', 'Jasni pozivi na akciju', 'Kontakt forma i Google mapa'] },
      { ...light, num: '02', icon: 'widgets', title: 'Funkcije sajta', items: ['Blog sistem', 'Kategorije i tagovi', 'Višejezična verzija sajta', 'Admin panel za samostalne izmene, po želji', 'Shopify prodavnica, po potrebi'] },
      { ...light, num: '03', icon: 'speed', title: 'Brzina i tehnika', items: ['Optimizacija slika (WebP, lazy loading)', 'Brzo učitavanje i Core Web Vitals', 'SSL sertifikat (HTTPS)', 'Povezivanje domena i hostinga'] },
      { ...dark, num: '04', icon: 'travel_explore', title: 'Osnovni SEO paket', items: ['Meta naslovi i opisi', 'Čisti URL-ovi', 'Sitemap.xml', 'Robots.txt', 'Canonical tagovi', 'Schema (strukturisani podaci)'] },
      { ...light, num: '05', icon: 'monitoring', title: 'Povezivanje alata', items: ['Google Search Console', 'Bing Webmaster Tools', 'Google Analytics 4', 'Google Business Profile (biznis nalog)'] },
      { ...light, num: '06', icon: 'school', title: 'Predaja sajta', items: ['Nalozi na vaše ime: domen, hosting, admin panel', 'Video uputstvo i pisani vodič', 'Obuka za korišćenje sajta', 'Podrška posle lansiranja'] }
    ];
    const steps = [
      ['Razgovor i ponuda', 'Upoznajemo vaš posao, ciljeve i konkurenciju i šaljemo ponudu.'],
      ['Struktura', 'Pravimo mapu stranica i raspored sadržaja koji odobravate.'],
      ['Dizajn', 'Dizajniramo izgled u skladu sa brendom, za desktop i mobilni.'],
      ['Razvoj i sadržaj', 'Programiramo sajt, unosimo tekstove i podešavamo SEO osnovu.'],
      ['Lansiranje i predaja', 'Puštamo sajt uživo i predajemo naloge, video uputstvo i vodič.']
    ].map(([title, text], i) => ({ num: '0' + (i + 1), title, text }));
    return {
      showGrid: this.props.showGrid ?? true,
      navOpen: this.state.navOpen,
      navIn: () => this.setState({ navOpen: true }),
      navOut: () => this.setState({ navOpen: false }),
      lockC: ph >= 3 ? '#1aa89d' : '#9aa5a3',
      logoBg: col ? '#0c0f0f' : '#e3ecea',
      heroBg: col ? '#0c0f0f' : '#ffffff', dash: col ? 'transparent' : '#cfd8d6',
      h1Bg: col ? '#ffffff' : '#e3ecea', pBg: col ? '#4a5554' : '#eef3f2', btnBg: col ? '#1aa89d' : '#e3ecea',
      cards, buildTabs,
      phoneOp: ph >= 2 ? 1 : 0, phoneY: ph >= 2 ? '0px' : '16px',
      liveOp: ph >= 3 ? 1 : 0, liveY: ph >= 3 ? '0px' : '12px',
      types: [
        { num: '01', icon: 'code', title: 'Sajtovi po meri', text: 'Sajt pravim od nule, bez gotovih tema i šablona. Objavljeni sajt čine gotove stranice, bez baze podataka i dodataka (plugina). Zato je veoma brz, ne zahteva stalna ažuriranja i teško ga je hakovati.', tags: ['Bez šablona', 'Veoma brz', 'Bez plugina'], noteIcon: 'apartment', note: 'Dobar izbor za prezentacione sajtove firmi i usluga.' },
        { num: '02', icon: 'shopping_bag', title: 'Shopify prodavnice', text: 'Za online prodaju. Proizvode, cene, zalihe i porudžbine vodite sami kroz pregledan Shopify admin panel. Ja podešavam izgled i strukturu prodavnice tako da bude spremna za Google.', tags: ['Proizvodi i zalihe', 'Porudžbine', 'Spremna za Google'], noteIcon: 'payments', note: 'Shopify se plaća mesečnom pretplatom, koja ide direktno Shopify-ju.' },
        { num: '03', icon: 'article', title: 'WordPress sajtovi', text: 'Kada planirate mnogo sadržaja, na primer blog ili sajt koji redovno dopunjujete, i želite sve da menjate sami. Ima ogroman izbor dodataka, ali zato zahteva redovno ažuriranje da bi ostao brz i bezbedan.', tags: ['Blog', 'Samostalne izmene', 'Dodaci'], noteIcon: 'workspace_premium', note: 'Iz SEO ugla ga odlično poznajem, jer godinama radim na velikim WordPress sajtovima.' }
      ],
      pkg, steps,
      guide: ['Video uputstvo za izmene sadržaja', 'Osnovna SEO pravila za nove stranice', 'Šta da pratite u Search Console-u', 'Pregled svih naloga i pristupa'],
      editModes, always: [
        { icon: 'verified', title: 'SEO osnova od prvog dana', text: 'Tehnički ispravna osnova za SEO, od prvog dana.' },
        { icon: 'key', title: 'Nalozi na vaše ime', text: 'Domen, hosting i admin panel su vaši. Sajt je vaš i sve ostaje kod vas ako prestanemo da sarađujemo.' },
        { icon: 'play_circle', title: 'Video uputstvo i vodič', text: 'Video uputstvo i pisani vodič, ako sami menjate sadržaj.' }
      ],
      growth: [
        { icon: 'travel_explore', title: 'SEO paket', sub: 'Rast na Google-u', href: 'seo-konsalting', linkLabel: 'Konsalting SEO',
          text: 'Zajedno sa vašim timom pravimo nove optimizovane stranice: vi dajete znanje o poslu, mi strukturu i optimizaciju.',
          items: ['Istraživanje ključnih reči', 'Nove optimizovane stranice sa vašim timom', 'Optimizacija postojećih tekstova', 'Tehnički SEO nadzor', 'Interno povezivanje i lokalni SEO', 'Mesečni izveštaj'] },
        { icon: 'auto_awesome', title: 'GEO paket', sub: 'Vidljivost u AI pretrazi', href: 'geo-optimizacija', linkLabel: 'GEO optimizacija',
          text: 'Optimizujemo tekstove za GEO i AEO, da vas ChatGPT, Gemini i Google AI Overviews navode kao izvor.',
          items: ['Optimizacija tekstova za GEO i AEO', 'Pitanja i odgovori na stranicama', 'Proširena schema za brend i usluge', 'Entitet brenda i pominjanja', 'Praćenje AI vidljivosti', 'Mesečni izveštaj'] }
      ],
      faq, faqItems
    };
  }
}
return Component;
})();
