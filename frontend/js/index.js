$(document).ready(function (){
    /* cookie snippet
    var date = new Date()
    date.setMinutes(date.getMinutes() + 5)
    console.log('username=John Doe; expires=' + date)
    document.cookie = 'username=John Doe; expires=' + date
    */

    $('#rankingBtn').click(function (){
        alert('ranking!')
    })

    $('#goBtn').click(function(){

        // Llamar a get apikey token
        var token = 'thisisamocktoken'
        
        var nickname = $('#nicknameInput').val()

        var expires = new Date()
        expires.setMinutes(expires.getMinutes() + 15)
        document.cookie = 'nickname='+nickname+'; expires='+expires
        document.cookie = 'token='+token+'; expires='+expires
        console.log(document.cookie)

        // Navigate to go! page
        window.location.href = "poll.html";
    })
})