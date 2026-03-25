document.addEventListener('DOMContentLoaded', () => {

  // ================= CEP =================
  document.getElementById('cep').addEventListener('blur', (evento) => {
    const elemento = evento.target;
    const cep = elemento.value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cep.length !== 8) return;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById('logradouro').value = data.logradouro;
          document.getElementById('bairro').value = data.bairro;
          document.getElementById('cidade').value = data.localidade;
          document.getElementById('estado').value = data.uf;

          salvarDados(); // 🔥 salva automático após preencher
        } else {
          alert('CEP não encontrado');
        }
      })
      .catch(error => console.error(error));
  });

  // ================= STORAGE =================
  const campos = document.querySelectorAll('input');

  campos.forEach(campo => {
    campo.addEventListener('input', salvarDados);
  });

  function salvarDados() {
    const dados = {};

    campos.forEach(campo => {
      dados[campo.id] = campo.value;
    });

    localStorage.setItem('formulario', JSON.stringify(dados));
  }

  // ================= RECUPERAR =================
  const dados = JSON.parse(localStorage.getItem('formulario'));

  if (!dados) return;

  Object.keys(dados).forEach(id => {
    const campo = document.getElementById(id);
    if (campo) {
      campo.value = dados[id];
    }
  });

});