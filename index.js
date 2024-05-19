import { HfInference } from "@huggingface/inference";
import { config } from "dotenv";
import chalk from 'chalk';
import readline from 'readline';
import ora from 'ora';

config();

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
  const spinner = ora('Traduciendo...').start();

  // Traducción de español a ingles
  model = "Helsinki-NLP/opus-mt-es-en";
  try {
    result = await hf.translation({
      model,
      inputs: textInput,
      parameters: {
        "src_lang": "es",
        "tgt_lang": "en"
      }
    });
    spinner.succeed('Traducción al inglés completada');
    console.log('\n\nLa traducción al ingles es: \n', chalk.blue(result.translation_text));
  } catch (error) {
    spinner.fail('Error en la traducción al inglés');
    console.error(chalk.red(error));
  }

  spinner.start('Traduciendo al español...');

  // Traducción de ingles a español
  model = "Helsinki-NLP/opus-mt-en-es";
  try {
    result = await hf.translation({
      model,
      inputs: result.translation_text,
      parameters: {
        "src_lang": "en",
        "tgt_lang": "es"
      }
    });
    spinner.succeed('Traducción al español completada');
    console.log('\n\nLa traducción al español es: \n', chalk.blue(result.translation_text));
  } catch (error) {
    spinner.fail('Error en la traducción al español');
    console.error(chalk.red(error));
  }

  // Pregunta al usuario por otro texto a traducir
  askForText();
}

// Función para preguntar al usuario por el texto a traducir
function askForText() {
  rl.question('Ingrese el texto a traducir \n(o escriba "exit" para salir): ', (textInput) => {
    if (textInput.toLowerCase() === 'exit') {
      rl.close();
    } else {
      translateText(textInput);
    }
  });
}

// Inicio del programa
askForText();