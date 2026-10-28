window.__DCC = (function () {
class Component extends DCLogic {
  state = { navOpen: false, lang: 'sr' };
  componentDidMount() { if (typeof location !== 'undefined' && location.hash === '#international') this.setState({ lang: 'en' }); }
  renderVals() {
    const en = this.state.lang === 'en';
    return {
      navOpen: this.state.navOpen, navIn: () => this.setState({ navOpen: true }), navOut: () => this.setState({ navOpen: false }),
      isEn: en, isSr: !en,
      setSr: () => this.setState({ lang: 'sr' }), setEn: () => this.setState({ lang: 'en' }),
      srBg: en ? 'transparent' : '#0c0f0f', srFg: en ? '#4a5554' : '#ffffff',
      enBg: en ? '#0c0f0f' : 'transparent', enFg: en ? '#2cc4b6' : '#4a5554'
    };
  }
}
return Component;
})();
