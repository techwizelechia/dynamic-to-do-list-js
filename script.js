// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select the input field, add button, and task list
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If no taskText is passed (e.g., from user input), get it from the input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Check if the taskText is not empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item (li) element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add event listener to the remove button to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(li); // Remove the li from the task list
            removeTaskFromStorage(taskText); // Remove from Local Storage
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Add the new task (li) to the task list (ul)
        taskList.appendChild(li);

        // Clear the input field after adding the task
        taskInput.value = '';

        // Save to Local Storage if the task was added by the user (not loaded from storage)
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Event listener for the 'Add Task' button
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Allow users to add tasks by pressing the Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
