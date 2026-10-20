window.__DCC = (function () {
class Component_ extends DCLogic {
  state = { name: '', firma: '', email: '', tel: '', opis: '', usluge: [], budzet: '', izvor: '', status: 'idle', err: '' };
  renderVals() {
    // Web3Forms access key (registracija sa webanswerstudio@gmail.com na web3forms.com)
    const KEY = '51e5be71-4bed-474a-81b7-f7a42254f50f';
    const S = this.state;
    const on = k => e => this.setState({ [k]: e.target.value, err: '' });
    const look = a => ({ bg: a ? '#0c0f0f' : '#ffffff', fg: a ? '#ffffff' : '#2b3433', bd: a ? '#0c0f0f' : '#dbe5e3' });
    const multi = ['Izrada sajta', 'Online prodavnica', 'SEO optimizacija', 'GEO (AI) optimizacija', 'Održavanje sajta', 'Nešto drugo'].map(l => { const a = S.usluge.includes(l); return { label: l, ...look(a), onClick: () => this.setState({ usluge: a ? S.usluge.filter(x => x !== l) : [...S.usluge, l] }) }; });
    const single = (list, k) => list.map(l => { const a = S[k] === l; return { label: l, ...look(a), onClick: () => this.setState({ [k]: a ? '' : l }) }; });
    const submit = async e => {
      e.preventDefault();
      if (!S.name.trim() || !/^\S+@\S+\.\S+$/.test(S.email.trim())) return this.setState({ err: 'Unesite ime i ispravnu email adresu.' });
      if (!KEY) return this.setState({ err: 'Forma još nije povezana sa mejlom. Pišite nam direktno na webanswerstudio@gmail.com.' });
      this.setState({ status: 'sending', err: '' });
      try {
        const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ access_key: KEY, subject: 'Novi upit sa sajta: ' + S.name, from_name: 'webanswerstudio.com', replyto: S.email, ime: S.name, firma: S.firma, email: S.email, telefon: S.tel, usluge: S.usluge.join(', '), budzet: S.budzet, opis: S.opis, izvor: S.izvor }) });
        const j = await r.json();
        this.setState(j.success ? { status: 'sent' } : { status: 'idle', err: 'Slanje nije uspelo. Pišite nam direktno na webanswerstudio@gmail.com.' });
      } catch (x) {
        this.setState({ status: 'idle', err: 'Slanje nije uspelo. Pišite nam direktno na webanswerstudio@gmail.com.' });
      }
    };
    return {
      name: S.name, firma: S.firma, email: S.email, tel: S.tel, opis: S.opis, err: S.err, hasErr: !!S.err,
      on_name: on('name'), on_firma: on('firma'), on_email: on('email'), on_tel: on('tel'), on_opis: on('opis'),
      usluge: multi,
      budzeti: single(['Do €500', '€500–1.000', '€1.000–2.000', '€2.000+', 'Mesečno €90–450', 'Ne znam još'], 'budzet'),
      izvori: single(['Google pretraga', 'AI asistent (ChatGPT i sl.)', 'Preporuka', 'Instagram', 'Drugo'], 'izvor'),
      sent: S.status === 'sent', notSent: S.status !== 'sent', btnLabel: S.status === 'sending' ? 'Šaljem…' : 'Pošalji upit',
      submit, reset: () => this.setState({ name: '', firma: '', email: '', tel: '', opis: '', usluge: [], budzet: '', izvor: '', status: 'idle', err: '' })
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
