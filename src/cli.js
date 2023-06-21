import chalk from "chalk";
import fs from "fs";
import pegaArquivo from "./index.js";

const caminho = process.argv;

const processaArquivo = async (caminho) => {
    const links = await pegaArquivo(caminho[2])
    console.log(chalk.yellow("lista de links"),links)
}


processaArquivo(caminho)