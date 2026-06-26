import TopAppBar from "@/components/layout/TopAppBar";
import Hero from "@/components/sections/Hero";
import Curriculum from "@/components/sections/Curriculum";
import Team from "@/components/sections/Team";
import Register from "@/components/sections/Register";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <TopAppBar />
      <main className="pt-22">
        <Hero />
        <Curriculum />
        <Team />
        <Register />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
