export default class NewsApi {
  constructor(config) {
    this.baseUrl = config.baseUrl
    this.apiKey = config.apiKey
  }

  getNews(keyWord, pageSize = 50) {
    return fetch(`${this.baseUrl}q=${keyWord}&pageSize=${pageSize}&apiKey=${this.apiKey}`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res);
      })
  }


}
