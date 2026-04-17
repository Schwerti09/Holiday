import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, ShoppingCart, CreditCard, Truck, RotateCcw, Gift, Hotel, Phone, Mail, ExternalLink, Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const faqCategories = [
  {
    title: "Über unseren Shop",
    icon: ShoppingCart,
    questions: [
      {
        q: "Was ist 'DeineZeitEureZeit'?",
        a: "Wir sind ein Affiliate-Partnershop, der Ihnen ausgewählte Kurzreisen, Wellness-Angebote und Premium-Lifestyle-Produkte unseres Partners Verwoehnwochenende.de präsentiert. Bei Interesse leiten wir Sie direkt zum Anbieter weiter."
      },
      {
        q: "Verkauft ihr selbst Produkte?",
        a: "Nein, wir verkaufen keine Produkte direkt. Wir präsentieren Angebote und leiten Sie per Link zu Verwoehnwochenende.de weiter. Der Kauf- oder Buchungsvertrag wird direkt mit Verwoehnwochenende.de geschlossen."
      },
      {
        q: "Warum sollte ich über euch buchen?",
        a: "Wir bieten Ihnen eine übersichtliche Auswahl der besten Angebote, praktische Funktionen wie Merkliste und Produktvergleich, und hilfreiche Informationen zu Kurzreisen und Wellness. Der Preis bleibt für Sie gleich."
      },
    ]
  },
  {
    title: "Buchung & Bezahlung",
    icon: CreditCard,
    questions: [
      {
        q: "Wie buche ich eine Reise?",
        a: "Klicken Sie auf das gewünschte Angebot. Sie werden automatisch zu Verwoehnwochenende.de weitergeleitet, wo Sie die Buchung abschließen können. Dort geben Sie Ihre Daten ein und wählen die Zahlungsart."
      },
      {
        q: "Welche Zahlungsarten gibt es?",
        a: "Verwoehnwochenende.de akzeptiert Kreditkarte (Visa, Mastercard), PayPal, Sofortüberweisung, Vorkasse und Gutscheine. Die verfügbaren Zahlungsarten sehen Sie im Buchungsprozess."
      },
      {
        q: "Ist die Bezahlung sicher?",
        a: "Ja, alle Zahlungen bei Verwoehnwochenende.de erfolgen SSL-verschlüsselt. Der Shop ist Trusted Shops zertifiziert und erfüllt höchste Sicherheitsstandards."
      },
      {
        q: "Bekomme ich eine Buchungsbestätigung?",
        a: "Ja, nach erfolgreicher Buchung erhalten Sie eine Bestätigungs-E-Mail von Verwoehnwochenende.de mit allen Details zu Ihrer Reise oder Bestellung."
      },
    ]
  },
  {
    title: "Kurzreisen & Hotels",
    icon: Hotel,
    questions: [
      {
        q: "Was ist in den Reiseangeboten enthalten?",
        a: "Die Leistungen variieren je nach Angebot. Typisch sind: Übernachtung, Frühstück oder Halbpension, Wellnessbereich-Nutzung und je nach Paket zusätzliche Extras wie Massagen oder Dinner. Die genauen Leistungen stehen in der Angebotsbeschreibung."
      },
      {
        q: "Kann ich ein bestimmtes Zimmer wählen?",
        a: "Die Zimmerkategorie ist im Angebot festgelegt. Für spezielle Wünsche (Etage, Aussicht, etc.) kontaktieren Sie das Hotel direkt nach der Buchung."
      },
      {
        q: "Sind Haustiere erlaubt?",
        a: "Bei vielen Hotels sind Hunde willkommen. Achten Sie auf das Symbol 'Mit Hund' in der Angebotsbeschreibung. Es können Aufpreise anfallen."
      },
      {
        q: "Wie lange sind Gutscheine gültig?",
        a: "Hotelgutscheine von Verwoehnwochenende.de sind in der Regel 3 Jahre ab Kaufdatum gültig. Das genaue Datum steht auf Ihrem Gutschein."
      },
    ]
  },
  {
    title: "Stornierung & Änderung",
    icon: RotateCcw,
    questions: [
      {
        q: "Kann ich meine Buchung stornieren?",
        a: "Die Stornierungsbedingungen hängen vom jeweiligen Angebot ab. Viele bieten kostenlose Stornierung bis 24-48 Stunden vor Anreise. Die genauen Bedingungen finden Sie in Ihrer Buchungsbestätigung."
      },
      {
        q: "Wie storniere ich?",
        a: "Kontaktieren Sie Verwoehnwochenende.de direkt per E-Mail (service@verwoehnwochenende.de) oder Telefon (+49 2065 4999116). Halten Sie Ihre Buchungsnummer bereit."
      },
      {
        q: "Kann ich das Reisedatum ändern?",
        a: "Umbuchungen sind je nach Verfügbarkeit möglich. Wenden Sie sich dafür an Verwoehnwochenende.de. Bei Gutscheinen ist die Terminwahl flexibel."
      },
      {
        q: "Was passiert bei Krankheit?",
        a: "Bei Krankheit greifen die Stornierungsbedingungen des Angebots. Eine Reiserücktrittsversicherung kann sinnvoll sein – diese kann bei der Buchung hinzugefügt werden."
      },
    ]
  },
  {
    title: "Produkte & Versand",
    icon: Truck,
    questions: [
      {
        q: "Wie lange dauert die Lieferung?",
        a: "Physische Produkte wie Schals, Decken oder Accessoires werden innerhalb von 2-5 Werktagen geliefert. Die genaue Lieferzeit steht in der Produktbeschreibung."
      },
      {
        q: "Was kostet der Versand?",
        a: "Die Versandkosten beginnen bei 4,90 € (Deutschland). Ab einem Bestellwert von 50 € ist der Versand oft kostenlos. Die genauen Kosten sehen Sie im Warenkorb bei Verwoehnwochenende.de."
      },
      {
        q: "Kann ich Produkte zurückgeben?",
        a: "Für Produkte gilt das 14-tägige Widerrufsrecht. Die Rücksendung erfolgt über Verwoehnwochenende.de – bitte beachten Sie die dortige Widerrufsbelehrung."
      },
    ]
  },
  {
    title: "Gutscheine",
    icon: Gift,
    questions: [
      {
        q: "Kann ich einen Gutschein verschenken?",
        a: "Ja! Verwoehnwochenende.de bietet Geschenkgutscheine an, die Sie als PDF herunterladen oder per Post versenden lassen können. Ideal als Geschenk für jeden Anlass."
      },
      {
        q: "Wie löse ich einen Gutschein ein?",
        a: "Gutscheine können direkt bei Verwoehnwochenende.de im Buchungsprozess oder Warenkorb eingelöst werden. Geben Sie einfach den Gutscheincode ein."
      },
      {
        q: "Kann ich mehrere Gutscheine kombinieren?",
        a: "In der Regel können Gutscheine kombiniert werden. Prüfen Sie die Bedingungen im Buchungsprozess oder kontaktieren Sie den Kundenservice."
      },
    ]
  },
];

const allFaqItems = faqCategories.flatMap(cat => 
  cat.questions.map(q => ({ question: q.q, answer: q.a }))
);

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="FAQ – Häufige Fragen zu Kurzreisen & Buchung | DeineZeitEureZeit"
        description="Antworten auf häufige Fragen: Wie buche ich? Welche Zahlungsarten gibt es? Wie storniere ich? Alles zu Kurzreisen, Wellness-Gutscheinen und Lieferung."
        pageType="faq"
        canonicalPath="/faq"
        faqItems={allFaqItems}
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-faq-title">
                  Häufige Fragen (FAQ)
                </h1>
                <p className="text-muted-foreground">Antworten auf die wichtigsten Fragen</p>
              </div>
            </div>

            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Frage suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-background"
                data-testid="input-faq-search"
              />
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="space-y-8">
            {filteredCategories.map((category, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, i) => (
                      <AccordionItem key={i} value={`${idx}-${i}`}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-medium">{item.q}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{item.a}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}

            {filteredCategories.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">Keine Ergebnisse gefunden</p>
                  <p className="text-muted-foreground">
                    Versuchen Sie einen anderen Suchbegriff oder kontaktieren Sie uns direkt.
                  </p>
                </CardContent>
              </Card>
            )}

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Ihre Frage nicht dabei?
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Fragen zur Website</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Bei technischen Fragen zu unserer Website:
                    </p>
                    <a href="mailto:rps-vertrieb@t-online.de" className="flex items-center gap-2 text-primary hover:underline">
                      <Mail className="h-4 w-4" />
                      rps-vertrieb@t-online.de
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Fragen zu Buchungen</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Für alle Fragen zu Reisen und Bestellungen:
                    </p>
                    <div className="space-y-1">
                      <a href="tel:+4920654999116" className="flex items-center gap-2 text-primary hover:underline">
                        <Phone className="h-4 w-4" />
                        +49 (0)2065 / 4999116
                      </a>
                      <a href="mailto:service@verwoehnwochenende.de" className="flex items-center gap-2 text-primary hover:underline">
                        <Mail className="h-4 w-4" />
                        service@verwoehnwochenende.de
                      </a>
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
