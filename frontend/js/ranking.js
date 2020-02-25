function assertCookies() {
    var pollid = getCookie('pollid')

    if (pollid == null || pollid.length <= 0)
        error('Invalid input', 'Must provide a valid poll id.')
}

$(document).ready(function (){
    assertCookies()

    var uriRanking = "http://localhost:8080/ukahootapi/demo/hello/ranking/"

    var pollid = getCookie('pollid')
    var rankData = {}

    $.ajax({
        url:(uriRanking+pollid),
        type:"GET",
        crossDomain:true,
        async:false,
        success:function (data){
            rankData = data
        },
        error:function (textStatus){
            error('Error', textStatus)
        }
    })

    $('#pollNameTitle').text(rankData.poll_name)

    var highScoresList = $('#highScoresList')
    rankData.ranks.forEach(function (rank, index, array){
        highScoresList.append(
            '<ion-row class="parent-row">'+
            '<ion-col size=6><ion-item><ion-text>'+(index+1)+'. '+rank.user_name+'</ion-text></ion-item></ion-col>'+
            '<ion-col size=6><ion-item><ion-text>'+rank.score+'</ion-text></ion-item></ion-col>'+
            '</ion-row>')
    })
})