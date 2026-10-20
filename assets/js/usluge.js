window.__DCC = (function () {
class Component_ extends DCLogic {
  state = { step: 0 };
  componentDidMount() { this.t1 = setInterval(() => this.setState(s => ({ step: (s.step + 1) % 3 })), 2600); }
  componentWillUnmount() { clearInterval(this.t1); }
  renderVals() {
    const step = this.state.step;
    const processData = [
      { num: '01', icon: 'query_stats', title: 'Analiza cilja', text: 'Merimo brzinu i SEO, razumemo šta prodajete i šta posetilac treba da uradi.' },
      { num: '02', icon: 'design_services', title: 'Dizajn i razvoj', text: 'Planiramo strukturu, dizajn, razvoj, forme i osnovno praćenje.' },
      { num: '03', icon: 'rocket_launch', title: 'Lansiranje i podrška', text: 'Objavljujemo sajt, proveravamo brzinu i tokove i ostajemo dostupni.' }
    ];
    const process = processData.map((s, i) => {
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
    const vals = {
      showGrid: this.props.showGrid ?? true,
      process, lineW: step * 50 + '%',
      services_: [
        { icon: 'brush', href: 'usluge-izrada-sajtova', price: 'Od 350 EUR', title: 'Izrada sajtova', text: 'Brzi, moderni sajtovi koji jasno objašnjavaju ponudu i pretvaraju posete u upite.', features: ['Konverziona struktura', 'Responsive dizajn', 'Kontakt forme', 'SEO osnova'] },
        { icon: 'travel_explore', href: 'usluge-seo-optimizacija', price: 'Od 250 EUR', title: 'SEO optimizacija', text: 'Tehnička i sadržajna SEO optimizacija za bolju vidljivost i više organskih poseta.', features: ['Tehnički SEO', 'Ključne reči', 'Lokalni SEO', 'Izveštaji'] },
        { icon: 'auto_awesome', href: 'usluge-geo-optimizacija', price: 'Od 300 EUR', title: 'AI optimizacija (GEO)', text: 'Optimizacija za AI pretragu da vas ChatGPT, Gemini i Google AI Overviews citiraju kao izvor.', features: ['Strukturisani podaci', 'Sadržaj za AI odgovore', 'Praćenje AI pominjanja', 'Entitet brenda'] },
        { icon: 'shopping_bag', href: 'usluge-online-prodavnice', price: 'Od 990 EUR', title: 'Online prodavnice', text: 'Stabilne prodavnice sa jasnim tokom kupovine, plaćanjem, dostavom i upravljanjem porudžbinama.', features: ['Shopify ili custom rešenje', 'Plaćanje i dostava', 'Upravljanje proizvodima', 'Email obaveštenja'] },
        { icon: 'settings', href: 'usluge-odrzavanje-sajta', price: 'Od 90 EUR/mesec', title: 'Održavanje sajta', text: 'Tehnička podrška, bezbednost, izmene sadržaja i monitoring, da sajt radi bez stresa.', features: ['Backup', 'Bezbednost', 'Sitne izmene', 'Monitoring'] }
      ]
    };
    const by = t => vals.services_.find(x => x.title === t);
    vals.servicesTop = [by('Izrada sajtova'), by('Online prodavnice')];
    vals.servicesBottom = [by('SEO optimizacija'), by('AI optimizacija (GEO)'), by('Održavanje sajta')];
    return vals;
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
