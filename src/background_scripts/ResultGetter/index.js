class ResultGetter {
  setCurrentEngine(engine) {
    switch (engine) {
      case 'google':
        this.currentEngine = new GoogleGetter();
        break;
      case 'bing':
        this.currentEngine = new BingGetter();
      break;
      case 'duck':
        this.currentEngine = new DuckGetter();
        break;
      default:
        this.currentEngine = null;
        break;
    }
  }

  getSearchResults(searchQuery) {
    return this.currentEngine.getResults(searchQuery);
  }
}