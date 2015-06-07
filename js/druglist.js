//Variable declarations
var questionData;
var questionArray;
var drugCount;

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$( document ).ready(function() {
	console.log("Document Loaded.");
	loadQuestions();
});

function loadQuestions(){
	console.log("Loading drug codex...");
	questionData = $.ajax({
		url: "drugcodex.txt",
		async: false
	}).responseText;
	console.log("...done.");
	console.log("Converting codex to array...");
	questionArray = questionData.split("$");
	drugCount = questionArray.length/6;
	console.log("...done. " + drugCount + " drugs found.");
	generateOptions();
}

function generateOptions(){
	//Formulate the Question
	var nameArray = [];
	console.log("Generating select field options...");
	var select = document.getElementById("drugselect");
	var defopt = document.getElementById("defaultoption");
	select.remove(defopt, select[0]);
	for(var x=0; x<questionArray.length;x+=6){
		nameArray.push(questionArray[x]);
	}
	nameArray.sort(function (a, b) {
    	return a.toLowerCase().localeCompare(b.toLowerCase());
	});
	for(var z=0; z<nameArray.length;z++){
		nameArray[z] = nameArray[z].capitalizeFirstLetter();
	}
	for(var y=0; y<nameArray.length;y++){
		var option = document.createElement("option");
		option.text=nameArray[y];
		select.add(option, select[y]);
	}
	changedValue();
}

function changedValue(){
	var drugIndex;
	var selectbox = document.getElementById("drugselect");
	var selected = selectbox.options[selectbox.selectedIndex].text;
	for(var i=0;i<questionArray.length;i+=6){
		if(selected.toLowerCase()==questionArray[i]){
			drugIndex=i;
			break;
		}
	}
	document.getElementById("drugclass").innerHTML = questionArray[drugIndex+1].capitalizeFirstLetter();
	document.getElementById("drugtarget").innerHTML = questionArray[drugIndex+2].capitalizeFirstLetter();
	document.getElementById("druguse").innerHTML = questionArray[drugIndex+3].capitalizeFirstLetter();
	document.getElementById("drugaction").innerHTML = questionArray[drugIndex+4].replace(/["]+/g, '');
	document.getElementById("drugaes").innerHTML = questionArray[drugIndex+5].replace(/[;]/g,", ");
}
