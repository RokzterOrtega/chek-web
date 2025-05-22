/* calendario*/
const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendar(month, year) {
  calendarDates.innerHTML = '';
  monthYear.textContent = `${months[month]} ${year}`;

  // Get the first day of the month
  const firstDay = new Date(year, month, 1).getDay();

  // Get the number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create blanks for days of the week before the first day
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    calendarDates.appendChild(blank);
  }

  // Get today's date
  const today = new Date();

  // Populate the days
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.textContent = i;
    calendarDates.appendChild(day);

    // Highlight today's date
    if (
      i === today.getDate() &&
      year === today.getFullYear() &&
      month === today.getMonth()
    ) {
      day.classList.add('current-date');
    }
    calendarDates.appendChild(day);
  }
}


renderCalendar(currentMonth, currentYear);

prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});
/* fin de calendario */

/* pregunta de modificacion
calendarDates.addEventListener('click', (e) => {
  let result = confirm("Desea modificar este dia?");
  if (result = confirm) {

  } else {

  }
}        */

// Muestra el popup al hacer clic en un día
document.querySelectorAll('.calendar-dates').forEach(dia => {
  dia.addEventListener('click', () => {
    document.getElementById('popup').style.display = 'block';
  });
});

// Maneja el botón "Sí"
document.getElementById('modificar')?.addEventListener('click', () => {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('formulario').style.display = 'block';
 // alert("Atencion:  recuerda que toda modificacion debe realizarse 24 horas antes de el dia asignado.")
  // alert("Recuerda que debes avisar al compañero con antelacion sobre este cambio.")
});

// Maneja el botón "No"
document.getElementById('cancelar')?.addEventListener('click', () => {
  document.getElementById('popup').style.display = 'none';
  alert("No se ah modificado el dia");

});

//guardado de datos
document.getElementById('submit')?.addEventListener('click', async (e) => {
  alert("no recarga exitosa")
console.log("ok1");

  const formData = new FormData(e.target); // Captura los datos del formulario
  const data = {
    fecha_inicio: formData.get('fecha_inicio'),
    fecha_fin: formData.get('fecha_fin'),
    hora_inicio: formData.get('hora_inicio'),
    hora_fin: formData.get('hora_fin'),
  };
  alert("captura de datos terminada")


  try {
    // Envía los datos al servidor mediante fetch
    const response = await fetch('http://localhost:3000/guardar-turno', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    alert("datos eniados al servidor");
    if (response.ok) {
      alert('¡Datos guardados correctamente!');
      // Oculta el formulario después de guardar
      document.getElementById('formulario').style.display = 'none';
    } else {
      alert('Ocurrió un error al guardar los datos.');
    }
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    alert('No se pudo conectar con el servidor.');
  }
});


