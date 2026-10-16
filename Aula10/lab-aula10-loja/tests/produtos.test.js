const {
  buscarProdutos,
  calcularPrecoFinal,
  estoqueBaixo
} = require("../src/produtos");

describe("Busca de produtos", () => {
  test("encontra produtos pelo nome ignorando mai?sculas e min?sculas", () => {
    const produtos = [
      { id: 1, nome: "Teclado" },
      { id: 2, nome: "Mouse" }
    ];

    expect(buscarProdutos(produtos, "teclado")).toEqual([produtos[0]]);
  });

  test("retorna uma lista vazia quando n?o encontra produtos", () => {
    expect(buscarProdutos([{ id: 1, nome: "Mouse" }], "celular")).toEqual([]);
  });

  test("n?o duplica produtos com o mesmo id", () => {
    const produto = { id: 1, nome: "Mouse Gamer" };

    expect(buscarProdutos([produto, produto], "mouse")).toEqual([produto]);
  });

  test("retorna lista vazia quando n?o h? produtos", () => {
    expect(buscarProdutos([], "mouse")).toEqual([]);
  });
});

describe("C?lculo do pre?o final", () => {
  test("aplica desconto de 10%", () => {
    expect(calcularPrecoFinal(100, "DESC10")).toBe(90);
  });

  test("aplica desconto de 20% para pre?o de 200 reais ou mais", () => {
    expect(calcularPrecoFinal(200, "DESC20")).toBe(160);
  });

  test("n?o aplica DESC20 quando o pre?o ? menor que 200", () => {
    expect(calcularPrecoFinal(100, "DESC20")).toBe(100);
  });

  test("mant?m o pre?o quando o cupom ? desconhecido", () => {
    expect(calcularPrecoFinal(100, "INVALIDO")).toBe(100);
  });

  test("mant?m o pre?o quando n?o h? cupom", () => {
    expect(calcularPrecoFinal(100, null)).toBe(100);
  });

  test("rejeita pre?o igual a zero", () => {
    expect(() => calcularPrecoFinal(0, "DESC10")).toThrow(/inv.lido/);
  });

  test("rejeita pre?o negativo", () => {
    expect(() => calcularPrecoFinal(-10, "DESC10")).toThrow(/inv.lido/);
  });
});

describe("Verifica??o de estoque", () => {
  test("identifica estoque abaixo de 5", () => {
    expect(estoqueBaixo({ estoque: 3 })).toBe(true);
  });

  test("considera estoque igual a 5 como n?o baixo", () => {
    expect(estoqueBaixo({ estoque: 5 })).toBe(false);
  });

  test("considera estoque acima de 5 como n?o baixo", () => {
    expect(estoqueBaixo({ estoque: 10 })).toBe(false);
  });
});

