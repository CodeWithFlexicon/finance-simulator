import Hero from "./components/landing/Hero";
import Navbar from "./components/landing/Navbar";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
    </main>
  );
}
