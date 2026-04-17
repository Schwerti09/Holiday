import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, Sparkles, MapPin, Mail, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UeberUnsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Über uns | DeineZeitEureZeit – Affiliate-Partner von Verwoehnwochenende.de"
        description="Erfahren Sie mehr über DeineZeitEureZeit: Ihr Partner für Kurzreisen und Wellness-Wochenenden. Über 10.000 Angebote in Kooperation mit Verwoehnwochenende.de."
        pageType="about"
        canonicalPath="/ueber-uns"
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "Über uns", url: "/ueber-uns" },
        ]}
      />
      <Header />
      
      <main className="flex-1">
        <section 
          className="relative bg-cover bg-center py-16 md:py-24"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=600&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-testid="text-ueber-uns-title">
              Über uns
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Willkommen bei „DeineZeitEureZeit" – Ihrem Partner für Kurzreisen, 
              Wellness-Wochenenden und Premium-Lifestyle-Produkte.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <div className="space-y-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Unsere Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Wir möchten Ihnen helfen, die perfekte Auszeit zu finden – ob romantisches 
                  Wochenende zu zweit, entspannender Wellness-Kurzurlaub oder das ideale 
                  Geschenk zum Verwöhnen. Als Affiliate-Partner von{" "}
                  <a href="https://www.verwoehnwochenende.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    Verwoehnwochenende.de
                  </a>{" "}
                  präsentieren wir Ihnen über 10.000 handverlesene Angebote.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Was uns ausmacht
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Sorgfältig kuratierte Auswahl",
                      "Übersichtliche Präsentation",
                      "Praktische Merkliste & Vergleich",
                      "Keine versteckten Kosten",
                      "Persönlicher Service",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Ihre Vorteile
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Gleiche Preise wie beim Partner",
                      "Vertrauter deutscher Anbieter",
                      "Trusted Shops zertifiziert",
                      "Sichere Zahlungsabwicklung",
                      "Kompetenter Kundenservice",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Unser Partner
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      Alle auf unserer Website präsentierten Angebote stammen von{" "}
                      <strong className="text-foreground">Verwoehnwochenende.de</strong> – 
                      einem der führenden deutschen Anbieter für Kurzreisen und Hotelgutscheine.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Seit über 15 Jahren vermittelt Verwoehnwochenende.de Kurzurlaube in 
                      ausgewählten Hotels und sorgt für unvergessliche Erlebnisse.
                    </p>
                    <Button asChild variant="outline" className="gap-2">
                      <a href="https://www.verwoehnwochenende.de" target="_blank" rel="noopener noreferrer">
                        Zu Verwoehnwochenende.de
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <p className="font-medium text-foreground mb-1">Verwoehnwochenende.de</p>
                      <p className="text-sm text-muted-foreground">Inhaberin: Dipl. Geographin Ariane Struck</p>
                      <p className="text-sm text-muted-foreground">Seilbahn 10, 47829 Krefeld-Uerdingen</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1 bg-green-500/10 text-green-700 rounded-full">Trusted Shops</span>
                      <span className="text-xs px-3 py-1 bg-blue-500/10 text-blue-700 rounded-full">SSL-verschlüsselt</span>
                      <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">10.000+ Angebote</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  So funktioniert es
                </h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { step: "1", title: "Stöbern", desc: "Entdecken Sie unsere kuratierte Auswahl an Kurzreisen und Produkten" },
                    { step: "2", title: "Auswählen", desc: "Nutzen Sie Merkliste und Vergleich, um Ihr Lieblingsangebot zu finden" },
                    { step: "3", title: "Buchen", desc: "Per Klick gelangen Sie zu Verwoehnwochenende.de und schließen dort ab" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Kontakt
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      Bei Fragen zu unserer Website erreichen Sie uns unter:
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">Rolf Schwertfechter</p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        Karklandsweg 1, 26553 Dornum
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <a href="mailto:rps-vertrieb@t-online.de" className="text-primary hover:underline">
                          rps-vertrieb@t-online.de
                        </a>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-4">
                      Für Fragen zu Buchungen und Bestellungen:
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">Verwoehnwochenende.de</p>
                      <p className="text-muted-foreground">Tel: +49 (0)2065 / 4999116</p>
                      <p>
                        <a href="mailto:service@verwoehnwochenende.de" className="text-primary hover:underline">
                          service@verwoehnwochenende.de
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
