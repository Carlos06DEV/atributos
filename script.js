// script.js

// Variável para armazenar os pontos disponíveis
let availablePoints = 7;

// Função para atualizar os pontos disponíveis na tela
function updateAvailablePoints() {
  document.getElementById('available-points').textContent = availablePoints;
}

// Função para alterar os pontos de um atributo
function changePoints(attributeId, amount) {
  const attributeElement = document.getElementById(attributeId);
  let currentPoints = parseInt(attributeElement.textContent);

  // Verifica se há pontos suficientes para adicionar/remover
  if (amount > 0 && availablePoints <= 0) {
    alert('Você não tem mais pontos disponíveis!');
    return;
  }
  if (amount < 0 && currentPoints <= 0) {
    alert('Você não pode reduzir este atributo abaixo de zero!');
    return;
  }

  // Atualiza os pontos do atributo e os pontos disponíveis
  attributeElement.textContent = currentPoints + amount;
  availablePoints -= amount;
  updateAvailablePoints();
}

// Inicializa os pontos disponíveis na tela
updateAvailablePoints();

// Função para salvar a ficha no banco de dados
function saveFicha() {
    let classe = localStorage.getItem('classe');
    let raca = localStorage.getItem('raca');
    let magia = localStorage.getItem('magia');
    let pericias = JSON.parse(localStorage.getItem('pericias'));

    const nome = prompt("Digite o nome do personagem:");
    if (!nome) {
      alert("O nome é obrigatório!");
      return;
  }
    const idade = prompt("Digite a idade do personagem:");
    if (!idade) {
      alert("A idade é obrigatório!");
      return;
  }
    const sexo = prompt("Digite o genero do personagem:");
    if (!sexo) {
      alert("O genero é obrigatório!");
      return;
  }

    localStorage.setItem('nome', nome);
    localStorage.setItem('idade', idade);
    localStorage.setItem('sexo', sexo);
  
    // Obtém os valores dos atributos
    const forca = parseInt(document.getElementById('strength').textContent);
    const destreza = parseInt(document.getElementById('dexterity').textContent);
    const inteligencia = parseInt(document.getElementById('intelligence').textContent);
    const constituicao = parseInt(document.getElementById('constituicao').textContent);
    const sabedoria = parseInt(document.getElementById('Sabedoria').textContent);
    const carisma = parseInt(document.getElementById('Carisma').textContent);
    
    localStorage.setItem('forca', forca);
    localStorage.setItem('destreza', destreza);
    localStorage.setItem('inteligencia', inteligencia);
    localStorage.setItem('constituicao', constituicao);
    localStorage.setItem('sabedoria', sabedoria);
    localStorage.setItem('carisma', carisma);

    // Envia os dados para o backend via POST
    fetch('https://7f6c52d9c45c.ngrok-free.app/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        classe: classe,
        raca: raca,
        sexo: sexo,
        idade: idade,
        forca: forca,
        destreza: destreza,
        inteligencia: inteligencia,
        constituicao: constituicao,
        sabedoria: sabedoria,
        carisma: carisma,
        magia: magia,
        pericias: pericias,
      }),
      mode: 'cors'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao salvar a ficha: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        alert(data.message || 'Erro ao salvar a ficha.');
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao salvar a ficha.');
      });
  window.location.href = "https://carlos06dev.github.io/pag_final/";
  }

