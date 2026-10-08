'use client';

import toast from 'react-hot-toast';

import { useRemoveFromCart } from '@/hooks/useCart';

import type { Product } from '@/types/product';
import type { CartItem as CartItemType } from '@/types/cart';

type CartItemProps = {
    item: CartItemType;
    product?: Product;
};

export default function CartItem({
    item,
    product
}: CartItemProps) {

    const removeMutation = useRemoveFromCart();

    const handleRemove = async () => {
        if (!confirm('Xóa sản phẩm khỏi giỏ hàng?')) return;

        try {
            await removeMutation.mutateAsync(item.productId);

            toast.success('Đã xóa khỏi giỏ hàng');
        } catch (error) {
            console.error('Lỗi xóa giỏ hàng:', error);
            toast.error('Xóa thất bại!');
        }
    };

    const subtotal = product
        ? product.price * item.quantity
        : 0;

    return (
        <div className="flex justify-between items-center border rounded p-4 mb-3 gap-4">
            <div>
                <h3 className="font-semibold">
                    {product?.name ?? 'Sản phẩm không còn tồn tại'}
                </h3>

                <p className="text-sm text-gray-500">
                    Số lượng: {item.quantity}
                </p>

                {product && (
                    <>
                        <p className="text-sm">
                            Đơn giá: {product.price.toLocaleString()}đ
                        </p>

                        <p className="font-medium">
                            Thành tiền: {subtotal.toLocaleString()}đ
                        </p>
                    </>
                )}
            </div>

            <button
                onClick={handleRemove}
                disabled={removeMutation.isPending}
                className="text-red-500 hover:text-red-700 disabled:opacity-50"
            >
                {removeMutation.isPending ? 'Đang xóa...' : 'Xóa'}
            </button>
        </div>
    );
}