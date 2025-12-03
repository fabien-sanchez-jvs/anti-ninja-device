# Anti Ninja Device 🎯

Une application React interactive pour gérer les tours de parole en réunion et détecter les "ninja" - ces personnes qui ne prennent pas la parole lors d'un tour de table !

## ✨ Fonctionnalités

- **Visualisation en étoile** : Chaque participant est positionné sur une branche de l'étoile
- **Sélection aléatoire** : Cliquez au centre de l'étoile pour choisir un participant au hasard
- **Sélection manuelle** : Cliquez directement sur un prénom pour le sélectionner
- **Gestion des états** : 
  - 🟣 En attente (violet)
  - 🟢 Sélectionné (vert, avec animation)
  - ⚪ Déjà passé (gris)
- **Persistance** : Les données sont sauvegardées automatiquement dans le navigateur
- **Responsive** : S'adapte à tous les écrans (mobile, tablette, desktop)

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build production

```bash
npm run build
```

### Preview production

```bash
npm run preview
```

## 📖 Guide d'utilisation

### 1. Configuration des participants

Au premier lancement, cliquez sur **⚙️ Paramètres** pour configurer la liste des participants :

- Ajoutez au minimum **3 prénoms**
- Chaque prénom doit être unique
- Cliquez sur **Enregistrer** pour valider

### 2. Utilisation de l'étoile

Sur la page principale :

- **🎯 Centre de l'étoile** : Sélection aléatoire parmi les participants en attente
- **👆 Cliquer sur un prénom** : Sélection manuelle
- **🔄 Bouton Reset** : Réinitialiser tous les états à "en attente"
- **⚙️ Bouton Paramètres** : Modifier la liste des participants

### 3. États des participants

- **En attente** : Couleur violette, participant disponible
- **Sélectionné** : Couleur verte avec animation, c'est son tour
- **Déjà passé** : Grisé, a déjà parlé

Quand tous les participants sont passés, la sélection aléatoire réinitialise automatiquement les états.

## 🏗️ Architecture

```
src/
├── components/        # Composants réutilisables
│   ├── Star.tsx      # Composant étoile SVG
│   └── Star.css
├── pages/            # Pages de l'application
│   ├── StarView.tsx  # Page principale
│   ├── StarView.css
│   ├── Settings.tsx  # Page de paramètres
│   └── Settings.css
├── store/            # Gestion d'état Zustand
│   └── useStore.ts   # Store avec persistance
├── types/            # Types TypeScript
│   └── index.ts
└── App.tsx           # Configuration du router
```

## 🛠️ Stack technique

- **React 19** avec TypeScript
- **Vite** - Bundler ultra-rapide
- **React Router** - Navigation
- **Zustand** - Gestion d'état avec persistance localStorage
- **SVG** - Visualisation de l'étoile (pur, sans librairie externe)
- **CSS moderne** - Animations et responsive design

## 🎨 Personnalisation

Les couleurs et styles peuvent être modifiés dans les fichiers CSS :

- `StarView.css` : Page principale et en-tête
- `Star.css` : Étoile et états des participants
- `Settings.css` : Page de paramètres

## 📝 Licence

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.
