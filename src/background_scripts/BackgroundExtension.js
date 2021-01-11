class BackgroundExtension {
  constructor() {
    this.searchEngine = new ResultGetter();
    this.mockResponses = new PeerResultsChecker();
    this.currentTab = null;
  }

  isValidUrl(url) {
    if (url.includes('google') || url.includes('bing')) {
      return url.includes('search?');
    }
    return url.includes('duckduckgo.com/?q=')
  }

  loadPeerResponse() {
    browser.tabs.sendMessage(this.currentTab, {
      call: ''
    })
  }

  retrieveSearch({ searchText, searchEngine }) {
    this.searchEngine.setCurrentEngine(searchEngine);
    this.mockResponses.triggerSearch(this.loadPeerResponse);
    return this.searchEngine.getSearchResults(searchText)
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
    if (this.isValidUrl(url)) {
      return this.getCurrentTab()
        .then(tabId => {
          browser.tabs.sendMessage(tabId, {
            call: "setSearchEngine",
            args: {
              url
            }
          });
          return Promise.resolve();
        })
        .catch(console.error)
    } else {
      return Promise.resolve();
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