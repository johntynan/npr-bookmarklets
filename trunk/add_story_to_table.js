var story_table = new Array(null);
QueryString.keys = new Array();
QueryString.values = new Array();

var story_id = "";
// story_id = '10192781'
// alert(story_id);


// Thank you Dustin Diaz:
// http://javascript.internet.com/cookies/delicious-cookies.html
function getCookie(name){
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) 
        return null;
    var end = document.cookie.indexOf(";", len);
    if (end == -1) 
        end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function setCookie(name, value, expires, path, domain, secure){
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) +
    ((expires) ? ";expires=" + expires_date.toGMTString() : "") + //expires.toGMTString()
    ((path) ? ";path=" + path : "") +
    ((domain) ? ";domain=" + domain : "") +
    ((secure) ? ";secure" : "");
}

function deleteCookie(name, path, domain){
    if (getCookie(name)) 
        document.cookie = name + "=" +
        ((path) ? ";path=" + path : "") +
        ((domain) ? ";domain=" + domain : "") +
        ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}


// A great place to start creating a bookmarklet:
// Smashing Magazine
// Make Your Own Bookmarklets using JQuery
// http://www.smashingmagazine.com/2010/05/23/make-your-own-bookmarklets-with-jquery/
if (typeof jQuery == 'undefined') {
    var jQ = document.createElement('script');
    jQ.type = 'text/javascript';
    jQ.onload = runthis;
    jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    document.body.appendChild(jQ);
}
else {
    runthis();
}

function runthis(){
    // gets properties from page
    story_hostname = window.location.hostname
    story_url = window.location
    story_title = document.title
    // story_id = window.location.search

    // alert(story_hostname);
    // alert(story_url);
    // alert(story_title);
    // alert(story_id);
}



// Getting the NPR Article ID
// Thank you, also:  http://www.webmasterworld.com/forum91/907.htm
// Call function by x = querystring("variable") returns variable=x


if (story_hostname == 'www.npr.org') {
    QueryString_Parse();
}
else {
    alert("This bookmarklet is intended to be used in conjunction with content on NPR.org");
}

function QueryString(key){
    var value = null;
    for (var i = 0; i < QueryString.keys.length; i++) {
        if (QueryString.keys[i] == key) {
            value = QueryString.values[i];
            break;
        }
    }
    return value;
}

function QueryString_Parse(){
    var query = window.location.search.substring(1);
    var pairs = query.split("&");
    
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos >= 0) {
            var argname = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            QueryString.keys[QueryString.keys.length] = argname;
            QueryString.values[QueryString.values.length] = value;
            // alert(QueryString.values[QueryString.values.length] = value)
            story_id = QueryString.values[QueryString.values.length] = value
        }
    }
}

function viewStoryTable(){
    // s = story_id
	s = story_table[1]
    // s = '10192781'
    // alert(story_id)
    
    if ((s != "") && (s != null)) {
        $("body").append("\
	<div id='wikiframe'>\
		<div id='wikiframe_veil' style=''>\
			<p id='wikiframe_content'>test<\p>\
		</div>\
		<style type='text/css'>\
			#wikiframe_veil { display: none; position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(255,255,255,.25); cursor: pointer; z-index: 900; }\
			#wikiframe_veil p { color: black; font: normal normal bold 20px/20px Helvetica, sans-serif; position: absolute; top: 50%; left: 50%; width: 10em; margin: -10px auto 0 -5em; text-align: center; }\
			#wikiframe iframe { display: none; position: fixed; top: 10%; left: 10%; width: 80%; height: 80%; z-index: 999; border: 10px solid rgba(0,0,0,1); margin: -5px 0 0 -5px; }\
		</style>\
	</div>");
        $("#wikiframe_veil").fadeIn(750);
		$("#wikiframe_content").html(s);

    }
}

// alert(story_hostname);
// alert(story_url);
// alert(story_id);
// alert(story_title);
// alert(story_id);

// alert(story_table);
// alert(story_table.length);


if ((story_id != "") && (story_id != null)) {

    if (getCookie("npr_bookmarklet_story_table") == null) {
        // alert('cookie not set');
        story_table = ('"' + story_id + '","' + story_title + '";');
        
        // for testing purposes
        // simulating more than one value pair in the cookie:
        story_table = ('"' + story_id + '","' + story_title + '";') + ('"' + story_id + '","' + story_title + '";');
        // alert(story_table);
        
        setCookie('npr_bookmarklet_story_table', story_table, 365);
        
    }
    else {
        alert('cookie set');
        imported_cookie = getCookie('npr_bookmarklet_story_table');
        
        // here is where I need to read the values from the cookie into the story_table
        
        // splitting the number of records
        imported_cookie = imported_cookie.split(';');
        // alert(imported_cookie[0].length);
        
        // some kind of for loop here
        
        // splitting the data within a record
        imported_cookie = imported_cookie[0].split('","');
        
        
        // imported_cookie = imported_cookie[0].substring(1);
        first_value = imported_cookie[0].substring(1);
        // alert(first_value);
        // second_value_length = imported_cookie[1].length;
        // alert(second_value_length);
        // second_value = imported_cookie[1].substring(0, (second_value_length - 6));
        // alert(second_value);
        
        
        // add new story id to table			
        story_table.push('"' + story_id + '","' + story_title + '";');
        setCookie('npr_bookmarklet_story_table', story_table, 365);
        
    }
    viewStoryTable();
}



