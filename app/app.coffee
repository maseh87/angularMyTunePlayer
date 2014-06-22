app = angular.module "my-app", []

app.config ($sceProvider) ->
  $sceProvider.enabled false


app.controller "SongController", ($scope, musicService) ->


app.factory 'musicService', ->
  songData = [
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
  ]
  return songData


app.directive 'musicPlayer', (musicService, $sce) ->
  restrict: 'EA'
  scope: true
  replace: true
  templateUrl: 'views/musicPlayer.html'
  link: (scope, element, attr) ->
    currentTime = 0
    duration = 0
    audioTag = element.find 'audio'
    scope.toggle = 'play'
    scope.playToggle = ->
      if scope.toggle == 'play'
        scope.play scope.song
        scope.toggle = 'pause'
      else
        audioTag[0].pause
        scope.toggle = 'play'
    scope.songs = musicService
    scope.song = scope.songs[0]
    scope.play = (song) ->
      scope.toggle = 'pause'
      scope.song.playing = false
      scope.song = song
      scope.song.playing = true
      audioTag[0].src = scope.song.url
    scope.next = ->
      index = scope.songs.indexOf scope.song
      length = scope.songs.length
      if index + 1 == length
        index = -1
      scope.song.playing = false
      scope.song = scope.songs[index + 1]
      scope.play scope.song
    scope.previous = ->
      length = scope.songs.length
      index = scope.songs.indexOf scope.song
      if index - 1 < 0
        scope.song.playing = false
        scope.song = scope.songs[index - 1]
        scope.play scope.song
    audioTag.bind 'ended', ->
      scope.next
    scope.player = {}
    num = 1
    audioTag.bind 'timeupdate', (e) ->
      scope.$apply ->
        currentTime = audioTag[0].currentTime
        duration = audioTag[0].duration
        scope.player.time = currentTime/duration * 60
















