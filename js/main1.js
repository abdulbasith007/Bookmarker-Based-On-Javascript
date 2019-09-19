console.log("HI");
document.getElementById("myForm").addEventListener("submit", saveBkmrk);
function saveBkmrk(e) {
    //console.log("FUN");
    var sname = document.getElementById("siteName").value;
    var surl = document.getElementById("siteUrl").value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }
    var b = { name: sname, url: surl };

    if (localStorage.getItem("Bookmarks") === null) {
        bkmrks = [];
        bkmrks.push(b);
        localStorage.setItem("Bookmarks", JSON.stringify(bkmrks));
        console.log("1st time");
    }
    else {
        console.log("2nd time");
        var bkmrks = JSON.parse(localStorage.getItem("Bookmarks"));
        bkmrks.push(b);
        localStorage.setItem("Bookmarks", JSON.stringify(bkmrks));
    }
    document.getElementById('myForm').reset();         //clear the text

    // Re-fetch bookmarks
    fetchBookmarks();

    e.preventDefault();
}
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}
function fetchBookmarks() {
    var bkmrks = JSON.parse(localStorage.getItem("Bookmarks"));
    for (i = 0; i < bkmrks.length; i++) {
        name = bkmrks[i].name;
        url = bkmrks[i].url;
        //console.log(name);
        //console.log(addhttp(url));
        //document.getElementById("bookmarksResults").innerHTML += '<div class="well"> <h1>' + name + '<a class="btn btn-default" target="_blank" href="' + addhttp(url) + '">Open</a><a onclick="del(url)" class="btn btn-danger" href="#">Delete</a></h1></div>';
        document.getElementById("bookmarksResults").innerHTML += '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-default" target="_blank" href="' + addhttp(url) + '">Visit</a> ' +
            ' <a onclick="del(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
            '</h3>' +
            '</div>';
    }
}
function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}
function del(url) {
    console.log(url);
    var bkmrks = JSON.parse(localStorage.getItem("Bookmarks"));

    for (i = 0; i < bkmrks.length; i++) {
        if (bkmrks[i].url == url)
            bkmrks.splice(i, 1);
    }
    localStorage.setItem("Bookmarks", JSON.stringify(bkmrks));
    fetchBookmarks();
}