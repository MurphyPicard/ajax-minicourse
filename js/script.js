
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetStr = $('#street').val();
    var cityStr =   $('#city').val();
    var address =   streetStr + ", " + cityStr;

    $greeting.text('You want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x600&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // YOUR CODE GOES HERE!
    var nytimesURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&sort=newest&api-key=38bdaa7810e543cd8a816692dde07893";

    $.getJSON(nytimesURL, function(data){
        console.log(data.response.docs);
        $nytHeaderElem.text('New York times articles about ' + cityStr.charAt(0).toUpperCase() + cityStr.slice(1) + ":");
        // string.charAt(0).toUpperCase() + string.slice(1);

        for(var doc = 0; doc < data.response.docs.length; doc ++){
            $nytElem.append('<li id="list' + doc + '"></li>');
            $('#list' + doc + '').append('<a href="' + data.response.docs[doc].web_url + '" id="atag' + doc + '"></a>')
            $('#atag' + doc + '').text(data.response.docs[doc].headline.main);

            $('#list' + doc + '').append('<p  id="ptag' + doc + '"></p>')
            $('#ptag' + doc + '').text(data.response.docs[doc].snippet);
            $('#list' + doc + '').append('<br>');


        }//for

    });// getJSON


    return false;
}






$('#form-container').submit(loadData);

// keyNYT = 38bdaa7810e543cd8a816692dde07893

// googlemapskey = AIzaSyC5vO3D-xVvc_8TFg769DRexNDre9N89z0
