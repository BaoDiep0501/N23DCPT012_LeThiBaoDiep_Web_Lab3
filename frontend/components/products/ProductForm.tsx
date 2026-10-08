'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateProduct } from '@/hooks/useProducts';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const createMutation = useCreateProduct();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim() || Number(price) <= 0) {
      toast.error('Thông tin sản phẩm không hợp lệ!');
      return;
    }

    try {
      await toast.promise(
        createMutation.mutateAsync({
          name: name.trim(),
          price: Number(price),
        }),
        {
          loading: 'Đang thêm sản phẩm...',
          success: 'Thêm sản phẩm thành công!',
          error: 'Thêm sản phẩm thất bại!',
        }
      );

      setName('');
      setPrice('');
    } catch (error) {
      console.error('Lỗi thêm sản phẩm:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6"
    >
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded flex-1"
        required
      />

      <input
        type="number"
        placeholder="Giá"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 rounded w-32"
        min="1"
        required
      />

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {createMutation.isPending ? 'Đang thêm...' : 'Thêm'}
      </button>
    </form>
  );
}