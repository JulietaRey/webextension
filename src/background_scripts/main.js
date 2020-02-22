console.log('aaaaaaaaaaaa', browser);
browser.storage.local.get("config").then(data=> {
  console.log(data)
})