'use client';

import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';

import api from '@/lib/api';
import type { Product, ProductInput } from '@/types/product';

// GET: Lấy danh sách sản phẩm
export function useProducts() {
    return useQuery<Product[]>({
        queryKey: ['products'],

        queryFn: async () => {
            const res = await api.get<Product[]>('/products');
            return res.data;
        },

        staleTime: 30000,
    });
}

// POST: Thêm sản phẩm
export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ProductInput) => {
            const res = await api.post<Product>('/products', data);
            return res.data;
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['products'],
            });
        },
    });
}

// PUT: Cập nhật sản phẩm
export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            data
        }: {
            id: number;
            data: ProductInput;
        }) => {
            const res = await api.put<Product>(
                `/products/${id}`,
                data
            );

            return res.data;
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['products'],
            });
        },
    });
}

// DELETE: Xóa sản phẩm
export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/products/${id}`);
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['products'],
            });
        },
    });
}