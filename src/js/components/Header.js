export default class Header {
  constructor(api, header) {
    this.api = api
    this.header = header
    this.headerBtn = this.header.querySelector('.button')
    this.savedLink = this.header.querySelector('.header-nav__link-saved')
    this.btn = this.header.querySelector('.button')
    this.menuBurger = header.querySelector('.header__menu-burger')
  }

  _render(isLoggedIn = 0, userName) {
    if (isLoggedIn) {
      this.btn.textContent = userName
      this.savedLink.style.display = 'flex'

    } else {
      this.savedLink.style.display = 'none'
      this.headerBtn.textContent = userName;
    }
  }

  logoutInSave() {
    this.headerBtn.addEventListener('click', () => {
      localStorage.removeItem('token')
      window.location.reload()
      console.log(localStorage.getItem('token'));
    })
  }

  setBurgerListener() {
    this.menuBurger.addEventListener('click', () => {
      document.querySelector('.header__menu-burger-content').style.display = 'flex'
    })
  }

  redirect() {
    if (!localStorage.getItem('token')) {
      document.location.href = './index.html'
    }
  }

  checkLogin() {
    this.api.getUserData()
      .then((res) => {
        this._render(1, res.name);
      })
      .catch((err) => {
        this._render(0, 'Авторизоваться');
        return console.log(err);
      });

  }

}