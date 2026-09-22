# Casa e soggiorno

Il secondo mockup del telefono nella sezione prodotto è sostituito da una casa isometrica SVG, con prospettiva fissa e colori coordinati al sito.

- Arrivo: apertura della porta e valigia.
- Soggiorno: finestre illuminate e simbolo Wi-Fi.
- Partenza: chiavi e indicazioni di check-out.

Desktop: la scena segue i tre capitoli con lo scroll. Mobile fino a 600px: tre pulsanti con stato aria-pressed, mentre i capitoli restano leggibili in sequenza. Le transizioni rispettano prefers-reduced-motion.

Verifiche: build Vite riuscita; due test esistenti passati; controllo browser dei tre stati desktop, dei pulsanti mobile e delle schede dopo le transizioni. Nessun errore o warning nel browser. Revisione statica completata e contrasto dei testi migliorato.

A 390px nessun overflow orizzontale. A 320px casa e schede rientrano nella larghezza; resta un overflow della pagina fuori dalla scena, nelle grafiche del redesign precedente, da verificare separatamente.
