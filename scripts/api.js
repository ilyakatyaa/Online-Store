export class API {
    constructor() {
        this.furniture = [
            {
                id: 0,
                name: 'High-Back Bench',
                price: 9.99,
                image: '../assets/1.jpg',
                brand: 'Ikea',
            },
            {
                id: 1,
                name: 'Albany Table',
                price: 79.99,
                image: '../assets/2.jpg',
                brand: 'Marcos',
            },
            {
                id: 2,
                name: 'Accent Chair',
                price: 25.99,
                image: '../assets//3.jpeg',
                brand: 'Caressa',
            },
            {
                id: 3,
                name: 'Wooden Table',
                price: 45.99,
                image: '../assets/4.jpeg',
                brand: 'Liddy',
            },
            {
                id: 4,
                name: 'Dining Table',
                price: 6.99,
                image: '../assets/5.jpeg',
                brand: 'Ikea',
            },
            {
                id: 5,
                name: 'Sofa Set',
                price: 69.99,
                image: '../assets/6.jpeg',
                brand: 'Marcos',
            },
            {
                id: 6,
                name: 'Modern Bookshelf',
                price: 8.99,
                image: '../assets/7.jpg',
                brand: 'Caressa',
        
            },
            {
                id: 7,
                name: 'Emperor Bad',
                price: 21.99,
                image: '../assets/8.jpeg',
                brand: 'Liddy',
            },
            {
                id: 8,
                name: 'Utopia Sofa',
                price: 39.95,
                image: '../assets/9.jpg',
                brand: 'Ikea',
            },
            {
                id: 9,
                name: 'Entertainment Center',
                price: 29.98,
                image: '../assets/10.jpg',
                brand: 'Marcos',
            },
            {
                id: 10,
                name: 'Albany Sectional',
                price: 10.99,
                image: '../assets/11.png',
                brand: 'Caressa',
            },
            {
                id: 11,
                name: 'Leather Sofa',
                price: 69.99,
                image: '../assets/12.jpeg',
                brand: 'Liddy',
            },
        ],
        this.parsedOrders = []
    }

    getFurniture() {
        return this.furniture;
    }

    getOrders() {
        const orders = JSON.parse(localStorage.getItem('orders'));
        if (orders) {
            this.parsedOrders = orders;
        } else {
            this.setOrders([]);
        }
        return this.parsedOrders;
    }

    setOrders(orders) {
        localStorage.setItem('orders', JSON.stringify(orders));
    }
}
