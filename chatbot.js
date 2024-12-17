const fs = require('fs');

// Charger les règles depuis un fichier JSON
const loadRules = (filePath) => {
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return {};
};

// Sauvegarder les règles dans un fichier JSON
const saveRules = (filePath, rules) => {
    fs.writeFileSync(filePath, JSON.stringify(rules, null, 2), 'utf-8');
};

// Initialiser le chatbot
class Chatbot {
    constructor(rulesFile = 'rules.json') {
        this.rulesFile = rulesFile;
        this.rules = loadRules(this.rulesFile);
    }

    // Méthode pour répondre à une question
    respond(question) {
        const normalizedQuestion = question.toLowerCase();

        // Vérifier si la question est un calcul mathématique
        const mathResult = this.handleMathQuestion(normalizedQuestion);
        if (mathResult !== null) {
            return mathResult;
        }

        // Vérifier les règles existantes
        if (this.rules[normalizedQuestion]) {
            return this.rules[normalizedQuestion];
        }

        // Réponse par défaut
        return "Je ne sais pas comment répondre à cela.";
    }

    // Méthode pour gérer les calculs mathématiques
    handleMathQuestion(question) {
        // Expression régulière pour détecter un calcul simple : nombre opérateur nombre
        const mathRegex = /combien\s+font\s+(\d+)\s*([\+\-\*\/])\s*(\d+)\s*\?/;

        const match = question.match(mathRegex);
        if (match) {
            const num1 = parseFloat(match[1]);
            const operator = match[2];
            const num2 = parseFloat(match[3]);

            let result;

            // Effectuer le calcul en fonction de l'opérateur
            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num2 !== 0 ? num1 / num2 : "Erreur : division par zéro";
                    break;
                default:
                    result = "Je ne peux pas faire ce calcul.";
            }

            return `${num1} ${operator} ${num2} = ${result}`;
        }

        // Retourner null si ce n'est pas un calcul
        return null;
    }

    // Ajouter ou mettre à jour une règle
    addRule(question, response) {
        const normalizedQuestion = question.toLowerCase();
        this.rules[normalizedQuestion] = response;
        saveRules(this.rulesFile, this.rules);
        return `Nouvelle règle ajoutée : "${question}" -> "${response}"`;
    }
}

// Exemple d'utilisation
if (require.main === module) {
    const chatbot = new Chatbot();

    console.log("Bienvenue dans le chatbot ! Tapez 'exit' pour quitter.");
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const askQuestion = () => {
        rl.question('Vous : ', (input) => {
            if (input.toLowerCase() === 'exit') {
                console.log('Au revoir !');
                rl.close();
            } else if (input.startsWith('add:')) {
                const [_, question, response] = input.split(':').map((s) => s.trim());
                console.log(chatbot.addRule(question, response));
            } else {
                console.log('Chatbot :', chatbot.respond(input));
            }
            askQuestion();
        });
    };

    askQuestion();
}

// Exporter le module
module.exports = Chatbot;