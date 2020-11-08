export default class Header {
  constructor(api, header) {
    this.api = api
    this.header = header
    this.headerBtn = this.header.querySelector('.button')
    this.savedLink = this.header.querySelector('.header-nav__link-saved')
    this.btn = this.header.querySelector('.button')
    this.btnBurger = this.header.querySelector('.button-burger')

  }

  _render(isLoggedIn = 0, userName) {
    if (isLoggedIn) {
      this.btn.textContent = userName
      this.btnBurger.textContent = userName
      this.savedLink.style.display = 'flex'


    } else {
      this.savedLink.style.display = 'none'
      his.btnBurger.textContent = userName
      this.headerBtn.textContent = userName;
    }
  }

  logoutInSave() {
    this.header.querySelector('.button-burger').addEventListener('click', () => {
      localStorage.removeItem('token')
      window.location.reload()
    })
    this.headerBtn.addEventListener('click', () => {
      localStorage.removeItem('token')
      window.location.reload()
    })
  }

  setBurgerListener() {
    this.header.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('header__menu-burger')) {
        if (!localStorage.getItem('token')) {
          const burgerMenu = document.querySelector('.header__menu-burger-content')
          burgerMenu.querySelector('.header-nav__link-saved').style.display = 'none'
        }
        console.log('flex');
        document.querySelector('.header__menu-burger-content').style.display = 'flex'
      }
      if (evt.target.classList.contains('header__menu-burger-close')) {
        console.log('none');
        document.querySelector('.header__menu-burger-content').style.display = 'none'
      }
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