function setCookie(cookieName, cookieValue, expiresInMinutes){
    var expires = new Date()
    expires.setMinutes(expires.getMinutes() + expiresInMinutes)
    document.cookie = cookieName+'='+cookieValue+'; expires='+expires
}

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

function error(errorTitle, errorMessage){
    setCookie('errortitle', errorTitle, 1)
    setCookie('errormessage', errorMessage, 1)

    window.location.href = "error.html";
}