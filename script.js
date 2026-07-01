function agregarClienteTabla(cliente) {
    const cuerpo = document.getElementById("cuerpoTabla");
    cuerpo.innerHTML += `
        <tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.correo}</td>
            <td>${cliente.servicio}</td>
            <td>${cliente.mensaje}</td>
        </tr>
    `;
}


const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];
clientesGuardados.forEach(function (cliente) {
    agregarClienteTabla(cliente);
});

const servicios=[{
        titulo: "Desarrollo Web",
        descripcion: "Creación de sitios web modernos, responsivos y accesibles adaptados a tus necesidades.",
        icono: "💻"
    },{
        titulo: "Soporte Técnico",
        descripcion: "Asistencia y mantenimiento de equipos y sistemas para garantizar su correcto funcionamiento.",
        icono: "🔧"
    },{
        titulo: "Consultoría",
        descripcion: "Asesoría especializada en soluciones tecnológicas para optimizar tus procesos digitales.",
        icono: "📊"
    }];

const contenedor = document.getElementById("contenedorServicios");

servicios.forEach(function (servicio) {
    contenedor.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h3 class="card-title">${servicio.icono} ${servicio.titulo}</h3>
                <p class="card-text">${servicio.descripcion}</p>
            </div>
        </div>
    `;
});

const form = document.getElementById("formContacto");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre=document.getElementById("nombre").value.trim();
    const telefono=document.getElementById("telefono").value.trim();
    const correo=document.getElementById("correo").value.trim();
    const servicio=document.getElementById("servicio").value;
    const mensaje =document.getElementById("mensaje").value.trim();

    let valido=true;

    if (nombre==="") {
        document.getElementById("errorNombre").textContent="El nombre es obligatorio.";
        valido= false;
    } else if (nombre.length < 3) {
        document.getElementById("errorNombre").textContent= "El nombre debe tener al menos 3 caracteres.";
        valido=false;
    } else {
        document.getElementById("errorNombre").textContent="";
    }

    if (telefono==="") {
        document.getElementById("errorNumero").textContent="El teléfono es obligatorio.";
        valido=false;
    } else if (telefono.length < 7) {
        document.getElementById("errorNumero").textContent="El teléfono debe tener al menos 7 dígitos.";
        valido=false;
    } else {
        document.getElementById("errorNumero").textContent="";
    }

    if (correo ==="") {
        document.getElementById("errorCorreo").textContent= "El correo es obligatorio.";
        valido=false;
    } else if (!correo.includes("@")) {
        document.getElementById("errorCorreo").textContent="El correo no es válido.";
        valido = false;
    } else {
        document.getElementById("errorCorreo").textContent="";
    }

    if (servicio==="") {
        document.getElementById("errorServicio").textContent="Selecciona un servicio.";
        valido =false;
    } else {
        document.getElementById("errorServicio").textContent= "";
    }

    if (mensaje==="") {
        document.getElementById("errorMensaje").textContent="El mensaje es obligatorio.";
        valido= false;
    } else if (mensaje.length < 10) {
        document.getElementById("errorMensaje").textContent="El mensaje debe tener al menos 10 caracteres.";
        valido=false;
    } else {
        document.getElementById("errorMensaje").textContent="";
    }

    if (valido) {
        const mensajeExito=document.getElementById("mensajeExito");
        mensajeExito.textContent="¡Mensaje enviado con éxito!";

        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        clientes.push({nombre, telefono, correo, servicio, mensaje});
        localStorage.setItem("clientes", JSON.stringify(clientes));

        agregarClienteTabla({nombre, telefono, correo, servicio, mensaje});

        form.reset();
        setTimeout(function () {
            mensajeExito.textContent="";
        }, 4000);
    }
});

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute("href"));
        destino.scrollIntoView({ behavior: "smooth" });
    });
});

