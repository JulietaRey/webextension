const startBackground = () => {
  console.log('Starting background... ')
  const backgroundExt = new BackgroundExtension();
  browser.browserAction.onClicked.addListener(async () => {
    backgroundExt.toggleEnabled();
  })
  browser.webNavigation.onCompleted.addListener(async ({ url }) => {
    backgroundExt.handleLoadedPage(url)
  })

  browser.runtime.onMessage.addListener((req, sender) => {
    console.log("[background-side] calling the message: " + req.call);
    if (backgroundExt[req.call]) {
      return backgroundExt[req.call](req.args);
    }
  });
}

startBackground();