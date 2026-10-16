
const { comRetry, comTimeout } = require("../src/resiliencia");

describe("Resiliência", () => {
  test("repete a operação até conseguir", async () => {
    let tentativas = 0;

    const resultado = await comRetry(async () => {
      tentativas++;

      if (tentativas < 3) {
        throw new Error("Falha temporária");
      }

      return "Sucesso";
    });

    expect(resultado).toBe("Sucesso");
    expect(tentativas).toBe(3);
  });

  test("falha depois do limite de tentativas", async () => {
    let tentativas = 0;

    await expect(
      comRetry(async () => {
        tentativas++;
        throw new Error("Banco indisponível");
      }, 3)
    ).rejects.toThrow("Banco indisponível");

    expect(tentativas).toBe(3);
  });

  test("encerra quando ultrapassa o tempo limite", async () => {
    await expect(
      comTimeout(
        new Promise((resolve) => setTimeout(resolve, 100)),
        10
      )
    ).rejects.toThrow("Tempo limite excedido");
  });
});
