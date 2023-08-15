import { Card } from "../cards/card.js";
import { API } from "./api.js";

export class OrderPage {
    renderPage() {
        const api = new API();

        const box = document.querySelector('.box');
        const wrapperBuy = document.createElement('div');
        wrapperBuy.className = 'wrapper-buy';
    
        const wrapperBuyButtonClose = document.createElement('button');
        wrapperBuyButtonClose.className = 'wrapper-buy__button';
        wrapperBuyButtonClose.addEventListener('click', this.closeBuyPage);
    
        const wrapperBuyContent = document.createElement('div');
        wrapperBuyContent.className = 'wrapper-buy__content';
    
        const wrapperBuyText = document.createElement('h3');
        wrapperBuyText.className = 'wrapper-buy__content__text';
        wrapperBuyText.innerText = 'Your Bag';
    
        const cardsBuy = document.createElement('div');
        cardsBuy.className = 'wrapper-buy__content__cards';
    
        const wrapperBuyContentCheckout = document.createElement('div');
        wrapperBuyContentCheckout.className = 'wrapper-buy__content__checkout';
    
        const wrapperBuyContentCheckoutText = document.createElement('h3');
        wrapperBuyContentCheckoutText.className = 'wrapper-buy__content__checkout__text';
    
        const wrapperBuyContentCheckoutButton = document.createElement('button');
        wrapperBuyContentCheckoutButton.className = 'wrapper-buy__content__checkout__button'
        wrapperBuyContentCheckoutButton.innerText = 'CHECKOUT';
    
        wrapperBuyContentCheckout.append(wrapperBuyContentCheckoutText, wrapperBuyContentCheckoutButton);
    
        wrapperBuyContent.append(wrapperBuyText, cardsBuy, wrapperBuyContentCheckout);
    
        wrapperBuy.append(wrapperBuyButtonClose, wrapperBuyContent);
    
        box.append(wrapperBuy);
    
        const wrapper = document.querySelector('.wrapper');
        wrapper.classList.add('wrapper-black');
        const info = document.querySelector('.info');
    
        if (info) {
            info.classList.add('info-black');
        }
        const body = document.body;
        body.style.overflow = 'hidden';

        const orders = api.getOrders();
        const orderNew = [];
        orders.forEach((item) => {
            if (!orderNew.find((order) => order.id === item.id)) {
                orderNew.push(item);
            }
        })

        const cardMethods = new Card();

        orderNew.map((item) => cardMethods.renderCheckoutCard(
            item, 
            () => this.deleteCard(item.id), 
            () => this.addItem(item.id), 
            () => this.decreaseItems(item.id))
        )
        this.renderTotalPrice();
        
        const cardsBuyItems = document.querySelectorAll('.wrapper-buy__content__cards__item');
    
        if (cardsBuyItems.length > 7) {
            const wrapperBuyContentCheckout = document.querySelector('.wrapper-buy__content__checkout');
            wrapperBuyContentCheckout.classList.add('checkout-down');
            const wrapperBuy = document.querySelector('.wrapper-buy');
            wrapperBuy.style.overflow = 'scroll';
        } 
    }
    addItem(id) {
        const api = new API();

        const orders = api.getOrders();
        const currentItem = orders.find((item) => item.id === id);
        orders.push(currentItem);

        const newOrders = [];
        orders.forEach((item) => {
            if (!newOrders.find((order) => order.id === item.id)) {
                newOrders.push(item);
            }
        })

        api.setOrders(orders);
        
        const cardsBuy = document.querySelector('.wrapper-buy__content__cards');
        cardsBuy.innerHTML = '';

        const cardMethods = new Card();

        newOrders.map((item) => cardMethods.renderCheckoutCard(
            item, 
            () => this.deleteCard(item.id), 
            () => this.addItem(item.id), 
            () => this.decreaseItems(item.id))
        )
        this.renderTotalPrice();

        const basketTotal = document.querySelector('.basket__total');
        basketTotal.innerHTML = orders.length;

        if (!newOrders.length) {
            const  wrapperBuyContentCheckoutText = document.querySelector('.wrapper-buy__content__checkout__text');
            wrapperBuyContentCheckoutText.innerHTML = '0$';
        }
    
        const cardsBuyItems = document.querySelectorAll('.wrapper-buy__content__cards__item');

        if (cardsBuyItems.length < 7) {
            const wrapperBuyContentCheckout = document.querySelector('.wrapper-buy__content__checkout');
            wrapperBuyContentCheckout.classList.remove('checkout-down');
            const wrapperBuy = document.querySelector('.wrapper-buy');
            wrapperBuy.style.overflow = 'auto';
        } else {
            const wrapperBuyContentCheckout = document.querySelector('.wrapper-buy__content__checkout');
            wrapperBuyContentCheckout.classList.add('checkout-down');
            const wrapperBuy = document.querySelector('.wrapper-buy');
            wrapperBuy.style.overflow = 'scroll';
        }

        this.renderTotalPrice();
    }
    decreaseItems(id) {
        const api = new API();

        const orders = api.getOrders();

        const itemToDeleteIndex = orders.findIndex((item) => item.id === id);
    
        const newFilteredArray = [
            ...orders.slice(0, itemToDeleteIndex),
            ...orders.slice(itemToDeleteIndex + 1)
        ]
    
        api.setOrders(newFilteredArray);
        const newOrders = [];
        newFilteredArray.forEach((item) => {
            if (!newOrders.find((order) => order.id === item.id)) {
                newOrders.push(item);
            }
        })
         
        const cardsBuy = document.querySelector('.wrapper-buy__content__cards');
        cardsBuy.innerHTML = '';

        const cardMethods = new Card();

        newOrders.map((item) => cardMethods.renderCheckoutCard(
            item, 
            () => this.deleteCard(item.id), 
            () => this.addItem(item.id), 
            () => this.decreaseItems(item.id))
        )
        this.renderTotalPrice();
    
        const basketTotal = document.querySelector('.basket__total');
        basketTotal.innerHTML = newFilteredArray.length;
    
        if (!newOrders.length) {
            const  wrapperBuyContentCheckoutText = document.querySelector('.wrapper-buy__content__checkout__text');
            wrapperBuyContentCheckoutText.innerHTML = '0$';
         
        }
        const cardsBuyItems = document.querySelectorAll('.wrapper-buy__content__cards__item');
    
        if (cardsBuyItems.length < 7) {
            const wrapperBuyContentCheckout = document.querySelector('.wrapper-buy__content__checkout');
            wrapperBuyContentCheckout.classList.remove('checkout-down');
            const wrapperBuy = document.querySelector('.wrapper-buy');
            wrapperBuy.style.overflow = 'auto';
        } else {
            const wrapperBuyContentCheckout = document.querySelector('.wrapper-buy__content__checkout');
            wrapperBuyContentCheckout.classList.add('checkout-down');
            const wrapperBuy = document.querySelector('.wrapper-buy');
            wrapperBuy.style.overflow = 'scroll';
        }
    
       
        this.renderTotalPrice();
    }
    deleteCard(id) {
        const api = new API();

        const orders = api.getOrders();
        const newOrders = orders.filter((item) => item.id !== id);
    
        const cardsBuy = document.querySelector('.wrapper-buy__content__cards');
        cardsBuy.innerHTML = '';

        const newUniqueOrders = [];
        newOrders.forEach((item) => {
            if (!newUniqueOrders.find((order) => order.id === item.id)) {
                newUniqueOrders.push(item);
            }
        })

        const cardMethods = new Card();

        newUniqueOrders.map((item) => cardMethods.renderCheckoutCard(
            item, 
            () => this.deleteCard(item.id), 
            () => this.addItem(item.id), 
            () => this.decreaseItems(item.id))
        )
        this.renderTotalPrice();
    
        const basketTotal = document.querySelector('.basket__total');
        api.setOrders(newOrders); 
        basketTotal.innerHTML = newOrders.length;
    
        if (!newOrders.length) {
            const  wrapperBuyContentCheckoutText = document.querySelector('.wrapper-buy__content__checkout__text');
            wrapperBuyContentCheckoutText.innerHTML = '0$';
         
        }
        const cardsBuyItems = document.querySelectorAll('.wrapper-buy__content__cards__item');
    
        if (cardsBuyItems.length < 7) {
            const wrapperBuyContentCheckout = document.querySelector('.wrapper-buy__content__checkout');
            wrapperBuyContentCheckout.classList.remove('checkout-down');
            const wrapperBuy = document.querySelector('.wrapper-buy');
            wrapperBuy.style.overflow = 'auto';
        } else {
            const wrapperBuyContentCheckout = document.querySelector('.wrapper-buy__content__checkout');
            wrapperBuyContentCheckout.classList.add('checkout-down');
            const wrapperBuy = document.querySelector('.wrapper-buy');
            wrapperBuy.style.overflow = 'scroll';
        }
    
       
        this.renderTotalPrice();
    }
    renderTotalPrice() {
        const api = new API();

        const orders = api.getOrders();
        const totalPrice = orders.reduce((acc, item) => acc + item.price, 0);
        const wrapperBuyContentCheckoutText = document.querySelector('.wrapper-buy__content__checkout__text');
        wrapperBuyContentCheckoutText.innerText = `Total: ${Math.round(totalPrice)}$`;
    }
    closeBuyPage() {``
        const wrapperBuy = document.querySelector('.wrapper-buy');
        wrapperBuy.innerHTML = '';
        wrapperBuy.classList.remove('wrapper-buy');

        const wrapper = document.querySelector('.wrapper');
        wrapper.classList.remove('wrapper-black');
        const info = document.querySelector('.info');
        if (info) {
            info.classList.remove('info-black'); 
        }
        const body = document.body;
        body.style.overflow = 'auto';
    }
}