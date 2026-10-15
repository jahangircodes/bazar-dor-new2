'use client';

import { useAuth } from '@/context/AuthContext';
import { getProductById, toBengaliNumber } from '@/lib/api';
import type { Product } from '@/types/product';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const { user, loading } = useAuth();

    const [product, setProduct] = useState<Product | null>(null);
    const [productLoading, setProductLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function loadProduct() {
            setProductLoading(true);

            const data = await getProductById(id);

            if (isActive) {
                setProduct(data);
                setProductLoading(false);
            }
        }

        loadProduct();

        return () => {
            isActive = false;
        };
    }, [id]);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/signin');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <p className="text-gray-500">লোড হচ্ছে...</p>
            </div>
        );
    }

    if (productLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <p className="text-gray-500">
                    পণ্যের তথ্য লোড হচ্ছে...
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    পণ্যটি পাওয়া যায়নি
                </h2>

                <Link
                    href="/"
                    className="text-emerald-600 hover:underline mt-4 inline-block text-sm"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
                <Link
                    href="/"
                    className="text-sm font-medium text-gray-500 hover:text-emerald-700 transition inline-flex items-center gap-1"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-4">
                    <span className="text-5xl p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        {product.image}
                    </span>

                    <div>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                            প্রতি {product.unit}
                        </span>

                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                            {product.nameBn}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                    <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-2xl p-4 text-center">
                        <span className="text-xs text-gray-500 font-medium">
                            সর্বনিম্ন দাম
                        </span>

                        <p className="text-xl font-bold text-emerald-800 mt-1">
                            {toBengaliNumber(product.today - 5)} টাকা
                        </p>
                    </div>

                    <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-2xl p-4 text-center">
                        <span className="text-xs text-gray-500 font-medium">
                            সর্বোচ্চ দাম
                        </span>

                        <p className="text-xl font-bold text-emerald-800 mt-1">
                            {toBengaliNumber(product.today + 5)} টাকা
                        </p>
                    </div>

                    <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-2xl p-4 text-center">
                        <span className="text-xs text-gray-500 font-medium">
                            গড় দাম
                        </span>

                        <p className="text-xl font-bold text-emerald-800 mt-1">
                            {toBengaliNumber(product.today)} টাকা
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
