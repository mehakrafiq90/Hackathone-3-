import { Image } from "sanity";

export interface Product {
    _id: string;
    _type: "categort";
    productName: string;
    description: string;
    price: number;
    image?: {
      asset: {
        _ref: string;
        type: "Image";
      };
    }
    slug: {
      current: string;
    };
    dimensions: {
      height: string;
      width: string;
      depth: string;
    };
    features: string[];
    quantity: number;
    category: {
      name: string;
    };
    _createdAt: string;
    _updatedAt: string;
  }