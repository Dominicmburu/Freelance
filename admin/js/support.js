const supportTickets = [
    { id: 'T001', user: 'John Doe', issue: 'Login not working', date: '2024-09-10', status: 'Open' },
    { id: 'T002', user: 'Jane Smith', issue: 'Payment failed', date: '2024-09-09', status: 'Closed' },
    { id: 'T003', user: 'Michael Lee', issue: 'Error on task submission', date: '2024-09-11', status: 'Open' },
];

const chatLogs = [
    { id: 'C001', user: 'John Doe', agent: 'Support1', date: '2024-09-10' },
    { id: 'C002', user: 'Jane Smith', agent: 'Support2', date: '2024-09-09' },
];

const userFeedback = [
    { id: 'F001', user: 'John Doe', feedback: 'Great support!', date: '2024-09-10' },
    { id: 'F002', user: 'Jane Smith', feedback: 'I love the platform!', date: '2024-09-08' },
];

// Rendering functions
function renderSupportTickets() {
    const ticketsBody = $('#support-tickets-body');
    ticketsBody.empty();
    supportTickets.forEach(ticket => {
        ticketsBody.append(`
            <tr>
                <td>${ticket.id}</td>
                <td>${ticket.user}</td>
                <td>${ticket.issue}</td>
                <td>${ticket.date}</td>
                <td>${ticket.status}</td>
                <td><button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#manageTicketModal"
                    data-ticket-id="${ticket.id}" data-user="${ticket.user}" data-issue="${ticket.issue}" data-status="${ticket.status}">
                    Manage
                </button></td>
            </tr>
        `);
    });
}

function renderChatLogs() {
    const chatsBody = $('#chat-logs-body');
    chatsBody.empty();
    chatLogs.forEach(chat => {
        chatsBody.append(`
            <tr>
                <td>${chat.id}</td>
                <td>${chat.user}</td>
                <td>${chat.agent}</td>
                <td>${chat.date}</td>
                <td><button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#viewChatModal"
                    data-chat-id="${chat.id}" data-user="${chat.user}" data-agent="${chat.agent}" data-date="${chat.date}">
                    View
                </button></td>
            </tr>
        `);
    });
}

function renderUserFeedback() {
    const feedbackBody = $('#user-feedback-body');
    feedbackBody.empty();
    userFeedback.forEach(feedback => {
        feedbackBody.append(`
            <tr>
                <td>${feedback.id}</td>
                <td>${feedback.user}</td>
                <td>${feedback.feedback}</td>
                <td>${feedback.date}</td>
                <td><button class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#viewFeedbackModal"
                    data-feedback-id="${feedback.id}" data-user="${feedback.user}" data-feedback="${feedback.feedback}">
                    View
                </button></td>
            </tr>
        `);
    });
}

// Sort by Date Functionality
function sortTableByDate(tableId, dateSelector) {
    const table = $(`#${tableId}`);
    const rows = table.find('tbody tr').toArray();
    rows.sort((a, b) => {
        const dateA = new Date($(a).find(dateSelector).text());
        const dateB = new Date($(b).find(dateSelector).text());
        return dateB - dateA;
    });
    rows.forEach(row => table.append(row));
}

// Event listener for sorting by date
$('th[data-sort="date"]').on('click', function () {
    const tableId = $(this).closest('table').attr('id');
    sortTableByDate(tableId, 'td:nth-child(4)');
});

// Event listener for updating ticket status
$('#update-status-btn').on('click', function () {
    const ticketId = $('#ticket-id').text();
    const updatedStatus = $('#ticket-status').val();
    const ticket = supportTickets.find(t => t.id === ticketId);
    if (ticket) {
        ticket.status = updatedStatus;
        alert(`Status updated to "${updatedStatus}"`);
        renderSupportTickets();
        $('#manageTicketModal').modal('hide');
    }
});

// Initial rendering
renderSupportTickets();
renderChatLogs();
renderUserFeedback();