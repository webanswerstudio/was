window.__DCC = (function () {
class Component_ extends DCLogic {
  state = { open: 0, mode: 'once' };
  renderVals() {
    const P = null;
    const cur = P ? (P[this.state.mode] || P.once) : {};
    const modes = [['once', 'Jednokratno'], ['r6', '6 rata'], ['r12', '12 rata']].map(([id, label]) => ({ label, bg: id === this.state.mode ? '#0c0f0f' : 'transparent', fg: id === this.state.mode ? '#ffffff' : '#4a5554', onClick: () => this.setState({ mode: id }) }));
    const F = [
      [
        "Koliko brzo SEO daje rezultate?",
        "Prvi signali obično stižu za tri do šest meseci, a stabilniji rezultati za šest do dvanaest meseci, zavisno od konkurencije."
      ],
      [
        "Da li garantujete prvo mesto na Google-u?",
        "Ne. Niko pošten ne može to da garantuje. Garantujemo jasan plan, transparentan rad i merljiv napredak."
      ],
      [
        "Šta je uključeno u SEO optimizaciju?",
        "Tehnički SEO, on-page optimizacija, lokalni SEO, sadržaj, praćenje rezultata i mesečni izveštaji, prema izabranom paketu."
      ],
      [
        "Da li SEO ima smisla za lokalni biznis?",
        "Ima, i to posebno. Lokalne pretrage imaju jasnu nameru i često se pretvaraju u poziv ili posetu."
      ],
      [
        "Da li optimizujete i za Bing?",
        "Da. Pored Google-a, povezujemo Bing Webmaster Tools i pratimo vidljivost i na Bing-u."
      ],
      [
        "Koliko košta SEO optimizacija?",
        "SEO audit je €250 jednokratno, a mesečni paket Prirodni rast je €450. Tačan predlog dobijate nakon analize sajta."
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
