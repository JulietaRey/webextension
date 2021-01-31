class ContentManager {
  constructor() {
    this.contentEngine = null;
    this.searchText = "";
    this.results = null;
    this.showList = false;
  }

  setSearchEngine({ url }) {
    this.contentEngine = new SearchEngineFactory(url);
    this.searchText = this.contentEngine.getSearchText();
    this.injectMashupButton();
    browser.runtime.sendMessage({
      call: "retrieveSearch",
      args: {
        searchText: this.searchText,
        searchEngine: this.contentEngine.getName(),
      },
    });
  }

  transformData(list) {
    return list.map((element) => new Result(element));
  }

  showResultsInSearch({ results: { own, external }, peerCount }) {
    this.results = {
      own: this.transformData(own),
      external: external.map(this.transformData),
    };
    this.contentEngine.addResults(this.results.external, peerCount);
  }

  buildResultList() {
    return this.results.own.map((ownResult, index) => [
      ownResult,
      ...this.results.external.map((externalResult) => externalResult[index]),
    ]);
  }

  appendLinks(parent, resultList) {
    return resultList.forEach((resultGroup, groupIndex) => {
      const group = document.createElement("div");
      group.style.display = "flex";
      group.style["flex-direction"] = "column";
      group.style["align-items"] = "flex-start";
      group.style["white-space"] = "pre-wrap";
      resultGroup.forEach((result) => {
        if (result) {
          const linkContainer = document.createElement("span");
          const linkToResult = document.createElement("a");
          linkToResult.innerText = ` ${result.title}`;
          linkToResult.href = result.link;
          linkToResult.target = "_blank";
          linkContainer.innerText = `${groupIndex + 1} - ${result.engine} =`;
          linkContainer.appendChild(linkToResult);
          group.appendChild(linkContainer);
        }
      });

      parent.appendChild(document.createElement("br"));
      parent.appendChild(group);
    });
  }

  injectResultMashup() {
    const resultList = this.buildResultList();
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "30px";
    container.style.right = 0;
    container.style.width = "500px";
    container.style.height = "400px";
    container.style["overflow-y"] = "scroll";
    container.style["overflow-x"] = "hidden";
    container.style["background-color"] = "white";
    container.style.padding = "20px";
    container.style.border = "1px solid black";

    this.appendLinks(container, resultList);

    document.querySelector("#mashup-button").appendChild(container);
  }

  injectMashupButton() {
    const buttonContainer = document.createElement("span");
    buttonContainer.id = "mashup-button";
    buttonContainer.style.position = "relative";
    buttonContainer.style["z-index"] = 200;
    const button = document.createElement("button");
    button.innerText = "Show Results";
    button.style.height = "100%";
    button.style.width = "140px";
    button.style["background-color"] = "pink";
    button.style.border = "1px solid red";
    button.onclick = () => {
      if (this.showList) {
        document.querySelector("#mashup-button>div").remove();
        this.showList = false;
      } else {
        this.injectResultMashup();
        this.showList = true;
      }
      const mashupButton = document.querySelector("#mashup-button>button");
      mashupButton.innerText = !this.showList ? "Show Results" : "Hide Results";
    };
    buttonContainer.appendChild(button);
    document
      .querySelector(this.contentEngine.getMenuSelector())
      .appendChild(buttonContainer);
  }
}
