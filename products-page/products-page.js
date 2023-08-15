import { Card } from "../cards/card.js";
import { API } from "../scripts/api.js";

import { OrderPage } from "../scripts/order-page.js";


export class ProductsPage {
    renderPage() {
        const params = new URLSearchParams(window.location.search);
        const companyFilterValue = params.get('company');
        const nameFilterValue = params.get('name');
        const rangeFilterValue = params.get('priceRange');

        const api = new API();
        const orderPage = new OrderPage();
        const orders = api.getOrders();

        const wrapper = document.querySelector('.wrapper');

        const container = document.createElement('div');
        container.className = 'container';
        wrapper.append(container);

        const header = document.createElement('header');
        header.className = 'header products-header';

        const nav = document.createElement('nav');
        nav.className = 'nav';
        const navHome = document.createElement('a');
        navHome.className = 'nav__link home-link black';
        navHome.innerHTML = 'Home';
        navHome.href = '../home-page/';
         navHome.addEventListener('click', () => homePage.init());
        const navProducts = document.createElement('a');
        navProducts.className = 'nav__link products-link black';
        navProducts.innerHTML = 'Products';
        const navAbout = document.createElement('a');
        navAbout.className = 'nav__link about-link black';
        navAbout.innerHTML = 'About';
        navAbout.href = '../about-page/';
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
        infoPageText.innerHTML = ` Home / Products`;
        infoPage.append(infoPageText);

        wrapper.append(infoPage);

        const containerProducts = document.createElement('div');
        containerProducts.className = 'container__products';

        const productsPage = document.createElement('div');
        productsPage.className = 'products';

        const productsPageLeft = document.createElement('div');
        productsPageLeft.className = 'products__left';

        const inputProducts = document.createElement('input');
        inputProducts.className = 'products__input';
        inputProducts.placeholder = 'Search...';
        inputProducts.value = nameFilterValue;
        inputProducts.addEventListener('input', (e) => this.filterCardsByName(e));

        const filterText = document.createElement('h4');
        filterText.className = 'products__text';
        filterText.innerHTML = 'Company';

        const productsListButton = document.createElement('div');
        productsListButton.className = 'products__list'

        const filterButtonAll = document.createElement('button');
        filterButtonAll.className = 'products__list__button__all filter-buttons btn-colors';
        filterButtonAll.innerHTML = 'All';
        filterButtonAll.addEventListener('click', (e) => this.filterCardsByBrand(e));
        filterButtonAll.addEventListener('click', (e) => this.changeColorButtonFilter(e));
        const filterButtonIkea = document.createElement('button');
        filterButtonIkea.className = 'products__list__button__ikea filter-buttons btn-colors';
        filterButtonIkea.innerHTML = 'Ikea';
        filterButtonIkea.addEventListener('click', (e) => this.filterCardsByBrand(e));
        filterButtonIkea.addEventListener('click', (e) => this.changeColorButtonFilter(e));

        const filterButtonMarcos = document.createElement('button');
        filterButtonMarcos.className = 'products__list__button__marcos filter-buttons  btn-colors';
        filterButtonMarcos.innerHTML = 'Marcos';
        filterButtonMarcos.addEventListener('click', (e) => this.filterCardsByBrand(e));
        filterButtonMarcos.addEventListener('click', (e) => this.changeColorButtonFilter(e));

        const filterButtonCaressa= document.createElement('button');
        filterButtonCaressa.className = 'products__list__button__caressa filter-buttons btn-colors';
        filterButtonCaressa.innerHTML = 'Caressa';
        filterButtonCaressa.addEventListener('click', (e) => this.filterCardsByBrand(e));
        filterButtonCaressa.addEventListener('click', (e) => this.changeColorButtonFilter(e));

        const filterButtonLiddy= document.createElement('button');
        filterButtonLiddy.className = 'products__list__button__liddy filter-buttons btn-colors';
        filterButtonLiddy.innerHTML = 'Liddy';
        filterButtonLiddy.addEventListener('click', (e) => this.filterCardsByBrand(e));
        filterButtonLiddy.addEventListener('click', (e) => this.changeColorButtonFilter(e));

        if (companyFilterValue === 'All') {
            filterButtonAll.classList.add('active-btn');
        } else if (companyFilterValue === 'Ikea') {
            filterButtonIkea.classList.add('active-btn');
        } else if (companyFilterValue === 'Marcos') {
            filterButtonMarcos.classList.add('active-btn');
        } else if (companyFilterValue === 'Caressa') {
            filterButtonCaressa.classList.add('active-btn');
        } else if (companyFilterValue === 'Liddy') {
            filterButtonLiddy.classList.add('active-btn');
        }

        productsListButton.append(filterButtonAll, filterButtonIkea, filterButtonMarcos, filterButtonCaressa, filterButtonLiddy);

        const filterPriceText = document.createElement('h4');
        filterPriceText.className = 'products__price';
        filterPriceText.innerHTML = 'Price';

        const filterPriceInput  = document.createElement('input');
        filterPriceInput.className = 'products__price-filter';
        filterPriceInput.type = 'range';
        filterPriceInput.min = '6';
        filterPriceInput.max = '80';
        filterPriceInput.value = rangeFilterValue;
        
        const filterPriceSize = document.createElement('h4');
        filterPriceSize.className = 'products__price-size';
        filterPriceInput.addEventListener('input', (e) => {
            filterPriceSize.innerText = `Value: $${(e.target.value)}`;
        });

        if (rangeFilterValue) {
            filterPriceSize.innerText = `Value: $${(rangeFilterValue)}`;
        }

        filterPriceInput.addEventListener('input', (e) => this.filterCardsByPrice(e));

        productsPageLeft.append(inputProducts, filterText, productsListButton, filterPriceText, filterPriceInput, filterPriceSize);

        const productsPageRight = document.createElement('div');
        productsPageRight.className = 'products__right';

        productsPage.append(productsPageLeft, productsPageRight);
        containerProducts.append(productsPage);
        wrapper.append(containerProducts);
    }
    renderCards(cards) {
        const cardMethods = new Card();

        const productsPageRight = document.querySelector('.products__right');
        productsPageRight.innerHTML = '';

        cards.map((item) => {
            cardMethods.renderProductsCard(item, this.addItemToCart)
        })
    }
    filterCardsByName(e) {
        const api = new API();
    
        const furniture = api.getFurniture();

        const params = new URLSearchParams(window.location.search);

        const rangeFilterValue = params.get('priceRange');
        const companyFilterValue = params.get('company');

        const filterCards = furniture.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
            .filter((item) => {
                if (!companyFilterValue || companyFilterValue === 'All') {
                    return true;
                }

                return item.brand.toLowerCase() === companyFilterValue.toLowerCase();
            })
            .filter((item) => {
                if (!rangeFilterValue) {
                    return true;
                }

                return item.price <= rangeFilterValue;
            });

        const productsPageRight = document.querySelector('.products__right');
        productsPageRight.innerHTML = '';

        this.renderCards(filterCards);
        params.set('name', e.target.value);
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
    }
    filterCardsByBrand(e) {
        const api = new API();

        const furniture = api.getFurniture();

        const params = new URLSearchParams(window.location.search);

        const rangeFilterValue = params.get('priceRange');
        const nameFilterValue = params.get('name');

        const filteredFurniture = furniture.filter(item => item.brand.toLowerCase().includes(e.target.innerText.toLowerCase()))
            .filter((item) => {
                if (!rangeFilterValue) {
                    return true;
                }
                return item.price <= rangeFilterValue;
            })
            .filter((item) => {
                if (!nameFilterValue) {
                    return true;
                }
                return item.name.toLowerCase().includes(nameFilterValue.toLowerCase());
            });
        
        const productsPageRight = document.querySelector('.products__right');
        productsPageRight.innerHTML = '';
    
        if (e.target.innerText === 'All') {
            productsPageRight.innerHTML = '';
    
            const filteredFurniture = furniture.filter((item) => {
                if (!rangeFilterValue) {
                    return true;
                }
                return item.price <= rangeFilterValue;
            })
            .filter((item) => {
                if (!nameFilterValue) {
                    return true;
                }
                return item.name.toLowerCase().includes(nameFilterValue.toLowerCase());
            }); 
    
            this.renderCards(filteredFurniture)
            params.set('company', e.target.innerText);
            window.history.replaceState({}, '', `${location.pathname}?${params}`);    
    
            return;
        }
        
        this.renderCards(filteredFurniture)
        params.set('company', e.target.innerText);
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
    }
    filterCardsByPrice(e) {
        const api = new API();

        const furniture = api.getFurniture();

        const params = new URLSearchParams(window.location.search);
        const companyFilterValue = params.get('company');
        const nameFilterValue = params.get('name');

        const filterRange = furniture.filter(item => item.price <= e.target.value)
        .filter((item) => {
            if (!nameFilterValue) {
                return true;
            }
            return item.name.toLowerCase().includes(nameFilterValue.toLowerCase())
        })
        .filter((item) => {
            if (!companyFilterValue || companyFilterValue === 'All') {
                return true;
            }
            return item.brand.toLowerCase() === companyFilterValue.toLowerCase();
        }); 
        
        const productsPageRight = document.querySelector('.products__right');
        productsPageRight.innerHTML = '';

        this.renderCards(filterRange);
        params.set('priceRange', e.target.value);
        window.history.replaceState({}, '', `${location.pathname}?${params}`);

    }
    changeColorButtonFilter(e) {
        const buttons = document.querySelectorAll('.filter-buttons');

        if (e.target) {
            buttons.forEach(item => item.classList.add('active-btn'));
        }

        if (e.target) {
            buttons.forEach(item => item.classList.remove('active-btn')); 
            e.target.classList.add('active-btn')
        }
    }
    addItemToCart(id) {
        const api = new API();

        const furniture = api.getFurniture();

        const currentItem = furniture.find((item) => item.id === id);
        const cartItemsCount = document.querySelector('.basket__total')

        const orders = api.getOrders();

        orders.push(currentItem);

        api.setOrders(orders);
      
        cartItemsCount.innerText = orders.length;   
    }
    init() {
        const api = new API();

        const params = new URLSearchParams(window.location.search);
        const companyFilterValue = params.get('company');
        const nameFilterValue = params.get('name');
        const rangeFilterValue = params.get('priceRange');

        const furniture = api.getFurniture();

        const filteredFurniture = furniture.filter((item) => {
            if (!nameFilterValue) {
                return true;
            }
            return item.name.toLowerCase().includes(nameFilterValue.toLowerCase())
        })
        .filter((item) => {
            if (!companyFilterValue || companyFilterValue === 'All') {
                return true;
            }
            return item.brand.toLowerCase() === companyFilterValue.toLowerCase();
        })
        .filter((item) => {
            if (!rangeFilterValue) {
                return true;
            }
            return item.price <= rangeFilterValue;
        })

        const wrapper = document.querySelector('.wrapper');
        wrapper.innerHTML = '';
        this.renderPage();

        this.renderCards(filteredFurniture);
        const productsLink = document.querySelector('.products-link');
        productsLink.classList.add('active');
    }
}

const productPage = new ProductsPage();
document.addEventListener('load', productPage.init());