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

    //Leer dato seleccionado del select
    const marca = document.getElementById('marca');
    const marcaSeleccionado = marca.options[marca.selectedIndex].value;

    //leer el año selleccionado del select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;
    console.log(`anio seleccionado: ${anioSeleccionado}`);

    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    console.log(`Radio: ${tipo}`);
    
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