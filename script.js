/*

Copyright 2019 Liam Kelly

This file is part of WebQuiz.

WebQuiz is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

WebQuiz is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with WebQuiz.  If not, see <https://www.gnu.org/licenses/>. 

*/

// defining functions

function display(id){
	id = "card" + id;
	var divs = document.getElementsByClassName("Card");
	for(var i = 0; i < divs.length; i++){
		divs[i].style.display = "none";
	}
	document.getElementById(id).style.display = "block";
}

function confirm(id) {
	id = "next" + id ;
	document.getElementById(id).disabled = false;
}

function goodAnswer(question, answer){

	listeQuestions[question]  = ( typeof listeQuestions[question]  != 'undefined' && listeQuestions[question]  instanceof Array ) ? listeQuestions[question]  : []
	listeQuestions[question][answer] = 1;
	var scoreQuestion = 0;
	for (i=0; i<listeQuestions[question].length; i++){
		scoreQuestion = scoreQuestion + listeQuestions[question][i];
	}
	target = listeAnswers[0];
	if (scoreQuestion == listeAnswers[question] ) {
		confirm(question);
	}
}

function answer(option){
	option = "option" + option;
	document.getElementById(option).style.display = "block";
}

function closeAnswer(option) {
	option = "option" + option;
	document.getElementById(option).style.display = "none";
}

// parsing and displaying of content

var divWrapper = document.createElement("DIV");
divWrapper.id = "wrapper";

listeAnswers = [];

for (var i in questionsObject) {
	var divCard = document.createElement("DIV");
	divCard.id = "card" + i;
	divCard.className = "Card";
	var divTitle = document.createElement("DIV");
	divTitle.className = "Title";
	divTitle.innerHTML = questionsObject[i].title;
	divCard.appendChild(divTitle);
	var divContent = document.createElement("DIV");
	divContent.className = "Content";
	
	var ContentAnswers = "<br />";
	var CorrectCounter = 0;
	for (var question in questionsObject[i].answers) {
		ContentAnswers += '<div class="AnswerChoice"><a href="javascript:void(0)" onclick="answer(\'' + i + '-' + question + '\')' + ( questionsObject[i].answers[question][2] == 1 ? ';goodAnswer(' + i + ',' + CorrectCounter + ')' : '') + '">' + questionsObject[i].answers[question][0] + '</a></div>';
		if (questionsObject[i].answers[question][2] == 1)
		CorrectCounter++;
		ContentAnswers += '<div class="Answer" id="option' + i + '-' + question + '" onclick="closeAnswer(\'' + i + '-' + question + '\')">' + questionsObject[i].answers[question][1] + '</div><br />';
	}
	var ContentHTML = questionsObject[i].content;
	
	ContentHTML += ContentAnswers + "<br />";
	if ( i != 0 ) {
		ContentHTML += '<button onclick=\"display(\'' + ( i - 1 ) +'\')\">Previous</button>'
	}
	if ( i < (questionsObject.length - 1 )) {
		ContentHTML += '<button onclick=\"display(\'' + ( +i + 1 ) + '\')\" id=\"next' + i + '\"' + ( questionsObject[i].requiredAnswers != 0 ? ' disabled' : '' ) + '>Next</button>';
	}
	
	ContentHTML = ContentHTML.replace(/:([0-9][mpsz]):/g, '<img class="Tile" src="SVG/$1.svg" />');
	
	divContent.innerHTML = ContentHTML;
	divCard.appendChild(divContent);
	divWrapper.appendChild(divCard);
	listeAnswers.push(questionsObject[i].requiredAnswers);
}


// initialising vars

listeQuestions = [];
//listeAnswers = [ 0, 2 ];
for (i=0; i<listeAnswers.length; i++){
	(listeQuestions[i] = []).length = listeAnswers[i];
	listeQuestions[i].fill(0);
}