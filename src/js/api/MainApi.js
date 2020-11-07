export default class MainApi {
  constructor(config) {
    this.config = config
    this.baseUrl = config.baseUrl
    this.headers = config.headers
  }


  signin(password, email) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password,
        email,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res);
      })

  }

  signup(email, password, name) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
        name,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res);
      })
  }



  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res);
      })
  }

  getNews() {
    return fetch(`${this.baseUrl}/articles/`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }

  saveNews(keyword, title, text, date, source, link, image) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        keyword, title, text, date, source, link, image,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res);
      });
  }

  deleteNews(articlesId) {
    return fetch(`${this.baseUrl}/articles/${articlesId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res);
      });
  }



}