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
    userAnswers.apikey = getCookie('token')
    userAnswers.user_name = getCookie('nickname')

    var uriEnviarRespuestas='https://localhost:8443/ukahootapi/public/api/enviar_respuestas'

    $.ajax({
        url:uriEnviarRespuestas,
        type:"POST",
        crossDomain:true,
        async:false,
        dataType:"json",
        contentType:"application/json",
        data:JSON.stringify(userAnswers),
        success:function (data){
            console.log(data)
        },
        error:function (textStatus){
            error('Error', textStatus)
        }
    })

    window.location.href = "ranking.html";
}

$(document).ready(function (){
    assertCookies()
    
    var uriPlay = "https://localhost:8443/ukahootapi/public/api/play"

    var nickname = getCookie('nickname')
    var pollid = getCookie('pollid')
    var token = getCookie('token')
    
    var pollData = {}

    $.ajax({
        url:uriPlay,
        type:"POST",
        crossDomain:true,
        async:false,
        dataType:"json",
        contentType:"application/json",
        data:JSON.stringify( {"user_name":nickname, "poll_id":pollid, "apikey":token}),
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
