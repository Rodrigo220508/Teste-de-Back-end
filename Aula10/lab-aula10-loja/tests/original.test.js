const {
  buscarProdutos,
  calcularPrecoFinal
} = require("../src/produtos");

test("CT-01: busca produtos pelo termo mouse", () => {
  const produtos = [
    { id: 1, nome: "Mouse Gamer" },
    { id: 2, nome: "Teclado" },
    { id: 3, nome: "Mouse sem fio" }
  ];

  const resultado = buscarProdutos(produtos, "mouse");

  expect(resultado.map((p) => p.id)).toEqual([1, 3]);
});

test("CT-02: aplica desconto DESC10", () => {
  expect(calcularPrecoFinal(100, "DESC10")).toBe(90);
});
