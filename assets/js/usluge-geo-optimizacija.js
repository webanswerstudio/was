window.__DCC = (function () {
class Component_ extends DCLogic {
  state = { open: 0 };
  renderVals() {
    const F = [
      ["Šta je GEO optimizacija?","GEO (Generative Engine Optimization) je optimizacija sadržaja tako da ga AI sistemi poput ChatGPT-a, Perplexity-ja, Claude-a i Google AI Overviews koriste i navode kao izvor u svojim odgovorima. Kod klasičnog SEO-a cilj je pozicija u listi linkova, a kod GEO-a da budete pomenuti u samom odgovoru. Kupac često ni ne otvori vaš sajt, ali čuje vaše ime kao preporuku."],
      ["Koliko košta GEO optimizacija u Srbiji?","GEO Audit košta €300 jednokratno i daje vam mapu gde vas AI trenutno pominje. Mesečni paket GEO rast je €450. Audit je dovoljan da vidite gde stojite, a mesečni rad vam treba ako želite da pomerite poziciju, jer se citiranost gradi kroz više izvora tokom više meseci."],
      ["Koliko traje da AI počne da nas citira?","Prve promene obično vidimo nakon nekoliko nedelja, najbrže kod Perplexity-ja jer pretražuje web u realnom vremenu. ChatGPT i Claude reaguju sporije jer se delom oslanjaju na starije podatke, a Google AI Overviews je negde između. Za ozbiljniju promenu citiranosti računajte na 3 do 6 meseci kontinuiranog rada."],
      ["Da li GEO zamenjuje SEO?","Ne. GEO se nadograđuje na SEO. AI sistemi biraju izvore iz onoga što je već dobro indeksirano i ima autoritet, pa ako niste vidljivi na Google-u, teško ćete biti citirani u ChatGPT-u. Ako nemate postavljen SEO, prvo radimo tu osnovu kroz SEO optimizaciju."],
      ["Kako se meri da li nas AI citira?","Kroz praćenje promptova. Definišemo realna pitanja koja bi vaš kupac postavio AI asistentu, redovno ih pokrećemo kroz ChatGPT, Perplexity i Google AI Overviews i beležimo da li se vaš brend pojavljuje, na kom mestu i u kom kontekstu. Saobraćaj iz AI odgovora se u Google Analytics-u vidi samo delimično, pa je ovo jedini pouzdan način merenja."],
      ["Za koje firme GEO ima smisla?","Ima smisla ako vaši kupci odluku donose kroz istraživanje: B2B usluge, softver, konsalting, pravo, zdravstvo, obrazovanje, skuplji proizvodi. Manje smisla ima ako se kupuje impulsivno, lokalno i po ceni, gde niko ne pita AI za savet. Ako procenimo da vam se GEO trenutno ne isplati, reći ćemo vam to posle Audita."],
      ["Da li se GEO radi drugačije za srpsko tržište?","Da, i to je bitna razlika. Na srpskom jeziku je konkurencija za citiranje znatno manja nego na engleskom, pa se rezultat postiže brže i jeftinije. Ali i izvora na srpskom ima manje, pa je još važnije da baš vaš sadržaj bude taj izvor. Firma iz Srbije danas može da postane citirani izvor u svojoj niši za nekoliko meseci."],
      ["Šta konkretno menjate na sajtu?","Prerađujemo sadržaj u format koji AI lako izvlači: pitanja kao podnaslovi, direktni odgovori u prva dva reda, konkretni brojevi i cene umesto uopštenih tvrdnji, tabele poređenja i FAQ sekcije sa FAQPage schema markup-om. Dodajemo Organization i Service schema, sređujemo interno linkovanje i gradimo pominjanja na drugim sajtovima koje AI čita. Sve izmene idu na vaše odobrenje pre objave."],
      ["Da li postoji ugovorna kazna?","Ne. Otkazivanje je mesec dana unapred, bez penala. Sve što smo napravili, sadržaj, schema i izveštaji, ostaje vama."]
    ];
    const faq = F.map((f, i) => {
      const open = this.state.open === i;
      return { q: f[0], a: f[1], open, chev: open ? 'remove' : 'add', bd: open ? '#9fd9d2' : '#e3ecea', toggle: () => this.setState({ open: open ? -1 : i }) };
    });
    return { faq };
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
