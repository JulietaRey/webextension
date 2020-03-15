class SearchEngine {
  getName() {
    return this._name;
  }
  getSearchText() {
    return document.querySelectorAll(this.config.inputQuery)[0].value
  }

  getMenuSelector() {
    return this.config.menuSelector;
  }

  createIcon(type, value) {
    const container = document.createElement('div');
    container.style.width = '30px';
    container.style.height = '30px';
    container.style.position = 'relative';

    const icon = document.createElement('img');
    icon.style.width = '30px';
    icon.style.height = '30px';
    icon.src = browser.runtime.getURL(`images/${type}.png`);
    icon.style.opacity = 0.7;

    const span = document.createElement('span');
    span.style.position = 'absolute';
    span.style.bottom = 0;
    span.style.right = 0;
    span.style['border-radius'] = '50%';
    span.style.padding = '2px';
    span.style['font-weight'] = 'bold';
    span.style.background = '#ffffffad';

    span.innerText = value === - 1 ? '-' : value + 1;
    container.appendChild(icon);
    container.appendChild(span);
    return container;
  }

  insertIcons(parentNode, left, right) {
    parentNode.style.position = 'relative';
    const div = document.createElement('div');
    div.style.width = '60px';
    div.style.height = '30px';
    div.style.right = 0;
    div.style.top = 0;
    div.style.display = 'flex';
    div.style.position = "absolute";



    div.appendChild(this.createIcon(this.external[0], left));
    div.appendChild(this.createIcon(this.external[1], right));

    parentNode.appendChild(div);
  }

  addResults(results) {
    const divList = document.querySelectorAll(this.config.divListClass);
    divList.forEach(parentNode => {
      const link = parentNode.querySelector(this.config.linkResultClass);
      if (link) {
        const left = results[0].findIndex(r => decodeURIComponent(r.link) === link.href);
        const right = results[1].findIndex(r => decodeURIComponent(r.link) === link.href);
        this.insertIcons(parentNode, left, right)
      }
    });
  }


  getResults(searchQuery) {
    return Promise.all([this.getExternalResults(searchQuery), this.getOwnResults(searchQuery)])
      .then(([external, own]) => ({
        external, own
      }));
  }

  getOwnResults(query) {
    return fetch(this.getUrl(query))
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = [];
        doc.querySelectorAll(this.config.linkResultClass).forEach(a => links.push({ title: a.innerText, link: a.href, engine: this._name }));
        return links;
      });
  }

  getExternalResults() {
    console.log('Subclass should implement')
  }
}