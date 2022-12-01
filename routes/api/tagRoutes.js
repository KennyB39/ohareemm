const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
    Tag.findAll({
        attributes: ['id', 'tag_name'],
        include:[
          {
          model: Product, 
          attributes: ['id', 'product_name' ]
        
        }
      ]
      })
      .then(tagData => res.json(tagData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });

    router.get('/:id', (req, res) => {
        Tag.findOne({
            where:{
              id: req.params.id
            }, 
            include: [
              {
                model: Product, 
                attributes: ['product_name', 'price', 'stock']
              }
            ]
          })
          .then(tagData => {
            if (!tagData) {
              res.status(404).json({message: 'no tag found with this id'});
              return;
            }
            res.json(tagData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
        });

        