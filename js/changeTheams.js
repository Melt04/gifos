let bLightTheme = document.querySelector('#lightTheme');
let bDarkTheme = document.querySelector('#darkTheme');

bLightTheme.classList.add('active');
function changeTheme() {
  if (this.classList.contains('active')) {
    return;
  } else {
    bLightTheme.classList.remove('active');
    bDarkTheme.classList.remove('active');
  }
  this.classList.add('active');
  let changeTheme = document.getElementsByClassName('change');
  for (let i = 0; i < changeTheme.length; i++) {
    if (changeTheme[i].nodeName == 'BUTTON') {
      changeTheme[i].classList.toggle('darkButton');
    } else {
      changeTheme[i].classList.toggle('darkBar');
    }
  }
  let body = document.querySelector('body');
  let gifosLabel = document.querySelector('#gifosLabel');
  gifosLabel.classList.toggle('dark-label');
  body.classList.toggle('body-dark');
  let arrowAtributte = arrowImage.getAttribute('src');
  //Cambiar entre las  dropdown
  if (arrowAtributte === './assets/dropdown.svg') {
    arrowImage.setAttribute('src', './assets/dropdownDark.svg');
  } else {
    arrowImage.setAttribute('src', './assets/dropdown.svg');
  }
}
