# MUI DataGrid Demo

Ce projet est une démonstration qui compare deux approches différentes pour utiliser le composant DataGrid de MUI (Material-UI).

## Comment exécuter le projet

1. Cloner le dépôt
2. Utiliser la magie noire qu'est 🌈 la conteneurisation 🌈 pour lancer le projet :
    ```bash
    docker compose up
    ```
3. Accéder à l'application via `http://localhost:3000`
4. ???
5. Profit !

## Objectif

L'objectif de ce projet est de montrer et comparer deux méthodes distinctes pour implémenter et gérer le composant DataGrid de MUI :

1. **Approche API-driven** : Une DataGrid entièrement contrôlée par la GridApiPro, récupérée via le hook `useGridApiRef`. Cette méthode délègue la gestion de l'état à la grille elle-même.

2. **Approche State-driven** : Une DataGrid entièrement contrôlée par l'état du composant parent, offrant un contrôle total sur les données et leur gestion.

## Avantages et inconvénients des deux approches

### API-driven DataGrid

**Avantages :**
- Délègue la gestion de l'état à la grille
- Particulièrement utile pour les opérations de modification des données
- Évite d'avoir à implémenter toute la logique de gestion de l'état dans le composant parent
- Améliore les performances en évitant des re-rendus inutiles du composant parent

**Utilisation recommandée :** Pour les cas d'utilisation complexes avec beaucoup d'interactions et de modifications de données.

### State-driven DataGrid

**Avantages :**
- Contrôle total sur les données et leur gestion
- Workflow plus explicite et prévisible
- État centralisé dans le composant parent

**Inconvénients :**
- Peut nécessiter plus de code pour gérer les interactions avec la grille
- Peut entraîner des re-rendus fréquents du composant parent, affectant les performances

**Utilisation recommandée :** Pour les cas d'utilisation simples ou lorsqu'une gestion centralisée de l'état est nécessaire.

## Structure du projet

Le projet est structuré comme suit :
- `/client/src/components/ApiDrivenDataGrid.tsx` : Implémentation de l'approche API-driven
- `/client/src/components/StateDrivenDataGrid.tsx` : Implémentation de l'approche State-driven
- `/client/src/models/DemoRow.ts` : Définition du modèle de données utilisé par les deux grilles
