import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ShopProvider } from "@/contexts/shop-context";
import Home from "@/pages/home";
import CategoryPage from "@/pages/category";
import CategoriesPage from "@/pages/categories";
import WishlistPage from "@/pages/wishlist";
import ComparePage from "@/pages/compare";
import ImpressumPage from "@/pages/impressum";
import DatenschutzPage from "@/pages/datenschutz";
import UeberUnsPage from "@/pages/ueber-uns";
import VersandPage from "@/pages/versand";
import AGBPage from "@/pages/agb";
import WiderrufPage from "@/pages/widerruf";
import ZahlungVersandPage from "@/pages/zahlung-versand";
import ReiserichtlinienPage from "@/pages/reiserichtlinien";
import ReiseversicherungPage from "@/pages/reiseversicherung";
import BarrierefreiheitPage from "@/pages/barrierefreiheit";
import FAQPage from "@/pages/faq";
import WellnessPage from "@/pages/wellness";
import RomantikPage from "@/pages/romantik";
import VerwoehnartikelPage from "@/pages/verwoehnartikel";
import BlogPage from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/kategorie/:slug" component={CategoryPage} />
      <Route path="/kategorien" component={CategoriesPage} />
      <Route path="/merkliste" component={WishlistPage} />
      <Route path="/vergleich" component={ComparePage} />
      <Route path="/impressum" component={ImpressumPage} />
      <Route path="/datenschutz" component={DatenschutzPage} />
      <Route path="/ueber-uns" component={UeberUnsPage} />
      <Route path="/versand" component={VersandPage} />
      <Route path="/agb" component={AGBPage} />
      <Route path="/widerruf" component={WiderrufPage} />
      <Route path="/zahlung-versand" component={ZahlungVersandPage} />
      <Route path="/reiserichtlinien" component={ReiserichtlinienPage} />
      <Route path="/reiseversicherung" component={ReiseversicherungPage} />
      <Route path="/barrierefreiheit" component={BarrierefreiheitPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/wellness" component={WellnessPage} />
      <Route path="/romantik" component={RomantikPage} />
      <Route path="/verwoehnartikel" component={VerwoehnartikelPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="verwoehnen-theme">
        <ShopProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </ShopProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
