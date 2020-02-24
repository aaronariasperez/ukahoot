function getCookie(name) {
    var nameEQ = name + "=";
    //alert(document.cookie);
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') { 
            c = c.substring(1);
        }
        if (c.indexOf(nameEQ) != -1) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function initComponents(){
    var errorList = $('#errorList')
    errorList.html('')
    errorList.hide()
}

function displayError(error) {
    console.log(error)
    $('#errorList').append('<ion-item><ion-text>'+error+'</ion-text></ion-item>')
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

    assertCookies()


})