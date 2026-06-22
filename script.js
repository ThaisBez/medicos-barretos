fetch("dadosmedico.csv")
  .then(resposta => resposta.text())
  .then(texto => {
    console.log(texto);
  })
  .catch(erro => {
    console.error("Erro ao carregar o CSV:", erro);
  });
