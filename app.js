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

	function Quiz(questions) {
		this.questions = questions;
		this.score = 0;
		this.currentCount = 0;
	}
});
