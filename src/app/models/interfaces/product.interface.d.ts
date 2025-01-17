export class Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string;
  category: string;
  brand: string;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  stock: number;
  reviews: Review[];
  weight: number;
  tags: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: string;

}

export interface ProductResponse {
  products: Product[];
}

export interface Review {
    rating: number;
    comment: string;
    date: string
    reviewerName: string;
    reviewerEmail: string;
}
