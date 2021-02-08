class SearchEngine {
  getName() {
    return this._name;
  }
  getSearchText() {
    return document.querySelectorAll(this.config.inputQuery)[0].value;
  }

  getMenuSelector() {
    return this.config.menuSelector;
  }

  createIcon(type, value) {
    const container = document.createElement("div");
    container.style.width = "30px";
    container.style.height = "30px";
    container.style.position = "relative";

    const icon = document.createElement("img");
    icon.style.width = "30px";
    icon.style.height = "30px";
    icon.src = browser.runtime.getURL(`images/${type}.png`);
    icon.style.opacity = 0.7;

    const span = document.createElement("span");
    span.style.position = "absolute";
    span.style.bottom = 0;
    span.style.right = 0;
    span.style["border-radius"] = "50%";
    span.style.padding = "2px";
    span.style["font-weight"] = "bold";
    span.style.background = "#ffffffad";

    span.innerText = value === -1 ? "-" : value + 1;
    container.appendChild(icon);
    container.appendChild(span);
    return container;
  }

  insertIcons(parentNode, left, right, order) {
    parentNode.style.position = "relative";
    const div = document.createElement("div");
    div.style.height = "30px";
    div.style.right = 0;
    div.style.top = 0;
    div.style.display = "grid";
    div.style["grid-template-columns"] = "1fr 1fr 1fr";
    div.style.position = "absolute";

    div.appendChild(this.createIcon(this.external[0], left));
    div.appendChild(this.createIcon(this.external[1], right));
    const bubble = document.createElement("div");
    bubble.id = `bubble-${order}`;
    bubble.className = `bubbles`;
    bubble.style["border"] = "2px solid black";
    bubble.style["border-radius"] = "50%";
    bubble.style.padding = "10px 4px";
    bubble.style["font-size"] = "12px";
    bubble.innerText = `0 de 0`;
    div.appendChild(bubble);
    parentNode.appendChild(div);
  }

  addResults(results) {
    const divList = document.querySelectorAll(this.config.divListClass);
    divList.forEach((parentNode, index) => {
      const link = parentNode.querySelector(this.config.linkResultClass);

      if (link) {
        const left = results[0].findIndex(
          (r) => decodeURIComponent(r.link) === link.href
        );
        const right = results[1].findIndex(
          (r) => decodeURIComponent(r.link) === link.href
        );
        this.insertIcons(parentNode, left, right, index);
      }
    });
  }

  getResults(searchQuery) {
    return Promise.all([
      this.getExternalResults(searchQuery),
      this.getOwnResults(searchQuery),
    ]).then(([external, own]) => ({
      external,
      own,
    }));
  }

  getOwnResults(query) {
    return fetch(this.getUrl(query))
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const links = [];
        doc.querySelectorAll(this.config.linkResultClass).forEach((a) => {
          links.push({
            title: this.getInnerText(a),
            link: a.href,
            engine: this._name,
          });
        });
        return links;
      });
  }

  getInnerText(a) {
    return a.innerText;
  }

  getExternalResults() {
    console.log("Subclass should implement");
  }
}
