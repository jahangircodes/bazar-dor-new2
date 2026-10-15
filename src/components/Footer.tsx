import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-8 sm:pt-12 pb-6 mt-12 sm:mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Grid Layout: 
            - মোবাইল (ডিফল্ট): ১ কলাম (নিচ নিচ)
            - ট্যাবলেট (sm / md): ২ কলাম 
            - কম্পিউটার (lg): ৩ কলাম
        */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 border-b border-slate-800 text-center sm:text-left">

                    {/* ১. ব্র্যান্ড ও স্লোগান */}
                    <div className="space-y-3 flex flex-col items-center sm:items-start">
                        <h2 className="text-xl sm:text-2xl font-bold text-emerald-400">
                            বাজার দর
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 max-w-xs sm:max-w-none leading-relaxed">
                            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।[cite: 6]
                        </p>
                    </div>

                    {/* ২. নেভিগেশন লিঙ্কসমূহ */}
                    <div className="space-y-3">
                        <h3 className="text-sm sm:text-base font-semibold text-white uppercase tracking-wider">
                            প্রয়োজনীয় লিঙ্ক
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li>
                                <Link href="/" className="hover:text-emerald-400 transition-colors inline-block py-1">
                                    হোম পেজ
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/all" className="hover:text-emerald-400 transition-colors inline-block py-1">
                                    সব ক্যাটাগরি
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="hover:text-emerald-400 transition-colors inline-block py-1">
                                    প্রোফাইল
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* ৩. সতর্কতা / ডিসক্লেইমার (ট্যাবলেটে ফুল উইডথ হতে পারে) */}
                    <div className="space-y-3 sm:col-span-2 lg:col-span-1">
                        <h3 className="text-sm sm:text-base font-semibold text-white uppercase tracking-wider">
                            জরুরি বিজ্ঞপ্তি
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed bg-slate-800/80 p-3 sm:p-4 rounded-xl border border-slate-700/60 shadow-inner">
                            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।[cite: 6]
                        </p>
                    </div>

                </div>

                {/* ৪. কপিরাইট সেকশন */}
                <div className="pt-6 text-center text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।</p>
                </div>

            </div>
        </footer>
    );
}