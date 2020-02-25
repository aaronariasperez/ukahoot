function assertCookies() {
    var username = getCookie('username')
    var token = getCookie('token')

    if (username == null || username.length <= 0)
        error('Invalid input', 'Must provide a username.')
    if (token == null || token.length <= 5)
        error('Forbidden access', 'Area restricted. Invalid session token.')
}

$(document).ready(function (){
    //TODO: Activar assertCookies
    //assertCookies()

    
})