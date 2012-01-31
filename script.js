
// variables
var helper = null
,	selection = null
,	range = null
,	text = ''
,	trim = true
,	deselect = false;

document.body.addEventListener("keydown", function (event) {
	
	// only proceed if crtl + c is pressed
	if (event.ctrlKey !== true || event.keyCode !== 67) return true;
	
	// get selected text without dom info		
	selection = window.getSelection();
	text = selection.toString();
	
	// get old range
	if (selection.getRangeAt && selection.rangeCount && !deselect)
		range = selection.getRangeAt(0);
		else range = null;
	
	// trim whitespace if chosen
	if (trim === true) text = text.replace(/^\s+|\s+$/g, '');		

	// create a helper textarea 
	if (helper === null) {
		helper = document.createElement('textarea');
		helper.style.position = "absolute";
		helper.style.fontSize = "1pt";
		helper.style.border = "none";
		helper.style.margin = "-100";
		document.body.appendChild(helper);
	}
	
	// change text of helper, make it visible and select contents
	helper.value = text;
	helper.style.display = "block";		
	helper.select();
	
	// hide the element after 100ms
	window.setTimeout(function () { 
	
		// hide helper element
		helper.style.display = "none";
		
		// restore selection if one exists
		if (range === null && !deselect) return; 
		selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		
	},100);

}, false); 
