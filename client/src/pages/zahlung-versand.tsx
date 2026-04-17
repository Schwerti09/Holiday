import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Truck, Gift, Clock, Shield, Check, ExternalLink, Banknote, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ZahlungVersandPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Zahlung & Versand | Zahlungsarten bei Verwoehnwochenende.de"
        description="Alle Zahlungsarten: Kreditkarte, PayPal, Sofortüberweisung, Vorkasse. Versandkosten ab 4,90€, Gratis-Versand ab 50€. Sichere SSL-Verschlüsselung."
        pageType="legal"
        canonicalPath="/zahlung-versand"
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "Zahlung & Versand", url: "/zahlung-versand" },
        ]}
      />
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-zahlung-title">
                  Zahlung & Versand
                </h1>
                <p className="text-muted-foreground">Informationen zu Zahlungsarten und Lieferung</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Hinweis zur Abwicklung
                </h2>
                <p className="text-muted-foreground">
                  Als Affiliate-Partner leiten wir Sie zu unserem Partner{" "}
                  <strong className="text-foreground">Verwoehnwochenende.de</strong> weiter. 
                  Alle Zahlungen und Lieferungen werden direkt von Verwoehnwochenende.de abgewickelt. 
                  Die hier genannten Informationen dienen Ihrer Orientierung.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Zahlungsarten
                  </h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      Bei Verwoehnwochenende.de stehen Ihnen verschiedene sichere Zahlungsmethoden zur Verfügung:
                    </p>
                    <div className="space-y-3">
                      {[
                        { icon: CreditCard, name: "Kreditkarte", desc: "Visa, Mastercard, American Express" },
                        { icon: Banknote, name: "PayPal", desc: "Schnell und sicher bezahlen" },
                        { icon: Smartphone, name: "Sofortüberweisung", desc: "Direkt von Ihrem Bankkonto" },
                        { icon: CreditCard, name: "Vorkasse", desc: "Überweisung vor Lieferung" },
                        { icon: Gift, name: "Gutschein", desc: "Verwoehnwochenende Gutscheine einlösen" },
                      ].map((method, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                          <method.icon className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium text-foreground text-sm">{method.name}</p>
                            <p className="text-xs text-muted-foreground">{method.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Sicherheit
                  </h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      Ihre Daten sind bei Verwoehnwochenende.de sicher:
                    </p>
                    <div className="space-y-3">
                      {[
                        "SSL-verschlüsselte Datenübertragung",
                        "Sichere Zahlungsabwicklung",
                        "Datenschutz nach DSGVO",
                        "Trusted Shops zertifiziert",
                        "Deutsche Qualitätsstandards",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Versand physischer Produkte
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Für physische Produkte wie Schals, Decken und Accessoires gilt:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-secondary/30 rounded-lg text-center">
                      <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="font-medium text-foreground">Lieferzeit</p>
                      <p className="text-sm">2-5 Werktage</p>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-lg text-center">
                      <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="font-medium text-foreground">Versandkosten</p>
                      <p className="text-sm">ab 4,90 € (DE)</p>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-lg text-center">
                      <Gift className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="font-medium text-foreground">Gratis Versand</p>
                      <p className="text-sm">ab 50 € Bestellwert</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    Die genauen Versandkosten sehen Sie im Warenkorb bei Verwoehnwochenende.de.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Kurzreisen & Hotelgutscheine
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Bei Buchung einer Kurzreise oder eines Hotelgutscheins erhalten Sie:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        Sofortige Bestätigung
                      </h3>
                      <p className="text-sm">
                        Ihre Buchungsbestätigung erhalten Sie per E-Mail innerhalb weniger Minuten.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Gift className="h-4 w-4 text-blue-500" />
                        Gutschein zum Verschenken
                      </h3>
                      <p className="text-sm">
                        Hotelgutscheine können als PDF heruntergeladen oder per Post versendet werden.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Fragen zur Lieferung?
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <p className="text-muted-foreground">
                    Bei Fragen zu Ihrer Bestellung oder Lieferung kontaktieren Sie bitte direkt 
                    unseren Partner Verwoehnwochenende.de.
                  </p>
                  <Button asChild>
                    <a 
                      href="https://www.verwoehnwochenende.de/zahlung-versand" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="gap-2 whitespace-nowrap"
                    >
                      Mehr erfahren
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
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
