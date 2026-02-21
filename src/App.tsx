import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import WatWeDoen from "./pages/WatWeDoen";
import ZelfstandigWorden from "./pages/ZelfstandigWorden";
import Opleidingen from "./pages/Opleidingen";
import Vacatures from "./pages/Vacatures";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Contact from "./pages/Contact";
import WebinarAdmin from "./pages/WebinarAdmin";
import WebinarView from "./pages/WebinarView";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wat-we-doen" element={<WatWeDoen />} />
                <Route path="/zelfstandig-worden" element={<ZelfstandigWorden />} />
                <Route path="/opleidingen" element={<Opleidingen />} />
                <Route path="/vacatures" element={<Vacatures />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:articleId" element={<BlogArticle />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/webinar-admin" element={<WebinarAdmin />} />
                <Route path="/webinar/:token" element={<WebinarView />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
