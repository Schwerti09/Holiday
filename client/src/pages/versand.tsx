import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Clock, Package, CreditCard, HelpCircle } from "lucide-react";

export default function VersandPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4" data-testid="text-versand-title">
            Versandinformationen
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Alles Wichtige rund um Lieferung, Versand und Bezahlung.
          </p>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      So funktioniert die Bestellung
                    </h2>
                    <p className="text-muted-foreground">
                      Als Affiliate-Shop vermitteln wir dir ausgewählte Produkte von 
                      renommierten Online-Händlern. Wenn du ein Produkt kaufen möchtest, 
                      wirst du über den „Jetzt kaufen"-Button direkt zum Shop des 
                      jeweiligen Händlers weitergeleitet. Dort wickelst du den Kauf 
                      ab und profitierst von den dortigen Versand- und Zahlungsoptionen.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      Versand & Lieferung
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Die Versandkosten und Lieferzeiten werden vom jeweiligen 
                        Partner-Shop festgelegt. In der Regel gelten folgende Richtwerte:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Standardversand innerhalb Deutschlands: 2-4 Werktage</li>
                        <li>Expressversand (wenn verfügbar): 1-2 Werktage</li>
                        <li>Lieferung nach Österreich und in die Schweiz: 3-7 Werktage</li>
                      </ul>
                      <p>
                        Die genauen Versandkosten siehst du im jeweiligen Shop 
                        vor Abschluss der Bestellung.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      Lieferzeiten
                    </h2>
                    <p className="text-muted-foreground">
                      Die angegebenen Lieferzeiten können je nach Verfügbarkeit 
                      und Standort variieren. Bei Fragen zur Lieferzeit wende dich 
                      bitte direkt an den jeweiligen Händler. Die Kontaktdaten 
                      findest du auf der Bestellbestätigung oder im Shop des Anbieters.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      Zahlungsmethoden
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Die verfügbaren Zahlungsmethoden hängen vom jeweiligen 
                        Partner-Shop ab. In der Regel werden folgende Optionen angeboten:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>PayPal</li>
                        <li>Kreditkarte (Visa, Mastercard, American Express)</li>
                        <li>Sofortüberweisung / Klarna</li>
                        <li>Rechnung (je nach Anbieter)</li>
                        <li>Lastschrift</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      Fragen zur Bestellung?
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Da der Kauf direkt beim Partner-Shop erfolgt, wende dich 
                        bei Fragen zu deiner Bestellung bitte an den jeweiligen 
                        Kundenservice. Die Kontaktdaten findest du:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>In deiner Bestellbestätigung</li>
                        <li>Im Impressum des jeweiligen Shops</li>
                        <li>Im Kundenkonto des Shops</li>
                      </ul>
                      <p className="mt-4">
                        Bei allgemeinen Fragen zu unserer Website erreichst du uns 
                        unter{" "}
                        <a 
                          href="mailto:rps-vertrieb@t-online.de" 
                          className="text-primary hover:underline"
                        >
                          rps-vertrieb@t-online.de
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/50 rounded-lg border border-border p-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Hinweis:</strong> Alle Preisangaben 
                auf unserer Website sind unverbindlich. Der tatsächliche Preis und die 
                Versandkosten werden dir im jeweiligen Partner-Shop vor dem Kauf angezeigt. 
                Bei Abweichungen gilt der Preis im Shop des Anbieters.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
