# Hugging Face
Este repositorio está destinado a alojar las pruebas que realizaré al utilizar el servicio de Hugging Face, para el uso de diversos modelos de IA.

Actualmente solo hay dos pruebas, una de paso de una imagen a texto (en ingles) y el segundo de traducción de ingles a español.

## Ejecución:
1. Clonar el repositorio.
2. Instalar las dependecias: `npm i`
3. Crear un archivo `.env` en el cual alojar la variable `HF_ACCESS_TOKEN` cuyo valor será el token generado en Hugging Face.
4. Ejecutar: `node index`

## Recomendaciones
- Si desea utilizar otros modelos solo debe cambiarlos en la variable `model`
- Si desea cambiar la imagen, debe modificar el valor de `imageUrl`.
- Si utilizar una imagen local no es necesario hacer un `fetch()` ni `blob()`, solo pasar la ubicación.
- Si utiliza otro modelo para las traducciones, leer la documentación para verificar los idiomas permitidos.
  
