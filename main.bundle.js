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
	    url: "http://api.musixmatch.com/ws/1.1/track.search?q_artist=" + searchArtist + "&page=1&apikey={api_key_aqui}&s_track_rating=desc",
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
	      text = "<div class='result-box'>";
	      for (i = 0; i < len; i++) {
	        var indTrack = trackDetails[i]["track"];
	        text += "<div class='each-track'>" + indTrack["track_name"] + "<br>" + "Track Rating: " + indTrack["track_rating"] + ("<button class='fav' id='fav" + i + "' onclick='saveFavorite(fav" + i + ")'>Favorite</button>") + "</div>";
	      }
	      text += "</div>";
	      document.getElementById("tracks").innerHTML = text;
	    }
	  });
	}

	document.getElementById('fav').addEventListener("click", saveFavorite);

	function saveFavorite(fav) {
	  fav.classList.toggle('clicked');
	}

	window.artistSearch = artistSearch;
	window.saveFavorite = saveFavorite;

/***/ })
/******/ ]);