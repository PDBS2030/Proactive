import { Faq } from "@/components/Faq";
import { Films } from "@/components/Films";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Insights } from "@/components/Insights";
import { Offerings } from "@/components/Offerings";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { getFeaturedLines, getLatestNews } from "@/lib/db";

export default function Home() {
  return (
    <>
      <main id="main-content" className="relative bg-background">
        <Header dark />
        <Hero />
        <Offerings />
        <Projects featured={getFeaturedLines()} />
        <Films />
        <Process />
        <Insights items={getLatestNews()} />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
