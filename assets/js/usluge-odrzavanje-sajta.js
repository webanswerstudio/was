window.__DCC = (function () {
class Component_ extends DCLogic {
  state = { open: 0, mode: 'm' };
  renderVals() {
    const P = { m: { p0: '€90', p1: '€140', unit: '/mes', y0: 'Mesečno plaćanje', y1: 'Mesečno plaćanje', note: 'MESEČNO PLAĆANJE' }, y: { p0: '€76,50', p1: '€119', unit: '/mes', y0: '€918 godišnje', y1: '€1.428 godišnje', note: 'GODIŠNJE PLAĆANJE (−15%)' } };
    const cur = P[this.state.mode] || P.m;
    const modes = [['m', 'Mesečno', false], ['y', 'Godišnje', true]].map(([id, label, badge]) => ({ label, badge, bg: id === this.state.mode ? '#0c0f0f' : 'transparent', fg: id === this.state.mode ? '#ffffff' : '#4a5554', onClick: () => this.setState({ mode: id }) }));
    const F = [
      [
        "Zašto mi treba održavanje sajta?",
        "Zato što se tehnologija, sigurnosni rizici i sadržaj stalno menjaju. Redovno održavanje sprečava kvarove, gubitak podataka i pad na Google-u."
      ],
      [
        "Da li održavate sajtove koje niste vi pravili?",
        "Da. Prvo uradimo početnu proveru, pa predložimo paket koji odgovara stanju sajta."
      ],
      [
        "Šta ako sajt prestane da radi?",
        "Reagujemo po prioritetu iz paketa i vraćamo sajt iz poslednje rezervne kopije ako je potrebno."
      ],
      [
        "Da li hosting ulazi u cenu održavanja?",
        "Ne. Hosting se plaća posebno, a mi vam pomažemo da izaberete pouzdan plan i preuzimamo tehničku brigu o njemu."
      ],
      [
        "Da li mogu da otkažem održavanje?",
        "Možete, uz otkaz 30 dana unapred i bez dugoročne obaveze. Paket možete i promeniti svakog meseca. Svi pristupi i podaci ostaju vaši."
      ],
      [
        "Šta nije uključeno u održavanje?",
        "Nove stranice, redizajn i veće funkcionalnosti nisu deo održavanja. Za njih dobijate posebnu ponudu."
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
