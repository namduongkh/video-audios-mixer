import ffmpeg from "fluent-ffmpeg";

export default class VideoAudiosMixer {

  /**
   * 
   * @param {*} video video path
   * @param {*} audios array object audio {file: path, ms: miliseconds}
   */
  constructor(video, audios = []) {
    this.video = video;
    this.audios = audios;
  }

  perform(outputName = './output/output.mp4') {
    let command = ffmpeg(this.video);
    let delayCommand = '';
    let mixCommand = '';
    let audioIndex = 0;

    for (let i in this.audios) {
      let audio = this.audios[i];
      if (!audio.file) continue;

      let ms = audio.ms || 0;
      command = command.input(audio.file);
      audioIndex += 1;
      delayCommand += `[${audioIndex}]adelay=${ms}|${ms}[a${audioIndex}];`;
      mixCommand += `[a${audioIndex}]`;
      console.log('Add ', audio.file, ' at ', ms, ' ms');
    }

    let filterCommand = `${delayCommand}[0]${mixCommand}amix=${audioIndex + 1}`;

    command
      .complexFilter([filterCommand])
      .on('error', function (err) {
        console.log('An error occurred: ' + err.message);
      })
      .on('end', function () {
        console.log('Mix finished!', outputName);
      })
      .save(outputName);
  }
}
