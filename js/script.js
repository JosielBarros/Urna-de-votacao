//Definição dos elementos que aparecerão na interface.

let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');


let etapaAtual = 0;//Começa como zero.
let numero = '';
let votoBranco = false;
let candidato = false;

let votos = [];

let votoCristiano = 0;
let votoMessi = 0;
let votoNeymar = 0;
let votoBezema = 0;
let votoTBranco = 0;

//Função para começar as etapas
function comecarEtapa(){
    let etapa = etapas[etapaAtual];//Etapa recebe a array 'etapas' na posição '0', pois 'etapaAtual foi definida como zero.'
    let numeroHtml='';//Quantidade de espaços para digitar os números.
    numero = '';
    votoBranco = false;
    
    

    for(i = 0; i< etapa.numero; i++){
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';//Adiciona a classe 'pisca' no primeiro elemento se for = 0.
        }
        else{
            numeroHtml += '<div class="numero"></div>';//Repetição para adicionar a quantidade de números de acordo com o tipo de voto. Vereador, prefeito ...
        }
    
    };
    //Manipula como deve agir os elementos na tela.
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    numeros.innerHTML = numeroHtml;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.style.display = 'none';
}
function atualizaInterface() {
    let etapa = etapas[etapaAtual];//Banco de dados etapas[0] com o index 0 como foi definido.
    candidato = etapa.candidatos.filter((item)=>{//Faz um filtro para encontrar numero dentro de candidato.
        if(item.numero === numero){//se numero digitado for igual a numero no banco de dados do candidato.
            return true;//retorna as informações do candidato.
            
        }
        else{
            return false;//não retorna nada.
        } 
        
    });
    
    if (candidato.length > 0) {//Quer dizer que existe alguma informação dentro da array candidato. Ou seja, maior que 0.
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';//Exibe as informações dos candidatos.
        aviso.style.display = 'block';
        lateral.style.display = 'block';
        if (numero.length === 2) {
            descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>Vice: ${candidato.vice}`;
        }
        else{
            descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        }

        let fotosHtml = '';
        
        for(let i in candidato.fotos){//Para os itens fotos que está dentro de candidato.
            
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="image/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda} </div>`;
            }
            else{
                fotosHtml += `<div class="d-1-image"><img src="image/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda} </div>`;
            }

            
            lateral.innerHTML = fotosHtml;//exibe na tela. 
        }
        candidato = true;
    }
    else{//voto nulo
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML =  `<div class="aviso--grande pisca"> VOTO EM NULO</div>`;
       
    }
    
}
function guardaVoto() {
    switch (numero) {
        case '07222':
            votoCristiano ++;
            break;
        case '10222':
            votoMessi ++;
            break;
        case '11':
            votoNeymar ++;
            break;
        case '09':
            votoBezema ++;
            break;
        case '':
            votoTBranco ++;
            break;
        default:
            break;
    }
}

function clicou(n) {
    let elNumero =  document.querySelector('.numero.pisca');
    if(elNumero !==null){//Ele existe como .numero e .pisca
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){//O pisca foi retirado. Então ele existe como 'numero'.
            elNumero.nextElementSibling.classList.add('pisca');
        }
        else{
            atualizaInterface();
        }
    }
}
function branco() {//Função para botão branco
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML =  `<div class="aviso--grande pisca"> VOTO EM BRANCO</div>`;
        aviso.style.display = 'block';

    }
    else{
        comecarEtapa();
    }
}
function corrigue() {
    comecarEtapa();
}
function confirma() {
    if ( votoBranco === true ){
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        })
    }
    else{
        if (candidato === true) {
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: numero
            })
            guardaVoto();
        }  
    }
    etapaAtual++;
    if (etapas[etapaAtual] !== undefined) {
        comecarEtapa();
    }
    else{
        document.querySelector('.tela').innerHTML = `<div class="aviso--fim pisca">FIM</div>`;
        console.log(votos);
        console.log(votoBezema);
    }    
}


comecarEtapa();
