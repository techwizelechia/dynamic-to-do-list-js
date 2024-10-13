// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Select the input field, add button, and task list
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get the value of the input field and trim whitespace
        const taskText = taskInput.value.trim();

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
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Add the new task (li) to the task list (ul)
        taskList.appendChild(li);

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Event listener for the 'Add Task' button
    addButton.addEventListener('click', addTask);

    // Allow users to add tasks by pressing the Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // Call addTask when Enter is pressed
        }
    });
});
