export default class NewsCardList {
  constructor(newsApi, resultBlock, createCard, showMoreBtn) {
    this.newsApi = newsApi;
    this.resultBlock = resultBlock;
    this.resultContainer = this.resultBlock.querySelector('.result__container');
    this.createCard = createCard;
    this.searchForm = document.querySelector('.search');
    this.searchBtn = this.searchForm.querySelector('.search__btn');
    this.searchField = this.searchForm.querySelector('.search__field');
    this.preloader = document.querySelector('.preloader');
    this.searchNotResult = document.querySelector('.search-not-result');
    this.articlesCurrent = undefined;
    this.showMoreBtn = showMoreBtn;
    this.keyWord = this.searchField.value
    this.news = []
  }
  setEventListener() {
    this.searchBtn.addEventListener('click', (evt) => this.handlerSubmitSearch.bind(this)(evt))
    this.showMoreBtn.addEventListener('click', this.addCards.bind(this))
  }

  handlerSubmitSearch(evt) {
    this.validateSearch()
    evt.preventDefault()
  }

  validateSearch() {
    if (!this.searchField.checkValidity()) {
      this.searchField.placeholder = 'Нужно ввести ключевое слово';
    } else {
      this.searchNews(this.searchField.value)
    }
  }

  addCards() {
    if (this.articlesCurrent.length >= 3) {
      for (let index = 0; index < 3; index++) {
        this.resultContainer.appendChild(this.createCard.create(
          this.articlesCurrent[index].publishedAt,
          this.articlesCurrent[index].title,
          this.articlesCurrent[index].description,
          this.articlesCurrent[index].source.name,
          this.articlesCurrent[index].url,
          this.articlesCurrent[index].urlToImage,
          this.keyWord
        ))
      }
      this.articlesCurrent = this.articlesCurrent.slice(3)
    } else {
      this.showMoreBtn.style.display = 'none'

      for (let index = 0; index < this.articlesCurrent.length; index++) {
        console.log('for');
        this.resultContainer.appendChild(this.createCard.create(
          this.articlesCurrent[index].publishedAt,
          this.articlesCurrent[index].title,
          this.articlesCurrent[index].description,
          this.articlesCurrent[index].source.name,
          this.articlesCurrent[index].url,
          this.articlesCurrent[index].urlToImage
        ))
        this.articlesCurrent = this.articlesCurrent.slice(1)
      }
    }
  }

  searchNews(keyWord) {
    this.preloader.style.display = 'flex'
    this.keyWord = keyWord
    this.newsApi.getNews(keyWord)
      .then(res => {
        this.preloader.style.display = 'none'
        this.resultContainer.textContent = ''
        if (res.articles.length === 0) {
          this.searchNotResult.style.display = 'flex'
          this.resultBlock.style.display = 'none'
          console.log(res);

        } else {
          this.preloader.style.display = 'none'
          this.resultBlock.style.display = 'flex'
          this.articlesCurrent = res.articles
          this.addCards()
        }
      })
      .catch((err) => {
        this.searchNotResult.style.display = 'flex'
        this.preloader.style.display = 'none'
        document.querySelector('.search-not-result__title').textContent = 'Какая-то проблема'
        document.querySelector('.search-not-result__text').textContent = 'Повторите попытку или попробуйте позже'
        console.log(err);
      })
  }

}