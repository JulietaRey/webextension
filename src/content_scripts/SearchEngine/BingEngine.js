class BingEngine extends SearchEngine {
  constructor() {
    super();
    this._name = 'bing';
    this._inputQuery = 'input#sb_form_q';
    this._divListClass = 'li.b_algo';
    this._linkResultClass = 'h2>a';
    this._leftIcon = 'google';
    this._rightIcon = 'duck';
  }
}