const cardapioSemanal = {
  terca: [
    { id: 101, nome: "Opção 1: Bife Acebolado", preco: 25.00, desc: "Acompanha arroz, feijão, farofa e salada da casa.", foto: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
    { id: 102, nome: "Opção 2: Frango Grelhado com Ervas", preco: 23.00, desc: "Acompanha arroz integral, purê de batata e legumes.", foto: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500" }
  ],
  quarta: [
    { id: 201, nome: "Opção 1: Feijoada Tradicional", preco: 32.00, desc: "Acompanha couve refogada, farofa, torresmo e laranja.", foto: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500" },
    { id: 202, nome: "Opção 2: Filé de Peixe Empanado", preco: 27.00, desc: "Acompanha arroz, pirão e salada de tomate.", foto: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500" }
  ],
  quinta: [
    { id: 301, nome: "Opção 1: Massa à Parmegiana", preco: 29.00, desc: "Filé frango à parmegiana com espaguete ao molho sugo.", foto: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500" },
    { id: 302, nome: "Opção 2: Strogonoff de Carne", preco: 26.00, desc: "Acompanha arroz branco e batata palha artesanal.", foto: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=500" }
  ],
  sexta: [
    { id: 401, nome: "Opção 1: Costela Assada no Bafão", preco: 35.00, desc: "Acompanha mandioca na manteiga, arroz e vinagrete.", foto: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
    { id: 402, nome: "Opção 2: Escondidinho de Carne Seca", preco: 28.00, desc: "Purê de mandioca gratinado com queijo coalho.", foto: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=500" }
  ],
  sabado: [
    { id: 501, nome: "Opção 1: Moqueca de Peixe", preco: 42.00, desc: "Servida na panela de barro com arroz e farofa de dendê.", foto: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500" },
    { id: 502, nome: "Opção 2: Risoto de Cogumelos", preco: 38.00, desc: "Opção vegetariana com cogumelos frescos e parmesão.", foto: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500" }
  ],
  domingo: [
    { id: 601, nome: "Opção 1: Frango Assado de Televisão", preco: 30.00, desc: "Acompanha farofa de miúdos e batatas coradas.", foto: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500" },
    { id: 602, nome: "Opção 2: Lasanha à Bolonhesa", preco: 32.00, desc: "Massa artesanal intercalada com molho caseiro e queijo.", foto: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500" }
  ],
  segunda: [
    { id: 701, nome: "Opção 1: Virado à Paulista", preco: 26.00, desc: "Acompanha arroz, tutú de feijão, couve refogada e bisteca.", foto: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
    { id: 702, nome: "Opção 2: Frango Xadrez", preco: 24.00, desc: "Acompanha arroz branco e salada de pimentões com legumes.", foto: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500" }
  ]
};

let carrinho = [];

const containerCardapio = document.getElementById("cardapio");
const containerCarrinho = document.getElementById("itens-carrinho");
const totalElemento = document.getElementById("total-valor");
const botoesDia = document.querySelectorAll(".btn-dia");

function exibirPratosDoDia(dia) {
  if (!containerCardapio) return;

  containerCardapio.innerHTML = "";
  const pratosDoDia = cardapioSemanal[dia] || [];

  pratosDoDia.forEach(prato => {
    const card = document.createElement("div");
    card.classList.add("card");

    const imgHTML = prato.foto 
      ? `<img src="${prato.foto}" alt="${prato.nome}" class="card-img-prato">` 
      : '';

card.innerHTML = `
  ${imgHTML}
  <div class="card-conteudo">
    <h3>${prato.nome}</h3>
    <p>${prato.desc}</p>
    <div class="preco">R$ ${prato.preco.toFixed(2).replace('.', ',')}</div>
  </div>
`;

    containerCardapio.appendChild(card);
  });
}

const mapaDias = {
  0: "domingo",
  1: "segunda",
  2: "terca",
  3: "quarta",
  4: "quinta",
  5: "sexta",
  6: "sabado"
};

function getDiaAtual() {
  const hoje = new Date().getDay();
  return mapaDias[hoje];
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

if (containerCardapio) {
  const diaHoje = getDiaAtual();

  botoesDia.forEach(botao => {
    if (botao.getAttribute("data-dia") === diaHoje) {
      botao.classList.add("active");
    } else {
      botao.classList.remove("active");
    }
  });

  exibirPratosDoDia(diaHoje);
}

let slideIndex = 0;
let carouselInterval = null;

function mostrarSlide(n) {
  const slides = document.querySelectorAll(".carousel-slide");
  
  if (slides.length === 0) return;

  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach(slide => slide.classList.remove("active"));
  slides[slideIndex].classList.add("active");
}

window.avancarSlide = function() {
  resetarTemporizador();
  slideIndex++;
  mostrarSlide(slideIndex);
};

window.voltarSlide = function() {
  resetarTemporizador();
  slideIndex--;
  mostrarSlide(slideIndex);
};

function cicloAutomatico() {
  slideIndex++;
  mostrarSlide(slideIndex);
}

function iniciarTemporizador() {
  if (carouselInterval) clearInterval(carouselInterval);
  carouselInterval = setInterval(cicloAutomatico, 5000);
}

function resetarTemporizador() {
  clearInterval(carouselInterval);
  iniciarTemporizador();
}

function iniciarCarrossel() {
  const slides = document.querySelectorAll(".carousel-slide");
  if (slides.length > 0) {
    slideIndex = 0;
    mostrarSlide(slideIndex);
    iniciarTemporizador();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarCarrossel);
} else {
  iniciarCarrossel();
}