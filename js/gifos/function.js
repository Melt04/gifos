function toggleVideo() {
  videoPreview.src = '';
  panelGifos.classList.toggle('show');
  panelVideo.classList.toggle('show');
  myGifPanel.classList.toggle('show');
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
    let nameGif =
      prompt('Ingrese un nombre para el gif') + '.gif' || 'myGif.gif';

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
    getPersonalGif();
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
  let gifs = localStorage.getItem(GIFS_LOCAL);
  gifs = gifs === null ? [] : JSON.parse(gifs);
  gifs.push(id);
  localStorage.setItem(GIFS_LOCAL, JSON.stringify(gifs));
}

function updateProgress() {
  const progress = document.getElementById('progress');
  let value = 0;
  if (videoPreview.currentTime > 0) {
    value = Math.floor(100 / videoPreview.duration * videoPreview.currentTime);
    videoCurrentTime.innerHTML = calculateTimeDuration(
      videoPreview.currentTime
    );
  }
  progress.style.width = value + '%';
}
function showMyGifs(myGifs) {
  let myGifGrid = document.querySelector('#gridMyGif');
  myGifs.forEach(gif => {
    let original = gif.images.original;
    let img = document.createElement('img');
    img.setAttribute('src', original.url);
    img.setAttribute('width', original.width);
    img.setAttribute('height', original.height);
    myGifGrid.append(img);
  });
}
async function getPersonalGif() {
  let idGif = JSON.parse(localStorage.getItem(GIFS_LOCAL));
  if (!idGif) {
    return;
  }
  let url = idGif.map(v => v + ',').join('');
  let response = await fetch(`${URL_SEARCH_ID}&${API_KEY}&ids=${url}`);
  let { data } = await response.json();

  showGifs(data, gridMyGif, false);
}
