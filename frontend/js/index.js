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
    errorList = $('#loginErrorList')
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

function displayLoginError(error){
    console.log(error)
    var errorList = $('#loginErrorList')
    errorList.append('<ion-item><ion-text color="danger">'+error+'</ion-text></ion-item>')
    errorList.show()
}

function validateGoInput(nickname, pollid){
    clearErrors()
    var valid = true
    if (nickname == null || nickname.length <= 0){
        displayError('You must provide a nickname.')
        valid = false
    }
    if (pollid == null || pollid.length <= 5){
        displayError('You must provide a valid poll identifier.')
        valid = false
    }
    return valid
}

function validateLoginInput(username, password){
    clearErrors()
    var valid = true
    if (username == null || username.length <= 0){
        displayLoginError('You must provide a username.')
        valid = false
    }
    if (password == null || password.length <= 6){
        displayLoginError('You must provide a password larger than 6 characters.')
    }
}

$(document).ready(function (){
    clearCookies()
    initComponents()

    //TODO: RANKING
    $('#rankingBtn').click(function (){
        alert('ranking!')
    })

    $('#goBtn').click(function(){
        var nickname = $('#nicknameInput').val()
        var pollid = $('#pollidInput').val()
        if (!validateGoInput(nickname, pollid)) return;

        // TODO: Llamar a POST /apikey token
        var token = ''

        setCookie('nickname', nickname, 15)
        setCookie('pollid', pollid, 15)
        setCookie('token', token, 15)
        console.log(document.cookie)
        window.location.href = "poll.html";
    })

    $('#loginBtn').click(function(){
        var username = $('#mgrUsername').val()
        var password = $('#mgrPassword').val()
        if (!validateLoginInput(username, password)) return;

        //TODO: Llamar a POST /auth
        var token = ''

        setCookie('username', username, 15)
        setCookie('password', password, 15)
        setCookie('token', token, 15)
        window.location.href = "dashboard.html";
    })
})