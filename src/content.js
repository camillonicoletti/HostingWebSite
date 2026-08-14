// Tutti i testi del sito. Copy inventato: da sostituire con quello definitivo.

export const brand = {
  name: 'Ospita',
  claim: 'La casa che si spiega da sola',
  email: 'ciao@ospita.app',
  phone: '+39 351 000 1234',
  city: 'Milano · Italia',
}

export const nav = [
  { label: 'Prodotto', href: '#prodotto' },
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Prezzi', href: '#prezzi' },
  { label: 'Recensioni', href: '#recensioni' },
  { label: 'Contatti', href: '#contatti' },
]

export const hero = {
  eyebrow: 'Guest experience · nessuna app da installare',
  title: ['Tutta la tua casa', 'in un solo link.'],
  subtitle:
    'Ospita trasforma le istruzioni sparse tra WhatsApp, PDF e bigliettini in una web app elegante: check-in, Wi-Fi, trasporti, ristoranti e check-out a portata di pollice, in cinque lingue.',
  primaryCta: 'Prova la demo live',
  secondaryCta: 'Guarda come funziona',
  stats: [
    { value: '2.400+', label: 'case già accolgono con Ospita' },
    { value: '-72%', label: 'messaggi ricevuti dagli ospiti' },
    { value: '4,93', label: 'media recensioni dei nostri host' },
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
  title: 'Un concierge digitale che lavora anche mentre dormi',
  subtitle:
    'Ogni casa ha la sua guida: tu la componi con dei blocchi, noi la rendiamo veloce, multilingua e bellissima su qualsiasi telefono.',
  items: [
    {
      tag: 'Arrivo',
      title: 'Check-in senza telefonate',
      body: 'Foto del portone, piano, numero della cassetta, video di 20 secondi che mostra come girare la chiave. L’ospite arriva alle 2 di notte e non ti scrive.',
      icon: 'pin',
      size: 'lg',
    },
    {
      tag: 'Connessione',
      title: 'Wi-Fi in un tap',
      body: 'Password copiata negli appunti o QR da inquadrare. Zero errori di trascrizione.',
      icon: 'wifi',
      size: 'sm',
    },
    {
      tag: 'Quartiere',
      title: 'I tuoi consigli, non quelli di TripAdvisor',
      body: 'Il forno sotto casa, la trattoria del giovedì, il parco giusto per i bambini: ogni consiglio con distanza a piedi e link alle mappe.',
      icon: 'fork',
      size: 'md',
    },
    {
      tag: 'Mobilità',
      title: 'Trasporti spiegati bene',
      body: 'Dalla stazione a casa tua passo passo: quale bus, quale biglietto, quanto costa, quanto ci mette.',
      icon: 'train',
      size: 'md',
    },
    {
      tag: 'Lingue',
      title: 'IT · EN · FR · ES · DE',
      body: 'Traduzione automatica al primo salvataggio, con possibilità di correggere ogni parola a mano.',
      icon: 'globe',
      size: 'sm',
    },
    {
      tag: 'Partenza',
      title: 'Check-out senza malintesi',
      body: 'Orario, dove lasciare le chiavi, cosa fare con la spazzatura e un promemoria gentile per la recensione.',
      icon: 'check',
      size: 'sm',
    },
    {
      tag: 'Su misura',
      title: 'Personalizzabile fino all’ultimo pixel',
      body: 'Colori, logo, nome della casa, ordine dei bottoni, sezioni inventate da zero: ogni appartamento ha la sua identità.',
      icon: 'sparkle',
      size: 'sm',
    },
  ],
}

export const steps = {
  eyebrow: 'Come funziona',
  title: 'Online in un pomeriggio, non in un trimestre',
  items: [
    {
      n: '01',
      title: 'Ci racconti la casa',
      body: 'Compili un questionario guidato oppure ci mandi il PDF e i messaggi che usi oggi: pensiamo noi a trasformarli in contenuti.',
    },
    {
      n: '02',
      title: 'Costruiamo la tua web app',
      body: 'Scegli i bottoni, carichi foto e video, definisci colori e lingue. Anteprima in tempo reale mentre modifichi.',
    },
    {
      n: '03',
      title: 'Consegni un link e un QR',
      body: 'Un QR incorniciato all’ingresso, il link nel messaggio di benvenuto di Airbnb o Booking. Gli ospiti aprono e capiscono tutto.',
    },
    {
      n: '04',
      title: 'Aggiorni quando vuoi',
      body: 'Cambi la password del Wi-Fi dal telefono: aggiornata per tutti in due secondi, senza ristampare nulla.',
    },
  ],
}

export const pricing = {
  eyebrow: 'Prezzi',
  title: 'Un piano per ogni tipo di host',
  subtitle: 'Prova 14 giorni senza carta di credito. Disdici quando vuoi, i contenuti restano tuoi.',
  plans: [
    {
      id: 'start',
      name: 'Start',
      tagline: 'Per chi ha una casa sola',
      monthly: 9,
      yearly: 7,
      cta: 'Inizia gratis',
      features: [
        '1 appartamento',
        'Fino a 10 sezioni',
        '2 lingue',
        'Link + QR da stampare',
        'Aggiornamenti illimitati',
        'Supporto via email',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'Per chi gestisce più unità',
      monthly: 24,
      yearly: 19,
      cta: 'Prova 14 giorni',
      highlight: 'Il più scelto',
      features: [
        'Fino a 5 appartamenti',
        'Sezioni illimitate',
        '5 lingue con traduzione automatica',
        'Dominio personalizzato',
        'Logo, colori e font tuoi',
        'Statistiche di utilizzo',
        'Chat diretta host ↔ ospite',
        'Supporto prioritario',
      ],
    },
    {
      id: 'studio',
      name: 'Studio',
      tagline: 'Per property manager e strutture',
      monthly: 79,
      yearly: 65,
      cta: 'Parliamone',
      features: [
        'Appartamenti illimitati',
        'Gestione a team con ruoli',
        'Contenuti condivisi tra le case',
        'Setup fatto da noi',
        'Integrazione con il tuo PMS',
        'Upsell: late check-out, transfer, tour',
        'Referente dedicato',
      ],
    },
  ],
  note: 'Prezzi per appartamento al mese, IVA esclusa. Il setup completo fatto da noi parte da 149 € una tantum.',
}

export const reviews = {
  eyebrow: 'Recensioni',
  title: 'Chi ha smesso di rispondere alle stesse domande',
  items: [
    {
      quote:
        'Prima ricevevo otto messaggi per ogni soggiorno, sempre gli stessi. Dopo Ospita ne ricevo uno, di solito per dirmi che la casa è bellissima.',
      name: 'Giulia Ferraro',
      role: 'Host · 2 appartamenti, Bologna',
      score: 5,
    },
    {
      quote:
        'L’ho attivato su undici unità in una settimana. Il team di pulizia ha finalmente un posto dove leggere le istruzioni aggiornate.',
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
        'La sezione trasporti da sola vale l’abbonamento. Nessuno mi chiede più quale bus prendere dall’aeroporto.',
      name: 'Andrea Pisani',
      role: 'Host · Bergamo',
      score: 5,
    },
    {
      quote:
        'Ho messo il QR in una cornice sul tavolo. Tre ospiti su quattro lo aprono nei primi cinque minuti: lo vedo dalle statistiche.',
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
    'Rispondiamo entro un giorno lavorativo. Se preferisci, prepariamo insieme una demo con i contenuti reali del tuo appartamento — gratis.',
  bullets: [
    'Demo personalizzata in 24 ore',
    'Migrazione dei contenuti inclusa',
    'Nessun vincolo di permanenza',
  ],
  subjects: ['Voglio una demo', 'Ho più appartamenti', 'Domande sui prezzi', 'Altro'],
}

export const footer = {
  tagline: 'La web app che accoglie i tuoi ospiti al posto tuo.',
  columns: [
    {
      title: 'Prodotto',
      links: ['Funzionalità', 'Personalizzazione', 'Lingue', 'Statistiche', 'Novità'],
    },
    {
      title: 'Risorse',
      links: ['Guida rapida', 'Modelli pronti', 'Casi studio', 'Assistenza', 'Stato del servizio'],
    },
    {
      title: 'Azienda',
      links: ['Chi siamo', 'Lavora con noi', 'Privacy', 'Termini', 'Cookie'],
    },
  ],
}
