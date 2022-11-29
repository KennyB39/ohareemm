const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', (req, res) =>{
    Product.findAll({
        attributes: ['id', 'productName', 'price', 'stock'],include: [
            {
                model:Category,
                attributes:['categoryName']
            }
        ]
    })
})