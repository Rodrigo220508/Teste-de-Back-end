
class PedidoRepository {
  constructor() {
    this.pedidos = [];
    this.bancoDisponivel = true;
    this.falhasRestantes = 0;
  }

  async salvar(pedido) {
    this.verificarBanco();

    const existente = this.pedidos.find(
      (item) => item.id === pedido.id
    );

    if (existente) {
      return existente;
    }

    this.pedidos.push(pedido);
    return pedido;
  }

  async buscarPorId(id) {
    this.verificarBanco();

    return this.pedidos.find(
      (pedido) => pedido.id === id
    ) || null;
  }

  verificarBanco() {
    if (!this.bancoDisponivel) {
      throw new Error("Banco de dados indisponível");
    }

    if (this.falhasRestantes > 0) {
      this.falhasRestantes--;
      throw new Error("Falha temporária no banco de dados");
    }
  }

  definirBancoDisponivel(disponivel) {
    this.bancoDisponivel = disponivel;
  }

  definirFalhasRestantes(quantidade) {
    this.falhasRestantes = quantidade;
  }

  limpar() {
    this.pedidos = [];
    this.bancoDisponivel = true;
    this.falhasRestantes = 0;
  }
}

module.exports = { PedidoRepository };
