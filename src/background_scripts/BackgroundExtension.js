class BackgroundExtension extends AbstractP2PExtensionBackground {
  peers = [];
  searchEngine = new ResultGetter();
  currentTab = null;

  setPeers() {
    self = backgroundExt;
    try {
      let listaUsuarios = backgroundExt.getDataCallBack();
      self.peers = [];
      for (let i in listaUsuarios) {
        if (listaUsuarios.hasOwnProperty(i)) {
          self.peers.push(listaUsuarios[i]);
        }
      }
    } catch (e) {
      console.log("Error al cargar lista de usuarios");
      console.log(e);
    }
  }

  getExtensionName() {
    return "My Extension";
  }

  getExtensionId() {
    return "myextension@me";
  }

  isValidUrl(url) {
    if (url.includes("google") || url.includes("bing")) {
      return url.includes("search?");
    }
    return url.includes("duckduckgo.com/?q=");
  }

  loadPeerResponse(results) {
    browser.tabs.sendMessage(this.currentTab, {
      call: "updateBubble",
      args: {
        results,
      },
    });
  }

  askPeers({ searchText, searchEngine }) {
    try {
      this.sendRequest(
        {
          searchText,
          searchEngine,
          automatic: true,
          withoutcheck: true,
        },
        "All"
      );
    } catch (e) {
      console.error(e);
    }
  }

  async automaticProcessing(msg, peer) {
    const tempEngine = new ResultGetter();
    tempEngine.setCurrentEngine(msg.searchEngine);
    await tempEngine.getSearchResults(msg.searchText).then((results) => {
      this.sendResponse(
        {
          results,
          automatic: true,
          withoutcheck: true,
        },
        peer
      );
    });
  }

  receiveResponse(msg, peer) {
    browser.tabs.sendMessage(this.currentTab, {
      call: "peerAnswered",
      args: {
        results: msg.results,
        peer,
      },
    });
  }

  retrieveSearch({ searchText, searchEngine }) {
    this.searchEngine.setCurrentEngine(searchEngine);
    return this.searchEngine
      .getSearchResults(searchText)
      .then((results) => {
        browser.tabs.sendMessage(this.currentTab, {
          call: "showResultsInSearch",
          args: {
            results,
            peerCount: backgroundExt.peers.length,
          },
        });
        return Promise.resolve();
      })
      .catch(console.error);
  }

  handleLoadedPage(url) {
    if (this.isValidUrl(url)) {
      return this.getCurrentTab()
        .then((tabId) => {
          browser.tabs.sendMessage(tabId, {
            call: "setSearchEngine",
            args: {
              url,
            },
          });
          return Promise.resolve();
        })
        .catch(console.error);
    } else {
      return Promise.resolve();
    }
  }

  getCurrentTab() {
    return browser.tabs
      .query({
        active: true,
        currentWindow: true,
      })
      .then((tabs) => {
        this.currentTab = tabs[0].id;
        return this.currentTab;
      });
  }
}
