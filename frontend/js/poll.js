function assertCookies() {
    var nickname = getCookie('nickname')
    var pollid = getCookie('pollid')
    var token = getCookie('token')

    if (nickname == null || nickname.length <= 0)
        error('Invalid input', 'Must provide a nickname.')
    if (pollid == null || pollid.length <= 0)
        error('Invalid input', 'Must provide a valid poll identifier.')
    if (token == null || token.length <= 5)
        error('Forbidden access', 'Area restricted. Invalid session token.')
}

function initComponents(pollData){
    $('#pollNameTitle').text(pollData.poll_name)
    $('#pollidTitle').text(pollData.poll_id)
}

function fillQuestionForm(questionData){
    $('#pollQuestionTitle').text(questionData.question_name)
    $('#pollQuestionText').text(questionData.question)
    $('#firstAnswerBtn').text(questionData.answer1)
    $('#secondAnswerBtn').text(questionData.answer2)
    $('#thirdAnswerBtn').text(questionData.answer3)
    $('#fourthAnswerBtn').text(questionData.answer4)   
}

function nextQuestion(currentQuestion, maxQuestions, questions){
    var nextQuestion = currentQuestion + 1
    if (nextQuestion < maxQuestions){
        fillQuestionForm(questions[nextQuestion])
    }
    return nextQuestion;
}

function submitPoll(userAnswers){
    console.log(userAnswers)

    //TODO LLamada POST /encuesta/{id} con userAnswers
    //TODO Navegar a ranking.html con las cookies pertinentes
    window.location.href = "ranking.html";
}

$(document).ready(function (){

    assertCookies()

    var uriPlay = "http://localhost:8080/ukahootapi/demo/hello/play"

    var nickname = getCookie('username')
    var pollid = getCookie('pollid')
    var token = getCookie('token')
    
    var pollData = {
        poll_id: '99999',
        poll_name:'Encuesta de prueba',
        questions:[
            {question_name:'Question 1', question:'This is the question 1', answer1:'answer1.1', answer2:'answer1.2', answer3:'answer1.3', answer4:'answer1.4'},
            {question_name:'Question 2', question:'This is the question 2', answer1:'answer2.1', answer2:'answer2.2', answer3:'answer2.3', answer4:'answer2.4'},
            {question_name:'Question 3', question:'This is the question 3', answer1:'answer3.1', answer2:'answer3.2', answer3:'answer3.3', answer4:'answer3.4'}
        ]
    }

    $.ajax({
        url:uriPlay,
        type:"POST",
        crossDomain:true,
        async:false,
        dataType:"json",
        contentType:"application/json",
        data:JSON.stringify( {"token":token, "poll_id":pollid}),
        success:function (data){
            pollData = data
        },
        error:function (textStatus){
            error('Error', textStatus)
        }
    })

    initComponents(pollData)
    fillQuestionForm(pollData.questions[0])

    var userAnswers = {
        poll_id:pollData.poll_id, 
        answers: []
    }

    var maxQuestions = pollData.questions.length
    var currentQuestion = 0;

    $('#firstAnswerBtn').click(function (){
        userAnswers.answers.push(1)
        currentQuestion = nextQuestion(currentQuestion, maxQuestions, pollData.questions)
        if (currentQuestion == maxQuestions)
            submitPoll(userAnswers)
    })
    $('#secondAnswerBtn').click(function (){
        userAnswers.answers.push(2)
        currentQuestion = nextQuestion(currentQuestion, maxQuestions, pollData.questions)
        if (currentQuestion == maxQuestions)
            submitPoll(userAnswers)
    })
    $('#thirdAnswerBtn').click(function (){
        userAnswers.answers.push(3)
        currentQuestion = nextQuestion(currentQuestion, maxQuestions, pollData.questions)
        if (currentQuestion == maxQuestions)
            submitPoll(userAnswers)
    })
    $('#fourthAnswerBtn').click(function (){
        userAnswers.answers.push(4)
        currentQuestion = nextQuestion(currentQuestion, maxQuestions, pollData.questions)
        if (currentQuestion == maxQuestions)
            submitPoll(userAnswers)
    })
})
