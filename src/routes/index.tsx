import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Benefits } from "@/components/site/Benefits";
import { Catalog } from "@/components/site/Catalog";
import { About } from "@/components/site/About";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Catalog />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
