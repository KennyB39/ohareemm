const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', (req, res) => {
    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock'],
        include:[
          {
            model: Category,
            attributes: ['category_name']
          }
        ]
      })
      .then(ProductData => res.json(ProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
    });

    router.get('/:id', (req, res) => {
        Product.findOne({
            where:{
              id: req.params.id
            },
            attributes: ['product_name', 'price', 'stock'],
            include:[
              {
                model: Category,
                attributes: ['category_name']
              }
            ]
          })
          .then(ProductData => {
            if (!ProductData) {
              res.status(404).json({ message: 'No product found with this id' });
              return;
            }
            res.json(ProductData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
        
        });

        Product.create(req.body)
    .then((product) => {
        if (req.body.tagIds.length) {
            const productTagIdArr = req.body.tagIds.map((tag_id) => {
              return {
                product_id: product.id,
                tag_id,
              };
            });
            return ProductTag.bulkCreate(productTagIdArr);
          }
          res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((product) => {
    return ProductTag.findAll({ where: { product_id: req.params.id } });
  })
  .then((productTags) => {
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds
    .filter((tag_id) => !productTagIds.includes(tag_id))
    .map((tag_id) => {
      return {
        product_id: req.params.id,
        tag_id,
      };
    });
    const productTagsToRemove = productTags
    .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    .map(({ id }) => id);
    return Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
  })
  .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});