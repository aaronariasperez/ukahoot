function assertCookies() {
    var username = getCookie('username')
    var token = getCookie('token')

    if (username == null || username.length <= 0)
        error('Invalid input', 'Must provide a username.')
    if (token == null || token.length <= 5)
        error('Forbidden access', 'Area restricted. Invalid session token.')
}

function initComponents(username){
    $('#questionForm').hide()
    clearNewPollError()
    $('#usernameTitle').text(username)
}

function clearNewPollError(){
    $('#newPollErrorText').text('')
    $('#newPollErrorRow').hide()
}

function displayNewPollError(error){
    $('#newPollErrorText').text(error)
    $('#newPollErrorRow').show()
}

function clearSubmitQuestionErrors(){
    $('#submitQuestionErrorList').html('')
    $('#submitQuestionErrorList').hide()
}

function displaySubmitQuestionError(error){
    $('#submitQuestionErrorList').append('<ion-item><ion-text color="danger">'+error+"</ion-text></ion-item>")
    $('#submitQuestionErrorList').show()
}

function validateQuestionInput(questionData){
    var valid = true
    if (questionData.question_name == null || questionData.question_name.length < 5){
        displaySubmitQuestionError('Question name too short.')
        valid = false
    }
    if (questionData.question == null || questionData.question_name.length < 5){
        displaySubmitQuestionError('Question too short.')
        valid = false
    }
    if (questionData.answer1 == null || questionData.answer1.length < 5){
        displaySubmitQuestionError('First answer too short.')
        valid = false
    }
    if (questionData.answer2 == null || questionData.answer2.length < 5){
        displaySubmitQuestionError('Secpond answer too short.')
        valid = false
    }
    if (questionData.answer3 == null || questionData.answer3.length < 5){
        displaySubmitQuestionError('Third answer too short.')
        valid = false
    }
    if (questionData.answer3 == null || questionData.answer3.length < 5){
        displaySubmitQuestionError('Fourth answer too short.')
        valid = false
    }
    return valid
}

function clearQuestionInput(){
    $('#questionNameInput').val('')
    $('#questionTextInput').val('')
    $('#firstAnswerInput').val('')
    $('#secondAnswerInput').val('')
    $('#thirdAnswerInput').val('')
    $('#fourthAnswerInput').val('')
    $('#correctAnswerSelect').val('')
}

function displayQuestion(questionData, questionCounter){
    $('#questionsList').append('<ion-item><ion-text color="dark">'+questionCounter+'. '+questionData.question_name+'</ion-text><ion-item>')
}

function clearSubmitPollErrors(){
    clearNewPollError()
    clearSubmitQuestionErrors()
}

function clearSubmitPollInput(){
    clearQuestionInput()
    $('#pollNameInput').val('')
    $('#questionForm').hide()
    $('#questionsList').html('')
}

function displayPoll(pollData, pollCounter){
    $('#pollList').append('<ion-item><ion-text color="dark">'+pollCounter+'. '+pollData.poll_name+' - '+pollData.poll_id+'</ion-text><ion-item>')
    $('#pollList').show()
    $('#noPollsYetText').hide()
}

$(document).ready(function (){
    assertCookies()

    var username = getCookie('username')
    var token = getCookie('token')

    initComponents(username)
    
    var pollData = {
        poll_id:'',
        poll_name:'',
        questions:[]
    }

    var questionCounter = 0
    var pollCounter = 0

    $('#newPollBtn').click(function (){
        clearNewPollError()
        var pollName = $('#pollNameInput').val()
        if (pollName == null || pollName.length < 5){
            displayNewPollError('Poll name too short.')
            return;
        }
        pollData.poll_name = pollName
        $('#questionForm').show()
    })

    $('#submitQuestionBtn').click(function (){
        clearSubmitQuestionErrors()
        var questionData = {}
        questionData.question_name = $('#questionNameInput').val()
        questionData.question = $('#questionTextInput').val()
        questionData.answer1 = $('#firstAnswerInput').val()
        questionData.answer2 = $('#secondAnswerInput').val()
        questionData.answer3 = $('#thirdAnswerInput').val()
        questionData.answer4 = $('#fourthAnswerInput').val()
        questionData.solution = $('#correctAnswerSelect').val()
        if (!validateQuestionInput(questionData)) return;

        displayQuestion(questionData, questionCounter)
        clearQuestionInput()
        pollData.questions.push(questionData)
        questionCounter += 1
    })

    $('#submitPollBtn').click(function(){
        clearSubmitPollErrors()
        
        $.ajax({
            url:uriApiKey,
            type:"POST",
            crossDomain:true,
            async:false,
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify(pollData),
            success:function (data){
                pollCounter = response.poll_id
            },
            error:function (textStatus){
                error('Error', textStatus)
            }
        })

        console.log(pollData)

        displayPoll(pollData, pollCounter)
        clearSubmitPollInput()
        pollCounter += 1
    })
})