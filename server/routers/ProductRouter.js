const express = require("express");
const {
  getAllProducts,
  getAllSizes,
  getAllColors,
  getAllCategories,
  createProductSize,
  createProductColor,
  createProductCategory,
  createProduct,
  createOrder,
  getAllOrders,
  getAllOrdersInDashboard,
  updateOrderStatus,
  getAllDescriptions,
  createDescription,
  updateDescription,
  deleteDescription,
  getAllEstimateDeliveries,
  createEstimateDelivery,
  updateEstimateDelivery,
  deleteEstimateDelivery,
  deleteProductCategory,
  updateProductCategory,
  deleteProduct,
  updateProduct,
} = require("../controllers/ProductController");
const multer = require("multer");
const { storage } = require("../lib/cloudinaryConfig");
const {
  authProtectMiddleware,
} = require("../middleware/authProtectMiddleware");
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/products", getAllProducts);

router.post("/product/create", upload.single("file"), createProduct);
router.get("/products/sizes", getAllSizes);
router.post("/products/create/size", createProductSize);
router.get("/products/colors", getAllColors);
router.delete("/product/delete/:id", deleteProduct);
router.post("/products/update/:id", updateProduct);
router.post("/products/create/color", createProductColor);
router.post("/products/create/category", createProductCategory);
router.get("/products/categories", getAllCategories);
router.post("/create/order", createOrder);
router.get("/orders", getAllOrders);
router.get("/admin/orders", authProtectMiddleware, getAllOrdersInDashboard);
router.patch("/orders/:id/status", updateOrderStatus);
router.delete("/products/delete/category/:id", deleteProductCategory);
router.post("/products/update/category/:id", updateProductCategory);
router.get("/products/descriptions", getAllDescriptions);
router.post("/products/create/description", createDescription);
router.post("/products/update/description/:id", updateDescription);
router.delete("/products/delete/description/:id", deleteDescription);
router.get("/products/estimate-deliveries", getAllEstimateDeliveries);
router.post("/products/create/estimate-delivery", createEstimateDelivery);
router.post("/products/update/estimate-delivery/:id", updateEstimateDelivery);
router.delete("/products/delete/estimate-delivery/:id", deleteEstimateDelivery);

module.exports = router;
