
function initComponents(pollid){
    $('#pollidTitle').html(pollid)
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

    assertCookies()

    //var pollid = getCookie('pollid')
    var pollid = 99999

    initComponents(pollid)
    
})