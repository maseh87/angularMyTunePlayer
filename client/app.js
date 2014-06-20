angular.module('my-app', [

])
.config(function($sceDelegateProvider, $sceProvider) {
  $sceProvider.enabled(false);
})

.controller('SongController', function($scope, musicService) {

})

.factory('musicService', function() {
  var songData = [
    {
      url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3",
      title: "One In A Million",
      artist: "Aaliyah",
    },
    {
      url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/03+Age+Ain%27t+Nothing+But+A+Number.mp3",
      title: "Yall homies Ain't Nothing But A Number",
      artist: "Aaliyah",
    },
    {
      url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/05+Hot+Like+Fire.mp3",
      title: "Hot Like Fire",
      artist: "Aaliyah",
    },
    {
      url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/06+If+Your+Girl+Only+Knew.mp3",
      title: "If Your Girl Only Knew",
      artist: "Aaliyah",
    }
  ];
  return songData;
})

.directive('musicPlayer', function(musicService, $sce) {
  return {
    restrict: 'EA',
    scope: true,
    replace: true,
    templateUrl: 'client/views/musicPlayer.html',
    link: function(scope, element, attr) {
      scope.src = "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3";
      var audioTag = element.find('audio');
      scope.songs = musicService;
      scope.play = function(url) {
        console.log(url);
        scope.src = musicService[1].url;
        audioTag[0].src = url;
      };
      audioTag.bind('play', function() {

      })
    }
  }
})












