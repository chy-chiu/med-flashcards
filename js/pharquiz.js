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

function loadQuestions(){
	console.log("Loading drug codex...");
	questionData = $.ajax({
		url: "drugcodex.txt",
		async: false
	}).responseText;
	console.log("...done.");
	console.log("Converting codex to questions...");
	questionArray = questionData.split("$");
	drugCount = questionArray.length/6;
	console.log("...done. " + drugCount + " drugs found.");
	populateAEs();
	generateQuestion();
}

function populateAEs(){
	var AEsubArray;
	adverseEffects[0]="headache";
	console.log("Populating adverse effects for question generation...");
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
	console.log("...done:")
	console.log(adverseEffects);
}

function checkDuplicate(testelement, testarray){
	var duplicate = false;
	for(var g=0;g<testarray.length;g++){
		if(testelement==testarray[g]){
			duplicate = true;
		}
	}
	return duplicate;
}

function generateQuestion(){
	//Formulate the Question
	console.log("Generating question number " + questionCount + "...");
	//Which drug?
	var drugID = Math.floor(Math.random()*drugCount);
	//which kind of question?
	var qClass = Math.ceil(Math.random()*5);
	console.log(qClass);
	//Which answer will be correct
	answerP = Math.ceil(Math.random()*4);
	correctResponse = questionArray[drugID*6+qClass].replace(/["]+/g,"");
	if(correctResponse=="-"){
		generateQuestion;
	}
	document.getElementById("lr" + answerP).innerHTML = correctResponse;
	if(qClass==1){
		document.getElementById("question").innerHTML = "<b>What class of drug is " + questionArray[drugID*6] + "?</b>";
	}
	if(qClass==2){
		document.getElementById("question").innerHTML = "<b>What is the molecular function of " + questionArray[drugID*6] + "?</b>";
	}
	if(qClass==3){
		document.getElementById("question").innerHTML = "<b>What are the clinical uses of " + questionArray[drugID*6] + "?</b>";
	}
	if(qClass==4){
		document.getElementById("question").innerHTML = "<b>What is the mechanism of action of  " + questionArray[drugID*6] + "?</b>"
	}
	for(var p=1;p<5;p++){
		if(p!=answerP){
			var answerID = Math.floor(Math.random()*drugCount);
			document.getElementById("lr" + p).innerHTML = questionArray[answerID*6+qClass].replace(/["]+/g,"");
		}
	}
	if(qClass==5){
		document.getElementById("question").innerHTML = "<b>Which of the following is not an adverse effect of " + questionArray[drugID*6] + "?</b>";
		generateAEQuestion(drugID);
	}
	console.log("...done. Awaiting user input.");
}

function generateAEQuestion(subjectdrug){
	console.log("Generating adverse effect question for " + questionArray[subjectdrug*6]);
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
	console.log("User response: " + userResponse + "; correctResponse: " + correctResponse);
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
	console.log("Feedback given.");
	generateQuestion();
}

$( document ).ready(function() {
	console.log("Document Loaded.");
	loadQuestions();
	$("response").attr("checked", false);
});

$(document).keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        $(document.getElementById('subbutton')).click();
	}
})
