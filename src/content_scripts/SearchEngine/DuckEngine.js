class DuckEngine extends SearchEngine {
  constructor() {
    super();
    this._name = 'duck';
    this._inputQuery = 'input#search_form_input';
    this._divListClass = 'div.results>div.result';
    this._linkResultClass = 'div.results>div.result a.result__a';
    this._leftIcon = 'google';
    this._rightIcon = 'bing';
  }
}
