import './pages/main-page.css';

import Popup from './js/components/Popup';
import Header from './js/components/Header';
import Form from './js/components/Form';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';

import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';

import { configMainApi } from "./js/constants/mainApiConst";
import { configNewsApi } from "./js/constants/newsApiConst";

(function () {
  const header = document.querySelector('.header')

  const popupSignin = document.querySelector('.popup-login')
  const popupReg = document.querySelector('.popup-registr')
  const popupSuccess = document.querySelector('.popup-success')

  const closePopups = document.querySelectorAll('.popup__close')

  const buttonAuth = document.querySelector('.button-header')
  const formLogIn = document.querySelector('.popup__form-login')
  const formReg = document.querySelector('.popup__form-reg')

  const resultBlock = document.querySelector('.result')

  const showMoreBtn = document.querySelector('.result__show-more-btn')


  const newsApi = new NewsApi(configNewsApi)
  const mainApi = new MainApi(configMainApi);

  const newsCard = new NewsCard(mainApi);

  const newsCardList = new NewsCardList(newsApi, resultBlock, newsCard, showMoreBtn);
  newsCardList.setEventListener()

  const classHeader = new Header(mainApi, header);
  classHeader.checkLogin()
  classHeader.setBurgerListener()



  const FormLogIn = new Form(formLogIn, mainApi, popupSuccess, classHeader);
  FormLogIn.setEventListeners()

  const FormReg = new Form(formReg, mainApi, popupSuccess, classHeader);
  FormReg.setEventListeners()

  const popups = new Popup(popupSignin, buttonAuth, popupReg, closePopups, popupSuccess, classHeader);
  popups._setHandlers()
}());










