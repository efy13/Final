const ProductSchema = require("../models/Product/ProductSchema");
const ProductColorSchema = require("../models/Product/ProductColorSchema");
const ProductSizesSchema = require("../models/Product/ProductSizesSchema");
const UserSchema = require("../models/User/UserSchema");
const OrderSchema = require("../models/Order/OrderSchema");
const ProductCategoriesSchema = require("../models/Product/ProductCategorySchema");
const ProductDescriptionSchema = require("../models/Product/ProductDescriptionSchema");
const EstimateDeliverySchema = require("../models/Product/EstimateDeliverySchema");

const getAllProducts = async (req, res) => {
  const products = await ProductSchema.find()
    .populate("categories")
    .populate("sizes")
    .populate("colors");
  if (!products || products.length === 0) {
    return res.status(404).json({
      message: "No products found",
    });
  }
  return res.status(200).json({
    data: products,
  });
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    let updatedData = { ...req.body };
    if (req.file) {
      updatedData.imageUrl = req.file.path;
    }

    if (updatedData.inStock !== undefined) {
      updatedData.inStock =
        updatedData.inStock === "true" || updatedData.inStock === true;
    }

    const updatedProduct = await ProductSchema.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await ProductSchema.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAllColors = async (req, res) => {
  const colors = await ProductColorSchema.find();
  if (!colors || colors.length === 0) {
    return res.status(200).json({
      message: "No colors found",
      data: [],
    });
  }
  return res.status(200).json({
    data: colors,
  });
};

const getAllSizes = async (req, res) => {
  const sizes = await ProductSizesSchema.find();
  if (!sizes || sizes.length === 0) {
    return res.status(404).json({
      message: "No sizes found",
    });
  }
  return res.status(200).json({
    data: sizes,
  });
};
const createProductSize = async (req, res) => {
  const { name } = req.body;
  const exsistingName = await ProductSizesSchema.findOne({ name: name });
  if (exsistingName) {
    return res.status(400).json({
      message: "Size already exists",
    });
  }
  const newSize = new ProductSizesSchema({
    name: name,
  });
  await newSize.save();
  return res.status(201).json({
    message: "Size created successfully",
    data: newSize,
  });
};
const createProductColor = async (req, res) => {
  const { name, code } = req.body;
  const exsistingColor = await ProductColorSchema.findOne({ name: name });
  if (exsistingColor) {
    return res.status(400).json({
      message: "Color already exists",
    });
  }
  const newColor = new ProductColorSchema({
    name: name,
    code: code,
  });
  await newColor.save();
  return res.status(201).json({
    message: "Color created successfully",
    data: newColor,
  });
};
const getAllCategories = async (req, res) => {
  const categories = await ProductCategoriesSchema.find();
  if (!categories || categories.length === 0) {
    return res.status(404).json({
      message: "No categories found",
    });
  }
  return res.status(200).json({
    data: categories,
  });
};
const updateProductCategory = async (req, res) => {
  try {
    const updated = await ProductCategoriesSchema.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createProductCategory = async (req, res) => {
  const { name } = req.body;
  const exsistingCategory = await ProductCategoriesSchema.findOne({
    name: name,
  });
  if (exsistingCategory) {
    return res.status(400).json({
      message: "Category already exists",
    });
  }
  const newCategory = new ProductCategoriesSchema({
    name: name,
  });
  await newCategory.save();
  return res.status(201).json({
    message: "Category created successfully",
    data: newCategory,
  });
};

const deleteProductCategory = async (req, res) => {
  try {
    const deleted = await ProductCategoriesSchema.findByIdAndDelete(
      req.params.id
    );
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      estimateDelivery,
      inStock,
      categories,
      stockQuantity,
      sizes,
      colors,
    } = req.body;
    const exsistingProduct = await ProductSchema.findOne({ name: name });
    if (exsistingProduct) {
      return res.status(400).json({
        message: "Product already exists",
      });
    }
    const newProduct = new ProductSchema({
      name,
      price,
      description,
      estimateDelivery,
      inStock:
        inStock !== undefined ? inStock === "true" || inStock === true : true, // <-- burada
      imageUrl: req.file.path,
      categories,
      stockQuantity,
      sizes,
      colors,
    });
    await newProduct.save();
    return res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createOrder = async (req, res) => {
  const { user, products, totalAmount, status, address } = req.body;
  try {
    const foundUser = await UserSchema.findById(user);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const productIds = products.map((product) => product.product);
    const foundProducts = await ProductSchema.find({
      _id: { $in: productIds },
    });
    if (!foundProducts || foundProducts.length !== productIds.length) {
      return res
        .status(404)
        .json({ message: "One or more products not found" });
    }
    const newOrder = new OrderSchema({
      user: user,
      products: products,
      totalAmount: totalAmount,
      status: status || "pending",
      address: address,
    });
    await newOrder.save();
    return res.status(201).json({
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  const userId = req.query.user;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const orders = await OrderSchema.find({ user: userId })
      .populate("user")
      .populate("products.product");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    return res.status(200).json({
      data: orders,
      message: "User's orders fetched successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAllOrdersInDashboard = async (req, res) => {
  try {
    const orders = await OrderSchema.find()
      .populate("user")
      .populate("products.product");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res.status(200).json({
      data: orders,
      message: "All orders fetched successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }
  try {
    const order = await OrderSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res
      .status(200)
      .json({ message: "Order status updated", data: order });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAllDescriptions = async (req, res) => {
  try {
    const descriptions = await ProductDescriptionSchema.find();
    res.json({ data: descriptions });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createDescription = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    const desc = await ProductDescriptionSchema.create({ description });
    res.status(201).json({ message: "Description created", data: desc });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateDescription = async (req, res) => {
  try {
    const { description } = req.body;
    const updated = await ProductDescriptionSchema.findByIdAndUpdate(
      req.params.id,
      { description },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Description not found" });
    }
    res.json({ message: "Description updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteDescription = async (req, res) => {
  try {
    const deleted = await ProductDescriptionSchema.findByIdAndDelete(
      req.params.id
    );
    if (!deleted) {
      return res.status(404).json({ message: "Description not found" });
    }
    res.json({ message: "Description deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllEstimateDeliveries = async (req, res) => {
  try {
    const deliveries = await EstimateDeliverySchema.find();
    res.json({ data: deliveries });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createEstimateDelivery = async (req, res) => {
  try {
    const { estimateDelivery } = req.body;
    if (!estimateDelivery) {
      return res.status(400).json({ message: "Estimate delivery is required" });
    }
    const delivery = await EstimateDeliverySchema.create({ estimateDelivery });
    res
      .status(201)
      .json({ message: "Estimate delivery created", data: delivery });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateEstimateDelivery = async (req, res) => {
  try {
    const { estimateDelivery } = req.body;
    const updated = await EstimateDeliverySchema.findByIdAndUpdate(
      req.params.id,
      { estimateDelivery },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Estimate delivery not found" });
    }
    res.json({ message: "Estimate delivery updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteEstimateDelivery = async (req, res) => {
  try {
    const deleted = await EstimateDeliverySchema.findByIdAndDelete(
      req.params.id
    );
    if (!deleted) {
      return res.status(404).json({ message: "Estimate delivery not found" });
    }
    res.json({ message: "Estimate delivery deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  createOrder,
  getAllColors,
  getAllSizes,
  getAllCategories,
  createProductSize,
  createProductColor,
  createProductCategory,
  createProduct,
  getAllOrders,
  getAllOrdersInDashboard,
  updateOrderStatus,
  deleteProductCategory,
  updateProductCategory,
  getAllDescriptions,
  createDescription,
  updateDescription,
  deleteDescription,
  getAllEstimateDeliveries,
  createEstimateDelivery,
  updateEstimateDelivery,
  deleteEstimateDelivery,
  deleteProduct,
  updateProduct,
};
