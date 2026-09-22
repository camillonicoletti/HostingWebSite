// Commercial settings retained from the existing website. Verify the recipient
// and offer before deploying; the contact flow opens the visitor's email client.
export const brand = {
  name: 'LaMiaCasa',
  claim: 'La casa che si spiega da sola.',
  email: 'ciao@lamiacasa.app',
  demo: '/demo/',
}
export const nav = [
  { label: 'La guida', href: '#prodotto' },
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Prezzo', href: '#prezzo' },
]
export const guideCards = [
  { id: 'checkin', label: 'Check-in', icon: 'pin', detail: 'Arrivo e accesso' },
  { id: 'wifi', label: 'Wi-Fi', icon: 'wifi', detail: 'Rete e password' },
  { id: 'rules', label: 'Regole casa', icon: 'home', detail: 'Le cose da sapere' },
  { id: 'groceries', label: 'Supermercati', icon: 'cart', detail: 'La spesa, qui vicino' },
  { id: 'transport', label: 'Trasporti', icon: 'train', detail: 'Muoversi in città' },
  { id: 'health', label: 'Farmacie', icon: 'cross', detail: 'I contatti utili' },
  { id: 'services', label: 'Servizi in zona', icon: 'globe', detail: 'Tutto a portata di mano' },
  { id: 'checkout', label: 'Check-out', icon: 'check', detail: 'Prima di partire' },
]
export const featureGroups = [
  { n: '01', title: 'L’arrivo, senza dubbi.', text: 'Il portone giusto, le istruzioni per entrare, il Wi-Fi. L’ospite trova il suo primo benvenuto ancora prima di arrivare.', tags: ['Check-in', 'Wi-Fi', 'Regole della casa'] },
  { n: '02', title: 'La zona, come la conosci tu.', text: 'La fermata più comoda, dove fare la spesa, i servizi utili. Le informazioni che fanno sentire a casa anche in una città nuova.', tags: ['Trasporti', 'Supermercati', 'Contatti utili'] },
  { n: '03', title: 'Fino all’ultimo saluto.', text: 'Orario di partenza, dove lasciare le chiavi, cosa ricordarsi. Una guida chiara anche quando è il momento di andare.', tags: ['Check-out', 'Raccolta', 'WhatsApp host'] },
]
export const steps = [
  { n: '01', title: 'Tu ci racconti la casa.', body: 'Partiamo dalle informazioni che usi già: messaggi, documenti e consigli. Mettiamo insieme quello che serve ai tuoi ospiti.', icon: 'chat' },
  { n: '02', title: 'Noi le diamo forma.', body: 'Prepariamo una guida con i tuoi contenuti, le sezioni e lo stile concordati. Tu guardi l’anteprima e ci dici cosa rifinire.', icon: 'sparkle' },
  { n: '03', title: 'Il link è pronto. Benvenuti.', body: 'Ti consegniamo la guida online e il QR da stampare. Invii il link prima dell’arrivo, lo lasci in casa, lo condividi quando serve.', icon: 'arrow' },
]
export const faqs = [
  { q: 'I miei ospiti devono scaricare un’app?', a: 'No. La guida si apre nel browser del telefono da un link o da un QR. Non serve creare un account. Per consultarla è necessaria una connessione a Internet.' },
  { q: 'Posso provarla prima di decidere?', a: 'Certo. La demo è navigabile: puoi aprire le sezioni e provare le funzioni della guida. I contenuti sono dimostrativi; quelli della tua struttura vengono preparati insieme a te.' },
  { q: 'Cosa devo preparare?', a: 'Le informazioni della struttura: arrivo, Wi-Fi, regole, servizi vicini e check-out. Possiamo partire dai messaggi o dai documenti che invii già agli ospiti.' },
  { q: 'In quali lingue è disponibile?', a: 'Il prototipo è disponibile in italiano, inglese e francese. Le lingue e i contenuti della tua guida vengono definiti nella proposta prima di iniziare.' },
  { q: 'E se cambiano le informazioni?', a: 'Puoi richiedere aggiornamenti. I primi tre mesi di assistenza sono inclusi nell’offerta; ambito delle modifiche e assistenza successiva vengono chiariti nella proposta. La guida attuale non include un pannello di modifica autonomo.' },
  { q: 'Posso usarla per più appartamenti?', a: 'Sì. Ogni struttura ha la sua guida e le sue informazioni. Scrivici quante ne gestisci: prepariamo una proposta in base a quello che ti serve.' },
]
