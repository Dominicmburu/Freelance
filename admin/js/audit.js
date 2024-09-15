$(document).ready(function () {
    // Sample data for system logs and user logs
    const systemLogs = [
        { id: 1, action: 'Updated Payment Settings', user: 'Admin1', date: '2024-09-10', details: 'Changed payment provider from PayPal to Stripe' },
        { id: 2, action: 'Deleted User', user: 'Admin2', date: '2024-09-11', details: 'Removed user ID 12345 from the platform' }
    ];

    const userLogs = [
        { id: 1, action: 'User Login', user: 'User1', date: '2024-09-12', details: 'Logged in from IP 192.168.1.1' },
        { id: 2, action: 'Submitted Task', user: 'User2', date: '2024-09-13', details: 'Completed Task ID 56789' }
    ];

    // Function to render logs
    function renderLogs(logs, target) {
        const tbody = $(target);
        tbody.empty();

        logs.forEach(log => {
            const row = `
                <tr>
                    <td>${log.id}</td>
                    <td>${log.action}</td>
                    <td>${log.user}</td>
                    <td>${log.date}</td>
                    <td class="action-buttons">
                        <i class="fa fa-eye view-log" title="View Details" data-log-id="${log.id}" data-log-type="${target}"></i>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    // Render system logs and user logs
    renderLogs(systemLogs, '#system-logs-body');
    renderLogs(userLogs, '#user-logs-body');

    // Event listener for viewing log details
    $(document).on('click', '.view-log', function () {
        const logId = $(this).data('log-id');
        const logType = $(this).data('log-type');
        const logData = logType === '#system-logs-body' ? systemLogs : userLogs;
        const log = logData.find(l => l.id == logId);

        if (log) {
            $('#log-id').text(log.id);
            $('#log-action').text(log.action);
            $('#log-user').text(log.user);
            $('#log-date').text(log.date);
            $('#log-details').text(log.details);
            $('#viewLogModal').modal('show');
        }
    });

});