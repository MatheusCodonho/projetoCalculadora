function adicionarValor(valor) {
    const display = document.getElementById('display');
    display.value += valor;
    atualizarBotaoLimpar();
}

function limparOuLimparTudo() {
    const display = document.getElementById('display');
    if (display.value === '') {
        limparHistorico();
    } else {
        display.value = '';
    }
    atualizarBotaoLimpar();
    atualizarHistorico('');
}

function apagar() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
    atualizarBotaoLimpar();
}

function aplicarPorcentagem() {
    const display = document.getElementById('display');
    const valor = display.value;

    const match = valor.match(/(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)$/);
    if (match) {
        const anterior = parseFloat(match[1]);
        const operador = match[3];
        const atual = parseFloat(match[4]);

        const porcentagem = anterior * (atual / 100);
        const novoValor = valor.replace(/(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)$/, `${anterior}${operador}${porcentagem}`);
        display.value = novoValor;
    }
    atualizarBotaoLimpar();
}

function calcular() {
    const display = document.getElementById('display');
    const expressao = display.value;

    try {
        const resultado = eval(expressao);
        atualizarHistorico(expressao); // Atualiza a linha superior
        display.value = resultado;
    } catch {
        display.value = 'Erro';
        atualizarHistorico('');
    }
    atualizarBotaoLimpar();
}

function atualizarHistorico(texto) {
    const historico = document.getElementById('historico-superior');
    historico.textContent = texto;
}

function limparHistorico() {
    atualizarHistorico('');
}

function atualizarBotaoLimpar() {
    const display = document.getElementById('display');
    const btn = document.getElementById('btn-clear');
    btn.textContent = display.value === '' ? 'AC' : 'C';
}

window.onload = atualizarBotaoLimpar;
