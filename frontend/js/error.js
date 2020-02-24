function initComponents(){
    $('#errorTitle').text('Unexpected error')
    $('#errorMessage').text('Some unexpected error ocurred!')
}

function displayError(errorTitle, errorMessage) {
    if (errorTitle != null && errorTitle.length > 0)
        $('#errorTitle').text(errorTitle)

    if (errorMessage != null && errorMessage.length > 0)
        $('#errorMessage').text(errorMessage)
}

$(document).ready(function (){

    initComponents()

    var errorTitle = getCookie('errortitle')
    var errorMessage = getCookie('errormessage')

    displayError(errorTitle, errorMessage)

})