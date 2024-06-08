import chalk from 'chalk';
import clipboardy from 'clipboardy';
import hf from './config';
import messages from './messages';
import { askForText } from './interaction';

// Variables globales
let model, result;

// Función para imprimir mensajes en consola
const print = console.log;

// Función para traducir texto de español a ingles
async function translateTextEs(textInput, selectedLanguage) {
  // Traducción de español a ingles
  model = "Helsinki-NLP/opus-mt-es-en";
  try {
    // Mensaje de carga
    print(chalk.bgMagenta.bold.italic(messages[selectedLanguage]['translating']));
    result = await hf.translation({
      model,
      inputs: textInput,
      parameters: {
        "src_lang": "es",
        "tgt_lang": "en"
      }
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
async function translateTextEn(textInput, selectedLanguage) {
  // Traducción de ingles a español
  model = "Helsinki-NLP/opus-mt-en-es";
  try {
    // Mensaje de carga
    print(chalk.bgMagenta.bold.italic(messages[selectedLanguage]['translating']));
    result = await hf.translation({
      model,
      inputs: textInput,
      parameters: {
        "src_lang": "en",
        "tgt_lang": "es"
      }
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