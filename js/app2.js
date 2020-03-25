class Seguro {
  constructor(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
  }

  cotizarSeguro() {
    let cantidad;
    const base = 2000;

    switch (this.marca) {
      case "1":
        cantidad = base * 1.15;
        break;

      case "2":
        cantidad = base * 1.05;
        break;

      case "3":
        cantidad = base * 1.35;
    }

    const diferencia = new Date().getFullYear() - this.anio;

    cantidad -= (diferencia * 3 * cantidad) / 100;

    if(this.tipo.value == 'basico')
        cantidad *= 1.30;

    else if(this.tipo.value == 'completo')
        cantidad *= 1.50;

    return cantidad;
  }
}

class Interfaz {

    mostrarError(mensaje, tipo) {
        
        const div = document.createElement('div');

        if(tipo == 'error') {
            div.classList.add('mensaje', 'error');
        } else{
            div.classList.add('mensaje', 'correcto');
        }

        div.innerHTML = mensaje;
        formulario.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 2000)
    }

    mostrarResultado(seguro, total) {
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

        resultado.appendChild(div);
        resultado.style.display = 'block';
    }
}

//EventListener
const formulario = document.getElementById("cotizar-seguro");

formulario.addEventListener("submit", function(e) {
  e.preventDefault();

  const marca = document.getElementById("marca");

  let marcaSeleccion = marca.options[marca.selectedIndex].value;
  if (marcaSeleccion == 0) marcaSeleccion = "";

  const tipo = document.querySelector('input[name="tipo"]:checked');

  const anio = document.getElementById("anio");
  const anioSeleccionado = anio.options[anio.selectedIndex].value;

  const interfaz = new Interfaz();

  if (marcaSeleccion === "" || anioSeleccionado === "" || tipo === null) {
    interfaz.mostrarError('Faltan datos, revisar el formulario', 'error');

  } else {
    const seguro = new Seguro(marcaSeleccion, anioSeleccionado, tipo);

    const total = seguro.cotizarSeguro();

    interfaz.mostrarResultado(seguro, total);
  }
  //Crear instancia de Interfaz
});

const max = new Date().getFullYear();
const min = max - 20;

const selectAnio = document.getElementById("anio");

for (let i = max; i > min; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  selectAnio.appendChild(option);
}
