window.__DCC = (function () {
class Component extends DCLogic {
  state = { navOpen: false };
  renderVals() {
    return { navOpen: this.state.navOpen, navIn: () => this.setState({ navOpen: true }), navOut: () => this.setState({ navOpen: false }) };
  }
}
return Component;
})();
