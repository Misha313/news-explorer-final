export default class NewsCard {
  constructor(mainApi, keyWord) {
    this.mainApi = mainApi;
    this.keyWord = keyWord;
    this.cardId = ''
  }

  create(data, title, text, sourceText, sourceLink, urlToImage, keyWord, id = 'undefind') {
    const markup = `
    <div class="news-card">
    <div class="id" style="display: none;"></div>
    <img alt="background" src="" class="news-card__image">
    <div class="news-card__save-icon"></div>
    <div class="news-card__delete-icon news-card__save-icon"style="display: none;"></div>
    <div class="news-card__keyword" style="display: none;"></div>
    <div class="news-card__content" >
      <div class="news-card__data">2 августа, 2019</div>
      <h2 class="news-card__title">Национальное достояние – парки</h2>
      <p class="news-card__text">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала
        складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к
        природе.</p>
      <a class="news-card__source" href="https://lenta.ru/" target="_blank">Лента.ру</a>
    </div>
  </div>
    `

    const element = document.createElement('div');

    element.insertAdjacentHTML('afterbegin', markup);
    const newCard = element.firstElementChild;

    newCard.querySelector('.news-card__image').setAttribute('src', urlToImage);
    newCard.querySelector('.news-card__data').textContent = data.substr(0, 10);
    newCard.querySelector('.news-card__title').textContent = title;
    newCard.querySelector('.news-card__text').textContent = text;
    newCard.querySelector('.news-card__source').textContent = sourceText;
    newCard.querySelector('.news-card__source').setAttribute('href', sourceLink)
    newCard.querySelector('.news-card__keyword').textContent = keyWord;
    newCard.querySelector('.id').textContent = id;
    this.keyWord = keyWord;

    this.card = newCard;
    this.card.addEventListener('click', this.goToNews)
    this.renderIcon()
    return this.card
  }

  renderIcon() {
    if (localStorage.getItem('token')) {
      this.card.querySelector('.news-card__save-icon').style.background = 'url(./images/saveHover.svg)'
      this.card.querySelector('.news-card__save-icon')
        .addEventListener('click', (evt) => this.saveAndDeleteCard.bind(this)(evt))
    } else {
      const tooltip = `<div class="news-card__tooltip">Ввойдите, чтобы сохраниять статьи</div>`
      const saveIcon = this.card.querySelector('.news-card__save-icon')
      saveIcon.style.background = 'url(./images/save.svg)';
      saveIcon.insertAdjacentHTML('afterend', tooltip)
      saveIcon.addEventListener('mouseover', (evt) => this.mouseoverHandlerNotLogin.bind(this)(evt))
      saveIcon.addEventListener('mouseout', (evt) => this.mouseoutHandlerNotLogin.bind(this)(evt))
    }
  }

  saveAndDeleteCard(evt) {
    const card = evt.target.closest('.news-card')
    const cardIcon = card.querySelector('.news-card__save-icon');
    const image = card.querySelector('.news-card__image').getAttribute('src');
    const date = card.querySelector('.news-card__data').textContent;
    const title = card.querySelector('.news-card__title').textContent;
    const text = card.querySelector('.news-card__text').textContent;
    const source = card.querySelector('.news-card__source').textContent;
    const link = card.querySelector('.news-card__source').getAttribute('href');
    const keyWord = card.querySelector('.news-card__keyword').textContent;
    if (evt.target.closest('.news-card').classList.contains('saved')) {
      this.mainApi.deleteNews(this.cardId)
        .then((res) => {
          cardIcon.style.background = 'url("./images/saveHover.svg")'
          card.classList.remove('saved')
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this.mainApi.saveNews(keyWord, title, text, date, source, link, image)
        .then((res) => {

          this.cardId = res._id
          cardIcon.style.background = 'url(./images/saveActive.svg)'
          card.classList.add('saved')
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }

  goToNews(evt) {
    if (!evt.target.classList.contains('news-card__save-icon')) {
      const linkToNews = evt.target.closest('.news-card').querySelector('.news-card__source').getAttribute('href')
      document.location.href = linkToNews
    }
    // console.log(!evt.target.classList.contains('news-card__save-icon'));
    // const linkToNews = evt.target.closest('.news-card').querySelector('.news-card__source').getAttribute('href')
    // console.log(evt.target.closest('.news-card').querySelector('.news-card__source').getAttribute('href'));

    // document.location.href = linkToNews

  }

  mouseoverHandlerNotLogin(evt) {
    evt.target.closest('.news-card').querySelector('.news-card__tooltip').style.display = 'flex'
  }

  mouseoutHandlerNotLogin(evt) {
    evt.target.closest('.news-card').querySelector('.news-card__tooltip').style.display = 'none'
  }

}