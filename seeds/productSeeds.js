const { Product } = require('../models');

const productData = [
  {
    product_name: 'Socks',
    price: 14.99,
    stock: 14,
    category_id: 1,
  },
  {
    product_name: 'Faux Fur Jean Jacket',
    price: 90.0,
    stock: 25,
    category_id: 5,
  },
  {
    product_name: 'XL Beanie',
    price: 22.99,
    stock: 12,
    category_id: 4,
  },
  {
    product_name: 'Benny And The Jets T-shirt w/ pocket',
    price: 12.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: 'Cargo Joggers',
    price: 29.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
