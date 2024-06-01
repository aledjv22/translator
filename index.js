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
let selectedLanguage = null;

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

// Función para preguntar al usuario por el idioma preferido
async function askForLanguage() {
  const languageQuestion = [
    {
      type: 'list',
      name: 'language',
      message: 'Please select your language / Por favor seleccione su idioma',
      choices: ['English', 'Español'],
    },
  ];

  const languageAnswer = await inquirer.prompt(languageQuestion);
  return languageAnswer.language;
}

// Función para preguntar al usuario por el texto a traducir
async function askForText() {
  const questions = [
    {
      type: 'list',
      name: 'translationType',
      message: selectedLanguage === 'English' ? 'Choose the type of translation' : 'Elija el tipo de traducción',
      choices: selectedLanguage === 'English' ? ['English to Spanish', 'Spanish to English', 'Exit'] : ['Inglés a Español', 'Español a Inglés', 'Salir'],
    },
    {
      type: 'input',
      name: 'textInput',
      message: selectedLanguage === 'English' ? 'Enter the text to translate:' : 'Ingrese el texto a traducir:',
      when: (answers) => answers.translationType !== (selectedLanguage === 'English' ? 'Exit' : 'Salir'),
    },
  ];

  const answers = await inquirer.prompt(questions);

  if (answers.translationType === (selectedLanguage === 'English' ? 'Exit' : 'Salir')) {
    print(chalk.bold.italic.bgYellowBright(selectedLanguage === 'English' ? '\nSee you later!' : '\n¡Hasta luego!'));
  } else if (answers.translationType === (selectedLanguage === 'English' ? 'English to Spanish' : 'Inglés a Español')) {
    translateTextEn(answers.textInput);
  } else {
    translateTextEs(answers.textInput);
  }
}

// Inicio del programa
async function startProgram() {
  selectedLanguage = await askForLanguage();
  askForText();
}

startProgram();