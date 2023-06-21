import chalk from "chalk";
import fs from "fs";
import pegaArquivo from "./index.js";

const caminho = process.argv;

const imprimeLista = (resultado) => {
    console.log(chalk.yellow("lista de links"), resultado);
}

const processaArquivo = async (caminho) => {
  const arquivo = caminho[2];
  if (fs.lstatSync(arquivo).isFile()) {
    const links = await pegaArquivo(arquivo);
    imprimeLista(links);
  } else if(fs.lstatSync(arquivo).isDirectory()) {
    const arquivos = await fs.promises.readdir(arquivo)
    arquivos.forEach(async (links) => {
       const arquivosDoDiretorio = await pegaArquivo(`./${arquivo}/${links}`)
       imprimeLista(arquivosDoDiretorio);
    });
  }
};

processaArquivo(caminho);
