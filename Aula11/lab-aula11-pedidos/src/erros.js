
class ErroAplicacao extends Error {
  constructor(mensagem, status = 500) {
    super(mensagem);
    this.name = this.constructor.name;
    this.status = status;
  }
}

class ErroValidacao extends ErroAplicacao {
  constructor(mensagem) {
    super(mensagem, 400);
  }
}

class ErroNaoEncontrado extends ErroAplicacao {
  constructor(mensagem = "Pedido não encontrado") {
    super(mensagem, 404);
  }
}

class ErroConflito extends ErroAplicacao {
  constructor(mensagem = "Pedido já cadastrado") {
    super(mensagem, 409);
  }
}

class ErroServicoIndisponivel extends ErroAplicacao {
  constructor(mensagem = "Serviço temporariamente indisponível") {
    super(mensagem, 503);
  }
}

module.exports = {
  ErroAplicacao,
  ErroValidacao,
  ErroNaoEncontrado,
  ErroConflito,
  ErroServicoIndisponivel
};
