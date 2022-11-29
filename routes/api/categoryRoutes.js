const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
    Category.findAll({
        attributes: ['id', 'category_name'],
        include: [ 
          {
            model: Product,
            attributes: ['id', 'product_name', 'price']
          }
        ]
      })
      .then(categoryData => res.json(categoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });

    router.get('/:id', (req, res) => {
        Category.findOne({
            where: {
              id: req.params.id
            }, 
            attributes: [ 'category_name', 'id'],
            include: [ 
              {
                model: Product,
                attributes: ['id', 'product_name', 'price']
              }
            ]
          })
          .then(categoryData => {
            if (!categoryData) {
              res.status(404).json({ message: 'No category found with this id' });
              return;
            }
            res.json(categoryData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
        });
         