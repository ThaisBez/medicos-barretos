let medicos = [];

fetch("dadosmedico.csv")
  .then(resposta => resposta.text())
  .then(texto => {

    const linhas = texto.split("\n");
    linhas.shift(); // remove cabeçalho

    medicos = linhas
      .filter(l => l.trim() !== "")
      .map(linha => {
        const colunas = linha.split(";");

        return {
          local: colunas[0]?.trim(),
          medico: colunas[3]?.trim(),
          especialidade: colunas[4]?.trim(),
          periodo: colunas[6]?.trim(),
          entrada: colunas[7]?.trim(),
          saida: colunas[8]?.trim()
        };
      });

    mostrarTabela(medicos);
  })
  .catch(erro => console.error(erro));


function mostrarTabela(lista) {
  const tbody = document.querySelector("#resultado tbody");
  tbody.innerHTML = "";

  lista.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.local}</td>
        <td>${item.medico}</td>
        <td>${item.especialidade}</td>
        <td>${item.periodo}</td>
        <td>${item.entrada} - ${item.saida}</td>
      </tr>
    `;
  });
}
