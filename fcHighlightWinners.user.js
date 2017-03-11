// ==UserScript==
// @author         friendly-trenchcoat
// @name           Reddit - Food Club Highlight Winners
// @description    Enter the winners in the textbox. Each bet table will have winning bets highlighted, and total winnings added up.
// @include        https://www.reddit.com/r/neopets/comments/*/food_club_bets_*
// @require	       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

function highlight(winners){
    var cell;
    var winAmt;
    $("tbody").each(function(k,v) { // for each table
        winAmt = 0;
        $(v).children().each(function(k,v) { // for each row
            if ($(v).children().length == 8){      // (if it's actually a bet table)
                for (var i=1; i<6; i++){           // for each column
                    cell = $(v).children().eq(i);
                    if (!(winners.includes(cell.text())) && cell.text() !== '') { // if the cell contains a pirate that's not a winner
                        return true; // skip to next row
                    }
                }
                cell = $(v).children().eq(6);
                winAmt += parseInt(cell.text());
                $(v).css("background-color", "#ffc");
            }
        });
        console.log(winAmt);
        $(v).parent().parent().prepend('<h1>'+winAmt+':'+$(v).children().length+'</h1>');
    });
}
function unhighlight(){
    $("tbody").children().each(function(k,v) { // for each row
        if ($(v).children().length == 8){      // (if it's actually a bet table)
            $(v).removeAttr("style");
        }
    });
}
var submitButton = $('<button/>', {
    text: "go",
    id: "submitButton",
    click: function () {
        highlight( $('#winnersBox').val() );
        if (!$('#winnersBox').val()) $('#winnersButton').text( "highlight winners" );
        else $('#winnersButton').text( $('#winnersBox').val() );
        $('#winnersBox').hide();
        $(this).hide();
        $('#winnersButton').show();
    }
});
var winnersButton = $('<button/>', {
    text: "highlight winners",
    id: "winnersButton",
    click: function () {
        $(this).hide();
        $('#submitButton').show();
        $("[class='sitetable nestedlisting']").prepend('<textarea type="text" id="winnersBox" value="">');
        $('#winnersBox').css({"position":"fixed", "top":"70px", "left":"0px", "z-index":"100"});
        unhighlight();
    }
});
$("textarea[name='text']").css("z-index", "99");
$("[class='sitetable nestedlisting']").prepend(winnersButton);
$('#winnersButton').css({"position":"fixed", "top":"70px", "left":"0px", "z-index":"100"});
$("[class='sitetable nestedlisting']").prepend(submitButton);
$('#submitButton').css({"position":"fixed", "top":"66px", "left":"190px", "z-index":"100"});
$('#submitButton').hide();
