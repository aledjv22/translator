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
Una vez inicializado el programa se le indica al usuario que seleccione el idioma para mostrarle la interfaz en ese idioma. Luego, se le solicita al usuario seleccione de que idioma a que idioma desea traducir el texto. Posteriormente, se le solicita al usuario que ingrese el texto a traducir. Finalmente, se muestra la traducción del texto ingresado, se copia al portapapeles y nuevamente se le consulta al usuario de que idioma a que idioma desea traducir otro texto.

## Ejemplos
### Textual
```
$ node dist/index.js # o npm run start
? Please select your language / Por favor seleccione su idioma Español
? Elija el tipo de traducción Español a Inglés
? Ingrese el texto a traducir: Hola

Traduciendo... Por favor, espere.

-> La traducción es: 
-+ Hello. 

? Elija el tipo de traducción (Use arrow keys)
❯ Inglés a Español 
  Español a Inglés 
  Salir 
```

### Imagen
<div align="center">
  <img src="https://i.ibb.co/4ZqgV2K/Captura-desde-2024-06-08-16-05-37.png" />
</div>

### GIF
<div align="center">
  <img src="https://i.ibb.co/0jXsRxc/Grabaci-n-de-pantalla-desde-2024-06-08-16-09-40.gif" />
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