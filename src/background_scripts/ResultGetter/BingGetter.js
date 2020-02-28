class BingGetter extends MainGetter {
  constructor() {
    super();
    this.external = ['google', 'duck']
    this._linkSelector = 'h2>a';
  }

  getUrl(query) {
    return `http://bing.com/search?q=${query.replace(' ', '%20')}`
  }

  getExternalResults(searchQuery) {
    const duck = new DuckGetter();
    const google = new GoogleGetter();
    return Promise.all([google.getOwnResults(searchQuery), duck.getOwnResults(searchQuery)])
  }
}