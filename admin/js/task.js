$(document).ready(function () {
    // Sample task data
    const tasks = [
        {
            id: 1,
            name: "Design Homepage",
            createdBy: "Admin",
            assignedTo: "John Doe",
            status: "pending",
            deadline: "2024-09-20",
            communications: ["Sent initial draft on 2024-09-10", "Feedback received on 2024-09-15", "Sent initial draft on 2024-09-10", "Feedback received on 2024-09-15", "Sent initial draft on 2024-09-10", "Feedback received on 2024-09-15"]
        },
        {
            id: 2,
            name: "Create Logo",
            createdBy: "Admin",
            assignedTo: "Mary Smith",
            status: "available",
            deadline: "2024-09-25",
            communications: ["Logo concepts discussed on 2024-09-12"]
        }
    ];

    /**
     * Renders the task list in the table.
     * @param {Array} taskList - The list of tasks to display.
     */
    function renderTaskList(taskList) {
        const taskListBody = $('#task-list-body');
        taskListBody.empty(); // Clear the table

        if (taskList.length === 0) {
            taskListBody.append('<tr><td colspan="5" class="text-center">No tasks found</td></tr>');
            return;
        }

        taskList.forEach(task => {
            const row = `
                <tr>
                    <td>${task.name}</td>
                    <td>${task.status.charAt(0).toUpperCase() + task.status.slice(1)}</td>
                    <td>${task.assignedTo}</td>
                    <td>${task.deadline}</td>
                    <td class="action-buttons">
                        <i class="fa fa-eye view-task" title="View Details" data-task-id="${task.id}"></i>
                        <i class="fa fa-pencil-alt" title="Edit Task" data-task-id="${task.id}"></i>
                        <i class="fa fa-user-edit" title="Reassign Task" data-task-id="${task.id}"></i>
                        <i class="fa fa-check-circle" title="Approve Task" data-task-id="${task.id}"></i>
                        <i class="fa fa-trash" title="Delete Task" data-task-id="${task.id}"></i>
                    </td>
                </tr>
            `;
            taskListBody.append(row);
        });
    }

    // Initial render of tasks
    renderTaskList(tasks);

    /**
     * Filter tasks based on search input and status filter.
     */
    function filterTasks() {
        const searchTerm = $('#search-task').val().toLowerCase();
        const selectedStatus = $('#filter-status').val();

        const filteredTasks = tasks.filter(task => {
            const matchesSearch = task.name.toLowerCase().includes(searchTerm);
            const matchesStatus = selectedStatus ? task.status === selectedStatus : true;
            return matchesSearch && matchesStatus;
        });

        renderTaskList(filteredTasks);
    }

    // Event listeners for real-time filtering
    $('#search-task').on('input', filterTasks);
    $('#filter-status').on('change', filterTasks);

    // Event listener for task actions (view, edit, reassign, approve, delete)
    $(document).on('click', '.action-buttons i', function () {
        const taskId = $(this).data('task-id');
        const task = tasks.find(t => t.id === taskId);

        if ($(this).hasClass('fa-eye')) {
            // View task details
            $('#task-name').text(task.name);
            $('#task-created-by').text(task.createdBy);
            $('#task-assigned-to').text(task.assignedTo);
            $('#task-status').text(task.status.charAt(0).toUpperCase() + task.status.slice(1));
            $('#task-deadline').text(task.deadline);

            // Populate communications
            const communications = task.communications.map(comm => `<li class="list-group-item communication-entry">${comm}</li>`).join("");
            $('#task-communications').html(communications);

            // Show the modal
            $('#taskDetailModal').modal('show');
        } else if ($(this).hasClass('fa-pencil-alt')) {
            // Edit task action
            alert(`Edit task: ${task.name}`);
        } else if ($(this).hasClass('fa-user-edit')) {
            // Reassign task action
            alert(`Reassign task: ${task.name}`);
        } else if ($(this).hasClass('fa-check-circle')) {
            // Approve task action
            alert(`Approve task: ${task.name}`);
        } else if ($(this).hasClass('fa-trash')) {
            // Delete task action
            if (confirm(`Are you sure you want to delete task: ${task.name}?`)) {
                alert(`Task ${task.name} deleted.`);
                // Remove task from tasks array
                const taskIndex = tasks.findIndex(t => t.id === taskId);
                tasks.splice(taskIndex, 1);
                // Re-render task list
                renderTaskList(tasks);
            }
        }
    });
});