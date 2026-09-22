export function createContactRequest(form, recipient) {
  const name = form.name.trim()
  const body = `Ciao LaMiaCasa,\n\nNome: ${name}\nEmail: ${form.email.trim()}\nStrutture: ${form.properties}\n\n${form.message.trim() || 'Vorrei una guida digitale per i miei ospiti.'}`
  return { body, href: `mailto:${recipient}?subject=${encodeURIComponent(`La mia guida ospiti — ${name}`)}&body=${encodeURIComponent(body)}` }
}
