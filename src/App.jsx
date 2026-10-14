import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AppointmentForm from "./components/AppointmentForm";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AppointmentCta from "./components/AppointmentCta";
import DentalChatbot from "./components/DentalChatbot";

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />
      <main>
        <Home />
        <Services />
        <About />
        <AppointmentCta />
        <AppointmentForm />
        <Contact />
      </main>
      <Footer />
      <DentalChatbot />
    </div>
  );
}

export default App;
