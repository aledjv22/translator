import chalk from 'chalk';
import inquirer from 'inquirer';
import { translateTextEn, translateTextEs } from './translation';

// Interface para las respuestas del usuario
interface TranslationAnswers {
  translationType: string;
  textInput?: string;
}

// Función para imprimir mensajes en consola
const print = console.log;

// Función para preguntar al usuario por el idioma preferido
async function askForLanguage(): Promise<string> {
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
async function askForText(selectedLanguage: string): Promise<void> {
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
      when: (answers: TranslationAnswers) => answers.translationType !== (selectedLanguage === 'English' ? 'Exit' : 'Salir'),
    },
  ];

  const answers = await inquirer.prompt<TranslationAnswers>(questions);

  if (answers.translationType === (selectedLanguage === 'English' ? 'Exit' : 'Salir')) {
    print(chalk.bold.italic.bgYellowBright(selectedLanguage === 'English' ? '\nSee you later!' : '\n¡Hasta luego!'));
  } else if (answers.translationType === (selectedLanguage === 'English' ? 'English to Spanish' : 'Inglés a Español')) {
    translateTextEn(answers.textInput, selectedLanguage);
  } else {
    translateTextEs(answers.textInput, selectedLanguage);
  }
}

export { askForLanguage, askForText };