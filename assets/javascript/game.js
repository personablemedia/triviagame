//in this code I'm going to use functions inside of variables
//something i've never done before!
//
//
//  Copyright 2018 C Heath Rost, MF
//
//
//
//
//
//platform for all questions
var panel = $("#quiz-area");

//vars
var countStartNumber = 10;
var myMusic;

//restart game event handler
$(document).on("click", "#start-over", function(e) {
  game.reset();
});

//start game event handler
$(document).on("click", "#start", function(e) {
  $("#subwrapper").prepend(
    '<h2>Time Remaining: <span id="counter-number">10</span> Seconds</h2>'
  );
  game.loadQuestion();
});

//answer clicked event handler
$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

//questions and answers
var questions = [
  {
    question: "What was Pikachu's Pokedex #?",
    answers: ["1", "151", "25", "24"],
    correctAnswer: "25",
    image: "assets/images/pikachu.png"
  },
  {
    question: "What is the name of the legendary bird of Ice?",
    answers: ["Moltres", "Articuno", "Lupia", "Zapdos"],
    correctAnswer: "Articuno",
    image: "assets/images/articuno.png"
  }
];

//baddass with two D's variable with functions inside of it
var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  //game.countdown
  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("The Pokemon Ran Away");
      game.timeUp();
    }
  },

  //game.timeUp
  timeUp: function() {
    clearInterval(timer);
    $("#counter-number").html(game.counter);
    panel.html("<h2>The Pokemon Ran Away</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else { setTimeout(game.nextQuestion, 3 * 1000); }
  },


  //game.loadQuestion
  loadQuestion: function() {
    timer = setInterval(game.countdown, 1000);
    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {

      panel.append('<button class="answer-button" id="button"' + 'data-name="' +
          questions[this.currentQuestion].answers[i] + '">' +
          questions[this.currentQuestion].answers[i] + "</button>");

      document.getElementById("subwrapper").style.background ="#808080";
      document.getElementById("subwrapper").style.height = "500px";
      document.getElementById("quiz-area").style.color = "#ffffff";

    }
  },


  //game.nextQuestion
  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },


  //game.clicked
  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else { this.answeredIncorrectly(); }
  },


  //game.answeredCorrectly
  answeredCorrectly: function() {
    clearInterval(timer);
    game.correct++;
    panel.html("<h2>Correct!</h2>");
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },


  //game.answeredIncorrectly
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html("<h2>Attack Missed!</h2>");
    panel.append(
      "<h3>The Correct Answer was: " +
        questions[game.currentQuestion].correctAnswer +
        "</h3>"
    );
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },


  //game.results
  results: function() {
    clearInterval(timer);
    panel.html("<h2>Score Report!</h2>");
    $("#counter-number").html(game.counter);
    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append(
      "<h3>Unanswered: " +
        (questions.length - (game.incorrect + game.correct)) +
        "</h3>"
    );
    panel.append('<br><button id="start-over">Battle Again?</button>');
  },


  //game.reset
  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }


};
