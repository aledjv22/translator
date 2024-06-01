import { askForLanguage, askForText } from './interaction.js';

// Inicio del programa
async function startProgram() {
  askForText(selectedLanguage);
}

// Selección del idioma
const selectedLanguage = await askForLanguage();

startProgram(selectedLanguage);