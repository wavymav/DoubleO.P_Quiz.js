document.addEventListener('DOMContentLoaded', function(){

	var questionElement = document.getElementById('question'),
			questionNumberElement = document.getElementById('question-number'),
			questionCountElement = document.getElementById('question-count'),
			quizSelectionElement = document.getElementById('quiz-selection');


	function Question(question, answer, selections) {
		this.question = question;
		this.answer = answer;
		this.selections = selections;
	}

	Question.prototype.correctChoice = function(selection) {
		return this.answer === selection;
	};

	function Quiz(questions) {
		this.questions = questions;
		this.score = 0;
		this.currentCount = 0;
	}

	Quiz.prototype.getCurrentQuestion = function() {
		return this.questions[this.currentCount];
	};

	Quiz.prototype.selectedGuess = function(answer) {
		if (this.getCurrentQuestion().correctChoice(answer)) {
			this.score++;
		}
		this.currentCount++;
	};

	Quiz.prototype.endQuiz = function() {
		return this.currentCount >= this.questions.length;
	};
});
