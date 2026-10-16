
async function comRetry(operacao, maxTentativas = 3) {
  let ultimoErro;

  for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
    try {
      return await operacao();
    } catch (erro) {
      ultimoErro = erro;

      if (tentativa === maxTentativas) {
        throw ultimoErro;
      }
    }
  }

  throw ultimoErro;
}

function comTimeout(promessa, ms = 1000) {
  let temporizador;

  const timeout = new Promise((_, rejeitar) => {
    temporizador = setTimeout(() => {
      rejeitar(new Error("Tempo limite excedido"));
    }, ms);
  });

  return Promise.race([promessa, timeout]).finally(() => {
    clearTimeout(temporizador);
  });
}

module.exports = {
  comRetry,
  comTimeout
};
