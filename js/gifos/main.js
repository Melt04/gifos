// variables
let url;
let recorder;
let stream;
let recorderVideo = null;
let recorderGif = null;
let timeDuration = 0;
let intervalID;

// Elementos DOM

let bPrepRecording = document.querySelector('#prepRecording');
let gifosVideo = document.querySelector('#gifosVideo');
let panelVideoRecording = document.querySelector('.panel-video-grabar');
let panelGifos = document.querySelector('.crear-gifos');
let panelVideo = document.querySelector('.panel-video-gifos');
let bStartRecording = document.querySelector('#startRecording');
let bStopRecording = document.querySelector('#stopRecording');
let panelVideoReady = document.querySelector('.panel-video-listo');
let panelVideoPreview = document.querySelector('.panel-video-preview');
let videoPreview = document.querySelector('#videoPreview');
let bCancel = document.querySelector('#cancel');
let imgClose = document.querySelector('#imgClose');
let repeatVideo = document.querySelector('#repeatGif');
let buploadGif = document.querySelector('#uploadGif');
let videoControl = document.querySelector('.video-control');
let videoCurrentTime = document.querySelector('#videoTime');

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
function toggleVideo() {
  videoPreview.src = '';
  panelGifos.classList.toggle('show');
  panelVideo.classList.toggle('show');
}
function toggleRecording() {
  bStopRecording.style.display =
    bStopRecording.style.display === 'block' ? 'none' : 'block';
  panelVideoRecording.classList.toggle('show-flex');
  panelVideoReady.classList.toggle('show-flex');
  if (bStopRecording.hasAttribute('disabled')) {
    bStopRecording.removeAttribute('disabled');
  } else {
    bStopRecording.setAttribute('disabled', 'true');
  }
}
function togglePreview() {
  panelVideo.classList.toggle('show');
  panelVideoPreview.classList.toggle('show');
}
function backToIndex() {
  window.location = '/';
}

async function createMedia() {
  try {
    recorderVideo = new RecordRTCPromisesHandler(stream, {
      type: 'video',
      frameRate: 1,
      quality: 10,
      width: 360,
      height: 240,
    });
    recorderVideo.stream = stream;
    recorderGif = new RecordRTCPromisesHandler(stream, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
    });
    recorderGif.stream = stream;
  } catch (err) {
    console.log(err);
  }
}

async function prepareVideoRecording() {
  toggleVideo();
  let constraints = {
    video: { width: 700, height: 300 },
  };
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    gifosVideo.srcObject = stream;
  } catch (e) {
    console.log(e);
  }
}

async function startRecording() {
  videoPreview.src = '';
  intervalID = setInterval(() => timeDuration++, 1);
  await createMedia();
  gifosVideo.srcObject = stream;
  recorderVideo.startRecording();
  recorderGif.startRecording();
  toggleRecording();
}
async function stopRecord() {
  toggleRecording();
  togglePreview();
  clearInterval(intervalID);
  console.log(timeDuration);
  await recorderVideo.stopRecording();
  await recorderGif.stopRecording();
  let blob = await recorderVideo.getBlob();
  videoPreview.src = URL.createObjectURL(blob);
}
async function uploadGif() {
  try {
    let blob = await recorderGif.getBlob();
    let formData = new FormData();
    formData.append('file', blob, 'myGif.gif');
    let response = await fetch(`${URL_UPLOAD}${API_KEY}`, {
      method: 'POST',
      body: formData,
    });
    let data = await response.json();
    saveToLocalStorage(data.data.id);

    alert('Tu gifo se ha subido con exito 👍👍');
    videoPreview.src = '';

    togglePreview();
  } catch (error) {
    console.log(error);
  }
}

async function closeButton() {
  toggleVideo();
  if (recorderVideo) {
    recorderVideo.stopRecording();
    toggleRecording();
  }
}

function saveToLocalStorage(id) {
  let gifs = localStorage.getItem('misGifs');
  gifs = gifs === null ? [] : JSON.parse(gifs);
  gifs.push(id);
  localStorage.setItem('misGifs', JSON.stringify(gifs));
}

function updateProgress() {
  const progress = document.getElementById('progress');
  let value = 0;
  console.log(2);
  if (videoPreview.currentTime > 0) {
    value = Math.floor(100 / videoPreview.duration * videoPreview.currentTime);
    videoCurrentTime.innerHTML = calculateTimeDuration(
      videoPreview.currentTime
    );
  }
  progress.style.width = value + '%';
}

// Eventos

bPrepRecording.addEventListener('click', prepareVideoRecording);
bStartRecording.addEventListener('click', startRecording);
bStopRecording.addEventListener('click', stopRecord);
bCancel.addEventListener('click', backToIndex);
imgClose.addEventListener('click', closeButton);
repeatVideo.addEventListener('click', togglePreview);
buploadGif.addEventListener('click', uploadGif);
videoPreview.addEventListener('timeupdate', updateProgress);
videoControl.addEventListener('click', () => videoPreview.play());
