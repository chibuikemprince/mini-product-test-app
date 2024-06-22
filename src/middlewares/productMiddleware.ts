import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/ProductController";
import { Container } from "typedi";

class ProductMiddleware {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate the request body

      // Create the product
      const productService = Container.get(ProductService);

      await productService.createProduct(req.body);
      // Prepare the response
      const response = {
        message: "Product created successfully",
        data: [],
        error: false,
      };

      // Send the response
      res.status(201).json(response);
    } catch (error) {
      //next(error);
      console.error(error);
      const response = {
        message: "Product not created successfully",
        data: [],
        error: true,
      };

      // Send the response
      res.status(500).json(response);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Fetch all products
      const productService = Container.get(ProductService);

      const products = await productService.getAllProducts(req.body.page || 1);
      // Prepare the response
      const response = {
        message: "Products fetched successfully",
        data: products,
        error: false,
      };

      // Send the response
      res.json(response);
    } catch (error) {
      next(error);
      const response = {
        message: "Products not fetched successfully",
        data: [],
        error: true,
      };
      // Send the response
      res.status(500).json(response);
    }
  }
}

export const ProductMiddlewareInstance = new ProductMiddleware();
