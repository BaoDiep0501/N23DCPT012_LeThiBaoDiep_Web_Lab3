import Link from 'next/link';
import CartBadge from './cart/CartBadge';

export default function Navbar() {
    return (
        <nav
            className="flex items-center justify-between
                 px-8 py-4 border-b"
        >
            <Link
                href="/"
                className="text-xl font-bold"
            >
                Fullstack Shop
            </Link>

            <div className="flex items-center gap-6">
                <Link href="/products">
                    Sản phẩm
                </Link>

                <CartBadge />
            </div>
        </nav>
    );
}