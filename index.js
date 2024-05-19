import { HfInference } from "@huggingface/inference";
import { config } from "dotenv";
import chalk from 'chalk';
import readline from 'readline';

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
    console.log('\n\nLa traducción al ingles es: \n', chalk.blue(result.translation_text));
  } catch (error) {
    console.error(chalk.red(error));
  }

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
    console.log('\n\nLa traducción al español es: \n', chalk.blue(result.translation_text));
  } catch (error) {
    console.error(chalk.red(error));
  }
}

// Ingreso de texto
rl.question('Ingrese el texto a traducir: ', (textInput) => {
  translateText(textInput);
  rl.close();
});