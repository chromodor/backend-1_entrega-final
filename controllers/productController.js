const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    let filter = {};

    if (query) {
      try {
        const parsed = JSON.parse(query);
        if (parsed.category) filter.category = parsed.category;
        if (parsed.status !== undefined) filter.status = parsed.status;
      } catch {
        filter.category = query;
      }
    }

    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption,
    };

    const result = await Product.paginate(filter, options);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${
      req.path
    }`;
    const prevLink = result.hasPrevPage
      ? `${baseUrl}?page=${result.prevPage}&limit=${limit}`
      : null;
    const nextLink = result.hasNextPage
      ? `${baseUrl}?page=${result.nextPage}&limit=${limit}`
      : null;

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", error: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
