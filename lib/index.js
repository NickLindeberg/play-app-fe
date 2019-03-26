// This file is in the entry point in your webpack config.
function artistSearch() {
  const searchArtist = document.getElementById("artistSrch").value;
  $.ajax({
    url: `http://api.musixmatch.com/ws/1.1/track.search?q_artist=${searchArtist}&page=1&apikey={api_key_aqui}&s_track_rating=desc`,
    type: "GET",
    data: {
            format: 'jsonp',
            callback: 'jsonp_cb'
          },
    dataType: "jsonp",
    jsonpCallback: 'jsonp_cb',
    success: function(details) {
      var text, len, i;
      var trackDetails = details["message"]["body"]["track_list"];
        len = trackDetails.length;
        text = "<div class='result-box'>";
        for (i = 0; i < len; i++) {
          var indTrack = trackDetails[i]["track"];
          text += "<div class='each-track'>" + indTrack["track_name"] + "<br>"
          + "Track Rating: " + indTrack["track_rating"] +
          `<button class='fav' id='fav${i}' onclick='saveFavorite(fav${i})'>Favorite</button>`
          + "</div>";
        }
        text += "</div>";
        document.getElementById("tracks").innerHTML = text;
      },
    }
  );
}

document.getElementById('fav').addEventListener("click", saveFavorite);

function saveFavorite(fav) {
  fav.classList.toggle('clicked');
}

window.artistSearch = artistSearch;
window.saveFavorite = saveFavorite;
