let bLightTheme = document.querySelector('#lightTheme');
let bDarkTheme = document.querySelector('#darkTheme');
let imgMainLogo = document.querySelector('#mainLogo');
let arrowImage = document.querySelector('#arrowImage');

// Por defecto el theme empieza  en Light

function saveThemeOnRefresh() {
  let theme = localStorage.getItem(THEME);

  if (theme) {
    setDarkTheme();
  }
}

function setDarkTheme() {
  let body = document.querySelector('body');
  body.classList.add('dark');
  arrowImage.setAttribute('src', './assets/dropdownDark.svg');
  imgMainLogo.setAttribute('src', './assets/gifOF_logo_dark.png');
  bDarkTheme.classList.add('active');
  bLightTheme.classList.remove('active');
  localStorage.setItem(THEME, 'dark');
  imgMainLogo = document.querySelector('#mainLogo');
}

function changeTheme() {
  if (this.classList.contains('active')) {
    return;
  }
  let body = document.querySelector('body');
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    arrowImage.setAttribute('src', './assets/dropdownDark.svg');
    imgMainLogo.setAttribute('src', './assets/gifOF_logo_dark.png');
    bDarkTheme.classList.add('active');
    bLightTheme.classList.remove('active');
    localStorage.setItem(THEME, 'dark');
  } else {
    bLightTheme.classList.add('active');
    bDarkTheme.classList.remove('active');
    arrowImage.setAttribute('src', './assets/dropdown.svg');
    imgMainLogo.setAttribute('src', './assets/gifOF_logo.png');
    localStorage.removeItem(THEME);
  }
}
