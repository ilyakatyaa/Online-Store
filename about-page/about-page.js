import { API } from "../scripts/api.js";
import { OrderPage } from "../scripts/order-page.js";


export class AboutPage {
    renderPage() {
        const api = new API();
        const orderPage = new OrderPage();
        const orders = api.getOrders();

        const wrapper = document.querySelector('.wrapper');

        const container = document.createElement('div');
        container.className = 'container';
        wrapper.append(container);

        const header = document.createElement('header');
        header.className = 'header about-header';

        const nav = document.createElement('nav');
        nav.className = 'nav';
        const navHome = document.createElement('a');
        navHome.className = 'nav__link home-link black';
        navHome.innerHTML = 'Home';
        navHome.href = '../home-page/';
       
        const navProducts = document.createElement('a');
        navProducts.className = 'nav__link products-link black';
        navProducts.innerHTML = 'Products';
        navProducts.href = '../products-page';
        
        const navAbout = document.createElement('a');
        navAbout.className = 'nav__link about-link black';
        navAbout.innerHTML = 'About';
        navAbout.href = '/about-page/';
        nav.append(navHome, navProducts, navAbout);
        
        const title = document.createElement('div');
        title.className = 'title';
        const titleName =  document.createElement('h4');
        titleName.className = 'title__name black'
        titleName.innerHTML = 'comfy';
        title.append(titleName);

        const basket = document.createElement('div');
        basket.className = 'basket';
        const basketImage = document.createElement('img');
        basketImage.className = 'basket__image';
        basketImage.src ='/assets/icons8-корзина-30.png';
        const basketTotal = document.createElement('span');
        basketTotal.className = 'basket__total';
        basketTotal.innerText = orders.length;
        basket.append(basketImage, basketTotal);
        basket.addEventListener('click', () => orderPage.renderPage());

        header.append(nav, title, basket);
        container.append(header);

        const infoPage = document.createElement('div');
        infoPage.className = 'info';
        const infoPageText = document.createElement('h3');
        infoPageText.className = 'info__text';
        infoPageText.innerHTML = `Home / About`;
        infoPage.append(infoPageText);
        infoPage.append(infoPageText);


        const history = document.createElement('div');
        history.className = 'about__history';
        const historyTitle = document.createElement('h3');
        historyTitle.className = 'about__history_o_title';
        historyTitle.innerHTML =  `<span class="red-span">/</span> Our History`;
        const historyText = document.createElement('p');
        historyText.className = 'about__history__text';
        historyText.innerHTML = `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Amet quisquam consectetur facilis fugiat officiis magnam? Deleniti enim vitae rem sequi, 
                                quaerat totam sunt mollitia asperiores minima consequatur, quae sapiente neque`;
        
        history.append(historyTitle, historyText);

        wrapper.append(infoPage, history);
    }
    init() {
        const wrapper = document.querySelector('.wrapper');
        wrapper.innerHTML = '';
        this.renderPage();
        const aboutLink = document.querySelector('.about-link');
        aboutLink.classList.add('active');
       
    }
}

const aboutPage = new AboutPage();
document.addEventListener('load', aboutPage.init());