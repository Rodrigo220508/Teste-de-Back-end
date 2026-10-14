const { somar, subtrair, verificarIdade } = require('../src/calculadora');

describe('Testes da Calculadora', () => {
    test('Deve somar 2 + 3 e retornar 5', () => {
        expect(somar(2, 3)).toBe(5);
    });

    test('Deve subtrair 5 - 2 e retornar 3', () => {
        expect(subtrair(5, 2)).toBe(3);
    });

    test('Deve verificar que 20 anos é maior de idade', () => {
        expect(verificarIdade(20)).toBe('Maior de idade');
    });

    test('Deve verificar que 16 anos é menor de idade', () => {
        expect(verificarIdade(16)).toBe('Menor de idade');
    });
});