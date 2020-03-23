function Saludar(marca, anio, tipo) {
    this.marca = marca;
    this.anio =anio;
    this.tipo = tipo;
}

//Todo lo que se muestra
function Interfaz() {}


//EventListener
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    console.log('Precionado');

});


const max = new Date().getFullYear(),
      min  = max - 20; 

const selectAnios = document.getElementById('anio');
for(let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i; 
    option.innerHTML = i;
    selectAnios.appendChild(option);
}