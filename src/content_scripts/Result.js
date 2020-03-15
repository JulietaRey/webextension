class Result {
  constructor(data) {
    this._title = data.title;
    this._link = data.link;
    this._engine = data.engine;

  }

  get title() {
    return this._title;
  }

  get link() {
    return this._link;
  }
  get engine() {
    return this._engine;
  }

  set title(newTitle) {
    this._title = newTitle
  }
  set link(newLink) {
    this._link = newLink
  }
  set engine(newEngine) {
    this._engine = newEngine
  }


}