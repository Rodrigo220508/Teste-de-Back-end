
function buscarProdutos(produtos, termo) {
  const termoNormalizado = termo.toLowerCase();
  const resultado = [];
  const idsIncluidos = new Set();

  for (const produto of produtos) {
    if (produto.nome.toLowerCase().includes(termoNormalizado)) {
      if (!idsIncluidos.has(produto.id)) {
        idsIncluidos.add(produto.id);
        resultado.push(produto);
      }
    }
  }

  return resultado;
}

function calcularPrecoFinal(preco, cupom) {
  if (preco <= 0) {
    throw new Error("Preço inválido");
  }

  if (cupom === "DESC10") {
    return preco * 0.9;
  }

  if (cupom === "DESC20" && preco >= 200) {
    return preco * 0.8;
  }

  return preco;
}

function estoqueBaixo(produto) {
  return produto.estoque < 5;
}

module.exports = {
  buscarProdutos,
  calcularPrecoFinal,
  estoqueBaixo
};
