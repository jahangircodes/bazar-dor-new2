import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import './globals.css';
import Providers from './providers'; // প্রজেক্টের Providers ইমপোর্ট করা হলো

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
        {/* Providers দিয়ে র‍্যাপ করা হলো যাতে Navbar ও পেজগুলো Auth Context পায় */}
        <Providers>
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}