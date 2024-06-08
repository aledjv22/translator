import chalk from 'chalk';
import clipboardy from 'clipboardy';
import hf from './config.js';
import messages from './messages.js';
import { askForText } from './interaction.js';

// Variables globales
let model: string, result: any;

// Función para imprimir mensajes en consola
const print = console.log;

// Función para traducir texto de español a ingles
async function translateTextEs(textInput: any, selectedLanguage: string) {
  // Traducción de español a ingles
  model = "Helsinki-NLP/opus-mt-es-en";
  try {
    // Mensaje de carga
    print(chalk.bgMagenta.bold.italic(messages[selectedLanguage]['translating']));
    result = await hf.translation({
      model,
      inputs: textInput
    });
    // Resultado de la traducción
    print(
      chalk.bgBlue.bold.italic(messages[selectedLanguage]['translationIs']),
      chalk.cyan.bold('\n-+'),
      chalk.cyan(result.translation_text), 
      '\n'
    );
    // Copiar la traducción al portapapeles
    clipboardy.writeSync(result.translation_text);
  } catch (error) {
    console.error(chalk.bgRed.bold.italic(error));
  }

  // Pregunta al usuario por otro texto a traducir
  askForText(selectedLanguage);
}

// Función para traducir texto de ingles a español
async function translateTextEn(textInput: any, selectedLanguage: string) {
  // Traducción de ingles a español
  model = "Helsinki-NLP/opus-mt-en-es";
  try {
    // Mensaje de carga
    print(chalk.bgMagenta.bold.italic(messages[selectedLanguage]['translating']));
    result = await hf.translation({
      model,
      inputs: textInput
    });
    // Resultado de la traducción
    print(
      chalk.bgBlue.bold.italic(messages[selectedLanguage]['translationIs']),
      chalk.cyan.bold('\n-+'),
      chalk.cyan(result.translation_text), 
      '\n'
    );
    // Copiar la traducción al portapapeles
    clipboardy.writeSync(result.translation_text);
  } catch (error) {
    console.error(chalk.bgRed.bold.italic(error));
  }

  // Pregunta al usuario por otro texto a traducir
  askForText(selectedLanguage);
}

export { translateTextEs, translateTextEn };