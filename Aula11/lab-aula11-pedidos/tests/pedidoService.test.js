const { PedidoRepository } = require("../src/pedidoRepository");
const { PedidoService } = require("../src/pedidoService");

describe("PedidoService", () => {
    let repo;
    let service;

    beforeEach(() => {
        repo = new PedidoRepository();
        service = new PedidoService(repo);
    });

    test("cria um pedido válido", async () => {
        const pedido = {
            id: 1, cliente: "Rodrigo", quantidade: 2
        };
        await expect(service.criarPedido(pedido))
            .resolves.toEqual(pedido);
    });

    test("rejeita cliente ausente", async () => {
        await expect(service.criarPedido({
            id: 1, quantidade: 2
        })).rejects.toThrow("Cliente é obrigatório");
    });

    test("rejeita quantidade inválida", async () => {
        await expect(service.criarPedido({
            id: 1, cliente: "Rodrigo", quantidade: 0
        })).rejects.toThrow("Quantidade inválida");
    });

    test("rejeita pedido duplicado", async () => {
        const pedido = {
            id: 1, cliente: "Rodrigo", quantidade: 2
        };
        await service.criarPedido(pedido);

        await expect(service.criarPedido(pedido))
            .rejects.toThrow("Pedido já cadastrado");
    });

    test("encontra um pedido existente", async () => {
        await service.criarPedido({
            id: 1, cliente: "Rodrigo", quantidade: 2
        });
        await expect(service.buscarPedido(1))
            .resolves.toMatchObject({ id: 1 });
    });

    test("retorna erro para pedido inexistente", async () => {
        await expect(service.buscarPedido(99))
            .rejects.toThrow("Pedido não encontrado");
    });

    test("retorna erro se o banco estiver indisponível", async () => {
        repo.definirBancoDisponivel(false);
        await expect(service.buscarPedido(1))
            .rejects.toThrow("Serviço temporariamente indisponível");
    });

    test("repete a busca quando ocorre falha temporária", async () => {
        await service.criarPedido({
            id: 1,
            cliente: "Rodrigo",
            quantidade: 2
        });

        repo.definirFalhasRestantes(2);

        await expect(service.buscarPedido(1))
            .resolves.toMatchObject({ id: 1 });
    });

      test("retorna erro quando o repositório não responde", async () => {
    const repositorioTravado = {
      buscarPorId: jest.fn(
        () => new Promise(() => {})
      )
    };

    const serviceComTimeout = new PedidoService(
      repositorioTravado,
      50
    );

    await expect(
      serviceComTimeout.buscarPedido(1)
    ).rejects.toThrow("Serviço temporariamente indisponível");

    expect(repositorioTravado.buscarPorId).toHaveBeenCalledTimes(3);
  });
});