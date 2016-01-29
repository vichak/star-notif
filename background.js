/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
 
function callAjax(url, callback){
    
}
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: { width: 620, height: 500 }
  });
  // https://developer.chrome.com/apps/alarms#method-create
  chrome.alarms.create('remindme', {delayInMinutes: 0.1, periodInMinutes: 0.1});
});
chrome.alarms.onAlarm.addListener(function( alarm ) {
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var next = JSON.parse(xmlhttp.responseText)['records'][0]['fields']['departtheorique'];
            var bus = new Date(next).getTime();
            var now = new Date().getTime();
            var diffMs = Math.floor((bus - now)/1000/60); 
            chrome.notifications.create('reminder', {
                type: 'basic',
                iconUrl: 'star.jpg',
                title: 'Prochain bus 41 à l\'arrêt Patis Tatelin',
                message: 'dans ' + diffMs + ' minutes '
            }, function(notificationId) {});
        }
    }
    var url = 'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-bus-circulation-passages-tr&facet=idligne&facet=nomcourtligne&facet=sens&facet=destination&facet=precision&facet=idarret&refine.idligne=0041&refine.idarret=1530';
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
     
});