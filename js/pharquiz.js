/**
*
* Please forgive me for this.
*
**/ 

//Variable declarations
var questionData;
var questionArray;
var drugCount;
var questionCount = 1;
var numberCorrect = 0;
var selectedRadio = "";
var correctResponse = "";
var adverseEffects = [];
var answerP;

function loadQuestions(){ //Interprets drug codex on page load.
	//Load codex from text file:
	questionData = $.ajax({
		url: "drugcodex.txt",
		async: false
	}).responseText;
	//Convert codex to questions:
	questionArray = questionData.split("$");
	drugCount = questionArray.length/6;
	populateAEs();
	//Generate a starting question.
	generateQuestion();
}

function populateAEs(){ //Prepares an array of all adverse effects
	var AEsubArray;
	adverseEffects[0]="headache";
	for(var q=0;q<questionArray.length;q++){
		if(q%6==5){
			AEsubArray = questionArray[q].split(";"); //REPLACE SEMICOLON WITH # FOR EASY READING - YOU CAN NOW USE ; IN OTHER FIELDS
			for(var f=0;f<AEsubArray.length;f++){
				if(checkDuplicate(AEsubArray[f], adverseEffects)==false){
					adverseEffects[adverseEffects.length] = AEsubArray[f];
				}
			}
		}
	}
}

function checkDuplicate(testelement, testarray){ //A simple function to see if a value is found within an array
	var duplicate = false;
	for(var g=0;g<testarray.length;g++){
		if(testelement==testarray[g]){
			duplicate = true;
		}
	}
	return duplicate;
}

function generateQuestion(){ //Formulate a question
	var drugID = Math.floor(Math.random()*drugCount); //which drug?
	var qClass = Math.ceil(Math.random()*7); //which kind of question?
	answerP = Math.ceil(Math.random()*4); //Which answer will be correct
	correctResponse = questionArray[drugID*6+qClass].replace(/[".]+/g,""); //generates a basal correct response.
	if(correctResponse=="-"){ //If for some reason the answer is null, try again.
		generateQuestion();
		return;
	}
	document.getElementById("lr" + answerP).innerHTML = correctResponse; //Paste the answer into the document
	switch(qClass){ //Generate a question based on qClass:
		case 1:
			document.getElementById("question").innerHTML = "<b>What class of drug is " + questionArray[drugID*6] + "?</b>";
			generateResponses(qClass);
			break;
		case 2:
			document.getElementById("question").innerHTML = "<b>What is the molecular function of " + questionArray[drugID*6] + "?</b>";
			generateResponses(qClass);
			break;
		case 3:
			document.getElementById("question").innerHTML = "<b>What are the clinical uses of " + questionArray[drugID*6] + "?</b>";
			generateResponses(qClass);
			break;
		case 4:
			document.getElementById("question").innerHTML = "<b>What is the mechanism of action of  " + questionArray[drugID*6] + "?</b>";
			generateResponses(qClass);
			break;
		case 5:
			document.getElementById("question").innerHTML = "<b>Which of the following is not an adverse effect of " + questionArray[drugID*6] + "?</b>";
			generateAEQuestion(drugID);
			break;
		case 6:
			document.getElementById("question").innerHTML = "<b>Which of the following regarding " + questionArray[drugID*6] + " is INCORRECT?</b>";
			generateMixed(drugID);
			break;
		case 7:
			document.getElementById("question").innerHTML = "<b>Which of these drugs " + questionArray[drugID*6+4].replace(/[".]+/g,"") + "?";
			generateMOAReverse(drugID);
			break;
	}
}


function generateResponses(qClass){
	for(var p=1;p<5;p++){
		if(p!=answerP){
			var answerID = Math.floor(Math.random()*drugCount);
			document.getElementById("lr" + p).innerHTML = questionArray[answerID*6+qClass].replace(/["]+/g,"");
		}
	}
}

function generateMixed(subjectdrug){
	var drugClass = "The drug class is " + questionArray[subjectdrug*6+1] + ".";
	var drugTarget = "The molecular target of the drug is " + questionArray[subjectdrug*6+2] + ".";
	var drugUses = "It is used for " + questionArray[subjectdrug*6+3] + " clinically.";
	var drugMOA = "It " + questionArray[subjectdrug*6+4];
	var corrID = Math.floor(Math.random()*drugCount);
	if(corrID==subjectdrug){
		generateMixed();
	}
	var corrClass = Math.floor(Math.random()*4);
	switch(corrClass){
		case 0:
			correctResponse = "The drug class is " + questionArray[corrID*6+1] + ".";
			document.getElementById("lr"+answerP).innerHTML = correctResponse;
			for(var p=1;p<5;p++){
				if(p!=answerP){
					var answerID = Math.floor(Math.random()*3);
					switch(answerID){
						case 0:
							document.getElementById("lr" + p).innerHTML = drugTarget;
							break;
						case 1:
							document.getElementById("lr" + p).innerHTML = drugUses;
							break;
						case 2:
							document.getElementById("lr" + p).innerHTML = drugMOA;
							break;
					}
				}
			}
			break;
		case 1:
			correctResponse = "The molecular target of the drug is " + questionArray[corrID*6+2] + ".";
			document.getElementById("lr"+answerP).innerHTML = correctResponse;
			for(var p=1;p<5;p++){
				if(p!=answerP){
					var answerID = Math.floor(Math.random()*3);
					switch(answerID){
						case 0:
							document.getElementById("lr" + p).innerHTML = drugClass;
							break;
						case 1:
							document.getElementById("lr" + p).innerHTML = drugUses;
							break;
						case 2:
							document.getElementById("lr" + p).innerHTML = drugMOA;
							break;
					}
				}
			}
			break;
		case 2:
			correctResponse = "It is used for " + questionArray[corrID*6+3] + " clinically.";
			document.getElementById("lr"+answerP).innerHTML = correctResponse;
			for(var p=1;p<5;p++){
				if(p!=answerP){
					var answerID = Math.floor(Math.random()*3);
					switch(answerID){
						case 0:
							document.getElementById("lr" + p).innerHTML = drugClass;
							break;
						case 1:
							document.getElementById("lr" + p).innerHTML = drugTarget;
							break;
						case 2:
							document.getElementById("lr" + p).innerHTML = drugMOA;
							break;
					}
				}
			}
			break;
		case 3:
			correctResponse = "It " + questionArray[corrID*6+4].replace(/["]/g) + ".";
			document.getElementById("lr"+answerP).innerHTML = correctResponse;
			for(var p=1;p<5;p++){
				if(p!=answerP){
					var answerID = Math.floor(Math.random()*3);
					switch(answerID){
						case 0:
							document.getElementById("lr" + p).innerHTML = drugClass;
							break;
						case 1:
							document.getElementById("lr" + p).innerHTML = drugTarget;
							break;
						case 2:
							document.getElementById("lr" + p).innerHTML = drugUses;
							break;
					}
				}
			}
			break;
	}
}

function generateMOAReverse(subjectdrug){
	correctResponse = questionArray[subjectdrug*6];
	document.getElementById("lr"+answerP).innerHTML = correctResponse;
	for(var p=1;p<5;p++){
		if(p!=answerP){
			var answerID = Math.floor(Math.random()*drugCount);
			document.getElementById("lr" + p).innerHTML = questionArray[(answerID*6)];
		}
	}
}

function generateAEQuestion(subjectdrug){
	var drugAEArray = correctResponse.split(";"); //Change to "#"?
	correctResponse = adverseEffects[Math.floor(Math.random()*adverseEffects.length)];
	while(checkDuplicate(correctResponse, drugAEArray)==true){
		correctResponse = adverseEffects[Math.floor(Math.random()*adverseEffects.length)];
	}
	document.getElementById("lr"+answerP).innerHTML = correctResponse;
	for(var x=1;x<5;x++){
		if(x!=answerP){
			document.getElementById("lr" + x).innerHTML = drugAEArray[Math.floor(Math.random()*drugAEArray.length)];
		}
	}
}

function submitResponse(){
	var userResponse = document.getElementById(selectedRadio).innerHTML;
	if(document.getElementById("feedback").innerHTML == "<i>Feedback will appear here...</i>"){
		document.getElementById("feedback").innerHTML = "";
	}
	if(userResponse==correctResponse){
		numberCorrect++;
		document.getElementById("feedback").innerHTML = "<p id='correctanswer'>Correct!</p>" + document.getElementById("feedback").innerHTML;
	} else {
		document.getElementById("feedback").innerHTML = "<p id='incorrectanswer'>Incorrect. The answer was " + correctResponse + ".</p>" + document.getElementById("feedback").innerHTML;
	}
	document.getElementById("score").innerHTML = "Score: " + numberCorrect + "/" + questionCount;
	questionCount++;
	uncheckBoxes();
	generateQuestion();
}

function uncheckBoxes(){
	//Builds an array of radio elements and then unchecks them all.
	var radios = document.getElementsByName('response');
	for(var x=0; x<radios.length;x++){
		radios[x].checked = false;
	}
}

$( document ).ready(function() {
	//Runs at start up to kick off proceedings
	loadQuestions();
	uncheckBoxes(); //necessary for when user refreshes page (FF)
});

$(document).keypress(function(event) {
	//When a key is pressed, if that key is ENTER, simulate submit button click.
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        $(document.getElementById('subbutton')).click();
	}
})
