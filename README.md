# Chatbot Basé sur des Règles

Un simple module Node.js pour créer un chatbot basé sur des règles. Ce chatbot peut répondre à des questions prédéfinies, effectuer des calculs mathématiques dynamiques, et être enrichi avec de nouvelles règles.

## Fonctionnalités

- **Réponses prédéfinies** : Répond aux questions basées sur un ensemble de règles.
- **Calculs dynamiques** : Capable de résoudre des calculs simples comme `Combien font 5 + 3 ?`.
- **Ajout de règles** : Permet d'ajouter ou de modifier des réponses directement via le chatbot.
- **Sauvegarde persistante** : Les règles sont sauvegardées dans un fichier JSON.

---

## Installation

1. **Cloner le dépôt** :
   git clone https://github.com/ymabchour/chatBotModule.git

   cd chatBotModule
   
3.  **Installer les dépendances**
    npm install
   
4.  **Lancer le chatbot**
    node chatbot.js
    
----

## Utilisation
Exemple de dialogue
************
    Bienvenue dans le chatbot ! Tapez 'exit' pour quitter.
    Vous : Combien font 5 + 3 ?
    Chatbot : 5 + 3 = 8
    Vous : Quelle est la capitale de la France ?
    Chatbot : Je ne sais pas comment répondre à cela.
    Vous : add:Quelle est la capitale de la France ?:Paris
    Chatbot : Nouvelle règle ajoutée : "Quelle est la capitale de la France ?" -> "Paris"
    Vous : Quelle est la capitale de la France ?
    Chatbot : Paris
    Vous : exit
    Au revoir !
*************

----
## Commandes disponibles
1. Poser une question : Tapez simplement une question. Exemple :
   Combien font 10 * 2 ?

2. Ajouter une nouvelle règle dans le fichier *rules.json* : Utilisez le format add:question:réponse. Exemple :
  add:Quelle est la couleur du ciel ?:Le ciel est bleu

3. Quitter : Tapez exit pour quitter le programme.

----
## Structure du projet
.
├── chatbot.js       # Le module principal du chatbot

├── rules.json       # Fichier JSON pour sauvegarder les règles

├── package.json     # Fichier npm avec les dépendances

└── README.md        # Documentation du projet

## Auteur
Youssef Mabchour - Créateur et développeur initial.

