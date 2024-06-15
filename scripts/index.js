document.addEventListener("DOMContentLoaded", () => {
  documentOnLoad();
  documentOnLoad2();
  documentOnLoad3();
});
const CAMIONES = [];

function storageGuardarCamiones() {
  localStorage.setItem("camiones", JSON.stringify(CAMIONES));
}

function storageLeerCamiones() {
  return JSON.parse(localStorage.getItem("camiones")) || [];
}

function agregarCamion(camion) {
  camion.id = ultimoIdCamion() + 1;
  CAMIONES.push(camion);
  storageGuardarCamiones();
}

function ultimoIdCamion() {
  let ultimoId = -1;
  for (let camion of CAMIONES) {
    if (camion.id > ultimoId) {
      ultimoId = camion.id;
    }
  }
  return ultimoId;
}

function eliminarCamion(idCamion) {
  let indice = CAMIONES.findIndex(camion => camion.id === idCamion);
  if (indice !== -1) {
    CAMIONES.splice(indice, 1);
    storageGuardarCamiones();
  }
}

function onClickBotonGuardar() {
  let inputPatente = document.getElementById("patente");
  let inputMarca = document.getElementById("marca");
  let inputModelo = document.getElementById("modelo");
  let inputAnoFabricacion = document.getElementById("anoFabricacion");
  let inputCostoKM = document.getElementById("costoKM");
  let inputCapacidadKG = document.getElementById("capacidadk");

  let patente = inputPatente.value;
  let marca = inputMarca.value;
  let modelo = inputModelo.value;
  let anoFabricacion = parseInt(inputAnoFabricacion.value);
  let costoKM = parseFloat(inputCostoKM.value);
  let capacidadKG = parseInt(inputCapacidadKG.value);

  if (patente === "" || marca === "" || modelo === "" || isNaN(anoFabricacion) || isNaN(costoKM) || isNaN(capacidadKG)) {
    alert("Por favor, ingrese todos los campos.");
    return;
  }

  agregarCamion({ patente, marca, modelo, anoFabricacion, costoKM, capacidadKG });

  inputPatente.value = "";
  inputMarca.value = "";
  inputModelo.value = "";
  inputAnoFabricacion.value = "";
  inputCostoKM.value = "";
  inputCapacidadKG.value = "";

  renderizarCamiones();
}

function renderizarCamion(camion) {
  const fila = document.createElement("tr");
  fila.dataset.idCamion = camion.id;

  const celdaPatente = document.createElement("td");
  celdaPatente.innerText = camion.patente;
  fila.appendChild(celdaPatente);

  const celdaMarca = document.createElement("td");
  celdaMarca.innerText = camion.marca;
  fila.appendChild(celdaMarca);

  const celdaModelo = document.createElement("td");
  celdaModelo.innerText = camion.modelo;
  fila.appendChild(celdaModelo);

  const celdaAnoFabricacion = document.createElement("td");
  celdaAnoFabricacion.innerText = camion.anoFabricacion;
  fila.appendChild(celdaAnoFabricacion);

  const celdaCostoKM = document.createElement("td");
  celdaCostoKM.innerText = camion.costoKM;
  fila.appendChild(celdaCostoKM);

  const celdaCapacidadDeKg = document.createElement("td");
  celdaCapacidadDeKg.innerText = camion.capacidadKG;
  fila.appendChild(celdaCapacidadDeKg);

  const celdaAcciones = document.createElement("td");
  const divBtnGroup = document.createElement("div");
  divBtnGroup.classList.add("btn-group");

  const botonEliminar = document.createElement("button");
  botonEliminar.classList.add("btn");
  botonEliminar.classList.add("btn-danger");
  botonEliminar.innerText = "Eliminar";
  botonEliminar.addEventListener("click", () => onClickBotonEliminar(camion.id));
  divBtnGroup.appendChild(botonEliminar);

  celdaAcciones.appendChild(divBtnGroup);

  fila.appendChild(celdaAcciones);
  return fila;
}

function renderizarCamiones() {
  const tablaCamiones = document.getElementById("tablaCamiones");
  tablaCamiones.innerHTML = "";

  for (let camion of CAMIONES) {
    const fila = renderizarCamion(camion);
    tablaCamiones.appendChild(fila);
  }
}

function documentOnLoad() {
  console.log("El DOM ha sido cargado");
  document.getElementById("botonCancelar1").addEventListener("click", () => {
    document.getElementById("camion").value = "";
    document.getElementById("patente").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("anoFabricacion").value = "";
    document.getElementById("costoKM").value = "";
    document.getElementById("capacidadk").value = "";
  });
  document.getElementById("botonAgregar").addEventListener("click", onClickBotonGuardar);

  let camionesDeStorage = storageLeerCamiones();

  if (camionesDeStorage.length === 0) {
    storageGuardarCamiones();
  } else {
    for (let camion of camionesDeStorage) {
      CAMIONES.push(camion);
    }
  }
  renderizarCamiones();
 
}

function onClickBotonEliminar(idCamion) {
  let confirmacion = window.confirm("¿Está seguro de borrar este camión?");
  if (confirmacion) {
    eliminarCamion(idCamion);
    renderizarCamiones();
    alert("El camión fue eliminado");
  } else {
    renderizarCamiones();
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const VIAJEGRANO = [];

function storageGuardarViajesGrano() {
  localStorage.setItem("viajesGrano", JSON.stringify(VIAJEGRANO));
}

function storageLeerViajesGrano() {
  return JSON.parse(localStorage.getItem("viajesGrano")) || [];
}

function agregarViajeGrano(viajesGrano) {
  viajesGrano.id = ultimoIdViajesGrano() + 1;
  VIAJEGRANO.push(viajesGrano);
  storageGuardarViajesGrano();
}

function ultimoIdViajesGrano() {
  let ultimoId = -1;
  for (let viajesGrano of VIAJEGRANO) {
    if (viajesGrano.id > ultimoId) {
      ultimoId = viajesGrano.id;
    }
  }
  return ultimoId;
}

function onClickBotonIngresar() {
  const inputpatente2 = document.getElementById("patente2");
  const inputkilometroGrano = document.getElementById("kilometroGrano");
  const inputkilosGrano = document.getElementById("kilosGrano");
  const inputfecha = document.getElementById("fecha");
  
  const patente2 = inputpatente2.value;
  const kilometroGrano = inputkilometroGrano.value;
  const kilosGrano = inputkilosGrano.value;
  const fecha = inputfecha.value;

   if (patente2 === "" || kilometroGrano === "" || kilosGrano === "" || fecha === "" ) {
    alert("Por favor, ingrese todos los campos.");
    return;
  }
  let precioGrano = calculoPrecioGrano(kilometroGrano, kilosGrano);
  agregarViajeGrano({patente2, kilometroGrano, kilosGrano, fecha, precio: precioGrano});

  inputpatente2.value = "";
  inputkilometroGrano.value = "";
  inputkilosGrano.value = "";
  inputfecha.value = "";
  
  renderizarViajesGrano();
}


function renderizarViajeGrano(viajesGrano) {
  const fila = document.createElement("tr");
  fila.dataset.idViajesGrano = viajesGrano.id;

  const celdapatente2 = document.createElement("td");
  celdapatente2.innerText = viajesGrano.patente2;
  fila.appendChild(celdapatente2);

  const celdakilometroGrano = document.createElement("td");
  celdakilometroGrano.innerText = viajesGrano.kilometroGrano;
  fila.appendChild(celdakilometroGrano);

  const celdakilosGrano = document.createElement("td");
  celdakilosGrano.innerText = viajesGrano.kilosGrano;
  fila.appendChild(celdakilosGrano);

  const celdafecha = document.createElement("td");
  celdafecha.innerText = viajesGrano.fecha;
  fila.appendChild(celdafecha);

  const celdaPrecio = document.createElement("td")
  celdaPrecio.innerHTML=`$${viajesGrano.precio}`;
  fila.appendChild(celdaPrecio);

  return fila;
}

function renderizarViajesGrano() {
  const tablaViajesGrano = document.getElementById("tablaViajesGrano");
  tablaViajesGrano.innerHTML = "";

  for (let viajesGrano of VIAJEGRANO) {
    const fila = renderizarViajeGrano(viajesGrano);
    tablaViajesGrano.appendChild(fila);
  }
}

function documentOnLoad2() {
  console.log("El DOM ha sido cargado");
    document.getElementById("botonCancelar2").addEventListener("click", () => {
    document.getElementById("patente2").value = "";
    document.getElementById("kilometroGrano").value = "";
    document.getElementById("kilosGrano").value = "";
    document.getElementById("fecha").value = "";
  });
  document.getElementById("botonIngresar2").addEventListener("click", onClickBotonIngresar);

  let viajesDeGranoDeStorage = storageLeerViajesGrano();

  if (viajesDeGranoDeStorage === 0) {
    storageGuardarViajesGrano();
  } else {
    for (let viajesGrano of VIAJEGRANO) {
      VIAJEGRANO.push(viajesGrano);
    }
  }
  renderizarViajesGrano();
}


//------------------------------------------------------------------------------------------------------------------------------------- 

const VIAJESMICROPICADO= [];

function storageGuardarViajesMicropicado() {
  localStorage.setItem("viajesMicropicado", JSON.stringify(VIAJESMICROPICADO));
}

function storageLeerViajesMicropicado() {
  return JSON.parse(localStorage.getItem("viajesMicropicado")) || [];
}

function agregarViajesMicropicado(viajesMicropicado) {
  viajesMicropicado.id = ultimoIdViajesMicropicado() + 1;
  VIAJESMICROPICADO.push(viajesMicropicado);
  storageGuardarViajesMicropicado();
}

function ultimoIdViajesMicropicado() {
  let ultimoId = -1;
  for (let viajesMicropicado of VIAJESMICROPICADO) {
    if (viajesMicropicado.id > ultimoId) {
      ultimoId = viajesMicropicado.id;
    }
  }
  return ultimoId;
}

function onClickBotonIngresar2() {
  const inputpatente3 = document.getElementById("patente3");
  const inputkilometroMicropicado = document.getElementById("kilometroMicropicado");
  const inputcantViajesMicropicado = document.getElementById("cantViajesMicropicado");
  const inputfecha2 = document.getElementById("fecha2");
  
  const patente3 = inputpatente3.value;
  const kilometroMicropicado = inputkilometroMicropicado.value;
  const cantViajesMicropicado = inputcantViajesMicropicado.value;
  const fecha2 = inputfecha2.value;

   if (patente3 === "" || kilometroMicropicado === "" || cantViajesMicropicado === "" || fecha2 === "") {
    alert("Por favor, ingrese todos los campos.");
    return;
  }
  let precioMicropicado = calculoPrecioMicropicado(kilometroMicropicado, cantViajesMicropicado);

  agregarViajesMicropicado({patente3, kilometroMicropicado, cantViajesMicropicado, fecha2, precio:precioMicropicado});

  inputpatente3.value = "";
  inputkilometroMicropicado.value = "";
  inputcantViajesMicropicado.value = "";
  inputfecha2.value = "";
  
  renderizarViajesMicropicado();
}


function renderizarViajeMicropicado(viajesMicropicado) {
  const fila = document.createElement("tr");
  fila.dataset.idViajesMicropicado = viajesMicropicado.id;

  const celdapatente3 = document.createElement("td");
  celdapatente3.innerText = viajesMicropicado.patente3;
  fila.appendChild(celdapatente3);

  const celdakilometroMicropicado = document.createElement("td");
  celdakilometroMicropicado.innerText = viajesMicropicado.kilometroMicropicado;
  fila.appendChild(celdakilometroMicropicado);

  const celdacantViajesMicropicado = document.createElement("td");
  celdacantViajesMicropicado.innerText = viajesMicropicado.cantViajesMicropicado;
  fila.appendChild(celdacantViajesMicropicado);

  const celdafecha2 = document.createElement("td");
  celdafecha2.innerText =viajesMicropicado.fecha2;
  fila.appendChild(celdafecha2);

  const celdaPrecio = document.createElement("td")
  celdaPrecio.innerHTML=`$${viajesMicropicado.precio}`;
  fila.appendChild(celdaPrecio);

  return fila;
}

function renderizarViajesMicropicado() {
  const tablaViajesMicropicado = document.getElementById("tablaViajesMicropicado");
  tablaViajesMicropicado.innerHTML = "";

  for (let viajesMicropicado of VIAJESMICROPICADO) {
    const fila = renderizarViajeMicropicado(viajesMicropicado);
    tablaViajesMicropicado.appendChild(fila);
  }
}

function documentOnLoad3 () {
  console.log("El DOM ha sido cargado");
    document.getElementById("botonCancelar3").addEventListener("click", () => {
    document.getElementById("patente3").value = "";
    document.getElementById("kilometroMicropicado").value = "";
    document.getElementById("cantViajesMicropicado").value = "";
    document.getElementById("fecha2").value = "";
  });

  document.getElementById("botonIngresar3").addEventListener("click", onClickBotonIngresar2);
  let viajesDeMicropicadoDeStorage = storageLeerViajesMicropicado();
  if (viajesDeMicropicadoDeStorage === 0) {
    storageGuardarViajesMicropicado();
  } else {
    for (let viajesMicropicado of VIAJESMICROPICADO) {
      VIAJESMICROPICADO.push(viajesMicropicado);
    }
  }
  renderizarViajesMicropicado();
}

function calculoPrecioGrano(kilometrosRecorridos, cantidadDeK) {
  let preciokilometro = 0;

 if(kilometrosRecorridos >= 1 && kilometrosRecorridos <= 5){
     preciokilometro = 6.00;
  }else if (kilometrosRecorridos >= 6 && kilometrosRecorridos <= 10){
    preciokilometro = 7.50;
  } else if (kilometrosRecorridos >= 11 && kilometrosRecorridos <= 15){
    preciokilometro = 8.20;
  } else if (kilometrosRecorridos >= 16 && kilometrosRecorridos <= 20){
   preciokilometro = 9.00;
  } else if (kilometrosRecorridos >= 21 && kilometrosRecorridos <= 25){
     preciokilometro = 9.50;
  } else if (kilometrosRecorridos >= 26 && kilometrosRecorridos <= 30){
    preciokilometro = 10.00;
  } else if (kilometrosRecorridos >= 31 && kilometrosRecorridos <= 35){
    preciokilometro = 10.60;
  } else if (kilometrosRecorridos >= 36 && kilometrosRecorridos <= 40){
    preciokilometro = 11.00;
  } else if (kilometrosRecorridos >= 41 && kilometrosRecorridos <= 45){
    preciokilometro = 11.50;
  } else if (kilometrosRecorridos >= 46 && kilometrosRecorridos <= 50){
    preciokilometro = 11.80;
  } else if (kilometrosRecorridos >= 51 && kilometrosRecorridos <= 60){
    preciokilometro = 12.80;
  } else if (kilometrosRecorridos >= 61 && kilometrosRecorridos <= 70){
    preciokilometro = 13.80;
  } else if (kilometrosRecorridos >= 71 && kilometrosRecorridos <= 80){
    preciokilometro = 14.45;
  } else if (kilometrosRecorridos >= 81 && kilometrosRecorridos <= 90){
    preciokilometro = 15.65;
  } else if (kilometrosRecorridos >= 91 && kilometrosRecorridos <= 100){
    preciokilometro = 16.65;
  } else if (kilometrosRecorridos >= 101 && kilometrosRecorridos <= 110){
    preciokilometro = 17.80;
  } else if (kilometrosRecorridos >= 111 && kilometrosRecorridos <= 120){
    preciokilometro = 18.75;
  } else if (kilometrosRecorridos >= 121 && kilometrosRecorridos <= 130){
    preciokilometro = 20.00;
  } else if (kilometrosRecorridos >= 131 && kilometrosRecorridos <= 140){
    preciokilometro = 20.75;
  } else if (kilometrosRecorridos >= 141 && kilometrosRecorridos <= 150){
    preciokilometro = 22.00;
  } else if (kilometrosRecorridos >= 151 && kilometrosRecorridos <= 160){
    preciokilometro = 22.85;
  } else if (kilometrosRecorridos >= 161 && kilometrosRecorridos <= 170){
    preciokilometro = 24.15;
  } else if (kilometrosRecorridos >= 171 && kilometrosRecorridos <= 180){
    preciokilometro = 25.00;
  } else if (kilometrosRecorridos >= 181 && kilometrosRecorridos <= 190){
    preciokilometro = 26.00;
  } else if (kilometrosRecorridos >= 191 && kilometrosRecorridos <= 200){
    preciokilometro = 27.00;
  }

  let cantidadDeTT = cantidadDeK * 0.001;
  let precioTOTALdeTT = preciokilometro * cantidadDeTT;

  alert(`El valor de 1 TT en ${kilometrosRecorridos} Km es: $${preciokilometro.toFixed(2)}`);
  alert(`El precio total por ${cantidadDeTT} TT es: $${precioTOTALdeTT.toFixed(2)}`);
  
  return precioTOTALdeTT;
}

function calculoPrecioMicropicado(cantidadDeKm, cantidadViajes) {
  let precio = 0;
  let kmACobrar = 0;

  if (cantidadDeKm <= 2) {
      kmACobrar = cantidadDeKm;
      precio = 28.50 * cantidadDeKm;
  } else {
      kmACobrar = cantidadDeKm - 2;
      precio = (kmACobrar * 1.65) + 28.50;
  }

  let totalPrecioViajes = cantidadViajes * precio;

  alert(`Usted realizó ${cantidadViajes} viajes de ${cantidadDeKm} km de los cuales se cobran ${kmACobrar} km y cada uno cuesta $${precio.toFixed(2)}`);
  alert(`El precio total es: $${totalPrecioViajes.toFixed(2)}`);

  return totalPrecioViajes;
}
// function calculoPrecioGrano(){
//   let kilometrosRecorridos = getElementById(kilometroGrano);
//   let cantidadDeK = getElementById(kilosGrano);
//   let preciokilometro = 0;

//     if(kilometrosRecorridos >= 1 && kilometrosRecorridos <= 5){
//         preciokilometro = 6.00;
//     } else if (kilometrosRecorridos >= 6 && kilometrosRecorridos <= 10){
//         preciokilometro = 7.50;
//     } else if (kilometrosRecorridos >= 11 && kilometrosRecorridos <= 15){
//         preciokilometro = 8.20;
//     } else if (kilometrosRecorridos >= 16 && kilometrosRecorridos <= 20){
//         preciokilometro = 9.00;
//     } else if (kilometrosRecorridos >= 21 && kilometrosRecorridos <= 25){
//         preciokilometro = 9.50;
//     } else if (kilometrosRecorridos >= 26 && kilometrosRecorridos <= 30){
//         preciokilometro = 10.00;
//     } else if (kilometrosRecorridos >= 31 && kilometrosRecorridos <= 35){
//         preciokilometro = 10.60;
//     } else if (kilometrosRecorridos >= 36 && kilometrosRecorridos <= 40){
//         preciokilometro = 11.00;
//     } else if (kilometrosRecorridos >= 41 && kilometrosRecorridos <= 45){
//         preciokilometro = 11.50;
//     } else if (kilometrosRecorridos >= 46 && kilometrosRecorridos <= 50){
//         preciokilometro = 11.80;
//     } else if (kilometrosRecorridos >= 51 && kilometrosRecorridos <= 60){
//         preciokilometro = 12.80;
//     } else if (kilometrosRecorridos >= 61 && kilometrosRecorridos <= 70){
//         preciokilometro = 13.80;
//     } else if (kilometrosRecorridos >= 71 && kilometrosRecorridos <= 80){
//         preciokilometro = 14.45;
//     } else if (kilometrosRecorridos >= 81 && kilometrosRecorridos <= 90){
//         preciokilometro = 15.65;
//     } else if (kilometrosRecorridos >= 91 && kilometrosRecorridos <= 100){
//         preciokilometro = 16.65;
//     } else if (kilometrosRecorridos >= 101 && kilometrosRecorridos <= 110){
//         preciokilometro = 17.80;
//     } else if (kilometrosRecorridos >= 111 && kilometrosRecorridos <= 120){
//         preciokilometro = 18.75;
//     } else if (kilometrosRecorridos >= 121 && kilometrosRecorridos <= 130){
//         preciokilometro = 20.00;
//     } else if (kilometrosRecorridos >= 131 && kilometrosRecorridos <= 140){
//         preciokilometro = 20.75;
//     } else if (kilometrosRecorridos >= 141 && kilometrosRecorridos <= 150){
//         preciokilometro = 22.00;
//     } else if (kilometrosRecorridos >= 151 && kilometrosRecorridos <= 160){
//         preciokilometro = 22.85;
//     } else if (kilometrosRecorridos >= 161 && kilometrosRecorridos <= 170){
//         preciokilometro = 24.15;
//     } else if (kilometrosRecorridos >= 171 && kilometrosRecorridos <= 180){
//         preciokilometro = 25.00;
//     } else if (kilometrosRecorridos >= 181 && kilometrosRecorridos <= 190){
//         preciokilometro = 26.00;
//     } else if (kilometrosRecorridos >= 191 && kilometrosRecorridos <= 200){
//         preciokilometro = 27.00;
//     }
//     let cantidadDeTT = cantidadDeK * 0.001
//     let precioTOTALdeTT = preciokilometro * cantidadDeTT;
//     alert(`El valor de 1 TT en ${kilometrosRecorridos}Km es: $${preciokilometro.toFixed(2)}`);
//     alert(`El precio total por ${cantidadDeTT}TT es: $${precioTOTALdeTT.toFixed(2)}`);
//     alert("--------------------------------------------------------------------------------");
     
//     return precioTOTALdeTT;
// }



