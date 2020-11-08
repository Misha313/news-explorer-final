export default class Form {
  constructor(form, api, popupSuccess, classHeader) {
    this._form = form;
    this.classHeader = classHeader
    this.popupSuccess = popupSuccess
    this.loginInPopupSuccess = this.popupSuccess.querySelector('.popup-success__footer-link')
    this._popupError = form.querySelector('.popup__error');
    this._loginError = this._form.querySelector('.popup__user-error')
    this.api = api
    this.passwordField = this._form.password
    this.emailField = this._form.email
    this.nameField = this._form.userName
  }

  setEventListeners() {
    this._form.addEventListener('input', this.handleSendToValidate.bind(this))
    this._form.addEventListener('submit', (evt) => this.handlerFormSubmit.bind(this)(evt))
  }

  handlerFormSubmit(evt) {
    evt.preventDefault()

    if (this._form.name === 'registration') {
      this._registration()
    }
    if (this._form.name === 'login') {
      this._signin()

    }

  }

  _signin() {
    this.api.signin(this.passwordField.value, this.emailField.value)
      .then(res => {
        if (res) {
          localStorage.setItem('token', res.token)
          this._form.closest('.popup').style.display = 'none'
          this.classHeader.checkLogin()
          window.location.reload()
        }
      })
      .catch(err => {
        console.log(err);
        this._loginError.textContent = 'Неправильные имя или пароль'
      })



  }

  _registration() {
    // console.log('regReq');
    console.log(`email:${this.emailField.value},password:${this.passwordField.value},name:${this.nameField.value}`)
    this.api.signup(this.emailField.value, this.passwordField.value, this.nameField.value)
      .then(success => {
        this._form.closest('.popup').style.display = 'none'
        this.popupSuccess.style.display = 'flex'
        // this.loginInPopupSuccess.addEventListener('click', (evt) => {
        //   evt.target.closest('.popup').style.display = 'none'

        // })
      })

  }



  checkInputValidity(element) {
    const error = event.target.closest('.popup__input-wrapper').querySelector('.popup__error');
    if (event.target.validity.valid) {
      error.textContent = "";
      return true;
    }
    if (event.target.validity.patternMismatch) {
      error.textContent = "Неправильный формат email";
      return false;
    }
    if (event.target.classList.contains("popup__input-name")) {
      error.textContent = "Имя должно быть от 2 до 30 символов";
      return false;
    }
    if (event.target.validity.tooShort || event.target.validity.tooLong) {
      error.textContent = "Пароль должен быть минимум 8 символов в длинну";
      return false;
    }
  }

  setSubmitButtonForm(btn, form) {
    btn.disabled = !form.checkValidity();
  }

  handleSendToValidate() {
    const formBtn = this._form.querySelector('.button')
    this.checkInputValidity(event.target)
    this.setSubmitButtonForm(formBtn, this._form)
  }

}
