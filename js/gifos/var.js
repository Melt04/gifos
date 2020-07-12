//Vars
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
let myGifPanel = document.querySelector('.panel-mis-gifos');
