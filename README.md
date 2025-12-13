# 📝 JSON Resume Form - SaaS de Création de CV

Application web moderne pour créer et gérer des CV professionnels au format [JSON Resume](https://jsonresume.org/), le standard ouvert reconnu par la communauté.

## 🎯 Fonctionnalités

### ✅ Disponibles actuellement

- **Interface intuitive** : Formulaires modernes et responsive pour toutes les sections du CV
- **Format standardisé** : Respect complet du schéma JSON Resume
- **Gestion complète** : 12 sections incluant profil, expériences, formations, compétences, etc.
- **Aperçu en temps réel** : Visualisez votre CV au fur et à mesure de la création
- **Export JSON** : Téléchargez votre CV au format JSON standard
- **Persistance locale** : Vos données sont sauvegardées automatiquement dans le navigateur

### 🚀 À venir

- **Agent IA** : Conversion automatique de CV Word (.docx) et PDF vers JSON Resume
- **Templates multiples** : Différents styles de rendu pour votre CV
- **Export PDF** : Génération de PDF professionnels
- **Partage** : URLs publiques pour partager votre CV

## 🛠️ Stack Technique

- **Framework** : [Next.js 16](https://nextjs.org) (App Router)
- **UI** : React 19 + [Tailwind CSS 4](https://tailwindcss.com)
- **State Management** : [Zustand](https://zustand-demo.pmnd.rs/)
- **Langage** : TypeScript 5
- **Styling** : Design system avec gradients modernes

## 📦 Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/next-json-resume-form.git
cd next-json-resume-form

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3001](http://localhost:3001) dans votre navigateur.

## 🗂️ Structure du Projet

```
app/
├── page.tsx                 # Page d'accueil
├── layout.tsx              # Layout principal avec navigation
├── basics/                 # Section profil (nom, email, localisation)
├── work/                   # Expériences professionnelles
├── education/              # Formations et diplômes
├── volunteer/              # Bénévolat
├── skills/                 # Compétences techniques
├── projects/               # Projets personnels
├── awards/                 # Prix et distinctions
├── certificates/           # Certifications
├── publications/           # Publications
├── languages/              # Langues parlées
├── interests/              # Centres d'intérêt
├── references/             # Références professionnelles
├── preview/                # Aperçu du CV complet
├── export/                 # Export JSON
├── components/             # Composants réutilisables
│   ├── FormSection.tsx     # Formulaire avec validation
│   ├── EditableList.tsx    # Liste CRUD
│   ├── TagInput.tsx        # Input pour tags/mots-clés
│   ├── DatePicker.tsx      # Sélecteur de date
│   ├── ImageUploader.tsx   # Upload d'image
│   ├── PreviewCard.tsx     # Carte de prévisualisation
│   └── Navbar.tsx          # Navigation principale
└── lib/
    ├── definitions.ts      # Types TypeScript pour JSON Resume
    ├── store.ts            # Store Zustand centralisé
    └── utils.ts            # Fonctions utilitaires
```

## 🎨 Utilisation

### 1. Créer votre profil

Commencez par la section **Basics** pour renseigner vos informations personnelles (nom, email, téléphone, localisation, réseaux sociaux).

### 2. Ajouter vos expériences

Remplissez les différentes sections selon vos besoins :
- **Work** : Expériences professionnelles avec dates et descriptions
- **Education** : Diplômes et formations avec cours suivis
- **Skills** : Compétences avec niveau de maîtrise
- **Projects** : Projets personnels ou open-source

### 3. Compléter votre CV

Ajoutez les sections optionnelles pour un CV complet :
- Volunteer, Awards, Certificates, Publications
- Languages (avec niveau de compétence)
- Interests, References

### 4. Prévisualiser et exporter

- **Preview** : Visualisez votre CV dans un format élégant
- **Export** : Téléchargez votre CV au format JSON

## 🔧 Scripts Disponibles

```bash
# Développement (port 3001)
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start

# Linter ESLint
npm run lint

# Correction automatique du linter
npm run lint:fix
```

## 📄 Format JSON Resume

Le format JSON Resume est un standard ouvert qui permet de :
- ✅ Structurer votre CV de manière universelle
- ✅ L'utiliser avec de nombreux outils et générateurs de thèmes
- ✅ Le versionner facilement avec Git
- ✅ L'intégrer dans des applications automatisées

Documentation complète : [jsonresume.org/schema](https://jsonresume.org/schema/)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT.

## 💻 Author

Nicolas RANO for Guajava SASU

## 🔗 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [JSON Resume Schema](https://jsonresume.org/schema/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
