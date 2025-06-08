// Toma los elementos del html principal y solo si existen les agrega un evento para mostrar u ocultar el correo electrónico
const botonCorreo = document.getElementById("mostrarCorreo");
const infoCorreo = document.getElementById("correo-info");

if (botonCorreo && infoCorreo) {
  botonCorreo.addEventListener("click", () => {
    const visible = !infoCorreo.hasAttribute("hidden");
    if (visible) {
      infoCorreo.setAttribute("hidden", "");
      botonCorreo.textContent = "Mostrar correo";
    } else {
      infoCorreo.removeAttribute("hidden");
      botonCorreo.textContent = "Ocultar correo";
    }
  });
}

document.addEventListener('keydown', function (event) {
  // Solo reaccionar si se presiona ALT
  if (event.altKey && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
    const key = event.key.toLowerCase();

    switch (key) {
      case 'i': //Inicio
        voz('Navegando a Inicio');
        window.location.href = 'index.html';
        break;

      case 'p': //Proyectos
        voz('Navegando a Proyectos');
        window.location.href = 'proyectos.html';
        break;

      case 'c': //Contacto
        voz('Navegando a Contacto');
        window.location.href = 'contacto.html';
        break;

      case 'q': //Mostrar correo
        const correo = document.getElementById('correo-info');
        if (correo) {
          correo.hidden = !correo.hidden;
          correo.setAttribute('aria-hidden', correo.hidden ? 'true' : 'false');
          if (!correo.hidden) {
            voz('Correo mostrado');
          } else {
            voz('Correo ocultado');
          }
        }
        break;

      case 'm': 
        event.preventDefault();
        document.querySelector('main').focus();
        voz('Enfocando el contenido principal');
        break;

      case 's': //Enviar formulario
        event.preventDefault(); //evita errores al enviar el formulario
        const form = document.querySelector('form');
        if (form) {
          voz('Enviando formulario');
          form.requestSubmit ? form.requestSubmit() : form.submit(); //metodo correcto para enviar el formulario
        }
        break; 

    }
    
  }
});


// Función para incluir un narrador de voz por default
function voz(text) {
  if ('speechSynthesis' in window) {
    const mensaje = new SpeechSynthesisUtterance(text);
    mensaje.lang = 'es-MX';
    speechSynthesis.speak(mensaje);
  }
}

