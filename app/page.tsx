import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Insights } from "@/components/Insights";
import { Intro } from "@/components/Intro";
import { Offerings } from "@/components/Offerings";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Intro />
      <main id="main-content" className="relative bg-background">
        <Header />
        <Hero />
        <Offerings />
        <Projects />
        <Process />
        <Insights />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
