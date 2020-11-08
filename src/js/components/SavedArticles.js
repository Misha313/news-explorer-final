export default class SavedArticles {
  constructor(api, createCard) {
    this.api = api;
    this.createCard = createCard;
    this.result = document.querySelector('.result')
    this.savedInfoTitle = document.querySelector('.saved-info');
    this.resultContainer = document.querySelector('.result__container')
  }

  renderContent() {
    this.getName()
    this.getCurrentNews()
    this.getArticles()
    this.result.style.display = 'flex'
  }



  getName() {
    this.api.getUserData()
      .then((res) => {
        console.log(this.savedInfoTitle);
        this.savedInfoTitle.querySelector('.Name').textContent = res.name
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getCurrentNews() {
    this.api.getNews()
      .then((res) => {
        this.savedInfoTitle.querySelector('.NumberArticles').textContent = res.data.length
        const keywords = []
        res.data.forEach(data => {
          keywords.push(data.keyword)
        });
        const filterKeyWords = new Set(keywords)
        const keyWords = Array.from(filterKeyWords)

        console.log(keyWords);
        if (keyWords.length <= 2) {
          console.log(keyWords);
          // keyWords.join()
          document.querySelector('.saved-info__keywords-more').style.display = 'none'
          document.querySelector('.and').style.display = 'none'
          document.querySelector('.saved-info__keywords').textContent = keyWords.join()
        } else {
          document.querySelector('.saved-info__keywords-more').style.display = 'flex'
          document.querySelector('.and').style.display = 'flex'
          document.querySelector('.saved-info__keywords').textContent = `${keyWords[0]},${keyWords[1]}`

          document.querySelector('.saved-info__number').textContent = keyWords.length - 2
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getArticles() {
    this.api.getNews()
      .then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          this.resultContainer.appendChild(this.createCard.create(
            res.data[index].date,
            res.data[index].title,
            res.data[index].text,
            res.data[index].source,
            res.data[index].link,
            res.data[index].image,
            res.data[index].keyword,
            res.data[index]._id
          ));
        }
        const tooltips = document.querySelectorAll('.news-card__keyword')
        tooltips.forEach(tip => {
          tip.style.display = 'flex'
        });
        const flagIcons = document.querySelectorAll('.news-card__save-icon')
        flagIcons.forEach(flagIcon => {
          flagIcon.style.display = 'none'
        });
        const deleteIcons = document.querySelectorAll('.news-card__delete-icon')
        deleteIcons.forEach(delIcon => {
          delIcon.style.display = 'flex'
          delIcon.addEventListener('click', (evt) => {
            const id = evt.target.closest('.news-card').querySelector('.id').textContent
            const card = evt.target.closest('.news-card')
            this.api.deleteNews(id)
            card.remove()
            // this.getCurrentNews()
            const current = this.savedInfoTitle.querySelector('.NumberArticles').textContent
            const currentAfterDel = current - 1
            this.savedInfoTitle.querySelector('.NumberArticles').textContent = currentAfterDel
          })
        });
      })
      .catch(err => console.log(err))
  }
}