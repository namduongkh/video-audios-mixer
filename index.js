import VideoAudiosMixer from "./src/video_audios_mixer";

(function () {
  let mixer = new VideoAudiosMixer('./assets/video.mp4', [{
    file: './assets/hello.mp3',
    ms: 1000
  }, {
    file: './assets/phong.mp3',
    ms: 3000
  }]);

  mixer.perform('./output/output.mp4');
})();