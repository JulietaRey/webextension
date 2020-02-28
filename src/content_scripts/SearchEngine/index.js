class SearchEngine {
  getName() {
    return this._name;
  }
  getSearchText() {
    return document.querySelectorAll(this._inputQuery)[0].value
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

    
    
    div.appendChild(this.createIcon(this._leftIcon, left));
    div.appendChild(this.createIcon(this._rightIcon, right)); 
    
    parentNode.appendChild(div);
  }

  addResults(results) {
    console.log("TCL: SearchEngine -> addResults -> results", results)
    const divList = document.querySelectorAll(this._divListClass);
    divList.forEach(parentNode => {
      const link = parentNode.querySelector(this._linkResultClass);
      if (link) {
        const left = results[0].findIndex(r => decodeURIComponent(r) === link.href);
        const right = results[1].findIndex(r => decodeURIComponent(r) === link.href);
        this.insertIcons(parentNode, left, right)
      }
    });
  }


}