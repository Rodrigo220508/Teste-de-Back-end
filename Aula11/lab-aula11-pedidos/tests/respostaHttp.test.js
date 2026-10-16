const { paraRespostaHttp } = require("../src/respostaHttp");

describe("paraRespostaHttp", () => {
  test("retorna o status e a mensagem do erro", () => {
    const erro = new Error("Cliente é obrigatório");
    erro.status = 400;

    const resposta = paraRespostaHttp(erro, "teste-1");

    expect(resposta.status).toBe(400);
    expect(resposta.corpo.mensagem).toBe("Cliente é obrigatório");
  });

  test("erros inesperados retornam 500", () => {
    const erro = new Error("Erro secreto");
    const resposta = paraRespostaHttp(erro, "teste-2");

    expect(resposta.status).toBe(500);
    expect(resposta.corpo.mensagem).toBe("Erro interno do servidor");
    expect(resposta.corpo.mensagem).not.toContain("Erro secreto");
  });
});