function clearCookies(){
    var dateExpired = new Date()
    dateExpired.setMinutes(dateExpired.getMinutes() - 1)
    document.cookie = 'nickname=any; expires='+dateExpired
    document.cookie = 'pollid=any; expires='+dateExpired
    document.cookie = 'token=any; expires='+dateExpired
}

function clearErrors(){
    var errorList = $('#errorList')
    errorList.html('')
    errorList.hide()
}

function initComponents(){
    clearErrors()
    
    $('#nicknameInput').val('')
    $('#pollidInput').val('')
}

function displayError(error){
    console.log(error)
    var errorList = $('#errorList')
    errorList.append('<ion-item><ion-text color="danger">'+error+'</ion-text></ion-item>')
    errorList.show()
}

function validateGoInput(nickname, pollid){
    clearErrors()
    var valid = true
    if (nickname == null || nickname.length <= 0){
        displayError('You must provide a nickname')
        valid = false
    }
    if (pollid == null || pollid.length <= 5){
        displayError('You must provide a valid poll identifier.')
        valid = false
    }
    return valid
}

$(document).ready(function (){
    clearCookies()
    initComponents()

    $('#rankingBtn').click(function (){
        alert('ranking!')
    })

    $('#goBtn').click(function(){

        // Llamar a get apikey token
        var token = ''
        
        var nickname = $('#nicknameInput').val()
        var pollid = $('#pollidInput').val()
        if (!validateGoInput(nickname, pollid)) return;

        setCookie('nickname', nickname, 15)
        setCookie('pollid', pollid, 15)
        setCookie('token', token, 15)
        console.log(document.cookie)

        // Navigate to go! page
        window.location.href = "poll.html";
    })
})