import Header from "@/components/Website/Header/Header";
import MarketTicker from "@/components/MarketTicker";
import Footer from "@/components/Website/Footer/Footer";
import ForexPage from '@/components/Website/Forex/Forex';
import { getSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getSeoMetadata("forex");
}

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      <MarketTicker />
      <ForexPage />
      <Footer />
    </div>
  );
}
