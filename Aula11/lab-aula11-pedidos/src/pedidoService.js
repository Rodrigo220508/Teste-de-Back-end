
const {
    ErroValidacao,
    ErroNaoEncontrado,
    ErroConflito,
    ErroServicoIndisponivel
} = require("./erros");

const { comRetry, comTimeout } = require("./resiliencia");

class PedidoService {
    constructor(repository, timeoutMs = 1000) {
        this.repository = repository;
        this.timeoutMs = timeoutMs;
    }

    async criarPedido(dados) {
        if (!dados || !dados.cliente) {
            throw new ErroValidacao("Cliente é obrigatório");
        }

        if (!Number.isFinite(dados.quantidade) || dados.quantidade <= 0) {
            throw new ErroValidacao("Quantidade inválida");
        }

        try {
            const existente = await this.repository.buscarPorId(dados.id);

            if (existente) {
                throw new ErroConflito("Pedido já cadastrado");
            }

            return await this.repository.salvar(dados);
        } catch (erro) {
            if (erro.status) {
                throw erro;
            }

            throw new ErroServicoIndisponivel();
        }
    }

    async buscarPedido(id) {
        try {
            const pedido = await comRetry(
                () => comTimeout(
                    this.repository.buscarPorId(id),
                    this.timeoutMs
                ),
                3
            );

            if (!pedido) {
                throw new ErroNaoEncontrado();
            }

            return pedido;
        } catch (erro) {
            if (erro.status === 404) {
                throw erro;
            }

            throw new ErroServicoIndisponivel();
        }
    }
}

module.exports = { PedidoService };
