import fs from "fs";
import chalk from "chalk";

const trataErro = (e) => {
  console.log(chalk.red(e));
  throw new Error(chalk.red(e.code, "arquivo não encontrado"));
};

const pegaArquivo = async (caminhoArquivo) => {
  const encoding = "utf8";
  try {
    const texto = await fs.promises.readFile(caminhoArquivo, encoding);
    console.log(chalk.green(texto));
  } catch (e) {
    trataErro(e);
  }
};


pegaArquivo("./arquivos/texto.md");

//\[[^[\]]*?\]