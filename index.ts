import { askForLanguage, askForText } from './interaction';

// Inicio del programa
async function startProgram(selectedLanguage: string) {
  askForText(selectedLanguage);
}

(async () => {
  // Selección del idioma
  const selectedLanguage = await askForLanguage();

  startProgram(selectedLanguage);
})();