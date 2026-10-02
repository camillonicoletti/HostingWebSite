# Pagina di pagamento Stripe: guida

La pagina di pagamento è un Payment Link di Stripe e si configura dalla Dashboard, non dal codice.
Il sito apre soltanto il link scritto in `src/content.js` (`order.stripeLink`).
Il prezzo è 49 € tutto compreso: niente IVA né su Stripe né sul sito.

Fai questi passi prima nella **Sandbox**. Poi rifalli identici in **modalità live**:
la Sandbox ha impostazioni, prodotti e link separati da quelli live.

Se non trovi una voce, usa la barra di ricerca in alto nella Dashboard e scrivi il nome della pagina (es. «Branding»).

## 1. Branding (logo e colori)
⚙️ Impostazioni → Impostazioni aziendali → **Branding**

| Campo | Valore |
|---|---|
| Icona | `stripe-assets/icona-512.png` |
| Logo | `stripe-assets/logo-lamiacasa.png` |
| Colore del marchio | `#F8F6EF` (il crema di sfondo del sito) |
| Colore d'accento | `#272B28` (il nero del pulsante «Ordina ora») |
| Font | Inter (DM Sans, il font del sito, non è tra quelli di Stripe) |
| Forme | Arrotondate |

Se Stripe ti chiede se mostrare l'icona o il logo, scegli il logo.
Il colore del marchio deve restare chiaro: la scritta del logo è scura e su uno sfondo scuro sparirebbe.

## 2. Immagine e descrizione del prodotto
Catalogo prodotti → **La tua guida ospiti** → Modifica
- Immagine: `stripe-assets/prodotto-1200.png`
- Descrizione: «Una guida per ogni struttura. Hai più case? Scegli il numero qui sotto ↓»

Salva.

## 3. Metodi di pagamento
⚙️ Impostazioni → Pagamenti → **Metodi di pagamento** (configurazione predefinita)

- Lascia attivi: **Carte**, **Cartes Bancaires**, **Apple Pay**, **Google Pay**, **PayPal**, **Satispay**
- Disattiva tutto il resto: Link, Klarna, Amazon Pay, Bancontact, Revolut Pay, Samsung Pay, EPS, MB WAY…
- Il sito elenca gli stessi metodi (`OrderPage.jsx`, `Pricing.jsx`): se ne cambi uno, aggiorna anche lì

## 4. Opzioni del link
Link di pagamento → apri il link da 49 € → **Modifica**

- Quantità regolabile: attiva, **tra 1 e 20** (serve a chi ha più strutture)
- **Riscuoti le imposte automaticamente: spenta.** Il cliente paga 49 € e basta, senza imposte aggiunte
- Acquisisci i nomi dei clienti: attiva
- Numero di telefono: facoltativo, utile per contattare il cliente su WhatsApp
- Testo personalizzato vicino al pulsante di pagamento: «Hai più strutture? Cambia la quantità accanto al prodotto: 49 € per ogni casa.»
- **Dopo il pagamento** → non mostrare la pagina di conferma, reindirizza a `https://<dominio del sito>/ordina/?pagato=1`

Salva. L'indirizzo del link resta lo stesso.

## 5. Verifica
Riapri il link in una finestra privata. Nella Sandbox puoi provare un pagamento con la carta di test
`4242 4242 4242 4242`, una qualsiasi data futura e un CVC qualsiasi: non vengono addebitati soldi veri.

## Passaggio a live
Rifai i passi 1–4 in modalità live e crea il link live. Poi incolla il nuovo `https://buy.stripe.com/…`
(senza `test_`) in `src/content.js`, al posto del link di test.
