class PeerResultsChecker {
  peerResponses = [];
  totalPeers = Math.floor(Math.random() * (10 - 2) + 2);
  triggerSearch(expectedResults, callback) {
    this.peerResponses = [];
    for (let i = 0; i < this.totalPeers; i++) {
      let randomDelay = Math.floor(Math.random() * (6000 - 300) + 300);
      setTimeout(() => {
        this.peerResponses[i] = {
          finished: true,
          found: randomDelay % 2 === 0,
        };
        callback({
          found: this.getFoundCount(),
          completed: this.getCompletedCount(),
        });
        console.log(this.getFoundCount(), "of", this.getCompletedCount());
      }, randomDelay);
    }
  }
  clearSearch() {
    this.peerResponses = [];
  }

  getCompletedCount() {
    return this.peerResponses.reduce(
      (tot, current) => (current.finished ? tot + 1 : tot),
      0
    );
  }
  getFoundCount() {
    return this.peerResponses.reduce(
      (tot, current) => (current.found ? tot + 1 : tot),
      0
    );
  }
}
