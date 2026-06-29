# 💱 Convertisseur de Devises — React + Vite

Application web de conversion de devises développée avec **React** et **Vite**, dans le cadre d'un devoir surveillé.

---

## 🚀 Lancer le projet

### Prérequis
- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- npm

### Installation des dépendances

```bash
npm install
```

### Démarrer en mode développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : [http://localhost:5173](http://localhost:5173)

### Build de production

```bash
npm run build
```

### Prévisualiser le build de production

```bash
npm run preview
```

---

## 🗂️ Structure du projet

```
convertisseurdevise/
├── index.html          # Point d'entrée HTML
├── vite.config.js      # Configuration Vite + plugin React
├── package.json
└── src/
    ├── main.jsx        # Montage de l'application React
    ├── App.jsx         # Composant principal (UI + logique)
    └── App.css         # Styles de l'application
```

---

## ✨ Fonctionnalités

- Saisie d'un montant à convertir
- Sélection de la devise de départ et d'arrivée (11 devises disponibles)
- Conversion basée sur des **taux de change fixes**
- Bouton d'inversion des devises
- Validation des entrées (montant vide, valeur négative)
- Affichage du taux utilisé
- Interface responsive et animée

---

## 🛠️ Technologies

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- CSS (variables, animations, responsive)

