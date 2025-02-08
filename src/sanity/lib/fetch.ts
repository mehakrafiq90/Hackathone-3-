// src/sanity/fetch.ts
import { client } from "./client";
import { Product } from "../../types/Product";

export const fetchLatestProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"] | order(_createdAt desc)[0...4] {
    _id,
    _type,
    name,
    slug,
    price,
    image{
      asset->{
        _id,
        url
      }
    },
    description,
    dimensions {
      height,
      width,
      depth
    },
    features,
    quantity,
    category->{name},
    _createdAt,
    _updatedAt
  }`;
  // const products = await client.fetch(query, { categoryName });
  // return products.map((product: { image: { asset: { url: any; }; }; category: { name: any; }; }) => ({
  //   ...product,
  //   image: product.image?.asset?.url ?? 'defaultImageUrl',  // Fallback if image is missing
  //   category: product.category?.name ?? 'defaultCategory',  // Fallback if category is missing
  // }))

  return await client.fetch(query);
};

export const fetchPopularProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product" && "popular products" in tags] | order(price desc)[0...3] {
    _id,
    _type,
    name,
    slug,
    price,
    image{
      asset->{
        _id,
        url
      }
    },
    description,
    dimensions {
      height,
      width,
      depth
    },
    features,
    quantity,
    category->{name},
    _createdAt,
    _updatedAt
  }`;

return await client.fetch(query);
};
export const fetchAllProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    _type,
    name,
    slug,
    price,
    image{
      asset->{
        _id,
        url
      }
    },
    description,
    dimensions {
      height,
      width,
      depth
    },
    features,
    quantity,
    category->{name},
    _createdAt,
    _updatedAt
  }`;
  // const products = await client.fetch(query, { categoryName });

  // // return await client.fetch(query, { categoryName });
  // return products.map((product: { image: { asset: { url: any; }; }; category: { name: any; }; }) => ({
  //   ...product,
  //   image: product.image?.asset?.url ?? 'defaultImageUrl',  // Fallback if image is missing
  //   category: product.category?.name ?? 'defaultCategory',  // Fallback if category is missing
  // }))
  
  return await client.fetch(query);
};

export const fetchProductsByCategory = async (
  categoryName: string
): Promise<Product[]> => {
  const query = `*[_type == "product" && category->name == $categoryName] | order(_createdAt desc) {
    _id,
    _type,
    name,
    slug,
    price,
    image{
      asset->{
        _id,
        url
      }
    },
    description,
    dimensions {
      height,
      width,
      depth
    },
    features,
    quantity,
    category->{name},
    _createdAt,
    _updatedAt
  }`;
  const products = await client.fetch(query, { categoryName });
  // return await client.fetch(query, { categoryName });
  return products.map((product: { image: { asset: { url: any; }; }; category: { name: any; }; }) => ({
    ...product,
    image: product.image?.asset?.url ?? 'defaultImageUrl',  // Fallback if image is missing
    category: product.category?.name ?? 'defaultCategory',  // Fallback if category is missing
  }))

  // return await client.fetch(query);
};