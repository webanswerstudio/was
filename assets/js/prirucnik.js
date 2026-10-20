window.__DCC = (function () {
// Linkovi ka prodaji — zameniti kad stignu
const LINKS = {
  starter: 'https://webanswer.gumroad.com/l/google-starter-pack-i-izrada-sajta-uz-AI',
  techseo: 'https://webanswer.gumroad.com/l/tech-seo-audit-za-60-minuta',
  geo: 'https://webanswer.gumroad.com/l/vodic-za-vidljivost-brenda-u-ai-odgovorima',
  paket: 'https://webanswer.gumroad.com/l/od-nule-do-vidljivosti'
};

class Component extends DCLogic {
  state = { navOpen: false };
  renderVals() {
    return {
      navOpen: this.state.navOpen,
      navIn: () => this.setState({ navOpen: true }),
      navOut: () => this.setState({ navOpen: false }),
      showOld: this.props.showOldPrice ?? true,
      bundleLink: LINKS.paket,
      guides: [
        { n: '1', kicker: 'OD DIZAJNA DO GOOGLE-A', title: 'Google Starter Pack', desc: 'Napravite sajt uz AI i povežite ga sa Google alatima za jedno popodne.', tags: ['Search Console', 'Tag Manager', 'Analytics 4', 'Business Profile', 'Google Ads'], price: '19', cover: 'assets/prirucnik/google-starter-pack-760.png', link: LINKS.starter },
        { n: '2', kicker: 'TEHNIČKI SEO', title: 'Tech SEO audit za 60 minuta', desc: 'Pronađite šta vas koči na Google-u i popravite pravim redom.', tags: ['41 provera', '6 oblasti', 'Matrica uticaj × napor'], price: '19', cover: 'assets/prirucnik/tech-seo-audit-760.png', link: LINKS.techseo },
        { n: '3', kicker: 'GEO OPTIMIZACIJA', title: 'Vidljivost brenda u AI odgovorima', desc: 'Postanite brend koji preporučuju Google i AI asistenti.', tags: ['ChatGPT', 'Gemini', 'AI Overviews', 'Schema'], price: '29', cover: 'assets/prirucnik/brend-vidljivost-ai-760.png', link: LINKS.geo }
      ],
      freeTags: ['Search Console', 'Tag Manager', 'Analytics 4', 'Business profil', 'AI pretraga']
    };
  }
}
return Component;
})();
