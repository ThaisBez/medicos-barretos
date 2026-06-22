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
    preencherFiltros();    
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
function preencherFiltros() {
  const locais = [...new Set(medicos.map(m => m.local))];
  const especialidades = [...new Set(medicos.map(m => m.especialidade))];
  const periodos = [...new Set(medicos.map(m => m.periodo))];

  const selectLocal = document.getElementById("local");
  const selectEsp = document.getElementById("especialidade");
  const selectPer = document.getElementById("periodo");

  locais.forEach(l => {
    selectLocal.innerHTML += `<option value="${l}">${l}</option>`;
  });

  especialidades.forEach(e => {
    selectEsp.innerHTML += `<option value="${e}">${e}</option>`;
  });

  periodos.forEach(p => {
    selectPer.innerHTML += `<option value="${p}">${p}</option>`;
  });
}
