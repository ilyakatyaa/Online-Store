import { API } from "../scripts/api.js";
import { OrderPage } from "../scripts/order-page.js";
import { Card } from "../cards/card.js";

export class HomePage {
    renderPage() {
        const api = new API();
        const orderPage = new OrderPage();
        const orders = api.getOrders();

        const wrapper = document.querySelector('.wrapper');
        const wrap = document.createElement('div');
        wrap.className = 'wrap';
        wrapper.append(wrap);

        const container = document.createElement('div');
        container.className = 'container';
        wrap.append(container);

        const header = document.createElement('header');
        header.className = 'header';

        const nav = document.createElement('nav');
        nav.className = 'nav';
        const navHome = document.createElement('a');
        navHome.href = '/home-page/';
        navHome.className = 'nav__link home-link';
        navHome.innerHTML = 'Home';
    
        const navProducts = document.createElement('a');
        navProducts.className = 'nav__link products-link ';
        navProducts.innerHTML = 'Products';
        navProducts.href = '../products-page';
    
        const navAbout = document.createElement('a');
        navAbout.className = 'nav__link about-link';
        navAbout.innerHTML = 'About';
        navAbout.href = '../about-page/';
        nav.append(navHome, navProducts, navAbout);
        
        const title = document.createElement('div');
        title.className = 'title';
        const titleName =  document.createElement('h4');
        titleName.className = 'title__name'
        titleName.innerHTML = 'comfy';
        title.append(titleName);

        const basket = document.createElement('div');
        basket.className = 'basket';
        const basketImage = document.createElement('img');
        basketImage.className = 'basket__image';
        basketImage.src ='/assets/icons8-корзина-50.png';
        const basketTotal = document.createElement('span');
        basketTotal.className = 'basket__total';
        basketTotal.innerText = orders.length;;
        basket.append(basketImage, basketTotal);
        basket.addEventListener('click', () => orderPage.renderPage());

        header.append(nav, title, basket);
        container.append(header);

        const desc = document.createElement('div');
        desc.className = 'desc';
        const descTitle = document.createElement('h1');
        descTitle.className = 'desc__title';
        descTitle.innerHTML = 'Rest, Relax, Unwind';
        const descSubTitle = document.createElement('h3');
        descSubTitle.className = 'desc__subtitle';
        descSubTitle.innerHTML = 'Embrance your choices - we do';
        const descLink = document.createElement('a');
        descLink.className = 'desc__button active-load';
        descLink.href = '../products-page';
        descLink.innerHTML = 'SHOW NOW';

        desc.append(descTitle, descSubTitle, descLink);
        container.append(desc);

        const containerSecond = document.createElement('div');
        containerSecond.className = 'container__second'
        const content = document.createElement('div');
        content.className = 'content';
        const contentText = document.createElement('h3');
        contentText.className = 'content__text';
        contentText.innerHTML = `<span class="red-span">/</span> Featured`;

        const contentBlock = document.createElement('div');
        contentBlock.className = 'content__block';

        const contentLink = document.createElement('a');
        contentLink.className = 'content__link active-load';
        contentLink.innerHTML = 'ALL PRODUCTS';
        contentLink.href = '/products-page'

        content.append(contentText, contentBlock, contentLink);
        containerSecond.append(content);
        wrapper.append(containerSecond);
    }
    renderCards() {
        const api = new API();
        const orders = api.getFurniture();
        const cardMethods = new Card();

        orders.map((item, index) => {
            if (index <= 2)  {
                cardMethods.renderHomeCard(item);
            }
        });
    }
    
    init() {
        const wrapper = document.querySelector('.wrapper');
        wrapper.innerHTML = '';
        this.renderPage();
        this.renderCards();
        const homeLink = document.querySelector('.home-link');
        homeLink.classList.add('active');
    }
}

const homePage = new HomePage();
document.addEventListener('load', homePage.init());