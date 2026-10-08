'use client';

import Link from 'next/link';

import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';

import CartItem from '@/components/cart/CartItem';

export default function CartPage() {
    const {
        data: cart = [],
        isLoading: cartLoading,
        isError: cartError
    } = useCart();

    const {
        data: products = [],
        isLoading: productsLoading,
        isError: productsError
    } = useProducts();

    if (cartLoading || productsLoading) {
        return (
            <main className="max-w-3xl mx-auto p-8">
                <p>Đang tải giỏ hàng...</p>
            </main>
        );
    }

    if (cartError || productsError) {
        return (
            <main className="max-w-3xl mx-auto p-8">
                <p className="text-red-500">
                    Không thể tải giỏ hàng!
                </p>
            </main>
        );
    }

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalAmount = cart.reduce((total, item) => {
        const product = products.find(
            p => p.id === item.productId
        );

        if (!product) return total;

        return total + product.price * item.quantity;
    }, 0);

    return (
        <main className="max-w-3xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">
                Giỏ hàng của bạn
            </h1>

            {cart.length === 0 ? (
                <div>
                    <p className="mb-4">
                        Giỏ hàng hiện đang trống.
                    </p>

                    <Link
                        href="/products"
                        className="text-blue-600"
                    >
                        Tiếp tục mua sắm
                    </Link>
                </div>
            ) : (
                <>
                    {cart.map((item) => {
                        const product = products.find(
                            p => p.id === item.productId
                        );

                        return (
                            <CartItem
                                key={item.productId}
                                item={item}
                                product={product}
                            />
                        );
                    })}

                    <div className="border-t pt-4 mt-6">
                        <p className="mb-2">
                            Tổng số lượng: {totalQuantity}
                        </p>

                        <p className="text-xl font-bold">
                            Tổng tiền: {totalAmount.toLocaleString()}đ
                        </p>
                    </div>
                </>
            )}
        </main>
    );
}