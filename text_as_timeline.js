if (typeof jQuery == 'undefined') {
	// http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
	var jQ = document.createElement('script');
	jQ.type = 'text/javascript';
	jQ.onload=runthis;
	jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	document.body.appendChild(jQ);
} else {
	runthis();
}

function runthis() {
		s = getSelText();
		if (s == "") {
			var s = prompt("Forget something?");
		}
		if ((s != "") && (s != null)) {
			gohere = 'http://npr-simile-timeline.googlecode.com/svn/trunk/widget.html?http://api.npr.org/query?&searchTerm='+s+'&apiKey=MDAxNzgwMDQ5MDEyMTQ4NzYyMjU4YmY1Yw004&output=JSON&callback=parseJSON'
			window.location = gohere
		}
}

function getSelText() {
	var s = '';
	if (window.getSelection) {
		s = window.getSelection();
	} else if (document.getSelection) {
		s = document.getSelection();
	} else if (document.selection) {
		s = document.selection.createRange().text;
	}
	return s;
}