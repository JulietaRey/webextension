class GoogleEngine extends SearchEngine {
  constructor() {
    super();
    this.config = {
      inputQuery: '[name=q]',
      divListClass: 'div[class=g]',
      linkResultClass: 'div.r>a',
      menuSelector: 'div#hdtb-msb'
    }
    this._name = 'google';
    this.external = ['bing', 'duck']
  }

  getUrl(query) {
    return `http://google.com/search?q=${query.replace(' ', '%20')}`;
  }

  getExternalResults(searchQuery) {
    const bing = new BingEngine();
    const duck = new DuckEngine();
    return Promise.all([bing.getOwnResults(searchQuery), duck.getOwnResults(searchQuery)])
  }
}