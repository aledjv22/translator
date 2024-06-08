import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

// Token de acceso api de Hugging Face
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

export default hf;