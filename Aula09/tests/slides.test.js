
const { validarEmprestimo } = require('../src/emprestimo');

test('aprova empréstimo válido', () => {
    expect(validarEmprestimo(3000, 30, 600)).toBe(true);
});

test('rejeita idade inferior a 18', () => {
    expect(validarEmprestimo(3000, 17, 600)).toBe(false);
});

test('rejeita parcela acima de 30%', () => {
    expect(validarEmprestimo(3000, 30, 1000)).toBe(false);
});
