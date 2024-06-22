import { Service } from "typedi";
import { hash, compare } from "bcryptjs";
import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";
import { ProductDatatype } from "../types";

import Joi from "joi";

// Define the schema for product validation
const productSchema = Joi.object({
  userid: Joi.number().required(),
  name: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  tag: Joi.string().required(),
  size: Joi.string().required(),
  weight: Joi.number().required(),
  skuId: Joi.string().required(),
  colour: Joi.string().required(),
});

// Validate the product data
const validateProduct = (productData: ProductDatatype) => {
  const { error, value } = productSchema.validate(productData);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

@Service()
export class ProductService {
  appDataSource = AppDataSource;

  async createProduct(productData: Product): Promise<any> {
    try {
      const validatedProductData = validateProduct(productData);

      // Save the product to the database
      const product = await this.appDataSource.manager.save(
        this.appDataSource.manager.create(Product, validatedProductData)
      );

      return product;
    } catch (error) {
      throw error; // Rethrow other errors
    }
  }

  async getAllProducts(
    page: number
  ): Promise<{ message: string; data: ProductDatatype[]; error: boolean }> {
    const productsPerPage = 5;
    const skip = (page - 1) * productsPerPage;

    const products = await this.appDataSource.manager.find(Product, {
      skip,
      take: productsPerPage,
    });

    // Update the views parameter for each product
    for (const product of products) {
      product.views++;
      await this.appDataSource.manager.save(product);
    }

    const response = {
      message: "Products fetched successfully",
      data: products,
      error: false,
    };

    return response;
  }
}
