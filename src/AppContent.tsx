import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import OnzeDiensten from "./pages/OnzeDiensten";
import ZoSluitJeAan from "./pages/ZoSluitJeAan";
import Opleidingen from "./pages/Opleidingen";
import Vacatures from "./pages/Vacatures";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Contact from "./pages/Contact";
import WebinarAdmin from "./pages/WebinarAdmin";
import WebinarView from "./pages/WebinarView";
import OpleidingenAdmin from "./pages/OpleidingenAdmin";
import SubmissionsAdmin from "./pages/SubmissionsAdmin";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";
import GoogleAnalytics from "./components/GoogleAnalytics";

const queryClient = new QueryClient();

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <GoogleAnalytics />
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onze-diensten" element={<OnzeDiensten />} />
            <Route path="/onze-diensten/" element={<OnzeDiensten />} />
            <Route path="/wat-we-doen" element={<OnzeDiensten />} />
            <Route path="/wat-we-doen/" element={<OnzeDiensten />} />
            <Route path="/zo-sluit-je-aan" element={<ZoSluitJeAan />} />
            <Route path="/zo-sluit-je-aan/" element={<ZoSluitJeAan />} />
            <Route path="/zelfstandig-worden" element={<Navigate to="/blog/zelfstandig-thuisverpleegkundige-worden/" replace />} />
            <Route path="/zelfstandig-worden/" element={<Navigate to="/blog/zelfstandig-thuisverpleegkundige-worden/" replace />} />
            <Route path="/opleidingen" element={<Opleidingen />} />
            <Route path="/opleidingen/" element={<Opleidingen />} />
            <Route path="/vacatures" element={<Vacatures />} />
            <Route path="/vacatures/" element={<Vacatures />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/" element={<Blog />} />
            <Route path="/blog/:articleId" element={<BlogArticle />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/privacy/" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/cookies/" element={<Cookies />} />
            <Route path="/webinar-admin" element={<WebinarAdmin />} />
            <Route path="/webinar/:token" element={<WebinarView />} />
            <Route path="/opleidingen-admin" element={<OpleidingenAdmin />} />
            <Route path="/inzendingen-admin" element={<SubmissionsAdmin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <CookieConsent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppContent;
