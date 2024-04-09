
function Quiz(listofQuestions) {
    this.score = 0;
    this.questions = listofQuestions;
    this.questionIndex = 0;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length
}
Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;

}
Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex]

}
Question.prototype.isCorrectAnswer = function (Choice) {
    return this.answer === Choice;

}
function showProgress() {
    let elem = document.getElementById("progress");
    let questionNum = quiz.questionIndex + 1;
    elem.innerHTML = "Question " + questionNum + " of " + quiz.questions.length

}
function showSores() {
    let heading = document.querySelector("h1");
    heading.innerHTML = "Result:"
    let quizElem = document.getElementById("quiz")
    quizElem.innerHTML = `<h2 id="score"> Your scores: ${quiz.score
        }. and percentage is ${((quiz.score / quiz.questions.length) * 100).toFixed(
            2
        )}%</h2>`;
}
function handleBtnClick(id, choice) {
    let button = document.getElementById(id)
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}
function loadQuestions() {
    if (quiz.isEnded()) {
        showSores()
    } else {
        let elem = document.getElementById("question");
        elem.innerHTML = quiz.getQuestionByIndex().text;

        let choices = quiz.getQuestionByIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let elem = document.getElementById("button" + i);
            elem.innerHTML = choices[i];
            handleBtnClick("button" + i, choices[i]);
        }
        showProgress();

    }

}
let questionsList = [
    new Question("Which language is used for styling web page?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Javascript supports?", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which is not a Javascript Framework?", ["Angular", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used to connect to database?", ["PHP", "HTML", "JS", "All"], "JS"),
    new Question("Javascript is a?", ["Language", "Programming Language", "Development", "All"], "Programming Language")

];
let quiz = new Quiz(questionsList);

loadQuestions();