function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(Informacion) {
    /*
        1 = americano 1.15
        2 = asiatico = 1.05
        3 = europeo = 1.35
    */
    let cantidad;
    const base = 2000;

    switch(this.marca) {
        case '1':  cantidad = base * 1.15;
            break;
        case '2':  cantidad = base * 1.05;
            break;
        case '3':  cantidad = base * 1.35;
            break;
    }

    //Leeer el año
    const diferencia = new Date().getFullYear() - this.anio;
    //Cada año de diferencia hay que reducir 3% el valor del seguro

    cantidad -= ((diferencia * 3) * cantidad)/100;

    /*
        si el seguro es básico se multiplica por 30% más
        si el seguro es completo 50% mas
    */


    if(this.tipo == 'basico') {
        cantidad *= 1.30;
    } else if(this.tipo == 'completo') {
        cantidad *= 1.50;
    }


    console.log(`Direfencia: ${diferencia}`);
 

    return cantidad;
    
}

//Todo lo que se muestra
function Interfaz() {}


//Mensaje que se imprime en el HTML
Interfaz.prototype.mostrarError = function(Mensaje, tipo) {
    const div = document.createElement('div');

    if(tipo == 'error') {
        div.classList.add('mensaje','error');

    } else {
        div.classList.add('mensaje','correcto');
    }

    div.innerHTML = `${Mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function() {
        document.querySelector('.mensaje').remove();
    },3000);

}

Interfaz.prototype.mostrarResultado = function(seguro, total) {
     const resultado = document.getElementById('resultado');

     let marca;

     switch(seguro.marca) {
        case '1': marca = 'Americano';
            break;

        case '2': marca = 'Asiatico';
            break;
        
        case '3': marca = 'Europeo';
            break;
     }
     
     const div = document.createElement('div');
     div.innerHTML = `
        <p class = 'header text-center bg-info text-white'><strong>Tu Resumen:</strong> <br></p>
        <strong>Marca:</strong> ${marca} <br>
        <strong>Seguro:</strong> ${seguro.anio} <br>
        <strong>Tipo:</strong> ${seguro.tipo} <br>
        <strong>Tipo:</strong> $ ${total} <br>
     `;
    //  resultado.innerHTML = '';
     resultado.appendChild(div);
     resultado.style.display = "block";

}


//EventListener
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    //Leer dato seleccionado del select
    const marca = document.getElementById('marca');
    let marcaSeleccionado = marca.options[marca.selectedIndex].value;
    if(marcaSeleccionado == 0)
        marcaSeleccionado = '';    

    //leer el año selleccionado del select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    const tipo = document.querySelector('input[name="tipo"]:checked');
    
    //Crear instancia de Interfaz
    const interfaz = new Interfaz();

    //Revisar que los campos no esten vacios
    if(marcaSeleccionado === '' || anioSeleccionado === '' || tipo === null) {
        interfaz.mostrarError('Faltan datos, resivar el formulario','error')
        
    } else {
        //Instanciar seguro y mostrar Interfaz
        // interfaz.mostrarError('Todo correcto','correcto'); 


        //Interfaz imprimiendo un error
        const resultado = document.querySelector('#resultado div');
        if(resultado != null){
            resultado.remove();
        }

        

        const seguro = new Seguro(marcaSeleccionado,anioSeleccionado,tipo.value);
        
        //Cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);

        interfaz.mostrarResultado(seguro, cantidad);


        
    }
    
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