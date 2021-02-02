class BackgroundExtension extends AbstractP2PExtensionBackground {
  peers = [];

  constructor() {
    super();
    this.searchEngine = new ResultGetter();
    this.mockResponses = new PeerResultsChecker();
    this.currentTab = null;
  }

  setPeers() {
    let peers;
    try {
      let listaUsuarios = backgroundExt.getDataCallBack();
      console.log("Usuarios peers");
      console.log(listaUsuarios);
      peers = [];
      for (let i in listaUsuarios) {
        if (listaUsuarios.hasOwnProperty(i)) {
          peers.push(listaUsuarios[i]);
        }
      }
      backgroundExt.peers = peers;
    } catch (e) {
      console.log("Error al cargar lista de usuarios");
      console.log(e);
    }
  }

  getExtensionName() {
    return "My Extension";
  }

  getExtensionId() {
    return "webextension@info";
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

  askPeers(searchText, searchEngine) {
    console.log("asking peers");
    try {
      this.sendRequest(
        {
          keywords: {
            searchText,
            searchEngine,
          },
          automatic: true,
          withoutcheck: true,
        },
        "All"
      );
    } catch (e) {
      console.error(e);
    }
  }

  async answerPeer(msg, peer) {
    console.log("Request de peer recibido");
    console.log(msg, peer);
    // this.searchEngine.setCurrentEngine(msg.searchEngine);
    // this.searchEngine.getSearchResults(msg.searchText).then((results) => {
    //   console.log("Responsiendo a peer", results);
    //   this.sendResponse(
    //     {
    //       something: "llaa",
    //       automatic: true,
    //       withoutcheck: true,
    //     },
    //     peer
    //   );
    //   console.log("response enviada!");
    // });
  }

  retrieveSearch({ searchText, searchEngine }) {
    this.searchEngine.setCurrentEngine(searchEngine);
    this.askPeers(searchText, searchEngine);
    return this.searchEngine
      .getSearchResults(searchText)
      .then((results) => {
        console.log(this.peers);
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
