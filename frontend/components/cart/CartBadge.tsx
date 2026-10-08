'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function CartBadge() {
    const { data: cart = [] } = useCart();

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <Link
            href="/cart"
            className="relative flex items-center gap-2"
        >
            <span className="text-xl">🛒</span>
            <span>Giỏ hàng</span>

            <span
                className="bg-red-500 text-white text-xs
                   rounded-full px-2 py-1 min-w-6
                   text-center"
            >
                {totalQuantity}
            </span>
        </Link>
    );
}