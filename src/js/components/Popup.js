export default class Popup {
  constructor(popup, buttonHeader, popupReg, closePopups, popupSuccess, classHeader) {
    this._popup = popup;
    this._popupSuccess = popupSuccess;
    this._popupReg = popupReg;
    this._buttonHeader = buttonHeader;
    this._closePopups = closePopups;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._open = this._open.bind(this);
    this._openReg = this._openReg.bind(this);
    this._close = this._close.bind(this);
    this.classHeader = classHeader
    this.buttonBurger = document.querySelector('.button-burger')
  }



  _open(evt) {
    if (evt.target.classList.contains('button-header')) {
      document.querySelector('.header__menu-burger-content').style.display = 'none'
    }
    if (evt.target.textContent === 'Авторизоваться') {
      this._popupReg.style.display = 'none'
      this._popup.style.display = 'flex'
    } else {
      localStorage.removeItem('token')
      this.classHeader.checkLogin()
      window.location.reload()
    }

  }

  _openReg(evt) {
    this._popup.style.display = 'none'
    this._popupReg.style.display = 'flex'
    this._close()
  }
  _close(evt) {
    evt.target.closest('.popup').style.display = 'none'
    this._clearContent()
  }

  _setHandlers() {
    this._buttonHeader.addEventListener('click', this._open)
    this.buttonBurger.addEventListener('click', this._open)
    this._closePopups.forEach(icon => {
      icon.addEventListener('click', this._close)
    })
    this._popup.querySelector('.popup__close').addEventListener('click', (evt) => this._close)
    this._popup.querySelector('.popup__footer-link').addEventListener('click', this._openReg)
    this._popupReg.querySelector('.popup__footer-link').addEventListener('click', this._open)
    this._popupSuccess.querySelector('.popup__footer-link').addEventListener('click', this._closeSuccess.bind(this))
  }

  _closeSuccess(evt) {
    evt.target.closest('.popup').style.display = 'none'
    console.log(this._popup);
    this._popup.style.display = 'flex'
  }



  _clearContent() {
    console.log(this._inputs);
    this._inputs.forEach((input) => {

      input.value = '';
    });
  }


}