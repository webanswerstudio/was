window.__DCC = (function () {
class Component_ extends DCLogic {
  state = { open: 0, mode: 'once' };
  renderVals() {
    const P = {"once":{"p0":"€990","p1":"€1.990","unit":"","period":"Jednokratno plaćanje","note":"JEDNOKRATNO PLAĆANJE"},"r6":{"p0":"€182","p1":"€365","unit":"/mes","period":"6 mesečnih rata","note":"MESEČNO PLAĆANJE NA 6 RATA (+10%)"},"r12":{"p0":"€99","p1":"€199","unit":"/mes","period":"12 mesečnih rata","note":"MESEČNO PLAĆANJE NA 12 RATA (+20%)"}};
    const cur = P ? (P[this.state.mode] || P.once) : {};
    const modes = [['once', 'Jednokratno'], ['r6', '6 rata'], ['r12', '12 rata']].map(([id, label]) => ({ label, bg: id === this.state.mode ? '#0c0f0f' : 'transparent', fg: id === this.state.mode ? '#ffffff' : '#4a5554', onClick: () => this.setState({ mode: id }) }));
    const F = [
      [
        "Koja je razlika između Shopify i custom prodavnice?",
        "Shopify prodavnica koristi gotovu temu koju prilagođavamo vašem brendu i najbrže kreće sa prodajom. Custom prodavnica ima dizajn i funkcije u potpunosti po meri, uz bolje performanse i SEO."
      ],
      [
        "Koliko traje izrada online prodavnice?",
        "Shopify prodavnica je obično gotova za tri do četiri nedelje, a custom prodavnica za četiri do šest nedelja, zavisno od broja proizvoda i integracija."
      ],
      [
        "Koliko proizvoda mogu da dodam?",
        "Shopify paket uključuje postavljanje do 500 proizvoda, a custom paket do 1.000. Kasnije možete dodavati proizvode bez ograničenja."
      ],
      [
        "Da li mogu sam da menjam proizvode?",
        "Možete. Dobijate admin panel i kratku obuku za dodavanje proizvoda, cena, zaliha i akcija."
      ],
      [
        "Koji platni sistemi mogu da se povežu?",
        "Kartice, PayPal, uplata na račun, pouzeće i lokalni platni sistemi koje vaša banka podržava."
      ],
      [
        "Da li prodavnica radi sa Instagramom i Facebookom?",
        "Da. Povezujemo katalog proizvoda sa Instagram i Facebook prodavnicom i postavljamo pixel za praćenje."
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
