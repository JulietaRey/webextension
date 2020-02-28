class DuckGetter extends MainGetter {
  constructor() {
    super();
    this.external = ['google', 'bing']
    this._linkSelector = 'a.result__a';
  }

  getUrl(query) {
    return `https://duckduckgo.com/html/?q=${query.replace(' ', '+')}&t=h_`;
  }

  getExternalResults(searchQuery) {
    const bing = new BingGetter();
    const google = new GoogleGetter();
    return Promise.all([google.getOwnResults(searchQuery), bing.getOwnResults(searchQuery)])
  }
}