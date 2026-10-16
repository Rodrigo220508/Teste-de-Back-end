
function paraRespostaHttp(erro, idRastreio = "sem-id") {
  // O erro completo fica no log do servidor.
  console.error("Erro na aplicação:", erro);

  // Erros conhecidos podem informar seu próprio status.
  if (Number.isInteger(erro.status)) {
    return {
      status: erro.status,
      corpo: {
        mensagem: erro.message,
        idRastreio
      }
    };
  }

  // Erros inesperados não devem expor detalhes internos.
  return {
    status: 500,
    corpo: {
      mensagem: "Erro interno do servidor",
      idRastreio
    }
  };
}

module.exports = { paraRespostaHttp };
