var backgroundExt;

const startBackground = async () => {
  console.log("Starting background... ");
  backgroundExt = new BackgroundExtension();
  backgroundExt.connect();
  await backgroundExt.getPeers(backgroundExt.setPeers);
  browser.webNavigation.onCompleted.addListener(async ({ url }) => {
    backgroundExt.handleLoadedPage(url);
  });

  browser.runtime.onMessage.addListener((req, sender) => {
    console.log("[background-side] calling the message: " + req.call);
    if (backgroundExt[req.call]) {
      return backgroundExt[req.call](req.args);
    }
  });
};

startBackground();
