'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import type { Product } from '@/types/product';
import { useAddToCart } from '@/hooks/useCart';

import {
  useUpdateProduct,
  useDeleteProduct
} from '@/hooks/useProducts';

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({
  product
}: ProductItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editPrice, setEditPrice] = useState(
    String(product.price)
  );

  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const addToCartMutation = useAddToCart();

  const handleEdit = () => {
    setEditName(product.name);
    setEditPrice(String(product.price));
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!editName.trim() || Number(editPrice) <= 0) {
      toast.error('Thông tin sản phẩm không hợp lệ!');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: product.id,
        data: {
          name: editName.trim(),
          price: Number(editPrice),
        },
      });

      toast.success('Cập nhật sản phẩm thành công!');
      setIsEditing(false);
    } catch (error) {
      console.error('Lỗi cập nhật:', error);
      toast.error('Cập nhật thất bại!');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bạn chắc chắn muốn xoá?')) return;

    try {
      await deleteMutation.mutateAsync(product.id);
      toast.success('Đã xoá sản phẩm');
    } catch (error) {
      console.error('Lỗi xoá sản phẩm:', error);
      toast.error('Xoá thất bại!');
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCartMutation.mutateAsync({
        productId: product.id,
        quantity: 1,
      });

      toast.success('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Lỗi thêm giỏ hàng:', error);
      toast.error('Không thể thêm vào giỏ hàng!');
    }
  };

  return (
    <div className="border rounded p-3 mb-2">
      {isEditing ? (
        <div className="flex gap-2">
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="border p-2 rounded flex-1"
          />

          <input
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            className="border p-2 rounded w-28"
            min="1"
          />

          <button
            onClick={handleUpdate}
            disabled={updateMutation.isPending}
            className="text-green-600 disabled:opacity-50"
          >
            Lưu
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-500"
          >
            Hủy
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-3">
          <div>
            <span>{product.name}</span>
            <span className="ml-3">
              {product.price.toLocaleString()}đ
            </span>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
              className="text-green-600 disabled:opacity-50"
            >
              {addToCartMutation.isPending
                ? 'Đang thêm...'
                : 'Thêm vào giỏ'}
            </button>

            <button
              onClick={handleEdit}
              className="text-blue-600"
            >
              Sửa
            </button>

            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="text-red-500 disabled:opacity-50"
            >
              Xóa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}