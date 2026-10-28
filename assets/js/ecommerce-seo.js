window.__DCC = (function () {
class Component extends DCLogic {
  state = { navOpen: false, open: 0, up: false };
  cycle() {
    this.setState({ up: false });
    this.ta = setTimeout(() => {
      this.setState({ up: true });
      this.tb = setTimeout(() => this.cycle(), 3600);
    }, 1800);
  }
  componentDidMount() { this.cycle(); }
  componentWillUnmount() { clearTimeout(this.ta); clearTimeout(this.tb); }
  renderVals() {
    const { open, up } = this.state;
    const rows = [
      { title: 'Patike za trčanje | Velika ponuda', url: 'konkurent-sport.rs › patike' },
      { title: 'Muške i ženske patike za trčanje', url: 'marketplace.rs › sport' },
      { title: 'Patike za trčanje na akciji', url: 'outlet-shop.rs › trcanje' },
      { title: 'Patike za trčanje | Vaša prodavnica', url: 'vasaprodavnica.rs › patike-za-trcanje', you: true }
    ];
    const order = up ? [1, 2, 3, 0] : [0, 1, 2, 3];
    const tops = [0, 76, 152, 228];
    const serp = rows.map((r, i) => {
      const pos = order[i];
      return { ...r, you: !!r.you, pos: pos + 1, top: (r.you && up ? 0 : tops[pos]) + 'px',
        bg: r.you ? '#eef8f6' : '#ffffff', border: r.you ? '#9fd9d2' : '#eef3f2',
        shadow: r.you && up ? '0 18px 34px -18px rgba(13,127,118,0.55)' : 'none',
        numC: r.you ? '#0d7f76' : '#9aa5a3', titleC: r.you ? '#0c0f0f' : '#2b3433', z: r.you ? 2 : 1,
        richOp: up ? 1 : 0 };
    });
    const faq = [
      { q: 'Da li radite SEO za Shopify i WooCommerce prodavnice?', a: 'Da. Radimo na Shopify, WooCommerce i WordPress prodavnicama. Svaka platforma ima svoja tehnička ograničenja, a mi znamo kako da ih rešimo bez menjanja platforme.' },
      { q: 'Da li moram da menjam platformu ili temu?', a: 'U većini slučajeva ne. Optimizujemo postojeću prodavnicu. Promenu teme ili platforme predlažemo samo ako trenutna rešenja zaista ograničavaju rast, i to uz plan da se ne izgube postojeće pozicije.' },
      { q: 'Da li je SEO bolji od plaćenih oglasa?', a: 'Nije zamena, već dopuna. Oglasi donose brz saobraćaj dok plaćate, a SEO gradi vidljivost koja ostaje. Najbolje prodavnice koriste oba kanala, a SEO vremenom smanjuje zavisnost od oglasa.' },
      { q: 'Da li pišete opise proizvoda i kategorija?', a: 'Da. Pišemo ili unapređujemo opise kategorija i proizvoda, tako da odgovaraju na pitanja kupaca i sadrže pojmove koje ljudi zaista pretražuju.' },
      { q: 'Kada se vide rezultati?', a: 'Zavisi od veličine prodavnice, konkurencije i stanja sajta. Tehničke ispravke često brže pokažu efekat, dok kategorije i sadržaj rastu postepeno. Napredak pratimo kroz Search Console i analitiku.' },
      { q: 'Kako merite rezultat?', a: 'Pratimo organske posete, pozicije za ključne kategorije i, najvažnije, organske porudžbine i prihod u Google Analytics 4. Svaki izveštaj jasno pokazuje šta je urađeno i kakav je efekat.' }
    ];
    const faqItems = faq.map((f, i) => ({ ...f, open: i === open, icon: i === open ? 'remove' : 'add', iconBg: i === open ? '#0c0f0f' : '#eef3f2', iconC: i === open ? '#2cc4b6' : '#0c0f0f', onClick: () => this.setState({ open: i === open ? -1 : i }) }));
    const steps = [
      ['Audit prodavnice', 'Proveravamo kategorije, proizvode, filtere, indeksiranje i brzinu.'],
      ['Plan po prihodu', 'Prvo radimo kategorije i proizvode koji mogu doneti najviše prodaje.'],
      ['Optimizacija', 'Sprovodimo tehničke izmene, sadržaj i strukturu direktno u prodavnici.'],
      ['Merenje', 'Pratimo organske porudžbine i prihod i redovno vam šaljemo izveštaj.']
    ].map(([title, text], i) => ({ num: '0' + (i + 1), title, text, circle: i === 0 ? 'linear-gradient(150deg,#1aa89d,#0d7f76)' : '#0c0f0f', numC: i === 0 ? '#ffffff' : '#2cc4b6' }));
    return {
      showGrid: this.props.showGrid ?? true,
      navOpen: this.state.navOpen,
      navIn: () => this.setState({ navOpen: true }),
      navOut: () => this.setState({ navOpen: false }),
      serp, posLabel: up ? '#4 → #1' : '#4',
      toastOp: up ? 1 : 0, toastY: up ? '0px' : '12px',
      platforms: [
        { icon: 'shopping_bag', name: 'Shopify', sub: 'Hostovana prodavnica', text: 'Shopify je brz za pokretanje, ali ima fiksnu strukturu URL-ova i lako se uspori aplikacijama.', items: ['Duplirani URL-ovi proizvoda kroz kolekcije', 'Struktura kolekcija i filtera', 'Brzina teme i aplikacija', 'Schema za proizvode i ocene'] },
        { icon: 'shopping_cart', name: 'WooCommerce', sub: 'Prodavnica na WordPress-u', text: 'WooCommerce daje punu kontrolu, ali bez dobrog podešavanja filteri i atributi prave hiljade nepotrebnih stranica.', items: ['Kategorije, atributi i filteri', 'Kontrola indeksiranja stranica', 'Keš, slike i hosting za brzinu', 'Podešavanje SEO plugina i schema'] },
        { icon: 'language', name: 'WordPress', sub: 'Sajt i blog uz prodavnicu', text: 'Sadržaj na WordPress-u dovodi kupce koji još istražuju i vodi ih do proizvoda.', items: ['Tehnički SEO i Core Web Vitals', 'Blog i vodiči koji vode ka proizvodima', 'Interno povezivanje sa kategorijama', 'Čišćenje i izbor plugina'] }
      ],
      services: [
        { icon: 'manage_search', title: 'Transakcione ključne reči', text: 'Pronalazimo pojmove koje kupci kucaju kada su spremni da kupe.' },
        { icon: 'category', title: 'Optimizacija kategorija', text: 'Kategorije koje se rangiraju za šire pojmove i donose najviše prodaje.' },
        { icon: 'inventory_2', title: 'Stranice proizvoda', text: 'Naslovi, opisi, slike i podaci koji pomažu i Google-u i kupcu.' },
        { icon: 'settings', title: 'Tehnički SEO', text: 'Indeksiranje, filteri, robots.txt, canonical tagovi i mapa sajta.' },
        { icon: 'data_object', title: 'Schema za proizvode', text: 'Cena, dostupnost i ocene direktno u rezultatima pretrage.' },
        { icon: 'speed', title: 'Brzina i Core Web Vitals', text: 'Brže stranice kategorija i proizvoda na mobilnom.' },
        { icon: 'storefront', title: 'Google Merchant Center', text: 'Proizvodi u besplatnim Shopping listinzima na Google-u.' },
        { icon: 'auto_awesome', title: 'Proizvodi u AI pretrazi', text: 'Podaci koje ChatGPT i Gemini mogu da pročitaju i preporuče.' }
      ],
      problems: [
        { icon: 'content_copy', title: 'Duplirane stranice', text: 'Filteri, varijante i kolekcije prave više verzija iste stranice.' },
        { icon: 'notes', title: 'Kopirani opisi proizvoda', text: 'Isti tekst od proizvođača kao kod desetina drugih prodavnica.' },
        { icon: 'remove_shopping_cart', title: 'Rasprodati proizvodi', text: 'Stranice koje vode na grešku ili prazne kategorije gube pozicije.' },
        { icon: 'hourglass_top', title: 'Spore stranice', text: 'Previše aplikacija i plugina usporava kategorije i proizvode.' }
      ],
      steps, faq, faqItems
    };
  }
}
return Component;
})();
