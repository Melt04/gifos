// variables

// Declaraion de funciones
function calculateTimeDuration(secs) {
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - hr * 3600) / 60);
  var sec = Math.floor(secs - hr * 3600 - min * 60);
  if (min < 10) {
    min = '0' + min;
  }
  if (sec < 10) {
    sec = '0' + sec;
  }
  if (hr <= 0) {
    return min + ':' + sec;
  }
  return hr + ':' + min + ':' + sec;
}
//Eventos

bPrepRecording.addEventListener('click', prepareVideoRecording);
bStartRecording.addEventListener('click', startRecording);
bStopRecording.addEventListener('click', stopRecord);
bCancel.addEventListener('click', backToIndex);
imgClose.addEventListener('click', closeButton);
repeatVideo.addEventListener('click', togglePreview);
buploadGif.addEventListener('click', uploadGif);
videoPreview.addEventListener('timeupdate', updateProgress);
videoControl.addEventListener('click', () => videoPreview.play());
window.addEventListener('load', getPersonalGif);
