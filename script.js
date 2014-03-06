var imgArray = [];
var typesArray = [];
var choiceArray = []; //store users choices
var stepsArray = []; //store steps for instructions

//getElementById helper function
function $(id){
     return document.getElementById(id);
}

//set the opacity of the element
function setOpacity(element,value){
	if(ie8 == true || ie7 == true){ element.style.filter = "alpha(opacity="+ (value*100) +")" }
	else{
		var opacVal = 'opacity: ' + value;
		element.setAttribute('style',opacVal);
	}
}

//run setup
function init(){
	//create images placeholders based on types listed in data source
	typesArray = data['types']; 
	for(var i=0, l=typesArray.length; i<l; i++){
		var newImg = document.createElement('img');
		newImg.setAttribute('src','');
		newImg.setAttribute('alt','');
		newImg.setAttribute('id',typesArray[i]);
		setOpacity(newImg, 0.0);
		$('imgHolder').appendChild(newImg);
	}
	
	//hide instruction section
	setOpacity($('bottom'),0.0); 
	
	//create the first select
	var sel = document.createElement('select');
	var newOpt = document.createElement('option');
	newOpt.setAttribute('value','init');
	newOpt.setAttribute('selected','selected');
	sel.appendChild(newOpt);
	createSelect(sel);	
}

//dynamically create select based on passed data
function createSelect(which){

	var hold = data[which.value]; //store data
	
	//if there's still more data...
	if(hold[1] != undefined){
		var colorType = hold[0]; //get color type to determine image placement

		//create label for select
		var selContainer = document.createElement('label'); 
		selContainer.setAttribute('class','selContainer');

		//if browser doesn't support pointerEvents, apply special class - fixes issues with styling the select arrow
		if('pointerEvents' in document.body.style) { selContainer.setAttribute('class','selContainer'); }
		else{ selContainer.setAttribute('class','noPointerEvents selContainer'); }

		//wrap text in span for styling purposes
		var labelSpan = document.createElement('span');
		label = document.createTextNode(hold[1]);
		labelSpan.appendChild(label);
		selContainer.appendChild(labelSpan);

		//create the next select
		var newSel = document.createElement('select'); 
		
		//add onchange event to select
		if(ie7 == true){ newSel.onchange = function(){createSelect(this)}; }
		else{ newSel.setAttribute('onchange','createSelect(this)'); }
		
		setOpacity(selContainer, 0.0);
		
		//create the select options
		for(var i=2, l=hold.length; i < l; i++){
			var newOpt = document.createElement('option');
			if(i==1){
				newOpt.setAttribute('disabled','disabled');
				newOpt.setAttribute('selected','selected');
			}
			newOpt.setAttribute('value', hold[i]);
			newOpt.appendChild(document.createTextNode(hold[i]));
			newSel.appendChild(newOpt);	
		}
				
		//onchange event triggered
		if(which.value != 'init'){
			//user changed one of their previous options...
			while(which.parentNode != which.parentNode.parentNode.lastChild){	
				//remove irrelevent selects/containers				
				which.parentNode.parentNode.removeChild(which.parentNode.parentNode.lastChild);	
				
				//remove instructions, if they exist
				if($('stepsHolder').children.length != 0){	
					fadeOut($('stepTitle'), true);
					fadeOut($('stepList'), true);
				}

				//remove download form, if it exists
				if($('formHolder').children.length != 0){	
					fadeOut($('downloadImg'), true);
				}
			} 
		} 
		
		//display new select
		selContainer.appendChild(newSel);
		$('selHolder').appendChild(selContainer);	
		fadeIn(selContainer);	

		loadImage(colorType, which.value); //display the image
	}
	else{ 
		var colorType = hold[0]; //get color type to determine image placement
		loadImage(colorType, which.value); //display the image

		//we're done building selects - output the user's choices
		outputChoices();
	}


}

//display the image
function loadImage(type, name){
	var location = "images/" + name + ".png"; //build url

	if($(type).alt != ''){ //if an image is already loaded
		clearImages(type); //fade out image
		
		//change image info
		setTimeout(function(){ 
			$(type).src = location;
			$(type).alt = name;
		},300);

		setTimeout(function(){fadeIn($(type));},850); //fade in new image
	}
	else{
		//set image info
		$(type).src = location;
		$(type).alt = name;
		
		fadeIn($(type)); //fade in image
	}
}

//fade out image
function clearImages(type){
	imgArray = $('imgHolder').getElementsByTagName('img'); //get images
	
	//loop through image types
	for(var i=1, l=typesArray.length; i<l; i++){
		//if type matches passed in value...
		if(type == typesArray[i]){
			//loop through images in reverse, stop when you get to the current image
			for(l=imgArray.length; i<l; i++){
				//fade out the image, reset the alt value
				fadeOut(imgArray[i], false);
				imgArray[i].alt = '';
			}
		}	
	}
}

//output the user's choices
function outputChoices(){
	//create download form
	downloadForm();

	//clear out previous choices, if they exist
	if(choiceArray[0] != undefined){ choiceArray.splice(0, choiceArray.length); }

	//create list, if it doesn't already exist
	if($('stepsHolder').children.length == 0){ 	
		fadeIn($('bottom'))
		createList(); 
	}
	//if list already exists, remove it and create new list
	else{ 
		fadeOut($('stepTitle'), true);
		fadeOut($('stepList'), true);
		
		//create new list
		setTimeout(createList, 850);		
	}
}

//create form that allows user to download their generated look
function downloadForm(){

	//create the form element
	var form = document.createElement('form');
	form.setAttribute('id','downloadImg');
	form.setAttribute('method','post');
	form.setAttribute('action','image.php');

	//loop through all images
	imgArray = $('imgHolder').getElementsByTagName('img'); 
	for(var i=0; i<imgArray.length; i++){
		//create hidden input field - so we can pass img paths to the php script
		var hiddenInput = document.createElement('input');
		hiddenInput.setAttribute('type','hidden');
		hiddenInput.setAttribute('value',imgArray[i].getAttribute('src'));
		hiddenInput.setAttribute('name','layer[]');

		//add hidden input to form
		form.appendChild(hiddenInput);
	}

	//create button
	var button = document.createElement('input');
	button.setAttribute('class','button');
	button.setAttribute('type','submit');
	button.setAttribute('value','Download Your Look');
	button.setAttribute('name','download');

	//add button to form
	form.appendChild(button);

	//add form to page
	$('formHolder').appendChild(form);
}

//create list of instructions
function createList(){
	//grab and store users choices (from image id/alt values)
	imgArray = $('imgHolder').getElementsByTagName('img'); //get images
	for(var i=0; i < imgArray.length-1; i++){
		choiceArray[i] = imgArray[i+1].id + ',' + imgArray[i+1].alt;
	}

	//clear out previous steps, if they exist
	if(stepsArray[0] != undefined){ stepsArray.splice(0, stepsArray.length); }
	
	//create instructions from data
	//loop through user choices
	for(var i=0; i<choiceArray.length; i++){

		var currentStep = choiceArray[i].split(',')[0]; //current step
		var userChoice = choiceArray[i].split(',')[1]; //user's choice

		//build instructions
		if(currentStep != 'liner'){
			//instruction = first part of step + user's choice + second part of step
			stepsArray[i] = steps[currentStep][0] + userChoice + steps[currentStep][1]
		}
		//liner instructions are a little different...
		else{
			if(userChoice == steps['liner'][0]){ stepsArray[i] = steps[currentStep][1]; } //simple liner
			else{ stepsArray[i] = steps[currentStep][3]; }	//winged liner
		}
	}
		
	//create section title
	var stepsTitle = document.createElement('h2');
	stepsTitle.setAttribute('id','stepTitle');
	stepsTitle.appendChild(document.createTextNode('To recreate your look...'));
	
	//create ordered list
	var list = document.createElement('ol');
	list.setAttribute('id','stepList');
	
	//create list itmes
	for(var i=0, l=choiceArray.length; i<l; i++){
		var newLi = document.createElement('li');
		newLi.appendChild(document.createTextNode(stepsArray[i]));
		list.appendChild(newLi)
	}
	
	setOpacity(stepsTitle, 0.0);
	setOpacity(list, 0.0);
	
	$('stepsHolder').appendChild(stepsTitle);
	$('stepsHolder').appendChild(list);
	
	//display instructions
	fadeIn(stepsTitle);	
	fadeIn(list);
}

//fade in animation
function fadeIn(element){
	//if ie7 or ie8 use filters.alpha.opacity
	if(ie7 == true || ie8 == true){
		//fade in
		if(element.filters.alpha.opacity < 100){
			element.filters.alpha.opacity += 5;
			setTimeout(function(){fadeIn(element);},20);
		}
	}
	//other browsers use style.opacity
	else{ 
		//fade in
		if(element.style.opacity < 1.0){
			element.style.opacity = parseFloat(element.style.opacity) + 0.05;
			setTimeout(function(){fadeIn(element);},20);
		}
	}
}

//fade out animation
function fadeOut(element, remove){
	var increment = 0.25;

	//if ie7 or ie8 use filters.alpha.opacity
	if(ie7 == true || ie8 == true){
		//fade out
		if(element.filters.alpha.opacity > 0){
			element.filters.alpha.opacity -= 5;
			setTimeout(function(){fadeOut(element, remove);},10);
		}
		//done fading
		else{
			//if remove is true, remove the element
			if(remove == true && element.parentNode != null){ element.parentNode.removeChild(element); }
		}
	}
	//other browsers use style.opacity
	else{ 
		//fade out
		if(element.style.opacity > 0.0){
			if( element.style.opacity <= 0.06){ element.style.opacity = 0.0; } //fix for Chrome and Safari to prevent infinite loop
			else{ element.style.opacity = parseFloat(element.style.opacity) - 0.05; }
			setTimeout(function(){fadeOut(element, remove);},10);
		}
		//done fading
		else{
			//if remove is true, remove the element 
			if(remove == true && element.parentNode != null){ element.parentNode.removeChild(element); }
		}
	}
}