document.getElementById('btnTraerMensajes').addEventListener('click', () => {
    fetch('https://ignacionavazo.pythonanywhere.com/mensajes')   
      .then(response => response.json())
      .then(datos => {
        console.log("datos", datos)
        const tablaBody = document.querySelector('#tablaMensajes tbody');
        tablaBody.innerHTML = ''; // Limpiar tabla antes de agregar nuevos datos

        // Iterar sobre los datos y agregar filas a la tabla
        datos.forEach(dato => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${dato.id}</td>
            <td>${dato.nombre}</td>
            <td>${dato.telefono}</td>
            <td>${dato.email}</td>
            <td>${dato.mensaje_texto}</td>
            <td>${dato.fecha_envio}</td>
            <td>${dato.leido}</td>
            <td>${dato.gestion}</td>
          `;
          tablaBody.appendChild(fila);
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
});

document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    
    // Obtener los valores de los campos
    const id = document.getElementById('idInput').value;
    const gestion = document.getElementById('detalleInput').value;

    const formData = new FormData();
    formData.append('gestion', gestion); // Agregar el detalle a los datos del formulario

    fetch(`https://ignacionavazo.pythonanywhere.com/mensajes/${id}`, {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      // Aquí podrías mostrar una confirmación al usuario o hacer algo con la respuesta del servidor
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
    });
});
