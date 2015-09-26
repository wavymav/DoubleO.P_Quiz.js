document.addEventListener('DOMContentLoaded', function(){

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

	var QuizRenderUI = {
		renderNext: function() {
			if (coolQuiz.endQuiz()) {
				this.renderScore();
			} else {
				this.renderProgress();
				this.renderQuestionNumber();
				this.renderQuestion();
				this.renderSelections();
			}
		},
		renderScore: function() {
			var quizOverHTML = '<h1>The Quiz has ended</h1>' +
												 '<h2>Your score was: ' + (coolQuiz.score/coolQuiz.questions.length) * 100 +'%</h2>';
			this.renderHTML('quiz', quizOverHTML);
		},
		renderQuestionNumber: function() {
			var currentQuestionNumber = coolQuiz.currentCount + 1;
			this.renderHTML('question-number', 'Q.' + currentQuestionNumber + ')');
		},
		renderQuestion: function() {
			this.renderHTML('question', coolQuiz.getCurrentQuestion().question);
		},
		renderSelections: function() {
      var selections = coolQuiz.getCurrentQuestion().selections;

      for(var i = 0; i < selections.length; i++) {
        this.renderHTML('selection-' + i, selections[i]);
				this.selectionHandler('selection-' + i, selections[i]);
      }
    },
		renderHTML: function(id, text) {
			var template = document.getElementById(id);
			template.innerHTML = text;
		},
		selectionHandler: function(id, selection) {
			var button = document.getElementById(id);
			button.onclick = function() {
				coolQuiz.selectedGuess(selection);
				QuizRenderUI.renderNext();
			};
		},
		renderProgress: function() {
      var currentQuestionNumber = coolQuiz.currentCount + 1;
      this.renderHTML('question-count', currentQuestionNumber + '/' + coolQuiz.questions.length);
    }
	};

	var questions= [
		new Question('How many States are in the United States?', '50', ['40', '30', '50', '45']),
		new Question('How many legs does a spider have?', '8', ['4', '6', '10', '8']),
		new Question('How many football teams are in the NFL?', '32', ['32', '26', '44', '30']),
		new Question('Who is the President of the United States as of (2015)?', 'Barack Obama', ['George W. Bush', 'Barack Obama', 'Hillary Clinton', 'Donald Trump']),
	];

	var coolQuiz = new Quiz(questions);

	QuizRenderUI.renderNext();
});
