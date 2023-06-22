import chalk from "chalk";
import fs from "fs";
import pegaArquivo from "./index.js";
import listaValidada from "./validaLink.js";

const caminho = process.argv;

const imprimeLista = async (valida, resultado , arquivoAcessado = "") => {
  if (valida) {
    console.log(
      chalk.yellow("lista de links do arquivo:"),
      chalk.black.bgGreen(arquivoAcessado),
      await listaValidada(resultado)
    );
  } else {
    console.log(
      chalk.yellow("lista de links do arquivo:"),
      chalk.black.bgGreen(arquivoAcessado),
      resultado
    );
  }
};

const processaArquivo = async (caminho) => {
  const arquivo = caminho[2];
  const valida = caminho[3] === '--valida';

  try {
    fs.lstatSync(arquivo);
  } catch (e) {
    if (e.code === "ENOENT") {
      console.log("arquivo ou diretório não existe");
      return;
    }
  }
  if (fs.lstatSync(arquivo).isFile()) {
    const links = await pegaArquivo(arquivo);
    imprimeLista(links,valida);
  } else if (fs.lstatSync(arquivo).isDirectory()) {
    const arquivos = await fs.promises.readdir(arquivo);
    arquivos.forEach(async (links) => {
      const arquivosDoDiretorio = await pegaArquivo(`./${arquivo}/${links}`);
      imprimeLista(valida, arquivosDoDiretorio,links);
    });
  }
};

processaArquivo(caminho);
