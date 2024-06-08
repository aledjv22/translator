import { askForLanguage, askForText } from './interaction';

// Inicio del programa
async function startProgram(selectedLanguage: string) {
  askForText(selectedLanguage);
}

// Selección del idioma
const selectedLanguage = await askForLanguage();

startProgram(selectedLanguage);