# Bootstrap, sass, gulp, browserSync.

## Requisitos
- [Node.js](https://nodejs.org/en/download/ "Node Js")
- NPM (Integrado en Node.js)
- [Gulp](https://gulpjs.com/ "Gulp")

Instalar Gulp globalmente

    $ npm -g install gulp

## Pasos

1. Clonar repositorio:
`git clone https://github.com/blackzeromgit/demo-prueba.git`

2. Ir al directory:
`cd demo-prueba`

3. Instalar todas las dependencias:
`npm install`

4. Run Gulp Task:
  - `gulp`      - Compilar scss --> css, minificar css, js y hacer el build en carpeta **dist**.

  - `gulp dev`  - Arranca servidor en local con browserSync y hot reloading al cambiar ficheros (HTML, SCSS, JS).
