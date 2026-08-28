import Hero from "@/components/storefront/Hero";
import PetCatalog from "@/components/storefront/PetCatalog";
import QuizCta from "@/components/storefront/QuizCta";
import WhyChooseUs from "@/components/storefront/WhyChooseUs";
import BreedCatalog from "@/components/storefront/BreedCatalog";
import ProcessSteps from "@/components/storefront/ProcessSteps";
import ContentTeasers from "@/components/storefront/ContentTeasers";
import ContactCta from "@/components/storefront/ContactCta";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2] text-zinc-900">
      <main className="w-full flex-1">
        <Hero />
        <PetCatalog />
        <QuizCta />
        <WhyChooseUs />
        <BreedCatalog />
        <ProcessSteps />
        <ContentTeasers />
        <ContactCta />
      </main>
    </div>
  );
}
