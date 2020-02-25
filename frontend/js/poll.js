
function initComponents(pollData){
    $('#pollNameTitle').text(pollData.poll_name)
    $('#pollidTitle').text(pollData.poll_id)
    fillQuestionForm(pollData.questions[0])
}

function fillQuestionForm(questionData){
    $('#pollQuestionTitle').text(questionData.question_name)
    $('#pollQuestionText').text(questionData.question)
    $('#firstAnswerBtn').text(questionData.answer1)
    $('#secondAnswerBtn').text(questionData.answer2)
    $('#thirdAnswerBtn').text(questionData.answer3)
    $('#fourthAnswerBtn').text(questionData.answer4)   
}

function assertCookies() {
    var nickname = getCookie('nickname')
    var pollid = getCookie('pollid')
    var token = getCookie('token')

    if (nickname == null || nickname.length <= 0)
        error('Invalid input', 'You must provide a nickname.')
    if (pollid == null || pollid.length <= 0)
        error('Invalid input', 'You must provide a valid poll identifier.')
    if (token == null || token.length <= 5)
        error('Forbidden access', 'Area restricted. Invalid session token.')
}

$(document).ready(function (){

    //assertCookies()

    //var pollid = getCookie('pollid')
    var pollid = 99999

    // Llamada GET /encuesta/{id}
    var pollData = {
        poll_id: '99999',
        poll_name:'Encuesta de prueba',
        questions:[
            {question_name:'Question 1', question:'This is the question 1', answer1:'answer1.1', answer2:'answer1.2', answer3:'answer1.3', answer4:'answer1.4'},
            {question_name:'Question 2', question:'This is the question 2', answer1:'answer2.1', answer2:'answer2.2', answer3:'answer2.3', answer4:'answer2.4'},
            {question_name:'Question 3', question:'This is the question 3', answer1:'answer3.1', answer2:'answer3.2', answer3:'answer3.3', answer4:'answer3.4'}
        ]
    }

    initComponents(pollData)

    $('#')
})
