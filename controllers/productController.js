exports.getAllProducts = (req, res, next) => {
  res.status(200).json({ message: 'getAllProducts' });
};
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  res.status(200).json({ message: 'getAllProducts', productId });
};
exports.postProduct = (req, res, next) => {
  res.status(200).json({ message: 'postProduct' });
};
exports.patchProduct = (req, res, next) => {
  const productId = req.params.productId;
  res.status(200).json({ message: 'patchProduct', productId });
};
exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  res.status(200).json({ message: 'deleteProduct', productId });
};
