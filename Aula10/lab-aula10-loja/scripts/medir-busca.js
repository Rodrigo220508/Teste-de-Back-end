const { performance } = require("perf_hooks");
const { buscarProdutos } = require("../src/produtos");

const produtos = Array.from({ length: 20000 }, (_, i) => ({
  id: i + 1,
  nome: i % 2 === 0
    ? `Modelo de Mouse ${i + 1}`
    : `Modelo de Teclado ${i + 1}`,
  preco: 50 + i,
  estoque: i % 10
}));

function medirBusca(termo) {
  const inicio = performance.now();
  const encontrados = buscarProdutos(produtos, termo);
  const fim = performance.now();

  console.log(
    `Busca por "${termo}": ${encontrados.length} produtos encontrados em ${(fim - inicio).toFixed(2)} ms`
  );
}

console.log("Cat?logo: 20.000 produtos");
medirBusca("modelo");
medirBusca("mouse");
