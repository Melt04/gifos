const URL_UPLOAD = 'https://upload.giphy.com/v1/gifs?';
const API_KEY = '&api_key=5LJ4ojAQUiIR6u01vCaBsPf60XqoN0ae';
let bRecording = document.querySelector('#recording');
let gifosVideo = document.querySelector('#gifosVideo');
let stop = document.querySelector('#stop');

let recorder;
let constraints = { video: { width: 720, height: 360 } };
async function startRecording(constraints) {
  let stream = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    gifosVideo.srcObject = stream;
    recorder = new RecordRTCPromisesHandler(stream, { type: 'gif' });
    recorder.startRecording();
  } catch (err) {
    /* handle the error */
  }
}
async function stopRecording() {
  try {
    await recorder.stopRecording();
    let blob = await recorder.getBlob();
    let formData = new FormData();
    formData.append('file', blob, 'myGif.gif');
    console.log(formData.get('file'));
    let response = await fetch(`${URL_UPLOAD}${API_KEY}`, {
      method: 'POST',
      body: formData,
      mode: 'cors',
    });
    let data = await response.json();
    console.log(data);

    gifosVideo.pause();
    gifosVideo.srcObject = null;
  } catch (error) {
    console.log(error);
  }
}

bRecording.addEventListener('click', () => startRecording(constraints));
stop.addEventListener('click', stopRecording);
