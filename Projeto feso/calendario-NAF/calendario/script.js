// Elementos principais
const calendarBody = document.getElementById('calendar-body');
const currentMonthElement = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const scheduledDaysContainer = document.getElementById('scheduled-days');

// Variáveis globais
let currentDate = new Date();
const scheduledDays = new Set(); // Armazena os dias agendados no formato "YYYY-MM-DD"

// Função para formatar datas como "YYYY-MM-DD"
function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// Atualiza a lista de dias agendados
function updateScheduledDays() {
  scheduledDaysContainer.innerHTML = '';

  if (scheduledDays.size === 0) {
    scheduledDaysContainer.innerHTML = '<p>Nenhum dia agendado.</p>';
  } else {
    scheduledDays.forEach((day) => {
      const dayBlock = document.createElement('div');
      dayBlock.classList.add('scheduled-day');
      dayBlock.textContent = day;
      scheduledDaysContainer.appendChild(dayBlock);
    });
  }
}

// Função para gerar o calendário
function generateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Atualiza o título do mês
  currentMonthElement.textContent = date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  // Limpa o corpo do calendário
  calendarBody.innerHTML = '';

  // Determina o primeiro dia da semana e a quantidade de dias no mês
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Total de células (6 semanas = 42 células no total)
  const totalCells = 42;

  // Preenche o calendário
  let dayCount = 1; // Dia atual do mês
  let nextMonthDay = 1; // Contador para o próximo mês

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('td');

    // Dias do mês anterior
    if (i < firstDayOfWeek) {
      cell.classList.add('disabled');
    }
    // Dias do mês atual
    else if (dayCount <= daysInMonth) {
      cell.textContent = dayCount;

      // Verifica se o dia já está agendado
      const dateKey = formatDate(year, month, dayCount);
      if (scheduledDays.has(dateKey)) {
        cell.classList.add('unavailable');
      }

      // Adiciona funcionalidade de marcar/desmarcar
      cell.addEventListener('click', () => {
        if (scheduledDays.has(dateKey)) {
          scheduledDays.delete(dateKey);
          cell.classList.remove('unavailable');
        } else {
          scheduledDays.add(dateKey);
          cell.classList.add('unavailable');
        }
        updateScheduledDays();
      });

      dayCount++;
    }
    // Dias do próximo mês
    else {
      cell.classList.add('disabled');
    }

    // Adiciona a célula à tabela
    if (i % 7 === 0) {
      var row = document.createElement('tr');
      calendarBody.appendChild(row);
    }
    row.appendChild(cell);
  }

  // Atualiza a lista de dias agendados
  updateScheduledDays();
}

// Navegação entre meses
prevMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate);
});

nextMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate);
});

// Inicializa o calendário
generateCalendar(currentDate);
