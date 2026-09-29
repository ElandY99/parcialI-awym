# CONSIGNAS
```
Desarrollo de una interfaz web interactiva para la inscripción a una actividad
Una institución educativa desea disponer de una pequeña aplicación web que permita
a los usuarios consultar información sobre una actividad y registrarse en ella. Ej. Taller
de Introducción al Desarrollo Web.
La aplicación deberá presentar información de la actividad y permitir que una persona
complete un formulario de inscripción.
La interfaz deberá ser desarrollada teniendo en cuenta criterios de estructura semántica,
diseño responsive, usabilidad, interacción y validación de datos.
La aplicación no deberá utilizar Back-End ni Base de Datos. La información será gestionada
únicamente mediante HTML, CSS y JavaScript
```

## REQUERIMIENTOS
### A. Encabezado y navegación
1. La aplicación deberá incluir un encabezado que contenga:
- Nombre de la institución.
- Nombre de la actividad.
- Menú de navegación.
2. El menú deberá permitir desplazarse, como mínimo, hacia:
- Inicio.
- Información.
- Inscripción.
3. Se deberá utilizar una estructura HTML5 semántica.

### B. Informacion de la actividad
1. La página deberá presentar información relacionada con el taller. Como mínimo:
- Nombre.
- Descripción.
- Fecha.
- Horario.
- Modalidad.
- Duración.
- Cupos disponibles.
2. Se deberá utilizar una estructura visual clara que permita diferenciar los distintos elementos
de información.

### C. Diseño de la interfaz
1. La interfaz deberá desarrollarse utilizando HTML5 y CSS3. Deberá contemplar:
- Estructura semántica.
- Jerarquía visual.
- Tipografías.
- Colores.
- Espaciado.
- Bordes.
- Botones.
- Secciones diferenciadas.
2. Se deberá utilizar Flexbox y/o CSS Grid para organizar al menos una parte significativa de la
interfaz.

### D. Diseño Responsive
1. La aplicación deberá adaptarse a diferentes tamaños de pantalla. Como mínimo deberá
contemplarse: Computadora, Tablet y Smartphone

### E. Formulario de Inscripción
1. La aplicación deberá incluir un formulario con los siguientes campos:
- Nombre y apellido.
- Correo electrónico.
- Edad.
- Modalidad de participación:
- Presencial.
- Virtual.
- Área de interés.
- Comentarios.
2. El formulario deberá incluir controles HTML adecuados para cada tipo de información.

### F. Eventos y Validaciones
1. Mediante JavaScript se deberán implementar eventos y validaciones.
Como mínimo:
- Evento submit: Controlar el envío del formulario.
- Evento input o change: Implementar al menos un comportamiento dinámico asociado
a la modificación de un campo.
2. Controlar:
- Campos obligatorios.
- Formato correcto del correo electrónico.
- Edad válida.
- Selección de una modalidad.
- Selección de un área de interés.
3. Cuando exista un error, deberá informarse claramente al usuario.

### G. Comportamiento dinámico y DOM
1. Cuando el formulario sea completado correctamente, no deberá recargarse la página.
JavaScript deberá utilizar el DOM para generar dinámicamente un resumen de la inscripción
con los datos ingresados. Además, deberá mostrarse un mensaje de confirmación.

### H. Manejos de estados
1. La aplicación deberá contemplar diferentes estados de interacción.
- Estado inicial: Formulario disponible para completar.
- Estado con errores: Mostrar mensajes asociados a los campos que presentan
información incorrecta.
- Estado exitoso: Mensaje de confirmación y Resumen de los datos ingresados.
- Estado de datos incompletos: Evitar el procesamiento y solicitar al usuario completar
la información faltante.

### I. Buenas Practicas
1. La aplicación deberá respetar una separación clara entre:
- HTLM (Estructura)
- CSS (Presentacion)
- Javascript (Comportamiento).
2. Se deberá evitar incorporar grandes cantidades de código CSS o JavaScript directamente
dentro del HTML cuando pueda utilizarse un archivo externo.

## Desarrollo

- EL footer debe contar con la información (Alumno: Andrés Elpeza - 600213, carrera: Licenciatura en Gestión de Recursos Tecnológicos - 2026, Aplicaciones Web y Móviles, Universidad Gastón Dachary)
- Toda la información de las inscripciones se guarda en localstorage.
- La actividad de la app mencionada en la consigna será un taller de desarrollo de videojuegos con Godot Engine y ayuda de IA.
- Los archivos de la app deberán separarse y linkearse (css) o importaste/exportarse (ESModules).
- La app va a correr en un server local con npx http-server o liveserver (extensión de vscode).
- Todo el diseño y la paleta de colores deberá estar orientado a videojuegos.
- La estética no debe ser de gamer moderno si no más consolero de los años 2000 (Juegos 16 a32bits, de plataforma y aventura, mario, zelda, sonic, metalslug).
- Existe la carpeta "img" donde hay un fondo de pantalla y un cursor. (el fondo de pantalla es medio oscuro ya que es una motañan y un bosque de noche:  #bca4a1  #4db85b  #252357  #11121a  #267858  #6960c3  #7c5674  #482f97  #154e4f  #553858).