const express = require('express');
const controller = require('../controllers/productController');
const router = express.Router();

router.get('/products', controller.getAllProducts);

router.post('/product', controller.postProduct);

router
  .route('/product/:productId')
  .get(controller.getProduct)
  .patch(controller.patchProduct)
  .delete(controller.deleteProduct);

module.exports = router;
