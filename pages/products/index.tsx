import React, { useEffect, useState } from "react";
import * as api from "../api/apiClient";
import { Product } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await api.getProducts();
        console.log(products);
        setProducts(products.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      {products.map((product) => {
        const mainImage = product.images[0];
        return (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <img src={product.images[0]} alt={product.name} />
            <p>Price: ${product.price}</p>

            <Link
              href={`/products/${product.id}/`}
              as={`/products/${product.id}/`}
              prefetch={false}
            >
              <Image
                src={mainImage}
                alt={product.name}
                width={200}
                height={200}
                // layout="fill"
                className="w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductPage;
