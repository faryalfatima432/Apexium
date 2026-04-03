// src/utils/sampleData.js
export const generateSampleData = () => {
    // Generate sample products
    const sampleProducts = [
        {
            id: 1,
            name: 'Wireless Bluetooth Headphones',
            price: 2999,
            salePrice: 2499,
            description: 'High-quality wireless headphones with noise cancellation',
            category: 'Electronics',
            imageUrl: '',
            stock: 50,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 5999,
            salePrice: 4999,
            description: 'Feature-rich smartwatch with health monitoring',
            category: 'Electronics',
            imageUrl: '',
            stock: 30,
            createdAt: new Date().toISOString()
        }
    ];

    // Generate sample orders
    const sampleOrders = [
        {
            id: 1,
            customerName: 'John Doe',
            items: [
                { id: 1, name: 'Wireless Bluetooth Headphones', price: 2999, salePrice: 2499, quantity: 2 }
            ],
            total: 4998,
            status: 'pending',
            date: new Date().toISOString()
        }
    ];

    // Save to localStorage if not exists
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify(sampleOrders));
    }
    if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', JSON.stringify([
            { id: 1, name: 'Electronics', createdAt: new Date().toISOString() },
            { id: 2, name: 'Clothing', createdAt: new Date().toISOString() }
        ]));
    }
};