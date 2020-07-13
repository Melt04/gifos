function changeThemeBody() {
  let theme = localStorage.getItem(THEME);
  let logo = document.querySelector('#mainLogo');
  let body = document.querySelector('body');
  if (theme) {
    body.classList.replace('ligth', 'dark');
    logo.setAttribute('src', '../../assets/gifOF_logo_dark.png');
  } else {
    body.classList.replace('dark', 'ligth');
    logo.setAttribute('src', '../../assets/gifOF_logo.png');
  }
}
