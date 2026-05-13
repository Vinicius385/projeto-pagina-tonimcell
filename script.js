/* PRODUTOS — dados e renderização */
const accProdutos = [
  {
    nome: "Capinha",
    desc: "Proteção e estilo no dia a dia",
    cat: "capinhas",
    badge: "Novo",
    img: "public/img-capas.png",
  },
  {
    nome: "Película",
    desc: "Proteção extra para sua tela",
    cat: "peliculas",
    badge: "Novo",
    img: "public/img-pelicula.png",
  },
  {
    nome: "Carregador Turbo",
    desc: "Carregamento rápido e eficiente",
    cat: "carregadores",
    badge: "Mais Vendido",
    img: "public/img-carregador.png",
  },
  {
    nome: "Fone Bluetooth",
    desc: "Som imersivo sem fios",
    cat: "fones",
    badge: null,
    img: "public/img-fone.png",
  },
  {
    nome: "Suporte Veicular",
    desc: "Segurança e praticidade ao dirigir",
    cat: "peliculas",
    badge: "Promoção",
    img: "public/img-suporte-veicular.png",
  },
  {
    nome: "Cabo USB",
    desc: "Resistência e conexão estável",
    cat: "carregadores",
    badge: null,
    img: "public/img-cabo.png",
  },
  {
    nome: "Caixa de Som",
    desc: "Grave potente e som de qualidade",
    cat: "fones",
    badge: null,
    img: "public/img-caixa-som.png",
  },
  {
    nome: "Copo Térmico",
    desc: "Bebida gelada ou quente por mais tempo",
    cat: "peliculas",
    badge: null,
    img: "public/img-copo-termico.png",
  },
];

function renderAccCards(cat) {
  const grid = document.getElementById("accCardsGrid");
  const lista =
    cat === "all" ? accProdutos : accProdutos.filter((p) => p.cat === cat);
  grid.innerHTML = lista
    .map(
      (p) => `
    <div class="acc-card">
      <div class="acc-card-img">
        <img src="${p.img}" alt="${p.nome}" loading="lazy" />
        ${p.badge ? `<span class="acc-card-badge">${p.badge}</span>` : ""}
      </div>
      <div class="acc-card-info">
        <h4>${p.nome}</h4>
        <p>${p.desc}</p>
        <button class="acc-card-btn" onclick="accWhatsApp('${p.nome}')">Comprar</button>
      </div>
    </div>
  `,
    )
    .join("");

  grid.querySelectorAll(".acc-card").forEach((c, i) => {
    c.style.opacity = "0";
    c.style.transform = "translateY(18px)";
    c.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        c.style.opacity = "1";
        c.style.transform = "translateY(0)";
      }),
    );
  });
}

function accWhatsApp(nome) {
  const msg = encodeURIComponent(`Olá! Tenho interesse no produto: ${nome}`);
  window.open(`https://wa.me/5534998853804?text=${msg}`, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  renderAccCards("all");
  document.querySelectorAll(".acc-cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".acc-cat-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderAccCards(btn.dataset.cat);
    });
  });
});

/* CURSOR */
const cur = document.getElementById("cursor");
document.addEventListener("mousemove", (e) => {
  cur.style.left = e.clientX + "px";
  cur.style.top = e.clientY + "px";
});
document.querySelectorAll("a,button,.acc-item,.service-card").forEach((el) => {
  el.addEventListener("mouseenter", () => cur.classList.add("big"));
  el.addEventListener("mouseleave", () => cur.classList.remove("big"));
});

/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 },
);
reveals.forEach((r) => obs.observe(r));

/* NAV SCROLL */
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  nav.style.borderBottomColor = window.scrollY > 40 ? "#00e67635" : "#00e67620";
});

/* PHONE MASK */
const telInput = document.getElementById("f-tel");
telInput.addEventListener("input", function () {
  let v = this.value.replace(/\D/g, "");
  if (v.length <= 10) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  else v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  this.value = v.trim().replace(/-$/, "");
});

/* ENVIAR ORÇAMENTO */
function enviarOrcamento() {
  const nome = document.getElementById("f-nome").value.trim();
  const tel = document.getElementById("f-tel").value.trim();
  const modelo = document.getElementById("f-modelo").value.trim();
  const tipo = document.getElementById("f-tipo").value;
  const desc = document.getElementById("f-desc").value.trim();

  if (!nome || !tel || !modelo || !desc) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const msg = `Olá! Gostaria de solicitar um orçamento👋\n\n*Nome:* ${nome}\n*Telefone:* ${tel}\n*Modelo do aparelho:* ${modelo}\n*Tipo de serviço:* ${tipo || "Não informado"}\n*Descrição do problema:*\n${desc}`;
  const url = "https://wa.me/5534998853804?text=" + encodeURIComponent(msg);

  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);

  setTimeout(() => window.open(url, "_blank"), 600);
}

/* STAGGER SERVICES */
document.querySelectorAll(".service-card").forEach((c, i) => {
  c.style.transitionDelay = i * 0.07 + "s";
  c.style.opacity = "0";
  c.style.transform = "translateY(20px)";
  c.style.transition = "opacity .5s ease, transform .5s ease, background .3s";
});
const sgObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        document.querySelectorAll(".service-card").forEach((c) => {
          c.style.opacity = "1";
          c.style.transform = "translateY(0)";
        });
        sgObs.disconnect();
      }
    });
  },
  { threshold: 0.1 },
);
const sg = document.querySelector(".services-grid");
if (sg) sgObs.observe(sg);
