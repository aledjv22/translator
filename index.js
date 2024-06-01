import { HfInference } from "@huggingface/inference";
import { config } from "dotenv";
import chalk from 'chalk';
import inquirer from 'inquirer';
import clipboardy from 'clipboardy';

config();
const print = console.log;

// Token de acceso api de Hugging Face
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

// Variables
let result = null;
let model = null;

// Función para traducir texto de español a ingles
async function translateTextEs(textInput) {
  // Traducción de español a ingles
  model = "Helsinki-NLP/opus-mt-es-en";
  try {
    // Mensaje de carga
    print(chalk.bgCyan.bold.italic('\nTraduciendo... Por favor, espere.'));
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
      chalk.bgGreen.bold.italic('\n-> La traducción al ingles es:'),
      chalk.green.bold('\n-+'),
      chalk.green(result.translation_text), 
      '\n'
    );
    // Copiar la traducción al portapapeles
    clipboardy.writeSync(result.translation_text);
  } catch (error) {
    console.error(chalk.bgRed.bold.italic(error));
  }

  // Pregunta al usuario por otro texto a traducir
  askForText();
}

// Función para traducir texto de ingles a español
async function translateTextEn(textInput) {
  // Traducción de ingles a español
  model = "Helsinki-NLP/opus-mt-en-es";
  try {
    // Mensaje de carga
    print(chalk.bgCyan.bold.italic('\nTraduciendo... Por favor, espere.'));
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
      chalk.bgGreen.bold.italic('\n-> La traducción al español es:'),
      chalk.green.bold('\n-+'),
      chalk.green(result.translation_text), 
      '\n'
    );
    // Copiar la traducción al portapapeles
    clipboardy.writeSync(result.translation_text);
  } catch (error) {
    console.error(chalk.bgRed.bold.italic(error));
  }

  // Pregunta al usuario por otro texto a traducir
  askForText();
}

// Función para preguntar al usuario por el texto a traducir
async function askForText() {
  print(chalk.magenta('============================================'));
  print(chalk.magenta('=   Traductor de texto / Text Translator   ='));
  print(chalk.magenta('============================================'));

  const questions = [
    {
      type: 'list',
      name: 'translationType',
      message: 'Elija el tipo de traducción / Choose the type of translation',
      choices: ['Español a Inglés / Spanish to English', 'Inglés a Español / English to Spanish', 'Salir / Exit'],
    },
    {
      type: 'input',
      name: 'textInput',
      message: 'Ingrese el texto a traducir / Enter the text to translate:',
      when: (answers) => answers.translationType !== 'Salir / Exit',
    },
  ];

  const answers = await inquirer.prompt(questions);

  if (answers.translationType === 'Salir') {
    print(chalk.bold.italic.bgYellowBright('\n¡Hasta luego!'));
  } else if (answers.translationType === 'Español a Inglés') {
    translateTextEs(answers.textInput);
  } else {
    translateTextEn(answers.textInput);
  }
}

// Inicio del programa
askForText();