class MainGetter {
  getResults(searchQuery) {
    return this.getExternalResults(searchQuery);
  }

  getOwnResults(query) {
    return fetch(this.getUrl(query))
      .then(response => {
        return response.text();
      }).then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = []
        doc.querySelectorAll(this._linkSelector).forEach(a => links.push(a.href));
        return links
      });
  }

  getExternalResults() {
    console.log('Subclass should implement')
  }

}