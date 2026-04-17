import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost } from "@shared/schema";

export default function BlogPage() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Reise-Blog & Ratgeber | DeineZeitEureZeit"
        description="Entdecken Sie unseren Reise-Blog mit Tipps zu Wellness, Romantik, Familienurlaub und Kurzreisen in Deutschland. Expertenwissen für Ihre perfekte Auszeit."
        keywords={["Reise Blog", "Wellness Tipps", "Kurzurlaub Deutschland", "Romantik Urlaub", "Familienurlaub Tipps"]}
        canonicalPath="/blog"
      />
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Unser Reise-Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Inspiration & Reisetipps
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expertenwissen rund um Wellness, Romantik und unvergessliche Kurzurlaube in Deutschland. 
              Entdecken Sie unsere ausführlichen Guides und Geheimtipps.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.map((post) => (
                <Card key={post.id} className="group overflow-hidden hover-elevate transition-all duration-300 flex flex-col" data-testid={`card-blog-${post.id}`}>
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-foreground backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="flex-grow">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readingTime} Min.
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="pt-0 mt-auto">
                    <Link href={`/blog/${post.slug}`} className="w-full">
                      <Button variant="outline" className="w-full group/btn" data-testid={`button-read-${post.id}`}>
                        Artikel lesen
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-16 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 md:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Finden Sie Ihre perfekte Auszeit
              </h2>
              <p className="text-muted-foreground mb-6">
                Über 10.000 handverlesene Reiseangebote warten auf Sie. Von Wellness-Wochenenden 
                bis romantischen Kurztrips - entdecken Sie jetzt Ihr nächstes Abenteuer.
              </p>
              <Link href="/kategorie/reisen">
                <Button size="lg" className="gap-2" data-testid="button-explore-offers">
                  Angebote entdecken
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
