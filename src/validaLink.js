import chalk from "chalk";

const extraiLinks = (arrLinks) => {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
};

const manejaErro = (e) => {
  if(e.cause.code === "ENOTFOUND"){
    return chalk.red("link não encontrado")
  }else{
    return chalk.red("Ocorreu algum erro")
  }
};
const checaStatus = async (ListaLinks) => {
  const arrStatus = await Promise.all(
    ListaLinks.map(async (url) => {
      try {
        const res = await fetch(url);
        return res.status;
      } catch (e) {
        return manejaErro(e);
      }
    })
  );
  return arrStatus;
};

const listaValidada = async (links) => {
  const lista = extraiLinks(links);
  const status = await checaStatus(lista);

  return links.map((links, i) => ({
    ...links,
    status: status[i],
  }));
};

export default listaValidada;

//[gatinho salsicha](http://gatinhosalsicha.com.br/)
