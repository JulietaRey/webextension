class SearchEngineFactory {
  constructor(url) {
    if (url.includes('google')) {
      return new GoogleEngine();
    } else if (url.includes('bing')) {
      return new BingEngine();
    } else if (url.includes('duck')) {
      return new DuckEngine();
    }
    return null;
  }
}