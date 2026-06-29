import { useState } from 'react'

// Taux de change fixes par rapport à l'EUR
const EXCHANGE_RATES = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
  JPY: 161.5,
  CHF: 0.97,
  CAD: 1.47,
  AUD: 1.63,
  CNY: 7.82,
  MAD: 10.85,
  TND: 3.34,
  DZD: 144.5,
}

const CURRENCIES = [
  { code: 'EUR', label: 'EUR - Euro' },
  { code: 'USD', label: 'USD - Dollar américain' },
  { code: 'GBP', label: 'GBP - Livre sterling' },
  { code: 'JPY', label: 'JPY - Yen japonais' },
  { code: 'CHF', label: 'CHF - Franc suisse' },
  { code: 'CAD', label: 'CAD - Dollar canadien' },
  { code: 'AUD', label: 'AUD - Dollar australien' },
  { code: 'CNY', label: 'CNY - Yuan chinois' },
  { code: 'MAD', label: 'MAD - Dirham marocain' },
  { code: 'TND', label: 'TND - Dinar tunisien' },
  { code: 'DZD', label: 'DZD - Dinar algérien' },
]

function App() {
  const [montant, setMontant] = useState('')
  const [deviseDepart, setDeviseDepart] = useState('EUR')
  const [deviseArrivee, setDeviseArrivee] = useState('USD')
  const [resultat, setResultat] = useState(null)
  const [erreur, setErreur] = useState('')

  const convertir = () => {
    setErreur('')
    setResultat(null)

    if (montant === '' || Number.isNaN(Number(montant))) {
      setErreur('Veuillez entrer un montant valide.')
      return
    }

    const valeur = Number.parseFloat(montant)

    if (valeur < 0) {
      setErreur('Le montant doit être positif.')
      return
    }

    // Conversion via EUR comme pivot
    const enEur = valeur / EXCHANGE_RATES[deviseDepart]
    const converti = enEur * EXCHANGE_RATES[deviseArrivee]

    setResultat({
      montantOriginal: valeur,
      deviseDepart,
      montantConverti: converti.toFixed(4),
      deviseArrivee,
    })
  }

  const inverser = () => {
    setDeviseDepart(deviseArrivee)
    setDeviseArrivee(deviseDepart)
    setResultat(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') convertir()
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-icon">💱</div>
        <h1>Convertisseur de Devises</h1>
        <p className="subtitle">Convertissez instantanément entre les principales devises</p>
      </header>

      <main className="converter-card">
        {/* Champ montant */}
        <div className="form-group">
          <label htmlFor="montant">Montant à convertir</label>
          <input
            id="montant"
            type="number"
            className="input-montant"
            placeholder="Ex : 100"
            value={montant}
            onChange={(e) => {
              setMontant(e.target.value)
              setErreur('')
              setResultat(null)
            }}
            onKeyDown={handleKeyDown}
            min="0"
            aria-label="Montant à convertir"
          />
        </div>

        {/* Sélection des devises */}
        <div className="devise-row">
          <div className="form-group">
            <label htmlFor="deviseDepart">Devise de départ</label>
            <select
              id="deviseDepart"
              className="select-devise"
              value={deviseDepart}
              onChange={(e) => {
                setDeviseDepart(e.target.value)
                setResultat(null)
              }}
              aria-label="Devise de départ"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Bouton inverser */}
          <button
            className="btn-inverser"
            onClick={inverser}
            title="Inverser les devises"
            aria-label="Inverser les devises"
          >
            ⇄
          </button>

          <div className="form-group">
            <label htmlFor="deviseArrivee">Devise d'arrivée</label>
            <select
              id="deviseArrivee"
              className="select-devise"
              value={deviseArrivee}
              onChange={(e) => {
                setDeviseArrivee(e.target.value)
                setResultat(null)
              }}
              aria-label="Devise d'arrivée"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message d'erreur */}
        {erreur && (
          <div className="erreur" role="alert">
            ⚠️ {erreur}
          </div>
        )}

        {/* Bouton de conversion */}
        <button className="btn-convertir" onClick={convertir}>
          Convertir
        </button>

        {/* Résultat */}
        {resultat && (
          <div className="resultat-box" aria-live="polite">
            <p className="resultat-label">Résultat</p>
            <p className="resultat-valeur">
              {resultat.montantOriginal}{' '}
              <span className="devise-badge">{resultat.deviseDepart}</span>
              {' = '}
              <strong>{resultat.montantConverti}</strong>{' '}
              <span className="devise-badge accent">{resultat.deviseArrivee}</span>
            </p>
            <p className="taux-info">
              Taux : 1 {resultat.deviseDepart} ={' '}
              {(EXCHANGE_RATES[resultat.deviseArrivee] / EXCHANGE_RATES[resultat.deviseDepart]).toFixed(6)}{' '}
              {resultat.deviseArrivee}
            </p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Taux de change fixes à titre indicatif</p>
      </footer>
    </div>
  )
}

export default App
