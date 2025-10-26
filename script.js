document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const addTaskForm = document.getElementById('addTaskForm');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const tasksContainer = document.getElementById('tasksContainer');
    
    // Массив для хранения задач
    let tasks = [];
    
    // Функция для добавления задачи
    function addTask(title, description) {
        const task = {
            id: Date.now(), // Простой способ генерации уникального ID
            title: title,
            description: description,
            date: new Date().toLocaleDateString('ru-RU')
        };
        
        tasks.push(task);
        renderTasks();
        
        // Очистка формы
        addTaskForm.reset();
    }
    
    // Функция для удаления задачи
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }
    
    // Функция для отображения задач
    function renderTasks() {
        // Очищаем контейнер
        tasksContainer.innerHTML = '';
        
        if (tasks.length === 0) {
            // Если задач нет, показываем сообщение
            tasksContainer.innerHTML = `
                <div class="empty-state">
                    <p>У вас пока нет задач</p>
                    <p>Добавьте первую задачу, используя форму выше</p>
                </div>
            `;
        } else {
            // Добавляем каждую задачу в контейнер
            tasks.forEach(task => {
                const taskCard = document.createElement('div');
                taskCard.className = 'task-card';
                taskCard.innerHTML = `
                    <div class="task-header">
                        <h3 class="task-title">${escapeHtml(task.title)}</h3>
                        <button class="delete-btn" data-id="${task.id}">×</button>
                    </div>
                    ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
                    <p class="task-date">Добавлено: ${task.date}</p>
                `;
                
                tasksContainer.appendChild(taskCard);
            });
            
            // Добавляем обработчики событий для кнопок удаления
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const taskId = parseInt(this.getAttribute('data-id'));
                    deleteTask(taskId);
                });
            });
        }
    }
    
    // Функция для экранирования HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Обработчик отправки формы
    addTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = taskTitleInput.value.trim();
        const description = taskDescriptionInput.value.trim();
        
        if (title) {
            addTask(title, description);
        } else {
            alert('Пожалуйста, введите название задачи');
            taskTitleInput.focus();
        }
    });
    
    // Инициализация: отображаем задачи (если они есть)
    renderTasks();
});
