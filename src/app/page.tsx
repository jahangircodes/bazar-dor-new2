import { getProducts, toBengaliNumber } from '@/lib/api';
import { getBanglaDate } from '@/lib/date';
import type { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const products: Product[] = await getProducts();
  const todayStr = getBanglaDate();

  const risers = [...products]
    .filter((p) => p.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change.dir === 'down')
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero / Banner Section */}
      <section className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl text-center md:text-left">
          <span className="inline-block text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            {todayStr}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম—বাজারভিত্তিক বিস্তারিত, সর্বনিম্ন, সর্বোচ্চ এবং পরিবর্তনের হার একসাথে জানুন।
          </p>
          <div>
            <a
              href="#all-products"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl transition shadow-sm text-sm sm:text-base"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        {/* Banner Right Side Image */}
        <div className="w-full md:w-auto flex justify-center bg-emerald-50/50 p-6 rounded-3xl">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের ফলের ঝুড়ি"
            width={240}
            height={200}
            priority
            className="object-contain w-48 sm:w-60 h-auto"
          />
        </div>
      </section>

      {/* Section A — Top Risers */}
      {risers.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-red-600 flex items-center gap-2">
            <span>▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section B — Top Fallers */}
      {fallers.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-green-600 flex items-center gap-2">
            <span>▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section C — All Products */}
      <section id="all-products" className="space-y-6 pt-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-green-600">সব পণ্য</h2>
          <p className="text-sm text-gray-500">সকল নিত্যপ্রয়োজনীয় পণ্যের তালিকা ও আজকের বাজার দর</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const changeColor =
    product.change.dir === 'up'
      ? 'text-red-500 bg-red-50'
      : product.change.dir === 'down'
        ? 'text-green-500 bg-green-50'
        : 'text-gray-500 bg-gray-100';

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between gap-4 group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gray-50 rounded-xl group-hover:scale-110 transition">
            {product.image}
          </span>
          <div>
            <h3 className="font-bold text-gray-800 text-base">{product.nameBn}</h3>
            <span className="text-xs text-gray-400">প্রতি {product.unit}</span>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-gray-100 pt-3">
        <div>
          <span className="text-xs text-gray-500 block">আজকের দাম</span>
          <span className="text-lg font-bold text-emerald-700">
            {toBengaliNumber(product.today)} টাকা
          </span>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${changeColor}`}>
          {product.change.dir === 'up' && `▲ ${toBengaliNumber(product.change.pct)}%`}
          {product.change.dir === 'down' && `▼ ${toBengaliNumber(Math.abs(product.change.pct))}%`}
          {product.change.dir === 'flat' && `—০.০%`}
        </span>
      </div>
    </Link>
  );
}