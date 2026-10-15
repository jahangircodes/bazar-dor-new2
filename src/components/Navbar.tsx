'use client';

import { useAuth } from '@/context/AuthContext';
import { getCategories, getProducts, toBengaliNumber } from '@/lib/api';
import { Category, Product } from '@/types/product';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
        getProducts().then(setProducts).catch(console.error);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ডানে স্ক্রোল করার ফাংশন
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 200,
                behavior: 'smooth',
            });
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <span className="w-9 h-9 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-lg shadow-sm">
                            🛒
                        </span>
                        <span className="text-xl sm:text-2xl font-bold text-emerald-700">
                            বাজার দর
                        </span>
                    </Link>
                </div>

                {/* Auth State & Profile Dropdown */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition"
                            >
                                <div className="w-8 h-8 bg-emerald-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-semibold text-gray-800 hidden sm:inline">{user.name}</span>
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 text-sm">
                                    <div className="px-4 py-2.5 border-b border-gray-100">
                                        <p className="font-bold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        <span>👤</span>
                                        <span>আমার প্রোফাইল</span>
                                    </Link>

                                    <button
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            logout();
                                        }}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 transition"
                                    >
                                        <span>🚪</span>
                                        <span>সাইন আউট</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link href="/signin" className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-emerald-700 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition">
                                সাইন ইন
                            </Link>
                            <Link href="/signup" className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition">
                                সাইন আপ
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Categories Navigation Bar */}
            <div className="border-t border-b border-gray-100 bg-gray-50/80">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* হরিজন্টাল স্ক্রোলিং কন্টেইনার */}
                    <div
                        ref={scrollContainerRef}
                        className="flex items-center gap-2 py-2.5 text-sm overflow-x-auto scroll-smooth whitespace-nowrap scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden grow"
                    >
                        {categories.map((cat) => {
                            const isActive = pathname === `/category/${cat.slug}`;
                            return (
                                <Link
                                    key={cat.id}
                                    href={`/category/${cat.slug}`}
                                    className={`px-3 sm:px-3.5 py-1.5 rounded-full font-medium transition inline-flex items-center gap-1.5 shrink-0 ${isActive
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'text-gray-700 hover:bg-gray-200/70 bg-white border border-gray-200/60'
                                        }`}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.nameBn}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* ডান দিকের অ্যারো বাটন (শুধুমাত্র মোবাইল ও ট্যাবলেটের জন্য: flex lg:hidden) */}
                    <button
                        onClick={scrollRight}
                        className="flex lg:hidden items-center justify-center p-1.5 sm:p-2 ml-2 text-gray-600 hover:text-emerald-700 bg-white hover:bg-gray-100 shadow-sm border border-gray-200 rounded-full z-10 shrink-0 transition"
                        title="আরও ক্যাটাগরি দেখতে ডানে যান"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Live Marquee Ticker */}
            {products.length > 0 && (
                <div className="bg-emerald-900 text-white py-1.5 overflow-hidden text-xs font-medium">
                    <div className="flex whitespace-nowrap animate-marquee gap-8">
                        {products.concat(products).map((p, idx) => (
                            <span key={`${p.id}-${idx}`} className="inline-flex items-center gap-1.5">
                                <span>{p.image}</span>
                                <span className="font-semibold">{p.nameBn}:</span>
                                <span>{toBengaliNumber(p.today)} টাকা/{p.unit}</span>
                                <span className={p.change.dir === 'up' ? 'text-red-400 font-bold' : p.change.dir === 'down' ? 'text-green-400 font-bold' : 'text-gray-300'}>
                                    {p.change.dir === 'up' && `▲ ${toBengaliNumber(p.change.pct)}%`}
                                    {p.change.dir === 'down' && `▼ ${toBengaliNumber(Math.abs(p.change.pct))}%`}
                                    {p.change.dir === 'flat' && `—০.০%`}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}