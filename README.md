# Traductor español - ingles
Este proyecto consiste en una herramienta para la terminal que permite traducir texto de español a inglés utilizando el modelo [Helsinki-NLP/opus-mt-es-en](https://huggingface.co/Helsinki-NLP/opus-mt-es-en?text=Los+ingredientes+de+una+tortilla+de+patatas+son%3A+huevos%2C+patatas+y+cebolla) de [Hugging Face](https://huggingface.co/).

## Ejecución
1. Clonar el repositorio.
2. Instalar las dependencias: `npm i`
3. Crear un archivo `.env` en el cual alojar la variable `HF_ACCESS_TOKEN` cuyo valor será el token generado en Hugging Face.
4. Compilar el proyecto: `npm run build`
5. Ejecutar: `npm run start`
6. Finalizar la ejecución: `Ctrl + D` o ingresar `exit`.

## Uso
Una vez inicializado el programa se le indicará que ingrese el texto a traducir. Luego de presionar `Enter` se mostrará el texto traducido. Luego podrá volver a realizar una nueva traducción, pero en caso de no querer hacerlo puede ingresar `exit` para finalizar la ejecución del programa o presionar `Ctrl + D`.

## Ejemplos
### Textual
```
$ node dist/index.js # o npm run start
=============================================
=          Traductor de texto               =
=============================================
-> Ingrese el texto a traducir:
-+ Hola

-> La traducción al ingles es: 
-+ Hello. 
```

### Imagen
<div align="center">
  <img src="https://i.ibb.co/2YkfnN7/Captura-desde-2024-05-19-14-35-52.png" />
</div>

### GIF
<div align="center">
  <img src="https://i.ibb.co/pyrrdF8/Grabaci-n-de-pantalla-desde-2024-05-19-15-05-22.gif" />
</div>

## Dependencias
- [`@huggingface/inference`](https://www.npmjs.com/package/@huggingface/inference): Para realizar inferencias de modelos de lenguaje.
- [`dotenv`](https://www.npmjs.com/package/dotenv): Para cargar variables de entorno desde un archivo **`.env`**.
- [`chalk`](https://www.npmjs.com/package/chalk): Para colorear la salida en la consola.
- [`clipboardy`](https://www.npmjs.com/package/clipboardy): Para copiar texto al portapapeles.
- [`inquirer`](https://www.npmjs.com/package/inquirer): Para interactuar con el usuario a través de la consola.

## Desarrollo
Para contribuir al proyecto o realizar modificaciones, utilice los siguientes comandos:
- `npm run build`: Compila los archivos TypeScript a JavaScript en la carpeta [`dist`](./dist/).
- `npm run start`: Ejecuta el proyecto compilado.

## Recomendaciones
- Se recomienda utilizar el programa en una terminal con fondo oscuro para una mejor visualización de los colores.
- Se recomienda generar un alias para ejecutar el programa de forma más rápida.

## Nota
Este proyecto fue realizado con el fin de aprender a utilizar la librería `@huggingface/inference` y como una herramienta personal para traducir texto de español a inglés. Por lo tanto, no se garantiza la precisión de las traducciones realizadas.