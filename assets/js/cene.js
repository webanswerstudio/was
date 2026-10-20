window.__DCC = (function () {
class Component_ extends DCLogic {
  state = { open: 0, mode: 'once', shopMode: 'once' };
  renderVals() {
    const mode = this.state.mode;
    const P = {
      once: { s: '350', b: '450', p: '1.200+', unit: 'EUR', note: 'JEDNOKRATNO PLAĆANJE' },
      r6: { s: '64', b: '83', p: '220', unit: 'EUR/mes · 6 rata', note: 'MESEČNO PLAĆANJE NA 6 RATA (+10%)' },
      r12: { s: '35', b: '45', p: '120', unit: 'EUR/mes · 12 rata', note: 'MESEČNO PLAĆANJE NA 12 RATA (+20%)' }
    };
    const cur = P[mode];
    const mkModes = key => [['once', 'Jednokratno'], ['r6', '6 rata'], ['r12', '12 rata']].map(([id, label]) => ({ label, bg: id === this.state[key] ? '#0c0f0f' : 'transparent', fg: id === this.state[key] ? '#ffffff' : '#4a5554', onClick: () => this.setState({ [key]: id }) }));
    const modes = mkModes('mode');
    const SP = {
      once: { a: '990', b: '1.990', unit: 'EUR', note: 'JEDNOKRATNO PLAĆANJE' },
      r6: { a: '182', b: '365', unit: 'EUR/mes · 6 rata', note: 'MESEČNO PLAĆANJE NA 6 RATA (+10%)' },
      r12: { a: '99', b: '199', unit: 'EUR/mes · 12 rata', note: 'MESEČNO PLAĆANJE NA 12 RATA (+20%)' }
    };
    const sp = SP[this.state.shopMode];
    const style = p => p.featured
      ? { bg: '#0c0f0f', fg: '#ffffff', border: '#0c0f0f', muted: '#b8c4c2', shadow: '0 40px 70px -40px rgba(12,15,15,0.6)', btnBg: '#1aa89d', btnFg: '#0c0f0f' }
      : { bg: '#ffffff', fg: '#0c0f0f', border: '#e3ecea', muted: '#4a5554', shadow: '0 24px 50px -44px rgba(12,15,15,0.35)', btnBg: '#0c0f0f', btnFg: '#ffffff' };
    const mk = (arr, cta) => arr.map(p => ({ kicker: '', old: '', unit: 'EUR', featured: false, pack: false, ai: false, cta: cta || 'Zatraži ponudu', ...p, ...style(p) }));
    const groups = [
      { id: 'paketi', label: '02 Web sajtovi', bg: '#ffffff', maxW: '1180px', eyebrow: 'WEB SAJTOVI', title: 'Web sajt paketi', sub: 'Profesionalan, brz sajt koji jasno predstavlja ponudu, gradi poverenje i vodi posetioce ka upitu.', toggle: true, modes, modeNote: cur.note, plans: mk([
        { name: 'Starter', desc: 'Savršeno za mala preduzeća koja kreću online.', price: cur.s, unit: cur.unit, features: ['Do 5 stranica', 'SEO optimizacija', 'Google Search Console integracija', 'Bing Webmaster Tools integracija', 'Kontakt forma', '2 runde revizija', 'Isporuka za nedelju dana'], ai: true },
        { name: 'Biznis', featured: true, desc: 'Za rastuća preduzeća kojima treba više.', price: cur.b, unit: cur.unit, features: ['Do 10 stranica', 'Prilagođen dizajn, neograničene revizije', 'Blog + newsletter integracija', 'Napredna SEO strategija', 'Google Search Console integracija', 'Bing Webmaster Tools integracija', 'Google Business Profile (biznis nalog)', 'Višejezična podrška', 'Isporuka za 10 dana'], ai: true },
        { name: 'Premium', desc: 'Potpuno prilagođene web aplikacije.', price: cur.p, unit: cur.unit, features: ['Neograničen broj stranica', 'Prilagođen CMS sistem', 'Napredna analitika + optimizacija konverzija', '99.9% uptime SLA', 'Neograničene revizije tokom razvoja', 'Prioritetna podrška'], pack: ['GSC', 'Bing Webmaster Tools', 'GA4', 'GTM', 'Google Ads', 'Business Profile'], ai: true }
      ]) },
      { id: 'prodavnice', label: '03 Online prodavnice', bg: '#f6faf9', maxW: '980px', eyebrow: 'E-COMMERCE', title: 'Online prodavnice', sub: 'Prodavnice spremne za prodaju: proizvodi, plaćanje, dostava, email obaveštenja i osnova za rast.', toggle: true, modes: mkModes('shopMode'), modeNote: sp.note, plans: mk([
        { kicker: 'ZA BRZ POČETAK PRODAJE', name: 'Shopify prodavnica', desc: 'Online prodavnica za brz start, jednostavno upravljanje proizvodima i siguran checkout.', price: sp.a, unit: sp.unit, features: ['Do 500 proizvoda', 'Shopify tema sa prilagođavanjima', 'Mobilno optimizovana prodavnica', 'Integracija plaćanja', 'Upravljanje inventarom', 'Automatski emailovi', '3 meseca podrške'] },
        { kicker: 'PREMIUM E-COMMERCE', name: 'Custom shopify', featured: true, desc: 'Prodavnica po meri za brendove koji žele bolji izgled, brzinu, SEO i korisničko iskustvo.', price: sp.b, unit: sp.unit, features: ['Do 1.000 proizvoda', 'Potpuno custom dizajn', 'Napredne integracije', 'Premium SEO optimizacija', 'Analitika i izveštaji', 'Custom funkcionalnosti', '6 meseci podrške'] }
      ]) },
      { id: 'odrzavanje', label: '04 Održavanje', bg: '#ffffff', maxW: '820px', eyebrow: 'PODRŠKA', title: 'Paketi održavanja', sub: 'Sigurnost, izmene, backup i tehnička podrška da vaš sajt ostane brz i stabilan nakon lansiranja.', note: 'Godišnje plaćanje −15% · Paket možete promeniti svakog meseca · Otkaz 30 dana unapred', plans: mk([
        { name: 'Essentials', desc: 'Osnovno održavanje i sigurnost sajta.', price: '90', unit: 'EUR/mesec', features: ['Nedeljni backup (30 dana retencije)', 'Mesečna ažuriranja CMS-a i plugin-ova', 'SSL i domen monitoring', '1h izmena mesečno', 'Email podrška (odgovor za 48h)'] },
        { name: 'Standard', featured: true, desc: 'Za aktivne biznise kojima treba redovna podrška i praćenje.', price: '140', unit: 'EUR/mesec', features: ['Dnevni backup (90 dana retencije)', 'Nedeljna ažuriranja + security patches', 'Uptime monitoring 24/7', '4h izmena mesečno', 'Email + telefonska podrška (24h)', 'Mesečni performance izveštaj'] }
      ], 'Zatraži analizu') },
      { id: 'specijalizovano', label: '05 Specijalizovane usluge', bg: '#f6faf9', maxW: '560px', eyebrow: 'DODATNO', title: 'Specijalizovane usluge', sub: 'Za biznise kojima treba više od standardnog sajta: brending i sistemi koji sami prate i neguju upite.', plans: mk([
        { name: 'Brending i automatizacija', featured: true, desc: 'Sve što vam treba da brend izgleda profesionalno, a upiti stižu i obrađuju se automatski.', price: 'Na upit', unit: '', features: ['Logo i vizuelni identitet', 'Boje i tipografija', 'Brend smernice', 'Materijali za društvene mreže', 'CRM podešavanje', 'Email automatizacija', 'Sales funnel', 'Analitika i izveštaji'] }
      ]) }
    ];
    const faqData = [
      { q: 'Da li su hosting i domen uključeni u cenu?', a: 'Ne, domen i hosting nisu uključeni u cenu paketa. Pomažemo vam da ih zakupite na svoje ime, a trošak zavisi od ekstenzije (.rs, .com…) i hosting plana.' },
      { q: 'Da li ću biti vlasnik domena i sajta?', a: 'Da. Domen, sajt i sav sadržaj su vaši, a po završetku dobijate sve pristupe.' },
      { q: 'Koliko traje izrada sajta?', a: 'Starter sajt je gotov za nedelju dana, Biznis za oko 10 dana, a Premium i prodavnice za tri do šest nedelja, zavisno od obima.' },
      { q: 'Da li je sajt optimizovan za Google?', a: 'Jeste, i to ne samo za Google nego i za Bing. Svaki sajt dobija tehnički SEO, brzo učitavanje i Core Web Vitals u zelenom, što je dobra osnova za visoko rangiranje.' },
      { q: 'Mogu li kasnije da nadogradim paket?', a: 'Možete u bilo kom trenutku. Plaćate samo razliku i nove funkcionalnosti.' },
      { q: 'Šta uključuje održavanje?', a: 'Održavanje uključuje backup, bezbednosna ažuriranja, praćenje brzine, sitne izmene sadržaja i podršku, a obim zavisi od paketa.' }
    ];
    return {
      heroChips: ['Bez skrivenih troškova', '0% avans', 'Jasan obim pre početka', 'Mogućnost nadogradnje'],
      quick: [
        { icon: 'web', title: 'Web sajt', price: 'od 350 EUR' },
        { icon: 'shopping_bag', title: 'Online prodavnica', price: 'od 990 EUR' },
        { icon: 'settings', title: 'Održavanje', price: 'od 90 EUR/mesec' }
      ],
      groups,
      faq: faqData.map((f, i) => {
        const open = this.state.open === i;
        return { ...f, open, chev: open ? 'expand_less' : 'expand_more', toggle: () => this.setState({ open: open ? -1 : i }) };
      })
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
