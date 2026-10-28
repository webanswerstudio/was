window.__DCC = (function () {
class Component extends DCLogic {
  state = { navOpen: false, open: 0, ph: 0 };
  cycle() {
    const seq = [[1, 900], [2, 1500], [3, 700], [0, 4200]];
    let k = 0;
    const next = () => { const [ph, d] = seq[k]; this.t = setTimeout(() => { this.setState({ ph }); k = (k + 1) % seq.length; next(); }, d); };
    this.setState({ ph: 0 }); next();
  }
  componentDidMount() { this.cycle(); }
  componentWillUnmount() { clearTimeout(this.t); }
  renderVals() {
    const { open, ph } = this.state;
    const faq = [
      { q: 'Koja je razlika između GEO i AEO optimizacije?', a: 'AEO (Answer Engine Optimization) priprema sadržaj da bude izabran kao direktan odgovor na konkretno pitanje, na primer u Google AI Overviews, istaknutim isečcima ili glasovnim asistentima. GEO (Generative Engine Optimization) radi na tome da generativni AI modeli poput ChatGPT-a i Gemini-ja razumeju vaš brend i preporučuju ga kada sastavljaju odgovor iz više izvora.' },
      { q: 'Po čemu se GEO razlikuje od klasičnog SEO-a?', a: 'SEO cilja pozicije u listi rezultata i klikove. GEO cilja pominjanja i citate unutar AI odgovora. Osnova je ista: tehnički čist sajt i kvalitetan sadržaj, ali GEO dodatno radi na strukturisanim podacima, jasnim odgovorima i autoritetu brenda van vašeg sajta.' },
      { q: 'Da li GEO zamenjuje SEO?', a: 'Ne. AI alati u velikoj meri koriste iste izvore koje rangira i pretraživač. Bez dobre SEO osnove teško je postati izvor za AI. Zato GEO i AEO radimo kao nadogradnju na SEO, a ne umesto njega.' },
      { q: 'Za koje AI platforme optimizujete?', a: 'Za ChatGPT, Google Gemini i AI Overviews, Perplexity, Claude i Microsoft Copilot. Principi su zajednički, pa izmene pomažu na svim platformama, uključujući i nove koje tek dolaze.' },
      { q: 'Kada se vide rezultati GEO optimizacije?', a: 'Zavisi od trenutnog stanja sajta i autoriteta brenda. Tehničke izmene i strukturisani podaci brže se odraze, dok pominjanja i poverenje AI modela rastu postepeno. Napredak redovno merimo i pokazujemo u izveštaju.' },
      { q: 'Kako merite AI vidljivost?', a: 'Redovno testiramo skup pitanja koja postavljaju vaši kupci u više AI alata i beležimo da li se i kako pominjete. Uz to pratimo posete koje dolaze sa AI platformi u Google Analytics 4.' },
      { q: 'Kako da počnem?', a: 'Pošaljite nam link do sajta kroz kontakt formu. Uradićemo početnu analizu AI vidljivosti i predložiti konkretne prve korake.' }
    ];
    const faqItems = faq.map((f, i) => ({ ...f, open: i === open, icon: i === open ? 'remove' : 'add', iconBg: i === open ? '#0c0f0f' : '#eef3f2', iconC: i === open ? '#2cc4b6' : '#0c0f0f', onClick: () => this.setState({ open: i === open ? -1 : i }) }));
    const steps = [
      ['Audit AI vidljivosti', 'Testiramo pitanja vaših kupaca u AI alatima i proveravamo sajt.'],
      ['Plan', 'Određujemo teme, stranice i podatke koji donose najviše vidljivosti.'],
      ['Optimizacija', 'Sadržaj, schema, tehnička osnova i pominjanja brenda van sajta.'],
      ['Praćenje', 'Merimo pominjanja i AI saobraćaj i redovno šaljemo izveštaj.']
    ].map(([title, text], i) => ({ num: '0' + (i + 1), title, text, circle: i === 0 ? 'linear-gradient(150deg,#1aa89d,#0d7f76)' : '#0c0f0f', numC: i === 0 ? '#ffffff' : '#2cc4b6' }));
    return {
      showGrid: this.props.showGrid ?? true,
      navOpen: this.state.navOpen,
      navIn: () => this.setState({ navOpen: true }),
      navOut: () => this.setState({ navOpen: false }),
      typingOp: ph === 1 ? 1 : 0,
      ansOp: ph >= 2 ? 1 : 0, ansY: ph >= 2 ? '0px' : '10px',
      citeOp: ph >= 3 ? 1 : 0, badgeY: ph >= 3 ? '0px' : '12px',
      engines: ['ChatGPT', 'Gemini', 'Perplexity', 'Claude', 'Copilot', 'AI Overviews'],
      seoCol: ['Pozicija u listi rezultata', 'Cilj je klik na sajt', 'Ključne reči i linkovi', 'Meri se kroz pozicije i posete'],
      aiCol: ['Pominjanje u AI odgovoru', 'Cilj je preporuka i citat', 'Jasni odgovori, schema i autoritet', 'Meri se kroz pominjanja i AI posete'],
      compare: [
        { name: 'AEO', full: 'Answer Engine Optimization', icon: 'question_answer', short: 'Da vaš sadržaj bude izabran kao direktan odgovor na pitanje.',
          bg: '#ffffff', fg: '#0c0f0f', border: '#e3ecea', iconBg: 'linear-gradient(150deg,#1b2625,#0c0f0f)', iconC: '#2cc4b6', muted: '#6b7675', line: '#eef3f2', accent: '#0d7f76', body: '#4a5554',
          rows: [
            { k: 'CILJ', v: 'Biti odgovor na konkretno pitanje korisnika.' },
            { k: 'GDE SE VIDI', v: 'Google AI Overviews, istaknuti isečci, „Ljudi takođe pitaju“, glasovni asistenti.' },
            { k: 'ŠTA OPTIMIZUJEMO', v: 'Pitanja i kratke odgovore, FAQ sekcije, schema oznake i jasnu strukturu stranica.' },
            { k: 'KAKO SE MERI', v: 'Prikazivanje vašeg sadržaja kao odgovora za ciljana pitanja.' }
          ] },
        { name: 'GEO', full: 'Generative Engine Optimization', icon: 'auto_awesome', short: 'Da vas AI modeli razumeju, pominju i preporučuju kao brend.',
          bg: '#0c0f0f', fg: '#ffffff', border: '#0c0f0f', iconBg: '#1aa89d', iconC: '#0c0f0f', muted: '#9aa5a3', line: '#232c2b', accent: '#2cc4b6', body: '#c3cecc',
          rows: [
            { k: 'CILJ', v: 'Biti preporuka kada AI sastavlja odgovor iz više izvora.' },
            { k: 'GDE SE VIDI', v: 'ChatGPT, Gemini, Perplexity, Claude i Copilot.' },
            { k: 'ŠTA OPTIMIZUJEMO', v: 'Brend kao entitet, dosledne podatke, pominjanja na drugim sajtovima i sadržaj koji se citira.' },
            { k: 'KAKO SE MERI', v: 'Učestalost i način pominjanja brenda i posete sa AI platformi.' }
          ] }
      ],
      why: [
        { num: '01', title: 'Postanite lider u svojoj oblasti', text: 'Rani igrači zauzimaju mesto u AI odgovorima pre nego što se konkurencija probudi.' },
        { num: '02', title: 'Vidljivost dok je prostor slobodan', text: 'Dok malo ko radi GEO, lakše je postati izvor koji AI navodi.' },
        { num: '03', title: 'Poverenje AI modela se gradi', text: 'Autoritet ne nastaje preko noći. Što ranije počnete, veća je prednost.' }
      ],
      services: [
        { icon: 'travel_explore', tag: 'GEO + AEO', title: 'Audit AI vidljivosti', text: 'Proveravamo kako vas ChatGPT, Gemini i Perplexity danas vide.' },
        { icon: 'question_answer', tag: 'AEO', title: 'Sadržaj pitanje-odgovor', text: 'Jasni, kratki odgovori na pitanja koja kupci zaista postavljaju.' },
        { icon: 'data_object', tag: 'AEO', title: 'Schema i strukturisani podaci', text: 'Organizacija, usluge, proizvodi i FAQ u formatu koji AI čita.' },
        { icon: 'badge', tag: 'GEO', title: 'Entitet brenda', text: 'Dosledni podaci o firmi na sajtu, Google profilu i drugim izvorima.' },
        { icon: 'campaign', tag: 'GEO', title: 'Pominjanja i citati', text: 'Prisustvo na relevantnim sajtovima, listama i u medijima.' },
        { icon: 'smart_toy', tag: 'GEO', title: 'Pristup AI botovima', text: 'robots.txt i llms.txt podešeni da AI alati mogu da čitaju sajt.' },
        { icon: 'code', tag: 'GEO + AEO', title: 'Tehnička osnova', text: 'Sadržaj u HTML-u, brzo učitavanje i čista struktura stranica.' },
        { icon: 'monitoring', tag: 'GEO + AEO', title: 'Merenje i izveštaji', text: 'Praćenje pominjanja i poseta sa AI platformi kroz GA4.' }
      ],
      steps, faq, faqItems
    };
  }
}
return Component;
})();
