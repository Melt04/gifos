// variables

// Declaraion de funciones

//Eventos

bPrepRecording.addEventListener('click', prepareVideoRecording);
bStartRecording.addEventListener('click', startRecording);
bStopRecording.addEventListener('click', stopRecord);
bCancel.addEventListener('click', backToIndex);
imgClose.addEventListener('click', closeButton);
repeatVideo.addEventListener('click', () => {
  togglePreview();
  togglePanelVideo();
});
buploadGif.addEventListener('click', uploadGif);
videoPreview.addEventListener('timeupdate', updateProgress);
videoControl.addEventListener('click', () => videoPreview.play());
window.addEventListener('load', getPersonalGif);
window.addEventListener('load', changeThemeBody);
//signal.addEventListener('abort', () => console.log('aborted'));
bCancelUpload.addEventListener('click', () => {
  controller.abort();
});
bCopiarGif.addEventListener('click', event => {
  let id = event.target.getAttribute('data-id');
  copyLinkGif(id);
});
bFinGif.addEventListener('click', () => {
  togglePanelVideo();
  togglePanelExito();
});

imgCloseUpload.addEventListener('click', () => controller.abort());
bdescargarGif.addEventListener('click', () => invokeSaveAsDialog(blob));
