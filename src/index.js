import fs from "fs";
import chalk from "chalk";

const trataErro = (e) => {
  console.log(chalk.red(e));
  throw new Error(chalk.red(e.code, "arquivo não encontrado"));
};

const pegaTexto = (texto) => {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultado = capturas.map((capturas) => ({
    [capturas[1]]: capturas[2],
  }));
  return resultado.length !== 0? resultado : chalk.red("texto vazio ou sem correspondência");
};

const pegaArquivo = async (caminhoArquivo) => {
  try {
    const encoding = "utf8";
    const texto = await fs.promises.readFile(caminhoArquivo, encoding);
    return pegaTexto(texto);
  } catch (e) {
    trataErro(e);
  }
};

export default pegaArquivo
