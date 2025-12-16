import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ExpressConsultation from '@/components/ExpressConsultation';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <ExpressConsultation />
      <Services />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}

