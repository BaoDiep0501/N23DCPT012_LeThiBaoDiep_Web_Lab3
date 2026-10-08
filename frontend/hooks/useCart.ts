'use client';

import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';

import api from '@/lib/api';

import type {
    CartItem,
    AddToCartInput
} from '@/types/cart';

// GET - Lấy danh sách giỏ hàng
export function useCart() {
    return useQuery<CartItem[]>({
        queryKey: ['cart'],

        queryFn: async () => {
            const res = await api.get<CartItem[]>('/cart');
            return res.data;
        },

        staleTime: 30000,
    });
}

// POST - Thêm sản phẩm vào giỏ hàng
export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: AddToCartInput) => {
            const res = await api.post('/cart', data);
            return res.data;
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['cart'],
            });
        },
    });
}

// DELETE - Xóa sản phẩm khỏi giỏ hàng
export function useRemoveFromCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productId: number) => {
            await api.delete(`/cart/${productId}`);
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['cart'],
            });
        },
    });
}