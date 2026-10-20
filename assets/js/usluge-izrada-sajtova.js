window.__DCC = (function () {
class Component_ extends DCLogic {
  state = { open: 0, mode: 'once' };
  renderVals() {
    const P = {"once":{"p0":"€350","p1":"€450","p2":"€1.200+","unit":"","period":"Jednokratno plaćanje","note":"JEDNOKRATNO PLAĆANJE"},"r6":{"p0":"€64","p1":"€83","p2":"€220","unit":"/mes","period":"6 mesečnih rata","note":"MESEČNO PLAĆANJE NA 6 RATA (+10%)"},"r12":{"p0":"€35","p1":"€45","p2":"€120","unit":"/mes","period":"12 mesečnih rata","note":"MESEČNO PLAĆANJE NA 12 RATA (+20%)"}};
    const cur = P ? (P[this.state.mode] || P.once) : {};
    const modes = [['once', 'Jednokratno'], ['r6', '6 rata'], ['r12', '12 rata']].map(([id, label]) => ({ label, bg: id === this.state.mode ? '#0c0f0f' : 'transparent', fg: id === this.state.mode ? '#ffffff' : '#4a5554', onClick: () => this.setState({ mode: id }) }));
    const F = [
      [
        "Koliko traje izrada web sajta?",
        "Starter sajt je gotov za nedelju dana, Biznis za oko 10 dana, a rok za Premium zavisi od obima i funkcionalnosti."
      ],
      [
        "Šta je uključeno u cenu izrade?",
        "Dizajn, razvoj, SEO osnova, Google Search Console i Bing integracija, kontakt forme i revizije prema paketu. Domen i hosting nisu uključeni."
      ],
      [
        "Da li su sajtovi prilagođeni mobilnim uređajima?",
        "Da. Svaki sajt dizajniramo i testiramo za telefon, tablet i računar."
      ],
      [
        "Da li mogu sam da ažuriram sadržaj?",
        "Možete. Dobijate jednostavan pristup za izmenu tekstova i slika, a Premium paket ima prilagođen CMS sistem."
      ],
      [
        "Da li je SEO uključen?",
        "Jeste. Svaki paket ima tehničku SEO osnovu, a Biznis i Premium dobijaju i naprednu SEO strategiju."
      ],
      [
        "Da li mogu da platim na rate?",
        "Možete, na 6 ili 12 mesečnih rata, bez avansa."
      ]
    ];
    const faq = F.map((f, i) => {
      const open = this.state.open === i;
      return { q: f[0], a: f[1], open, chev: open ? 'remove' : 'add', bd: open ? '#9fd9d2' : '#e3ecea', toggle: () => this.setState({ open: open ? -1 : i }) };
    });
    return { ...cur, modes, faq };
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
