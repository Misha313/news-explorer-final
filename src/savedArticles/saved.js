import '../pages/saved-articles.css';

import Header from '../js/components/Header';
import MainApi from '../js/api/MainApi';
import NewsCard from '../js/components/NewsCard';

import { configMainApi } from '../js/constants/mainApiConst';

import SavedArticles from '../js/components/SavedArticles';


(function () {
  const header = document.querySelector('.header')

  const mainApi = new MainApi(configMainApi);
  mainApi.getNews()
  const newsCard = new NewsCard(mainApi);

  const classHeader = new Header(mainApi, header);
  classHeader.checkLogin()
  classHeader.redirect()
  classHeader.logoutInSave()
  classHeader.setBurgerListener()


  const savedArticles = new SavedArticles(mainApi, newsCard);
  savedArticles.renderContent()
}());