class BingEngine extends SearchEngine {
  constructor() {
    super();
    this.config = {
      inputQuery: 'input#sb_form_q',
      divListClass: 'li.b_algo',
      linkResultClass: 'h2>a',
      menuSelector: 'div#b_tween'
    }
    this._name = 'bing';
    this.external = ['google', 'duck']
  }


  getUrl(query) {
    return `http://bing.com/search?q=${query.replace(' ', '%20')}`
  }

  getExternalResults(searchQuery) {
    const duck = new DuckEngine();
    const google = new GoogleEngine();
    return Promise.all([google.getOwnResults(searchQuery), duck.getOwnResults(searchQuery)])
  }
}