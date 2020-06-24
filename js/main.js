/* //Cambiar Theme

*/
let boton = document.getElementById('themeButton');
boton.addEventListener('click', b => {
  let changeComponent = document.getElementsByClassName('change');

  for (let i = 0; i < changeComponent.length; i++) {
    if (changeComponent[i].nodeName == 'BUTTON') {
      changeComponent[i].classList.toggle('darkButton');
    } else {
      changeComponent[i].classList.toggle('darkBar');
    }
  }
  let arrowAtributte = arrowImage.getAttribute('src');

  //Cambiar entre las  dropdown
  if (arrowAtributte === './assets/dropdown.svg') {
    arrowImage.setAttribute('src', './assets/dropdownDark.svg');
  } else {
    arrowImage.setAttribute('src', './assets/dropdown.svg');
  }
});
