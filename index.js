import fs from "fs";
import chalk from "chalk";


const trataErro = (e) => {
  console.log(chalk.red(e));
  throw new Error(chalk.red(e.code, "arquivo não encontrado"));
};

const pegaTexto = (texto) => {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultado = capturas.map(capturas => ({[capturas[1]]: capturas[2]}))
  return resultado
}

const pegaArquivo = async (caminhoArquivo) => {
  const encoding = "utf8";
  try {
    const texto = await fs.promises.readFile(caminhoArquivo, encoding);
    console.log(pegaTexto(texto));
  } catch (e) {
    trataErro(e);
  }
};

pegaArquivo("./arquivos/texto.md")
