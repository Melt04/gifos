let bLightTheme = document.querySelector('#lightTheme');
let bDarkTheme = document.querySelector('#darkTheme');
let imgMainLogo = document.querySelector('#mainLogo');

// Por defecto el theme empieza  en Light

bLightTheme.classList.add('active');
function saveThemeOnRefresh() {
  let theme = localStorage.getItem(THEME);
  if (theme) {
    bDarkTheme.click();
  }
}
function changeTheme() {
  let spans = document.querySelectorAll('span');
  if (this.classList.contains('active')) {
    return;
  } else {
    bLightTheme.classList.remove('active');
    bLightTheme.classList.remove('active-ligth');
    bDarkTheme.classList.remove('active');
    bDarkTheme.classList.remove('active-dark');
  }
  this.classList.add('active');
  if (this.id === 'lightTheme') {
    this.classList.add('active-ligth');
  } else {
    this.classList.add('active-dark');
  }
  let changeTheme = document.getElementsByClassName('change');
  for (let i = 0; i < changeTheme.length; i++) {
    if (changeTheme[i].nodeName == 'BUTTON') {
      changeTheme[i].classList.toggle('darkButton');
    } else {
      changeTheme[i].classList.toggle('darkBar');
    }
  }
  for (let i = 0; i < spans.length; i++) {
    spans[i].classList.toggle('darkSpan');
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
    localStorage.setItem(THEME, 'dark');
  } else {
    localStorage.removeItem(THEME);
  }
}
