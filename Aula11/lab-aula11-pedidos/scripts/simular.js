
const { PedidoRepository } = require("../src/pedidoRepository");
const { PedidoService } = require("../src/pedidoService");
const { paraRespostaHttp } = require("../src/respostaHttp");

async function executar() {
  const repository = new PedidoRepository();
  const service = new PedidoService(repository);

  async function mostrar(nome, operacao) {
    try {
      const resultado = await operacao();
      console.log(`\n${nome}`);
      console.log("Status:", nome.startsWith("POST") ? 201 : 200);
      console.log("Resposta:", resultado);
    } catch (erro) {
      const resposta = paraRespostaHttp(erro, "simulacao-aula11");
      console.log(`\n${nome}`);
      console.log("Status:", resposta.status);
      console.log("Resposta:", resposta.corpo);
    }
  }

  await mostrar("POST pedido 1", () =>
    service.criarPedido({ id: 1, cliente: "Rodrigo", quantidade: 2 })
  );

  await mostrar("POST pedido 1 novamente", () =>
    service.criarPedido({ id: 1, cliente: "Rodrigo", quantidade: 2 })
  );

  await mostrar("POST quantidade 0", () =>
    service.criarPedido({ id: 2, cliente: "Leonardo", quantidade: 0 })
  );

  await mostrar("GET pedido 1", () => service.buscarPedido(1));

  await mostrar("GET pedido 99", () => service.buscarPedido(99));

  repository.definirBancoDisponivel(false);

  await mostrar("GET pedido 1 com banco indisponível", () =>
    service.buscarPedido(1)
  );
}

executar().catch((erro) => {
  console.error("Falha na simulação:", erro);
  process.exitCode = 1;
});
