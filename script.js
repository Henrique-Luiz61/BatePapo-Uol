axios.defaults.headers.common['Authorization'] = '6AlzkLnRo7HrS9cnR1nnYTRU';

let nomeUsuario = prompt('Qual é o seu nome ?');
let mensagens = [];

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

const mensagem = {
    from: nomeUsuario,
    to: "Todos",
    text: "entra na sala...",
    type: "message"
}

mensagens.push(mensagem);
console.log(mensagens);

const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', mensagem);
promessa.then(respostaMensagem);
promessa.catch(erroEntrarNaSala);


function respostaMensagem(respMensagem) {
    const entrar = respMensagem;
    console.log(respMensagem);
}

function erroEntrarNaSala(erroEntrar) {
    console.log(erroEntrar.data);
}

const promessaGet = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
promessaGet.then(respostaGet); 

function respostaGet(respGet) {
    console.log(respGet.data);
}

function enviarMensagem() {
    let mensagem = document.querySelector('input').value;
    console.log(mensagem);
    let objetoMensagem = {
        from: nomeUsuario,
        to: "Todos",
        text: mensagem,
        type: "message"
    }
}

function verificaOnline() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', objetoNomeUsuario);
    promessa.then(retornaOnline);
    promessa.catch(erroOnline);
}

function retornaOnline(respostaOnline) {
    console.log(respostaOnline.data);
}

function erroOnline(offline) {
    console.log(offline);
}

setInterval(verificaOnline, 5000);

function renderizarMensagens() {
    const divNotificacoes = document.querySelector('.notificacoes');
    divNotificacoes.innerHTML = '';

    for (let i = 0; i < mensagens.length; i++) {
        let mensagemRecebida = mensagens[i];

        divNotificacoes.innerHTML += 
        `<div data-test="message" class="sala">
            <h5>(09:21:45)</h5>
            <p>${mensagemRecebida.from}</p>
            <h4>entra na sala...</h4>
        </div>`;
    }
}
renderizarMensagens();