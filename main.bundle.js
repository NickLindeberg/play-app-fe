/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";

	// This file is in the entry point in your webpack config.
	function artistSearch() {
	  var searchArtist = document.getElementById("artistSrch").value;
	  $.ajax({
	    url: "http://api.musixmatch.com/ws/1.1/track.search?q_artist=" + searchArtist + "&page=1&apikey=6176034f724e926fe5a04c1a915df7ec&s_track_rating=desc",
	    type: "GET",
	    data: {
	      format: 'jsonp',
	      callback: 'jsonp_cb'
	    },
	    dataType: "jsonp",
	    jsonpCallback: 'jsonp_cb',
	    success: function success(details) {
	      var text, len, i;
	      var trackDetails = details["message"]["body"]["track_list"];
	      len = trackDetails.length;
	      text = "<div class='song-result'>";
	      for (i = 0; i < len; i++) {
	        var indTrack = trackDetails[i]["track"];
	        var trkName = indTrack["track_name"];
	        var trkRating = indTrack["track_rating"];
	        text += "<div class='each-track'>" + trkName + "<br>" + "Track Rating: " + trkRating + ("<button class='fav' id='fav" + i + "' onclick='saveFavorite(fav" + i + ")'>Favorite</button>") + "</div>";
	      }
	      text += "</div>";
	      document.getElementById("tracks").innerHTML = text;

	      giveEvents(trackDetails);
	    }
	  });
	}

	function giveEvents(details) {
	  var btn = document.getElementsByClassName("fav");
	  for (var i = 0; i < btn.length; i++) {
	    btn[i].onclick = function (n) {
	      return function () {
	        saveFavorite(btn[n]);
	        alert(details[n]["track"]["track_name"] + " added to favorites!");
	        $.post("https://play-app-nicknaaron.herokuapp.com/api/v1/favorites", {
	          song_name: details[n]["track"]["track_name"],
	          artist_name: details[n]["track"]["artist_name"],
	          rating: details[n]["track"]["track_rating"],
	          genre: details[n]["track"]["primary_genres"]["music_genre_list"][0]["music_genre"]["music_genre_name"]
	        });
	      };
	    }(i);
	  };
	}

	function saveFavorite(fav) {
	  fav.classList.add('clicked');
	}

	function showFavorites() {
	  $.get('https://play-app-nicknaaron.herokuapp.com/api/v1/favorites').then(function (details) {
	    var text, len, i;
	    var tracks = details;
	    len = tracks.length;
	    text = "<div class='favorite-results'>";
	    for (i = 0; i < len; i++) {
	      var indTrack = tracks[i];
	      var trkName = indTrack["song_name"];
	      var trkArtist = indTrack["artist_name"];
	      var trkGenre = indTrack["genre"];
	      var trkRating = indTrack["rating"];
	      // debugger;
	      text += "<div class='each-song'>" + trkName + " Artist: " + trkArtist + "<br>" + "Genre: " + trkGenre + " Track Rating: " + trkRating + "</div>";
	    }
	    text += "</div>";
	    document.getElementById("songs").innerHTML = text;
	  });
	}

	showFavorites();

	window.artistSearch = artistSearch;
	window.saveFavorite = saveFavorite;
	window.showFavorites = showFavorites;

/***/ })
/******/ ]);