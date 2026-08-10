const cardapioSemanal = {
  terca: [
    { id: 101, nome: "Opção 1: Bife Acebolado", preco: 25.00, desc: "Acompanha arroz, feijão, farofa e salada da casa." },
    { id: 102, nome: "Opção 2: Frango Grelhado com Ervas", preco: 23.00, desc: "Acompanha arroz integral, purê de batata e legumes." }
  ],
  quarta: [
    { id: 201, nome: "Opção 1: Feijoada Tradicional", preco: 32.00, desc: "Acompanha couve refogada, farofa, torresmo e laranja." },
    { id: 202, nome: "Opção 2: Filé de Peixe Empanado", preco: 27.00, desc: "Acompanha arroz, pirão e salada de tomate." }
  ],
  quinta: [
    { id: 301, nome: "Opção 1: Massa à Parmegiana", preco: 29.00, desc: "Filé frango à parmegiana com espaguete ao molho sugo." },
    { id: 302, nome: "Opção 2: Strogonoff de Carne", preco: 26.00, desc: "Acompanha arroz branco e batata palha artesanal." }
  ],
  sexta: [
    { id: 401, nome: "Opção 1: Costela Assada no Bafão", preco: 35.00, desc: "Acompanha mandioca na manteiga, arroz e vinagrete." },
    { id: 402, nome: "Opção 2: Escondidinho de Carne Seca", preco: 28.00, desc: "Purê de mandioca gratinado com queijo coalho." }
  ],
  sabado: [
    { id: 501, nome: "Opção 1: Moqueca de Peixe", preco: 42.00, desc: "Servida na panela de barro com arroz e farofa de dendê." },
    { id: 502, nome: "Opção 2: Risoto de Cogumelos", preco: 38.00, desc: "Opção vegetariana com cogumelos frescos e parmesão." }
  ],
  domingo: [
    { id: 601, nome: "Opção 1: Frango Assado de Televisão", preco: 30.00, desc: "Acompanha farofa de miúdos e batatas coradas." },
    { id: 602, nome: "Opção 2: Lasanha à Bolonhesa", preco: 32.00, desc: "Massa artesanal intercalada com molho caseiro e queijo." }
  ]
};

let carrinho = [];

// Elementos do DOM
const containerCardapio = document.getElementById("cardapio");
const containerCarrinho = document.getElementById("itens-carrinho");
const totalElemento = document.getElementById("total-valor");
const botoesDia = document.querySelectorAll(".btn-dia");

// Lógica de Renderização do Cardápio
function exibirPratosDoDia(dia) {
  if (!containerCardapio) return;

  containerCardapio.innerHTML = "";
  const pratosDoDia = cardapioSemanal[dia] || [];

  pratosDoDia.forEach(prato => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div>
        <h3>${prato.nome}</h3>
        <p>${prato.desc}</p>
      </div>
      <div>
        <div class="preco">R$ ${prato.preco.toFixed(2).replace('.', ',')}</div>
      </div>
    `;
    containerCardapio.appendChild(card);
  });
}

if (botoesDia.length > 0) {
  botoesDia.forEach(botao => {
    botao.addEventListener("click", () => {
      botoesDia.forEach(b => b.classList.remove("active"));
      botao.classList.add("active");

      const diaSelecionado = botao.getAttribute("data-dia");
      exibirPratosDoDia(diaSelecionado);
    });
  });
}

function adicionarAoCarrinho(dia, id) {
  const pratoEncontrado = cardapioSemanal[dia].find(p => p.id === id);
  if (pratoEncontrado) {
    carrinho.push(pratoEncontrado);
    atualizarCarrinho();
  }
}

function atualizarCarrinho() {
  if (!containerCarrinho || !totalElemento) return;

  containerCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    total += item.preco;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome}
      R$ ${item.preco.toFixed(2).replace('.', ',')}
    `;
    containerCarrinho.appendChild(li);
  });

  totalElemento.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

if (containerCardapio) {
  exibirPratosDoDia("terca");
}

// --- Lógica do Carrossel Automático ---
let slideIndex = 0;
let carouselInterval = null;

function alternarSlides() {
  const slides = document.querySelectorAll(".carousel-slide");

  if (slides.length === 0) return;

  slides.forEach(slide => slide.classList.remove("active"));

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].classList.add("active");
}

function iniciarCarrossel() {
  const slides = document.querySelectorAll(".carousel-slide");
  if (slides.length > 0) {
    slideIndex = 0;
    alternarSlides();

    if (carouselInterval) clearInterval(carouselInterval);
    carouselInterval = setInterval(alternarSlides, 4000);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarCarrossel);
} else {
  iniciarCarrossel();
}