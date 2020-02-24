

function clearErrors(){
    $('#errorList').html('')
    $('#errorBox').hide()
}

function initComponents(){
    clearErrors()
}

function displayError(error) {
    console.log(error)
    $('#errorList').append('<ion-item><ion-text>'+error+'</ion-text></ion-item>')
    $('#errorBox').show()
}

function assertCookies() {
    var nickname = getCookie('nickname')
    var token = getCookie('token')

    if (nickname == null || nickname.length <= 0)
        displayError('You must provide an nickname')
    if (token == null || token.length <= 5)
        displayError('Area restricted. Invalid session token.')
}

$(document).ready(function (){
    initComponents()
    assertCookies()



})