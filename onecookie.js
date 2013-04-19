chrome.browserAction.onClicked.addListener(function(tab){
  syncCookies();
});

function syncCookies() {
  var onecookieData = [];//chrome.storage.sync.get('onecookie', function(cookies) {});
  var allSyncedCookies = [];//onecookieData['cookies'] || [];
  var allLocalCookies = chrome.cookies.getAll({}, function(cookies) {}) || [];
  var newLocalCookies = [];
  var newSyncCookies = [];
  
  for(i=0;i<allLocalCookies.length;i++)
    if(allSyncedCookies.indexOf(allLocalCookies[i]) == -1)
      newSyncCookies.push(allLocalCookies[i]);

  for(i=0;i<allSyncedCookies.length;i++)
    if(allLocalCookies.indexOf(allSyncedCookies[i]) == -1)
      newLocalCookies.push(allSyncedCookies[i]);

  chrome.storage.sync.set({'onecookie': {
      'cookies' : allSyncedCookies.concat(newSyncCookies)
      }
    }, function() {
      console.log('Settings saved');
  });

  for(i=0;i<newLocalCookies.length;i++)
    chrome.cookies.set(newLocalCookies[i]);
}

/*
chrome.cookies.onChanged.addListener(function(info) {
  console.log("onChanged" + JSON.stringify(info));
});
*/

