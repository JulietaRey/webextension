const contentManager = new ContentManager();

browser.runtime.onMessage.addListener((req, sender) => {
  console.log('[content script]', req.call);
  if (contentManager[req.call]) {
    contentManager[req.call](req.args);
  }
})