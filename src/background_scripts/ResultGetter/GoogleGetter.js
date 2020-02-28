class GoogleGetter extends MainGetter {
  constructor() {
    super();
    this.external = ['bing', 'duck']
    this._linkSelector = 'div.r>a';
  }

  getUrl(query) {
    return `http://google.com/search?q=${query.replace(' ', '%20')}`;
  }

  getExternalResults(searchQuery) {
    const bing = new BingGetter();
    const duck = new DuckGetter();
    return Promise.all([bing.getOwnResults(searchQuery), duck.getOwnResults(searchQuery)])
  }
}