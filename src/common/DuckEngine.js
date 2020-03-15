class DuckEngine extends SearchEngine {
  constructor() {
    super();
    this.config = {
      inputQuery: 'input#search_form_input',
      divListClass: 'div.results>div.result',
      linkResultClass: 'div.results>div.result a.result__a',
      menuSelector: 'div.header--aside'
    }
    this._name = 'duck';
    this.external = ['google', 'bing']
  }


  getUrl(query) {
    return `https://duckduckgo.com/html/?q=${query.replace(' ', '+')}&t=h_`;
  }

  getExternalResults(searchQuery) {
    const bing = new BingEngine();
    const google = new GoogleEngine();
    return Promise.all([google.getOwnResults(searchQuery), bing.getOwnResults(searchQuery)])
  }
}
