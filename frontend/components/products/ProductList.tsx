'use client';

import { useProducts } from '@/hooks/useProducts';
import ProductItem from './ProductItem';

export default function ProductList() {
  const {
    data: products = [],
    isLoading,
    isError
  } = useProducts();

  if (isLoading) {
    return <p>Đang tải danh sách sản phẩm...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Không thể tải danh sách sản phẩm!
      </p>
    );
  }

  if (products.length === 0) {
    return <p>Chưa có sản phẩm nào.</p>;
  }

  return (
    <div>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}