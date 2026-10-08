import ProductForm from '@/components/products/ProductForm';
import ProductList from '@/components/products/ProductList';

export default function ProductsPage() {
    return (
        <main className="max-w-2xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">
                Quản lý sản phẩm
            </h1>

            <ProductForm />

            <h2 className="text-xl font-semibold mb-3">
                Danh sách sản phẩm
            </h2>

            <ProductList />
        </main>
    );
}