var hotelsInfo, brand;
var recentlyView = [];
function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200)
        return request.responseText;
};
hotelsInfo = JSON.parse(readJSON('https://api.myjson.com/bins/kptjn'));
brand = JSON.parse(readJSON('https://api.myjson.com/bins/7x6zf'));

function searchTable(inputVal) {
    var table = $('#tblData');
    table.find('tr').each(function (index, row) {
        var allCells = $(row).find('td:first');
        if (allCells.length > 0) {
            var found = false;
            allCells.each(function (index, td) {
                var regExp = new RegExp(inputVal, 'i');
                if (regExp.test($(td).text())) {
                    found = true;
                    return false;
                }
            });
            if (found == true) $(row).show(); else $(row).hide();
        }
    });
}
function moreInfo(hotelId) {
    closeMoreInfo();
    var selectedOutput = "";
    $('#cover').css('display', 'block');
    $('#moreInfo').css('display', 'block');
    selectedOutput += "<h2>" + hotelsInfo[hotelId].name + "</h2>";
    selectedOutput += "<ul>";
    selectedOutput += "<li>" + hotelsInfo[hotelId].address.address + "</li>";
    selectedOutput += "<li>" + hotelsInfo[hotelId].address.country + "</li>";
    selectedOutput += "<li>" + hotelsInfo[hotelId].address.city + "</li>";
    selectedOutput += "<li>" + hotelsInfo[hotelId].details.starRating.txt + "</li>";
    selectedOutput += "<li>" + hotelsInfo[hotelId].details.brand.txt + "</li>";
    selectedOutput += "<li>" + hotelsInfo[hotelId].details.checkIn + "</li>";
    selectedOutput += "<li>" + hotelsInfo[hotelId].details.checkOut + "</li>";
    selectedOutput += "<li>" + hotelsInfo[hotelId].details.currency + "</li>";
    selectedOutput += "<li>" + hotelsInfo[hotelId].details.numOfRooms + "</li>";
    selectedOutput += "</ul>";
    selectedOutput += "<ul>";
    for (i = 0; i < hotelsInfo[hotelId].amenities.length; i++) {
        selectedOutput += "<li>" + hotelsInfo[hotelId].amenities[i].txt + "</li>";
    }
    selectedOutput += "</ul>";
    selectedOutput += "<img src='" + hotelsInfo[hotelId].images[0].url + "'/>";
    $(selectedOutput).insertBefore('#recent');
    var today = new Date();
    var viewDate =  today.toDateString() + " " + today.getHours() + ':' + today.getMinutes();
;

    if (recentlyView.includes(hotelsInfo[hotelId].name)) {
        return false
    }
    else {
        recentlyView.push(hotelsInfo[hotelId].name);
        $("#moreInfo #recent").append("<li onclick='moreInfo(" + hotelId + ")'><b>" + hotelsInfo[hotelId].name  + "</b><br/>" + viewDate +"</li>")
    }
}

function closeMoreInfo() {
    $('#moreInfo').css('display', 'none');
    $('#cover').css('display', 'none');
    $('#moreInfo').contents(':not(p,ol,h3)').remove();

}
function checkBrand() {
    var value = document.getElementById("brands").value;

    $("#tblData tr").each(function (index) {
        if (index != 0) {
            $row = $(this);
            var id = $row.find("td:nth-last-child(2)").text();
            if (id.indexOf(value) != 0) {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        }
    });
}

$(document).ready(function () {
     $('#brands').append("<option value=''>All Brands</option>");
    for (i = 0; i < brand.length; i++) {
        $('#brands').append("<option value='" + brand[i].txt + "'>" + brand[i].txt) + "</option>";
    }
    var output = "";
    for (var i in hotelsInfo) {
        output += "<tr>";
        output += "<td><a onclick='moreInfo(" + i + ")'>" + hotelsInfo[i].name + "</a></td>";
        output += "<td>" + hotelsInfo[i].address.country + "</td>";
        output += "<td>" + hotelsInfo[i].address.city + "</td>";
        output += "<td>" + hotelsInfo[i].details.starRating.txt + "</td>";
        output += "<td>" + hotelsInfo[i].details.brand.txt + "</td>";
        output += "<td><a class='remove'title='Remove from list'>[-]</a></td>";
        output += "</tr>";
    }
    $("#hotels table").append(output); // append tr
    $('#search').keyup(function () {
        searchTable($(this).val());
    });
$(".remove").click(function(event) {
    $(this).closest("tr").remove(); // remove row
    return false; // prevents default behavior
   });

});


