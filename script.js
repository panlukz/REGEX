var metaTable = document.getElementById('meta');
var regexInput = document.getElementById('ex');
var textInput = document.getElementById('text');
var flagInput = document.getElementById('flag');
var foundPlace = document.getElementById('found');

function addMeta(e) {
	if(e.target.nodeName === 'TD') {	
		var metaSign = e.target.textContent;
		regexInput.value += metaSign;
		refresh();
		regexInput.focus();
	};
}

function findRegEx(regex, text, flag) {	
	try {
		var expression = new RegExp(regex, flag);
		if(expression) {
			return text.replace(expression, '<span>' + '$&' + '</span>');
		}
	} catch(e) {
		return text;
	}

}

function refresh() {	
	foundPlace.innerHTML = findRegEx(regexInput.value, textInput.value, flagInput.value);
}


if(document.addEventListener) {
	regexInput.addEventListener('keyup', function() {
			setTimeout(refresh, 500);
			}
		, false);
		
	textInput.addEventListener('keyup', function() {
			setTimeout(refresh, 500);
			}
		, false);
		
	flagInput.addEventListener('keyup', function() {
			setTimeout(refresh, 500);
			}
		, false);
		
	
	metaTable.addEventListener('click', addMeta, false);			
	textInput.addEventListener('click', clearTextInput, false);
	textInput.addEventListener('focus', clearTextInput, false);
		
		
} else if(document.attachEvent) {
	regexInput.attachEvent('onkeyup', function() {
			setTimeout(refresh, 500);
			});
		
	textInput.attachEvent('onkeyup', function() {
			setTimeout(refresh, 500);
			});
		
	flagInput.attachEvent('onkeyup', function() {
			setTimeout(refresh, 500);
			});
			
		
	metaTable.attachEvent('onclick', addMeta);	
	textInput.attachEvent('onclick', clearTextInput);
	textInput.attachEvent('onfocus', clearTextInput);

}

function clearTextInput() {
	textInput.value = '';
	
	if(document.removeEventListener) {
		textInput.removeEventListener('click', clearTextInput, false);
		textInput.removeEventListener('focus', clearTextInput, false);
	} else if(document.detachEvent) {
		textInput.detachEvent('onclick', clearTextInput);
		textInput.detachEvent('onfocus', clearTextInput);
	}
}
