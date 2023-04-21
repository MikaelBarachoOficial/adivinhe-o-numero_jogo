var numeroAleatorio = Math.floor(Math.random() * 100) + 1;

var palpites = document.querySelector('.guesses');
var ultimoResultado = document.querySelector('.lastResult');
var baixoOuAlto = document.querySelector('.lowOrHigh');

var campoPalpite = document.querySelector('.guessField');
var envioPalpite = document.querySelector('.guessSubmit');

var contagemPalpites = 1;
var botaoReinicio;

function configFimDeJogo(){
    
    campoPalpite.disabled = true;
    envioPalpite.style.display = 'none';
    botaoReinicio = document.createElement('input');
    botaoReinicio.type = 'button';

    botaoReinicio.value = 'Novo Jogo';
    document.querySelector('.form').appendChild(botaoReinicio);
    
    botaoReinicio.style.backgroundColor = 'rgb(48, 1, 1)';
    botaoReinicio.style.color = 'rgb(181, 15, 15)';
    botaoReinicio.style.borderRadius = '10px';
    botaoReinicio.style.padding = '2px 3px';
    botaoReinicio.style.fontFamily = "'Creepster', sans-serif";
    botaoReinicio.style.fontSize = '20px';
    botaoReinicio.style.cursor = 'pointer';

    botaoReinicio.addEventListener('click', reiniciarJogo);
    
}

function reiniciarJogo(){
    contagemPalpites = 1;

    var reiniciarParas = document.querySelectorAll('.resultParas p');
    
    for (var i = 0 ; i < reiniciarParas.length ; i++) {
        reiniciarParas[i].textContent = '';
    }


    //Acessa o elemento pai(parentNode) e remove o filho botão de reinicio.
    botaoReinicio.parentNode.removeChild(botaoReinicio);

    campoPalpite.disabled = false;
    envioPalpite.style.display = 'block';
    campoPalpite.value = ''
    campoPalpite.focus();

    numeroAleatorio = Math.floor(Math.random() * 100) + 1;

}

function conferirPalpite() {
  if(campoPalpite.value > 0 && campoPalpite.value < 101){  
    
    var palpiteUsuario = Number(campoPalpite.value);
    
    if(contagemPalpites === 1) {
        palpites.textContent = 'Últimas apostas: ';
        palpites.style.fontFamily = 'Creepster', 'sans-serif';
        palpites.style.fontSize = '24px';
    }

    palpites.textContent += palpiteUsuario + ' ';

    //Processo de avaliação:
    if(palpiteUsuario === numeroAleatorio){
        ultimoResultado.style.fontSize = '24px';
        ultimoResultado.style.fontFamily = 'montserrat', 'sans-serif';
        ultimoResultado.style.color = 'green';
        ultimoResultado.textContent = 'Você acertou!';
        baixoOuAlto.textContent = '';
        configFimDeJogo();
    
    }else if(contagemPalpites === 7){
        ultimoResultado.style.fontSize = '24px';
        ultimoResultado.style.fontFamily = 'Creepster', 'sans-serif';
        ultimoResultado.style.color = 'red';
        ultimoResultado.textContent = `Você perdeu!!! Sua alma é minha!!! A resposta era ${numeroAleatorio}.`;
        configFimDeJogo();

    }else{
        ultimoResultado.style.fontFamily = 'montserrat', 'sans-serif';
        ultimoResultado.style.color = 'red';
        ultimoResultado.textContent = 'Errado!';
        
        //Pra cima ou pra baixo:
        if(palpiteUsuario < numeroAleatorio){
            baixoOuAlto.style.color = 'red';
            baixoOuAlto.textContent = 'Aposta muito baixa...'
        
        }else if(palpiteUsuario > numeroAleatorio){
            baixoOuAlto.style.color = 'red';
            baixoOuAlto.textContent = 'Aposta muito alta...'

        }

        contagemPalpites++;
        campoPalpite.value = ''
        campoPalpite.focus();

    }
  }  
}

envioPalpite.addEventListener('click', conferirPalpite);

campoPalpite.onkeydown = tecla => {
    console.log(tecla);
    if (tecla.key === 'Enter'){
        conferirPalpite();
    }
}