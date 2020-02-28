class ContentManager {
  constructor() {
    this.engine = null;
    this.searchText = '';
  }

  setSearchEngine({ url }) {
    this.engine = new SearchEngineFactory(url);
    this.searchText = this.engine.getSearchText()
    browser.runtime.sendMessage({
      call: 'retrieveSearch',
      args: {
        searchText: this.searchText,
        searchEngine: this.engine.getName()
      }
    })
  }

  showResultsInSearch({results}) {
    this.engine.addResults(results);
  }

}