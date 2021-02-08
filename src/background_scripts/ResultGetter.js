class ResultGetter {
  constructor() {
    this.resultList = [];
  }
  setCurrentEngine(engine) {
    this.currentEngine = new SearchEngineFactory(engine);
  }

  getSearchResults(searchQuery) {
    return this.currentEngine.getResults(searchQuery).then((results) => {
      this.resultList = results;
      return results;
    });
  }
}
