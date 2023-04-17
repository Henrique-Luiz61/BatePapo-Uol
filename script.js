axios.defaults.headers.common['Authorization'] = '6AlzkLnRo7HrS9cnR1nnYTRU';

let nomeUsuario = prompt('Qual é o seu nome ?');
let mensagens = [];

const objetoNomeUsuario = {
    name: nomeUsuario
};

function renderizarMensagens() {
    const divNotificacoes = document.querySelector('.notificacoes');
    divNotificacoes.innerHTML = '';

    for (let i = 0; i < mensagens.length; i++) {
        let mensagemRecebida = mensagens[i];

        divNotificacoes.innerHTML += 
        `<div data-test="message" class="mensagem">
            <h5>${mensagemRecebida.time}</h5>
            <p>${mensagemRecebida.from}</p>
            <h6>para</h6> 
            <p>${mensagemRecebida.to}</p>
            <h4>${mensagemRecebida.text}</h4>
        </div>`
        ;
    }
}

setinterval(renderizarMensagens, 3000);

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

function atualizaPagina() {
    const promessaGet = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promessaGet.then(respostaGet); 
}

setInterval(atualizaPagina, 3000);

function respostaGet(respGet) {
    mensagens = respGet.data;

    renderizarMensagens();
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

function enviarMensagem() {
    let mensagemUsuario = document.querySelector('input').value;

    let novaMensagem = {
        from: nomeUsuario,
        to: "Todos",
        text: mensagemUsuario,
        type: "message"
    }

    mensagens.push(novaMensagem);

    const promessaMensagemEnviada = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', novaMensagem);
    promessaMensagemEnviada.then(respostaNovaMensagem);
    promessaMensagemEnviada.catch(erroNovaMensagem)
}

function respostaNovaMensagem(respMensagemEnviada){
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promise.then(respostaChegou);
}

function respostaChegou(response) {
    mensagens = response.data;
    renderizarMensagens();
}

function erroNovaMensagem(erro){
    console.log(erro);
}