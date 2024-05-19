import { HfInference } from "@huggingface/inference";
import { config } from "dotenv";
import chalk from 'chalk';
import readline from 'readline';
import clipboardy from 'clipboardy';

config();
const print = console.log;

// Token de acceso api de Hugging Face
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

// Variables
let result = null;
let model = null;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para traducir el texto
async function translateText(textInput) {
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

// Función para preguntar al usuario por el texto a traducir
function askForText() {
  print(chalk.magenta('============================================='));
  print(chalk.magenta('=          Traductor de texto               ='));
  print(chalk.magenta('============================================='));
  let message = chalk.bgBlackBright.bold.italic('-> Ingrese el texto a traducir:') ;
  message += chalk.bold('\n-+ ');
  rl.question(message, (textInput) => {
    if (textInput.toLowerCase() === 'exit') {
      rl.close();
      print(chalk.bold.italic.bgYellowBright('\n¡Hasta luego!'));
    } else {
      translateText(textInput);
    }
  });
}

// Inicio del programa
askForText();