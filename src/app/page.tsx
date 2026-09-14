import { manifest } from "@/lib/assets";
import { AssetsProvider } from "@/components/Assets";
import Spine from "@/components/Spine";
import Hero from "@/components/Hero";
import Reduction from "@/components/Reduction";
import Sequence from "@/components/Sequence";
import CapSection from "@/components/CapSection";
import BaseSection from "@/components/BaseSection";
import Specs from "@/components/Specs";
import Ritual from "@/components/Ritual";
import Editions from "@/components/Editions";
import PatentSection from "@/components/PatentSection";
import Faq from "@/components/Faq";
import Preorder from "@/components/Preorder";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <AssetsProvider value={manifest}>
      <Spine />
      <main id="inhalt">
        <Hero />
        <Reduction />
        <Sequence />
        <CapSection />
        <BaseSection />
        <Specs />
        <Ritual />
        <Editions />
        <PatentSection />
        <Faq />
        <Preorder />
      </main>
      <Footer />
    </AssetsProvider>
  );
}
