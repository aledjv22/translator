import { HfInference } from "@huggingface/inference";
import { config } from "dotenv";
import chalk from 'chalk';

config();

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

const imageURL = "https://images.foxtv.com/static.livenowfox.com/www.livenowfox.com/content/uploads/2023/12/932/524/painted-dog-foster-mom-cassie-and-puppies-from-jami-b.jpg?ve=1&tl=1";
let model = "Salesforce/blip-image-captioning-large";
const response = await fetch(imageURL);
const img = await response.blob();

let result;
// Imagen a texto
try {
  result = await hf.imageToText({
    data: img,
    model
  });
  console.log('La salida en ingles es: \n', chalk.green(result.generated_text));
} catch (error) {
  console.error(chalk.red(error));
}

// Traducción a español
model = "Helsinki-NLP/opus-mt-en-es";
try {
  result = await hf.translation({
    model,
    inputs: result.generated_text,
    parameters: {
      "src_lang": "en",
      "tgt_lang": "es"
    }
  });
  console.log('\n\nLa traducción al español es: \n', chalk.blue(result.translation_text));
} catch (error) {
  console.error(chalk.red(error));
}