angular.module('my-app', [])


.config(function($sceProvider) {
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
      playing: 'false'
    },
    {
      url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/03+Age+Ain%27t+Nothing+But+A+Number.mp3",
      title: "Yall homies Ain't Nothing But A Number",
      artist: "Aaliyah",
      playing: 'false'

    },
    {
      url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/05+Hot+Like+Fire.mp3",
      title: "Hot Like Fire",
      artist: "Aaliyah",
      playing: 'false'

    },
    {
      url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/06+If+Your+Girl+Only+Knew.mp3",
      title: "If Your Girl Only Knew",
      artist: "Aaliyah",
      playing: 'false'

    }
  ];
  return songData;
})

.directive('musicPlayer', function(musicService, $sce) {
  return {
    restrict: 'EA',
    scope: true,
    replace: true,
    templateUrl:'views/musicPlayer.html',
    link: function(scope, element, attr) {
      var currentTime, duration;
      var audioTag = element.find('audio');
      scope.toggle = 'play';
      scope.playToggle = function() {
        if(scope.toggle === 'play') {
          scope.play(scope.song);
          scope.toggle = 'pause';
        } else {
          audioTag[0].pause();
          scope.toggle = 'play';
        }
      };
      scope.songs = musicService;
      scope.song = scope.songs[0];
      scope.play = function(song) {
        scope.toggle = 'pause';
        scope.song.playing = false;
        scope.song = song;
        scope.song.playing = true;
        audioTag[0].src = scope.song.url;
        console.log(audioTag);

      };
      scope.next = function() {
        var length = scope.songs.length;
        var index = scope.songs.indexOf(scope.song);
        if (index + 1 === length) {
          // start over
          index = -1;
        }
        scope.song.playing = false;
        scope.song = scope.songs[index + 1];
        scope.play(scope.song);
      };

      audioTag.bind('ended', function() {
        scope.next();
      })
      scope.player ={};
      var num = 1;
      audioTag.bind('timeupdate', function (e) {
        scope.$apply(function () {

          currentTime = audioTag[0].currentTime;
          duration = audioTag[0].duration;
          scope.player.time = currentTime/duration * 60;
          console.log(duration);
        });
      });
    }
  }
})












