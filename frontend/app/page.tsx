import CtaBanner from "./components/landing/CtaBanner";
import Features from "./components/landing/Features";
import Footer from "./components/landing/Footer";
import Hero from "./components/landing/Hero";
import HowItWorks from "./components/landing/HowItWorks";
import Navbar from "./components/landing/Navbar";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CtaBanner />
      <Footer />
    </main>
  );
}
