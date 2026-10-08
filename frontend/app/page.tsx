import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-4xl font-bold">
                Fullstack Shop
            </h1>

            <p className="text-gray-500">
                Ứng dụng quản lý sản phẩm với Next.js và Express
            </p>

            <Link
                href="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                Quản lý sản phẩm
            </Link>
        </main>
    );
}