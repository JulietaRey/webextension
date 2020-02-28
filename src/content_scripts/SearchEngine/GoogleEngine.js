class GoogleEngine extends SearchEngine {
  constructor() {
    super();
    this._name = 'google';
    this._inputQuery = '[name=q]';
    this._divListClass = 'div[class=g]';
    this._linkResultClass = 'div.r>a';
    this._leftIcon = 'bing';
    this._rightIcon = 'duck';
  }

}