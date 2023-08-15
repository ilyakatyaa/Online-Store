import { API } from "../scripts/api.js";

export class Card {
    renderHomeCard(card) {
        const contentBlock = document.querySelector('.content__block');
        const contentBlockItems = document.createElement('div');
        contentBlockItems.className = 'content__block__items'
        const contentBlockItemsImage = document.createElement('img');
        contentBlockItemsImage.className = 'content__block__items__image';
        contentBlockItemsImage.src = card.image;
        const contentBlockItemsName= document.createElement('h3');
        contentBlockItemsName.className = 'content__block__items__name';
        contentBlockItemsName.innerText = card.name;
        const contentBlockItemsPrice= document.createElement('span');
        contentBlockItemsPrice.className = 'content__block__items__price';
        contentBlockItemsPrice.innerText = `$${card.price}`;

        contentBlockItems.append(contentBlockItemsImage, contentBlockItemsName, contentBlockItemsPrice)

        contentBlock.append(contentBlockItems);
    }

    renderProductsCard(card, callback) {
        const productsPageRight = document.querySelector('.products__right');
        const productsPageRightCards = document.createElement('div');
        productsPageRightCards.className = 'products__right__cards';
        const productsPageRightCardsImage = document.createElement('img');
        productsPageRightCardsImage.className = 'products__right__cards__image';
        productsPageRightCardsImage.src = card.image;
        const productsPageRightCardsName = document.createElement('h3');
        productsPageRightCardsName.className = 'products__right__cards__name';
        productsPageRightCardsName.innerText = card.name;
        const productsPageRightCardsPrice = document.createElement('h3');
        productsPageRightCardsPrice.className = 'products__right__cards__price';
        productsPageRightCardsPrice.innerText = `$${card.price}`;
    
        productsPageRightCards.append(productsPageRightCardsImage, productsPageRightCardsName, productsPageRightCardsPrice);
        productsPageRight.append(productsPageRightCards);

        productsPageRightCards.addEventListener('click', () => callback(card.id))
    }

    renderCheckoutCard(card, deleteCallback, addCallback, decreaseCallback) {
        const api = new API();

        const cardsBuy = document.querySelector('.wrapper-buy__content__cards');
        const cardsBuyItem = document.createElement('div');
        cardsBuyItem.className = 'wrapper-buy__content__cards__item';
        const cardsBuyItemImage = document.createElement('img');
        cardsBuyItemImage.className = 'wrapper-buy__content__cards__item__image';
        cardsBuyItemImage.src = card.image;

        const cardsBuyItemBox = document.createElement('div');
        cardsBuyItemBox.className = 'wrapper-buy__content__cards__item__box';
        const cardsBuyItemBoxName = document.createElement('h3');
        cardsBuyItemBoxName.className = 'wrapper-buy__content__cards__item__box__name';
        cardsBuyItemBoxName.innerText = card.name;
        const cardsBuyItemBoxPrice = document.createElement('h4');
        cardsBuyItemBoxPrice.className = 'wrapper-buy__content__cards__item__box__price';
        cardsBuyItemBoxPrice.innerText = `$${card.price}`;
        const cardsBuyItemBoxButtonRemove = document.createElement('button');
        cardsBuyItemBoxButtonRemove.className = 'wrapper-buy__content__cards__item__box__remove';
        cardsBuyItemBoxButtonRemove.innerText = 'remove';
        cardsBuyItemBoxButtonRemove.addEventListener('click', deleteCallback);

        cardsBuyItemBox.append(cardsBuyItemBoxName, cardsBuyItemBoxPrice, cardsBuyItemBoxButtonRemove);``

        const cardsBuyItemCount = document.createElement('div');
        cardsBuyItemCount.className = 'wrapper-buy__content__cards__item__count';
        const cardsBuyItemCountButtonAdd = document.createElement('button');
        cardsBuyItemCountButtonAdd.className = 'wrapper-buy__content__cards__item__count__button-add';
        cardsBuyItemCountButtonAdd.addEventListener('click', addCallback);

        const cardsBuyItemCountResult = document.createElement('span');
        cardsBuyItemCountResult.className = 'wrapper-buy__content__cards__item__count__result';
        const allOrders = api.getOrders();
        const filterparsedOrders = allOrders.filter((order) => order.id === card.id);
        cardsBuyItemCountResult.innerHTML = filterparsedOrders.length;
       
       
        const cardsBuyItemCountButtonDelete = document.createElement('button');
        cardsBuyItemCountButtonDelete.className = 'wrapper-buy__content__cards__item__count__button-decrease';

        cardsBuyItemCountButtonDelete.addEventListener('click', decreaseCallback);

        cardsBuyItemCount.append(cardsBuyItemCountButtonAdd, cardsBuyItemCountResult, cardsBuyItemCountButtonDelete);

        cardsBuyItem.append(cardsBuyItemImage, cardsBuyItemBox, cardsBuyItemCount);

        cardsBuy.append(cardsBuyItem);
    }
}
