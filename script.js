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
    alert("A idade é obrigatória!");
    return;
  }
  const sexo = prompt("Digite o gênero do personagem:");
  if (!sexo) {
    alert("O gênero é obrigatório!");
    return;
  }

  localStorage.setItem('nome', nome);
  localStorage.setItem('idade', idade);
  localStorage.setItem('sexo', sexo);

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

  // ✅ URL SEM ESPAÇOS!
  console.log({
    nome, classe, raca, sexo, idade,
    forca, destreza, inteligencia, constituicao, sabedoria, carisma,
    magia, pericias
  });
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
    alert(data.message || 'Ficha salva com sucesso!');
    // ✅ URL SEM ESPAÇOS!
    window.location.href = "https://carlos06dev.github.io/pag_final/";
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('Erro ao salvar a ficha.');
  });
}
