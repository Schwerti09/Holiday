import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Calendar, Clock, ArrowLeft, Share2, Tag, User, ChevronRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import type { BlogPost } from "@shared/schema";

function MarkdownContent({ content }: { content: string }) {
  const parseContent = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let key = 0;

    const flushList = () => {
      if (currentList.length > 0 && listType) {
        const ListTag = listType === 'ul' ? 'ul' : 'ol';
        elements.push(
          <ListTag key={key++} className={`my-4 space-y-2 ${listType === 'ul' ? 'list-disc' : 'list-decimal'} list-inside text-muted-foreground`}>
            {currentList.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ListTag>
        );
        currentList = [];
        listType = null;
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      
      if (!trimmed) {
        flushList();
        continue;
      }

      if (trimmed.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={key++} className="text-3xl md:text-4xl font-bold text-foreground mt-8 mb-4">
            {trimmed.slice(2)}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={key++} className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={key++} className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3">
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        flushList();
        elements.push(
          <p key={key++} className="font-semibold text-foreground mt-4 mb-2">
            {trimmed.slice(2, -2)}
          </p>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        currentList.push(trimmed.slice(2));
      } else if (/^\d+\.\s/.test(trimmed)) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        currentList.push(trimmed.replace(/^\d+\.\s/, ''));
      } else {
        flushList();
        const formattedLine = trimmed
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        elements.push(
          <p 
            key={key++} 
            className="text-muted-foreground leading-relaxed my-4"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      }
    }

    flushList();
    return elements;
  };

  return <div className="prose prose-lg max-w-none">{parseContent(content)}</div>;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
    enabled: !!slug,
  });

  const { data: allPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const relatedPosts = allPosts?.filter(p => p.slug !== slug).slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Artikel nicht gefunden</h1>
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zum Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {post && (
        <SEOHead
          title={`${post.title} | DeineZeitEureZeit Blog`}
          description={post.metaDescription}
          keywords={post.tags}
          canonicalPath={`/blog/${post.slug}`}
        />
      )}
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" data-testid="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Start</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate max-w-[200px]">{post?.title || 'Artikel'}</span>
          </nav>

          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="aspect-[21/9] w-full rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ) : post ? (
            <article>
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="secondary" className="text-sm">
                    {post.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {post.readingTime} Min. Lesezeit
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  {post.title}
                </h1>

                <p className="text-xl text-muted-foreground mb-6">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleShare} data-testid="button-share">
                    <Share2 className="w-4 h-4 mr-2" />
                    Teilen
                  </Button>
                </div>
              </header>

              <div className="relative rounded-xl overflow-hidden mb-10 aspect-[21/9]">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose-container">
                <MarkdownContent content={post.content} />
              </div>

              <Separator className="my-10" />

              <div className="flex flex-wrap gap-2 mb-10">
                <span className="flex items-center gap-1 text-sm text-muted-foreground mr-2">
                  <Tag className="w-4 h-4" />
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6 md:p-8 mb-10">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Passende Angebote entdecken
                </h3>
                <p className="text-muted-foreground mb-4">
                  Finden Sie jetzt das perfekte Angebot für Ihren nächsten Kurzurlaub!
                </p>
                <Link href="/kategorie/reisen">
                  <Button data-testid="button-find-offers">Angebote ansehen</Button>
                </Link>
              </div>
            </article>
          ) : null}

          {relatedPosts && relatedPosts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Weitere Artikel</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relPost) => (
                  <Link key={relPost.id} href={`/blog/${relPost.slug}`}>
                    <div className="group cursor-pointer" data-testid={`card-related-${relPost.id}`}>
                      <div className="relative rounded-lg overflow-hidden mb-3 aspect-[16/10]">
                        <img
                          src={relPost.imageUrl}
                          alt={relPost.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {relPost.readingTime} Min. Lesezeit
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10">
            <Link href="/blog">
              <Button variant="outline" data-testid="button-back-blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Alle Artikel anzeigen
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
