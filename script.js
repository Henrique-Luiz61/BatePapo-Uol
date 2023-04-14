axios.defaults.headers.common['Authorization'] = '6AlzkLnRo7HrS9cnR1nnYTRU';

let nomeUsuario = prompt('Qual é o seu nome ?');

const objetoNomeUsuario = {
    name: nomeUsuario
};

const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', objetoNomeUsuario);
promise.then(retornarResposta);
promise.catch(deuErro);

function retornarResposta(resposta) {
    console.log(resposta.data);
}

function deuErro(erro) {
    console.log(erro);
}

function verificaOnline() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', objetoNomeUsuario);
    promessa.then(retornaOnline);
}

function retornaOnline(respostaOnline) {
    console.log(respostaOnline.data);
}

setInterval(verificaOnline, 5000);