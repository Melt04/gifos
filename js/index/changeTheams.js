let bLightTheme = document.querySelector('#lightTheme');
let bDarkTheme = document.querySelector('#darkTheme');

let imgMainLogo = document.querySelector('#mainLogo');

// Por defecto el theme empieza  en Light
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

  //Cambiar entre las  dropdown ./assets/gifOF_logo.png
  if (arrowAtributte === './assets/dropdown.svg') {
    arrowImage.setAttribute('src', './assets/dropdownDark.svg');
    imgMainLogo.setAttribute('src', './assets/gifOF_logo_dark.png');
  } else {
    arrowImage.setAttribute('src', './assets/dropdown.svg');
    imgMainLogo.setAttribute('src', './assets/gifOF_logo.png');
  }
  if (bDarkTheme.classList.contains('active')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }
}
