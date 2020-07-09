const URL_UPLOAD = 'https://upload.giphy.com/v1/gifs?';
const API_KEY = '&api_key=5LJ4ojAQUiIR6u01vCaBsPf60XqoN0ae';
let bRecording = document.querySelector('#recording');
let gifosVideo = document.querySelector('#gifosVideo');
let stop = document.querySelector('#stop');
let panelGifos = document.querySelector('.crear-gifos');
let panelVideo = document.querySelector('.panel-video-gifos');
let bComenzar = document.querySelector('#startRecording');
let bDetener = document.querySelector('#stopRecording');
let img = document.querySelector('#gifPreview');
let url;
let recorder;
let stream = null;
/* function calculateTimeDuration(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    if(hr <= 0) {
        return min + ':' + sec;
    }

    return hr + ':' + min + ':' + sec;
}
*/

async function createMedia() {
  let constraints = {
    video: { width: 700, height: 300 },
  };
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    gifosVideo.srcObject = stream;
    recorder = new RecordRTCPromisesHandler(stream, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      height: 240,
    });
    recorder.stream = stream;
    console.log('media creada');
  } catch (err) {
    console.log(err);
  }
}

async function prepareVideoRecording() {
  panelGifos.style.display = 'none';
  panelVideo.style.display = 'block';
  bComenzar.style.display = 'block';
  /* await createMedia(); */
  let constraints = {
    video: { width: 700, height: 300 },
  };
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    gifosVideo.srcObject = stream;
  } catch (e) {}
}

async function startRecording() {
  img.src = '';

  await createMedia();

  gifosVideo.srcObject = stream;

  recorder.startRecording();
}
async function stopRecord() {
  await recorder.stopRecording();
  let blob = await recorder.getBlob();
  img.src = URL.createObjectURL(blob);
}
async function stopRecording() {
  try {
    await recorder.stopRecording();
    let blob = await recorder.getBlob();
    let formData = new FormData();
    formData.append('file', blob, 'myGif.gif');

    let response = await fetch(`${URL_UPLOAD}${API_KEY}`, {
      method: 'POST',
      body: formData,
    });
    let data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

bRecording.addEventListener('click', prepareVideoRecording);
bComenzar.addEventListener('click', startRecording);
bDetener.addEventListener('click', stopRecord);
