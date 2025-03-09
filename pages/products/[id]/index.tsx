import * as api from "@/pages/api/apiClient";
import React, { useEffect } from "react";
import { useRouter } from 'next/router';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = React.useState<any>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(id);
        const product = await api.getProduct(Number(id));
        console.log(product);
        setProduct(product.product);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      {product && <h1>{product.name}</h1>}
      {product && <p>{product.description}</p>}
      {product && <img src={product.images[0]} alt={product.name} />}
      {product && <p>Price: ${product.price}</p>}
    </div>
  );
};

export default ProductPage;
