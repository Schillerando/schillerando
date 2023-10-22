<template>
  <div>
    <h1>Allgemeine Geschäftsbedingungen von „Schillerando“</h1>

    <h3>§1 Bedingungen gegenüber Verbraucher:innen und Begriffsdefinitionen</h3>

    <p>
      (1) Die nachfolgenden Allgemeinen Geschäftsbedingungen gelten für alle
      Vereinbarungen über Bestellungen und Lieferungen zwischen Schillerando und
      einem Verbraucher in ihrer zum Zeitpunkt der Bestellung gültigen Fassung.
      <br /><br />
      (2) Verbraucher:in ist jede natürliche Person, die ein Geschäft zu Zwecken
      abschließt, die überwiegend weder ihrer gewerblichen noch ihrer
      selbständigen beruflichen Tätigkeit zugerechnet werden kann (§ 13 BGB).
    </p>

    <h3>§2 Zustandekommen eines Vertrages, Speicherung des Vertragstextes</h3>

    <p>
      (1) Die folgenden Regelungen über den Vertragsabschluss gelten für
      Bestellungen über unseren Onlineshop
      <a :href="mainUrl">https://www.schillerando.de</a>.
    </p>

    <h3>(2) Im Falle des Vertragsschlusses kommt der Vertrag zwischen</h3>

    <p>
      Schillerando<br />
      Schulstraße 34<br />
      D-71672 Marbach
    </p>

    <h3>
      Und der auftraggebenden natürlichen Person, im Nachfolgenden, der
      Übersicht halber, als Verbraucher bezeichnet, zustande.
    </h3>

    <p>
      (3) Die Präsentation der Waren auf betreffender Website stellt kein
      rechtlich bindendes Vertragsangebot dar, sondern dient lediglich der
      unverbindlichen Information des Verbrauchers. Mit der Bestellung der
      gewünschten Ware gibt der Verbraucher ein für ihn verbindliches Angebot
      auf Abschluss eines Kaufvertrages ab. Gültig wird der Vertrag nach Annahme
      des Kaufangebots durch Schillerando und Festlegung der gewünschten
      Zahlungsart.

      <br />
      <br />
      (4) Bei Eingang einer Bestellung im Onlineshop von Schillerando gilt
      folgende Regelung:
      <br /><br />
      Der Verbraucher gibt ein bindendes Vertragsangebot ab, indem er den im
      Onlineshop vorgesehene Bestellprozess erfolgreich durchläuft.
      <br /><br />
      Der Bestellprozess unterteilt sich in folgende Schritte:
      <br /><br />
      1. Hinzufügen von Produkten zum Warenkorb<br />
      2. Angabe des Ortes, an den die Produkte geliefert werden sollen.<br />
      3. Abschicken der Bestellung<br />
      4. Erhalt eines Bestell QR-Codes<br />
      5. Vorzeigen des QR-Codes beim Schillerando Lieferbote<br />
      6. Bezahlung der Ware<br />
      7. Erhalt der Ware<br />
      <br />
      (5) Speicherung des Vertragstextes bei Bestellungen über unseren
      Onlineshop: Schillerrando speichert den Vertragstext, sowie das
      Einverständnis unserer Kunden. Die AGB kann jederzeit auch unter
      <a :href="businessUrl + '/agb'">https://www.schillerando.de/agb</a>
      eingesehen werden.
    </p>

    <h3>§3 Preise, Zahlung, Fälligkeit</h3>

    <p>
      (1) Die angegebenen Preise entsprechen den Preisen des jeweiligen
      Unternehmens. Es gibt keine Lieferkosten für Verbraucher, sofern die
      Bestellung nur Produkte von einem Unternehmen enthält. Werden Produkte von
      mehreren Unternehmen bestellt, fällt eine Liefergebühr von 5$ an. Die
      Fälligkeit der Schuldsumme tritt mit Lieferung ein und ist bindend. Bei
      Rücktritt von der Bestellung ist Schillerando nicht erstattungspflichtig
      und der Verbraucher trägt die Kosten in voller Höhe.

      <br />
      <br />
      (2) Der Verbraucher tätigt die Zahlung direkt bei Erhalt der Ware.
      <br />
      <br />
      (3) Der Verbraucher verpflichtet sich, den Kaufpreis bei Erhalt der Ware
      oder Dienstleistung zu zahlen. Sollte die Zahlung zum Zeitpunkt der
      Warenauslieferung noch nicht erfolgt sein, behält sich Schillerando eine
      Auflösung des Vertrags vor. Hierbei können Strafgebühren für den
      Verbraucher anfallen.
    </p>

    <h3>§4 Eigentumsvorbehalt</h3>

    <p>
      (1) Schillerando bleibt der Eigentümer der Ware bis zur vollständigen
      Bezahlung des Kaufpreises.
    </p>

    <h3>§5 Lieferung</h3>

    <p>
      (1) Sofern in der Produktbeschreibung nicht deutlich anders angegeben,
      werden alle angebotenen Produkte innerhalb von 15 Minuten geliefert, wenn
      sie innerhalb der Öffnungszeiten bestellt wurden. Schillerando behält sich
      das Recht vor sämtliche Waren, die bei Lieferung nicht bezahlt werden,
      nicht zu übergeben, aber dennoch die Versandkosten in Rechnung zu stellen.
    </p>

    <h3>§6 Rechte des Kunden als Verbraucher</h3>

    <p>
      (1) Sämtliche Garantieansprüche an Schillerando erlöschen mit dem
      Bestätigen oder Quittieren des Erhalts und des Zustands der Ware. Sollte
      die Ware während des Transports beschädigt werden, so übernimmt
      Schillerando die Kosten.
      <br />
      <br />
      (2) Liegt der Fehler beim herstellenden Unternehmen des Produkts gelten
      die AGB des jeweiligen Unternehmen.
    </p>

    <h3>§7 Gewährleistung</h3>

    <p>(1) Es gelten die gesetzlichen Gewährleistungsregelungen.</p>

    <h3>§8 Vertragssprache</h3>

    <p>(1) Als Vertragssprache steht ausschließlich Deutsch zur Verfügung.</p>

    <h6>Stand der AGB: Mai 2023</h6>
  </div>
</template>

<script>
export default {
  name: 'AGB',
  data() {
    return {
      mainUrl: process.env.VUE_APP_MAIN_URL,
      businessUrl: process.env.VUE_APP_BUSINESS_URL,
    };
  },
};
</script>

<style scoped>
div {
  text-align: left;
}

h1 {
  text-align: center;
  margin-bottom: 50px;
}

h3 {
  font-weight: 800;
  font-size: 1rem;
  margin: 20px 0;
}

h6 {
  font-size: 0.8rem;
}
</style>
