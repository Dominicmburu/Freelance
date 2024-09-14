$(document).ready(function () {
    const paymentHistory = [
        { id: 'TXN001', amount: '$500', date: '2024-09-01', type: 'Task Payment', status: 'Completed', user: 'John Doe' },
        { id: 'TXN002', amount: '$750', date: '2024-09-03', type: 'Withdrawal', status: 'Pending', user: 'Jane Smith' },
        { id: 'TXN003', amount: '$100', date: '2024-09-04', type: 'Refund', status: 'Refunded', user: 'Michael Lee' },
    ];

    const payouts = [
        {
            id: 'P001', amount: '$300', requestedBy: 'John Doe', status: 'Approved', date: '2024-09-05',
            tasks: [
                { name: 'Task 1', amount: 100, status: 'Paid' },
                { name: 'Task 2', amount: 200, status: 'Paid' }
            ]
        },
        {
            id: 'P002', amount: '$150', requestedBy: 'Jane Smith', status: 'Pending', date: '2024-09-06',
            tasks: [
                { name: 'Task 3', amount: 100, status: 'Paid' },
                { name: 'Task 4', amount: 50, status: 'Refunded' }
            ]
        }
    ];

    function renderPaymentHistory(filteredPayments = paymentHistory) {
        const paymentHistoryBody = $('#payment-history-body');
        paymentHistoryBody.empty();

        filteredPayments.forEach(payment => {
            const row = `
                <tr>
                    <td>${payment.id}</td>
                    <td>${payment.amount}</td>
                    <td>${payment.date}</td>
                    <td>${payment.type}</td>
                    <td>${payment.status}</td>
                    <td>${payment.user}</td>
                    <td class="action-buttons">
                        <i class="fa fa-eye view-payment" title="View Details" data-payment-id="${payment.id}"></i>
                        <i class="fa fa-trash" title="Delete"></i>
                    </td>
                </tr>
            `;
            paymentHistoryBody.append(row);
        });
    }

    function renderPayouts(filteredPayouts = payouts) {
        const payoutsBody = $('#payouts-body');
        payoutsBody.empty();

        filteredPayouts.forEach(payout => {
            const row = `
                <tr>
                    <td>${payout.id}</td>
                    <td>${payout.amount}</td>
                    <td>${payout.requestedBy}</td>
                    <td>${payout.status}</td>
                    <td>${payout.date}</td>
                    <td class="action-buttons">
                        <i class="fa fa-check-circle approve-payout" title="Approve Payout" data-payout-id="${payout.id}"></i>
                        <i class="fa fa-eye view-payout" title="View Details" data-payout-id="${payout.id}"></i>
                        <i class="fa fa-undo refund-payout" title="Process Refund" data-payout-id="${payout.id}"></i>
                        <i class="fa fa-trash" title="Delete"></i>
                    </td>
                </tr>
            `;
            payoutsBody.append(row);
        });
    }

    function filterPayments() {
        const searchUser = $('#search-user').val().toLowerCase();
        const taskType = $('#filter-task-type').val();
        const status = $('#filter-status').val();

        const filteredPayments = paymentHistory.filter(payment => {
            const matchesUser = payment.user.toLowerCase().includes(searchUser);
            const matchesTaskType = taskType ? payment.type === taskType : true;
            const matchesStatus = status ? payment.status === status : true;
            return matchesUser && matchesTaskType && matchesStatus;
        });

        renderPaymentHistory(filteredPayments);
    }

    function filterPayouts() {
        const searchUser = $('#search-payout-user').val().toLowerCase();
        const date = $('#filter-date').val();

        const filteredPayouts = payouts.filter(payout => {
            const matchesUser = payout.requestedBy.toLowerCase().includes(searchUser);
            const matchesDate = date ? payout.date === date : true;
            return matchesUser && matchesDate;
        });

        renderPayouts(filteredPayouts);
    }

    function showPayoutDetails(payoutId) {
        const payout = payouts.find(p => p.id === payoutId);
        if (payout) {
            $('#payout-id').text(payout.id);

            let totalWithdrawal = 0;
            const taskList = payout.tasks.map(task => {
                const taskAmount = task.status === 'Paid' ? task.amount : 0;
                totalWithdrawal += taskAmount;

                return `
                    <li class="list-group-item">
                        <strong>${task.name}</strong>: $${task.amount} - ${task.status}
                    </li>
                `;
            }).join('');

            $('#task-list').html(taskList);
            $('#total-withdrawal').text(totalWithdrawal);

            $('#payoutDetailsModal').modal('show');
        }
    }


    // Event listeners for filtering payments and payouts
    $('#search-user, #filter-task-type, #filter-status').on('input change', filterPayments);
    $('#search-payout-user, #filter-date').on('input change', filterPayouts);

    // Event listeners for viewing payment and payout details
    $(document).on('click', '.view-payment', function () {
        const paymentId = $(this).data('payment-id');
        const payment = paymentHistory.find(p => p.id === paymentId);
        if (payment) {
            $('#transaction-id').text(payment.id);
            $('#transaction-amount').text(payment.amount);
            $('#transaction-type').text(payment.type);
            $('#transaction-status').text(payment.status);
            $('#transaction-date').text(payment.date);
            $('#transaction-user').text(payment.user);
            $('#paymentDetailsModal').modal('show');
        }
    });

    // Event listener for viewing payout details
    $(document).on('click', '.view-payout', function () {
        const payoutId = $(this).data('payout-id');
        showPayoutDetails(payoutId);
    });

    // Event listener for updating the approved amount
    $('#approve-payout-btn').on('click', function () {
        const approvedAmount = $('#total-withdrawal').text();
        alert(`Approved amount updated to $${approvedAmount}`);
    });

    // Event listener for processing refund
    $(document).on('click', '.refund-payout', function () {
        const payoutId = $(this).data('payout-id');
        const payout = payouts.find(p => p.id === payoutId);
        if (payout) {
            $('#refund-transaction-id').text(payout.id);
            $('#refund-amount').val(payout.amount.replace('$', ''));
            $('#refundModal').modal('show');
        }
    });

    $('#confirm-refund-btn').on('click', function () {
        const refundId = $('#refund-transaction-id').text();
        const refundAmount = $('#refund-amount').val();
        const refundReason = $('#refund-reason').val();

        if (confirm(`Confirm refund of $${refundAmount} for Payout ID ${refundId}?`)) {
            const payout = payouts.find(p => p.id === refundId);
            payout.status = 'Refunded';
            payout.amount = `$${refundAmount}`;
            alert('Refund processed successfully!');
            renderPayouts();
            $('#refundModal').modal('hide');
        }
    });

    // Initialize the tables with data
    renderPaymentHistory();
    renderPayouts();

    // Placeholder download actions
    $('.btn-download').on('click', function () {
        alert('Report downloaded successfully.');
    });
});