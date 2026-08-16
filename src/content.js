// Tutti i testi del sito. Copy da rifinire, dati commerciali reali.

export const brand = {
  name: 'LaMiaCasa',
  claim: 'La casa che si spiega da sola',
  email: 'ciao@lamiacasa.app',
  phone: '+39 351 000 1234',
  city: 'Milano · Italia',
}

export const nav = [
  { label: 'Prodotto', href: '#prodotto' },
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Tuo per sempre', href: '#tuo' },
  { label: 'Prezzo', href: '#prezzo' },
  { label: 'Recensioni', href: '#recensioni' },
]

export const hero = {
  title: ['Tutta la tua casa', 'in un solo link.'],
  subtitle:
    'LaMiaCasa raccoglie le istruzioni sparse tra WhatsApp, PDF e bigliettini in una web app elegante: check-in, Wi-Fi, trasporti, ristoranti e check-out a portata di pollice. La paghi una volta e resta tua.',
  primaryCta: 'Prova la demo live',
  secondaryCta: 'Guarda come funziona',
  stats: [
    { value: '49 €', label: 'una tantum, per struttura' },
    { value: '-72%', label: 'messaggi ricevuti dagli ospiti' },
    { value: '3 gg', label: 'dal tuo testo alla casa online' },
  ],
}

// Card mostrate nel mockup del telefono (rispecchiano la web app ospiti)
export const phoneCards = [
  { id: 'checkin', label: 'Check-in', icon: 'pin', tone: 'clay' },
  { id: 'wifi', label: 'Wi-Fi', icon: 'wifi', tone: 'olive' },
  { id: 'regole', label: 'Regole della casa', icon: 'home', tone: 'clay' },
  { id: 'spesa', label: 'Supermercati', icon: 'cart', tone: 'clay' },
  { id: 'trasporti', label: 'Trasporti', icon: 'train', tone: 'olive' },
  { id: 'salute', label: 'Farmacie e ospedali', icon: 'cross', tone: 'clay' },
  { id: 'mangiare', label: 'Dove mangiare', icon: 'fork', tone: 'olive' },
  { id: 'checkout', label: 'Check-out', icon: 'check', tone: 'olive' },
]

export const marquee = [
  'Check-in autonomo',
  'Codice Wi-Fi in un tap',
  'Mappa dei trasporti',
  'Ristoranti selezionati',
  'Raccolta differenziata',
  'Numeri di emergenza',
  'Regole della casa',
  'Check-out guidato',
  'Chat diretta con l’host',
]

export const features = {
  eyebrow: 'Il prodotto',
  title: 'Un bottone per ogni domanda che ti fanno',
  subtitle: 'Tieni le sezioni che ti servono, togli quelle che non usi, inventane di nuove.',
  hint: 'Scorri le sezioni →',
  items: [
    { icon: 'pin', tag: 'Arrivo', title: 'Check-in', body: 'Foto del portone, piano e istruzioni per le chiavi.' },
    { icon: 'wifi', tag: 'Rete', title: 'Wi-Fi', body: 'Password copiata con un tap, senza errori di trascrizione.' },
    { icon: 'home', tag: 'Casa', title: 'Regole', body: 'Orari, rumore, fumo, animali: chiare e brevi.' },
    { icon: 'fork', tag: 'Zona', title: 'Dove mangiare', body: 'I tuoi posti del cuore, con distanza a piedi.' },
    { icon: 'cart', tag: 'Spesa', title: 'Supermercati', body: 'Il più vicino e quello aperto la domenica.' },
    { icon: 'train', tag: 'Mobilità', title: 'Trasporti', body: 'Che mezzo prendere, quanto costa, quanto ci mette.' },
    { icon: 'cross', tag: 'Salute', title: 'Farmacie', body: 'Guardia medica e ospedale più vicini.' },
    { icon: 'recycle', tag: 'Rifiuti', title: 'Raccolta', body: 'Il calendario del quartiere, per evitare multe.' },
    { icon: 'check', tag: 'Partenza', title: 'Check-out', body: 'Orario, chiavi, spazzatura e saluti.' },
    { icon: 'globe', tag: 'Lingue', title: '5 lingue', body: 'IT · EN · FR · ES · DE, riviste a mano.' },
  ],
}

export const steps = {
  eyebrow: 'Come funziona',
  title: 'In pochi giorni è pronta, e su misura della tua casa',
  lead: 'In pochi giorni la web app è finita e online. È completamente personalizzabile: la costruiamo sulle tue richieste e sulle esigenze che cambiano da casa a casa.',
  items: [
    {
      n: '01',
      title: 'Ci racconti la casa',
      body: 'Un questionario guidato, oppure ci mandi il PDF e i messaggi che usi oggi.',
    },
    {
      n: '02',
      title: 'Costruiamo la web app',
      body: 'Scegliamo insieme sezioni, colori e lingue. Tu guardi l’anteprima e correggi.',
    },
    {
      n: '03',
      title: 'La mettiamo online',
      body: 'Indirizzo web attivo, QR pronto da stampare e link da incollare su Airbnb o Booking.',
    },
    {
      n: '04',
      title: 'Te la consegniamo',
      body: 'Da quel momento è tua: paghi una volta e non ci sono rinnovi da ricordare.',
    },
  ],
}

export const ownership = {
  eyebrow: 'Tuo per sempre',
  title: 'Non è in affitto: te la consegniamo',
  subtitle:
    'Nessun abbonamento da rinnovare, nessun dato dei tuoi ospiti da custodire. Ecco cosa succede dal momento in cui ci scrivi.',
  card: {
    label: 'Certificato di consegna',
    domain: 'lamiacasa.app/villa-magnolie',
    seal: 'Proprietà 100%',
    rows: [
      { k: 'Intestato a', v: 'Villa Magnolie — Milano' },
      { k: 'Consegnata il', v: '12 settembre 2026' },
      { k: 'Contenuti e sorgente', v: 'nelle tue mani' },
    ],
  },
  flow: ['Ci scrivi', 'Costruiamo', 'Approvi', 'Online'],
  points: [
    {
      icon: 'shield',
      tag: 'Proprietà',
      title: 'Le chiavi passano a te',
      body: 'Indirizzo, contenuti e file sorgente sono tuoi: puoi spostarli altrove quando vuoi.',
    },
    {
      icon: 'globe',
      tag: 'Privacy',
      title: 'Zero dati sugli ospiti',
      body: 'Niente account, niente cookie di tracciamento, niente profilazione: chi apre il link non lascia tracce.',
    },
    {
      icon: 'bolt',
      tag: 'Pubblicazione',
      title: 'Online su rete veloce',
      body: 'Pagine statiche distribuite su CDN: si aprono in un istante anche con una tacca di segnale.',
    },
    {
      icon: 'sparkle',
      tag: 'Manutenzione',
      title: 'Non si rompe da sola',
      body: 'Senza database e senza login non c’è nulla da aggiornare: resta com’è, anche fra tre anni.',
    },
  ],
}

export const pricing = {
  eyebrow: 'Prezzo',
  title: 'Una formula sola, pagata una volta',
  subtitle: 'Niente piani da confrontare, niente rinnovi a sorpresa. L’unica scelta è se vuoi l’assistenza.',
  main: {
    badge: 'Una tantum',
    price: '49',
    unit: 'per struttura',
    lead: 'Paghi alla consegna, quando la web app è online e ti piace.',
    cta: 'Richiedi la tua casa',
    includes: [
      'Web app costruita sui tuoi contenuti',
      'Sezioni su misura: check-in, Wi-Fi, trasporti, ristoranti, regole, check-out',
      'Fino a 5 lingue',
      'Link e QR pronti da stampare',
      'Pubblicazione online inclusa',
      'Contenuti e sorgente tuoi, per sempre',
    ],
  },
  addon: {
    badge: 'Opzionale',
    title: 'Assistenza',
    lead: 'Primi 3 mesi inclusi, gratis.',
    body: 'Modifiche ai testi, cambio password del Wi-Fi, nuove sezioni: ce ne occupiamo noi. Poi la web app resta statica e non ha bisogno di manutenzione.',
    rows: [
      { k: 'Mesi 1 – 3', v: 'Inclusa', tone: 'free' },
      { k: 'Mesi 4 – 6', v: '19 €', tone: 'paid' },
      { k: 'Da lì in poi', v: 'Nessun costo' },
    ],
  },
  note: 'Prezzi IVA esclusa. Nessun canone mensile, nessun vincolo di permanenza.',
}

export const reviews = {
  eyebrow: 'Recensioni',
  title: 'Chi ha smesso di rispondere alle stesse domande',
  hint: 'Scorri per leggerle tutte →',
  items: [
    {
      quote:
        'Prima ricevevo otto messaggi per ogni soggiorno, sempre gli stessi. Dopo LaMiaCasa ne ricevo uno, di solito per dirmi che la casa è bellissima.',
      name: 'Giulia Ferraro',
      role: 'Host · 2 appartamenti, Bologna',
      score: 5,
    },
    {
      quote:
        'L’ho fatto fare per undici unità. Il team di pulizia ha finalmente un posto dove leggere le istruzioni giuste.',
      name: 'Marco Delrio',
      role: 'Property manager · Costa Smeralda',
      score: 5,
    },
    {
      quote:
        'Gli ospiti francesi mi ringraziano per la traduzione. Non sanno che l’ho scritta in italiano alle undici di sera.',
      name: 'Chiara Bonetti',
      role: 'Host · Trastevere, Roma',
      score: 5,
    },
    {
      quote:
        'La sezione trasporti da sola vale i 49 euro. Nessuno mi chiede più quale bus prendere dall’aeroporto.',
      name: 'Andrea Pisani',
      role: 'Host · Bergamo',
      score: 5,
    },
    {
      quote:
        'Ho messo il QR in una cornice sul tavolo. Gli ospiti lo aprono appena entrano, senza che io dica niente.',
      name: 'Sofia Marchetti',
      role: 'Host · Lago di Como',
      score: 5,
    },
    {
      quote:
        'Nelle recensioni è comparsa una parola nuova: “organizzato”. È salita la media, e non ho cambiato le lenzuola.',
      name: 'Luca Amato',
      role: 'Host · Napoli, centro storico',
      score: 5,
    },
  ],
}

export const contact = {
  eyebrow: 'Contatti',
  title: 'Raccontaci la tua casa',
  subtitle:
    'Rispondiamo entro un giorno lavorativo. Se preferisci, prepariamo prima una demo con i contenuti reali del tuo appartamento — gratis.',
  bullets: ['Demo personalizzata in 24 ore', 'Paghi solo alla consegna', 'Assistenza inclusa per 3 mesi'],
  subjects: ['Voglio una demo', 'Ho più strutture', 'Domande sul prezzo', 'Altro'],
}

export const footer = {
  tagline: 'La web app che accoglie i tuoi ospiti al posto tuo.',
  columns: [
    {
      title: 'Prodotto',
      links: ['Sezioni', 'Personalizzazione', 'Lingue', 'Demo live', 'Novità'],
    },
    {
      title: 'Risorse',
      links: ['Come funziona', 'Domande frequenti', 'Assistenza', 'Guida al QR'],
    },
    {
      title: 'Azienda',
      links: ['Chi siamo', 'Privacy', 'Termini', 'Cookie'],
    },
  ],
}
