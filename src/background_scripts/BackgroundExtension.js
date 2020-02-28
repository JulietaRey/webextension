class BackgroundExtension {
  constructor() {
    this.enabled = false;
    this.searchEngine = null;
    this.currentTab = null;
  }

  toggleEnabled() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.resultGetter = new ResultGetter();
    }
  }

  isValidUrl(url) {
    if (url.includes('google') || url.includes('bing')) {
      return url.includes('search?');
    }
    return url.includes('duckduckgo.com/?q=')
  }

  retrieveSearch({ searchText, searchEngine }) {
    this.resultGetter.setCurrentEngine(searchEngine);
    return this.resultGetter.getSearchResults(searchText)
      .then(results => {
        browser.tabs.sendMessage(this.currentTab, {
          call: "showResultsInSearch",
          args: {
            results
          }
        });
        return Promise.resolve();
      })
      .catch(console.error)
  }

  handleLoadedPage(url) {
    if (this.enabled && this.isValidUrl(url)) {
      this.getCurrentTab()
        .then(tabId => {
          browser.tabs.sendMessage(tabId, {
            call: "setSearchEngine",
            args: {
              url
            }
          });
        })
        .catch(console.error)
    }
  }
  getCurrentTab() {
    return browser.tabs.query({
      active: true,
      currentWindow: true
    }).then(tabs => {
      this.currentTab = tabs[0].id
      return this.currentTab
    });
  }
}