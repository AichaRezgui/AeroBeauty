# 💄 AeroBeauty

## 📝 Description du projet

**AeroBeauty** est une application e-commerce développée avec **Angular 20** permettant aux utilisateurs de naviguer parmi une sélection de produits de beauté, d’ajouter des articles à leur panier, de créer un compte, de se connecter, et de passer une commande simulée.

L’application met en avant une interface moderne, fluide et responsive avec un design épuré, tout en utilisant un **backend simulé via JSON Server** pour la gestion des données.

---

## ⚙️ Technologies utilisées

- **Frontend** : Angular 20  
- **Backend (simulation)** : JSON Server  
- **Langages** : TypeScript, HTML5, CSS3  
- **Outils et dépendances** :
  - Angular CLI  
  - Google Fonts (Roboto, Poppins)  
  - Material Icons  
  - LocalStorage pour la persistance du panier  

---

## 💻 Installation et lancement

### 1. Cloner le projet
```bash
git clone https://github.com/ton-compte/AeroBeauty.git

cd AeroBeauty



### 2. Installer les dépendances Angular
npm install
ng add @angular/material      
npm i swiper ngx-swiper-wrapper   

### 3. Installer et lancer le backend (JSON Server)
npm install -g json-server   
npx json-server --watch db.json --port 3000

### 4. Lancer le frontend Angular
ng serve 

### 5. Accéder à l’application
http://localhost:4200/

##  Structure du projet

AeroBeauty/
│
├── .angular/ # Fichiers de configuration Angular
├── .vscode/ # Configuration VS Code
├── captures/ # Captures d’écran pour le README
├── node_modules/ # Dépendances installées
├── public/ # Ressources publiques (favicon, images globales…)
├── src/
│ ├── app/
│ │ ├── components/ # Composants 
│ │ ├── core/ # Services principaux 
│ │ ├── guards/ # Gardiens de routes (authentification, accès)
│ │ ├── interceptor/ # Intercepteurs HTTP (gestion des requêtes, tokens)
│ │ ├── models/ # Interfaces et modèles TypeScript
│ │ ├── app.config.ts # Configuration principale
│ │ ├── app.css # Styles globaux du module principal
│ │ ├── app.html # Template principal
│ │ ├── app.routes.ts # Gestion des routes principales
│ │ ├── app.spec.ts # Tests unitaires du module principal
│ │ ├── app.ts # Fichier racine du module Angular
│ │
│ ├── data/ # Données locales ou mockées
│ ├── custom-theme.scss # Thème personnalisé global
│ ├── index.html # Point d’entrée principal de l’application
│ ├── main.ts # Bootstrap Angular
│ └── styles.css # Feuille de style principale
│
├── angular.json # Configuration Angular
├── package.json # Dépendances du projet
├── package-lock.json # Versionnement des dépendances
├── tsconfig.app.json # Configuration TypeScript du projet
├── .editorconfig # Normes de formatage
├── .gitignore # Fichiers exclus du dépôt
└── README.md # Documentation du projet

## Fonctionnalités implémentées
🏠Page d’accueil

Carousel présentant des produits

Catégories de produits sous forme de cartes cliquables

Sélection de produits vedettes (8)

Barre de recherche fonctionnelle

Menu de navigation principal

🛍️ Catalogue de produits

Affichage en grille (20 produits)

Carte produit : image, nom, prix, note, bouton Ajouter au panier

Filtres par catégorie, prix et évaluation

Tri par prix, popularité et nouveautés

scroll infini

📄 Détail produit

Galerie de plusieurs images

Description complète, disponibilité

Avis clients simulés

Ajout au panier et recommandations similaires

🛒 Panier d’achat

Liste des articles ajoutés avec :

Image, nom, prix unitaire, quantité, sous-total

Récapitulatif total (sous-total, livraison, total général)

Persistance via LocalStorage

🔐 Authentification

Page d’inscription avec validation des champs

Page de connexion avec gestion de session simulée

Messages d’erreur et validation des formulaires

👤 Espace utilisateur

Modification du profil

Historique des commandes

Liste de favoris

💳 Processus de commande 

Page checkout avec adresse, livraison et paiement simulé

Page de confirmation de commande

## 📸 Captures d’écran


| Page           | Capture                                           |
| -------------- | ------------------------------------------------- |
| Page d'accueil | ![Accueil](/captures/home1.png) <br>![Accueil 2](/captures/home2.png)           |
| Catalogue      | ![Catalogue](/captures/products.png)    |
| Détail produit | ![Produit](/captures/product-details1.png)<br>![Produit 2](/captures/product-details2.png) |
| Panier         | ![Panier](/captures/panier.png) <br>![Panier vide](/captures/empty-cart.png) |
| Connexion      | ![Connexion](/captures/login.png)        |
| Inscription    | ![Inscription](/captures/sign-up.png)        |
| Checkout       | ![Checkout](/captures/checkout.png)        |
| Confirmation   | ![Confirmation](/captures/confirmation.png)        |
| Profile-info   | ![Profile-info](/captures/profile-info.png)        |
| Profile-orders | ![Profile-orders](/captures/profile-orders.png)        |
| Profile-address| ![Profile-address](/captures/profile-address.png)        |
| Profile-favoris| ![Profile-favoris](/captures/profile-favoris.png)        |


## 💬 Difficultés rencontrées

- Gestion du typage `id` (string vs number) avec JSON Server  

REZGUI AICHA 