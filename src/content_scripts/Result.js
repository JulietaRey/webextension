class Result {
  constructor(data) {
    this._title = data.title;
    this._link = data.link;
    this._engine = data.engine;
    this._positions = [];
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
    this._title = newTitle;
  }
  set link(newLink) {
    this._link = newLink;
  }
  set engine(newEngine) {
    this._engine = newEngine;
  }

  addPosition(position) {
    const existing = this._positions.findIndex((pos) => pos.value === position);
    if (existing !== -1) {
      this._positions[existing].count++;
    } else {
      this._positions = [
        ...this._positions,
        {
          value: position,
          count: 1,
        },
      ];
    }
  }

  getMedian() {
    if (!this._positions.length) {
      return false;
    }
    return this._positions.reduce(
      (res, actual) => {
        if (actual.count >= res.count) {
          return actual;
        }
        return res;
      },
      {
        count: 0,
      }
    );
  }
}
