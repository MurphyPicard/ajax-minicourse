
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

    // googlemapskey = AIzaSyC5vO3D-xVvc_8TFg769DRexNDre9N89z0
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x600&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    var keyNYT = '38bdaa7810e543cd8a816692dde07893'
    var nytimesURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&sort=newest&api-key=" + keyNYT + "";

    $.getJSON(nytimesURL, function(data){

        $nytHeaderElem.text('New York times articles about ' +
                             cityStr.charAt(0).toUpperCase() +
                             cityStr.slice(1) + ":");

        articles = data.response.docs; // an array of articles
        for(var doc = 0; doc < articles.length; doc ++){
            var article = articles[doc];

            // $nytElem targets the ul
            $nytElem.append('<li id="list' + doc + '">' +
                              '<a href="' + article.web_url + '">' +
                                article.headline.main + '</a>' +
                              '<p>' + article.snippet + '</p>' + '<br>' +
                            '</li>');
        } //for
    }) // getJSON // WORKS too but much neater
    .error(function(e){
        $nytHeaderElem.text("Sorry there was an error.  Is your internet working ok?");
    });
    // $.getJSON(nytimesURL, function(data){
    //     console.log(data.response.docs);
    //     $nytHeaderElem.text('New York times articles about ' + cityStr.charAt(0).toUpperCase() + cityStr.slice(1) + ":");
    //     // string.charAt(0).toUpperCase() + string.slice(1);
    //     articles = data.response.docs;
    //     for(var doc = 0; doc < articles.length; doc ++){
    //         var article = articles[doc];
    //         $nytElem.append('<li id="list' + doc + '"></li>');
    //         $('#list' + doc + '').append('<a href="' + article.web_url + '" id="atag' + doc + '"></a>')
    //         $('#atag' + doc + '').text(article.headline.main);
    //
    //         $('#list' + doc + '').append('<p  id="ptag' + doc + '"></p>')
    //         $('#ptag' + doc + '').text(article.snippet);
    //
    //         $('#list' + doc + '').append('<br>');
    //     }//for
    // });// getJSON // WORKS, just keeping to view later.

    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';

    $.ajax({
      url: wikiURL,
      dataType: 'jsonp',
      success: function(response){
        console.log("this is response: " + response[1]);
        var articleList = response[1];

        for( var i = 0; i < articleList.length; i++){
          articleStr = articleList[i];
          var url = 'http://en.wikipedia.org/wiki/' + articleStr;
          $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
          console.log("this is articleList[i]: " + articleList[i]);
        }
      }
    }); // ajax

    return false;
} // loadData

$('#form-container').submit(loadData);
