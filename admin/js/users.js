$(document).ready(function () {
    // Example user data - this should be replaced with actual data from the server or database
    let users = [
        { id: 1, username: 'john_doe', role: 'Writer', status: 'Active' },
        { id: 2, username: 'jane_smith', role: 'Client', status: 'Inactive' },
        { id: 3, username: 'admin_user', role: 'Admin', status: 'Active' },
        { id: 4, username: 'alex_writer', role: 'Writer', status: 'Active' },
        { id: 5, username: 'maria_client', role: 'Client', status: 'Inactive' }
    ];

    const userListBody = $('#user-list-body');
    const searchUserInput = $('#search-user');
    const filterRoleSelect = $('#filter-role');
    const filterStatusSelect = $('#filter-status');

    /**
     * Renders user rows into the table body.
     * @param {Array} users - List of users to display.
     */
    function displayUsers(users) {
        userListBody.empty();

        if (users.length === 0) {
            userListBody.append(`<tr><td colspan="4" class="text-center">No users found</td></tr>`);
            return;
        }

        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.role}</td>
                    <td>${user.status}</td>
                    <td class="action-buttons">
                        <i class="fa fa-eye view-user" title="View Profile" data-user-id="${user.id}"></i>
                        <i class="fa fa-pencil-alt" title="Edit" data-username="${user.username}"></i>
                        <i class="fa fa-key" title="Reset Password" data-username="${user.username}"></i>
                        <i class="fa fa-${user.status === 'Active' ? 'toggle-on' : 'toggle-off'}" 
                            title="${user.status === 'Active' ? 'Deactivate' : 'Activate'}" 
                            data-username="${user.username}"></i>
                        <i class="fa fa-trash" title="Delete" data-username="${user.username}"></i>
                    </td>
                </tr>`;
            userListBody.append(row);
        });
    }

    /**
     * Filters users based on search, role, and status inputs.
     */
    function filterUsers() {
        const searchTerm = searchUserInput.val().toLowerCase();
        const selectedRole = filterRoleSelect.val();
        const selectedStatus = filterStatusSelect.val();

        const filteredUsers = users.filter(user => {
            const matchesSearch = user.username.toLowerCase().includes(searchTerm);
            const matchesRole = selectedRole ? user.role === selectedRole : true;
            const matchesStatus = selectedStatus ? user.status === selectedStatus : true;
            return matchesSearch && matchesRole && matchesStatus;
        });

        displayUsers(filteredUsers);
    }

    // Event listeners for real-time filtering
    searchUserInput.on('input', filterUsers);
    filterRoleSelect.on('change', filterUsers);
    filterStatusSelect.on('change', filterUsers);

    // Initial display of users
    displayUsers(users);

    // Event listener for user actions (edit, view profile, etc.)
    $(document).on('click', '.action-buttons i', function (event) {
        const target = $(event.target);
        const userId = target.data('user-id');
        const username = target.data('username');

        if (target.hasClass('view-user')) {
            const userDetails = users.find(user => user.id === userId);
            $('#profile-username').text(userDetails.username);
            $('#profile-email').text(userDetails.email);
            $('#profile-role').text(userDetails.role);
            $('#profile-status').text(userDetails.status);
            $('#userProfileModal').modal('show');
        } else if (target.hasClass('fa-pencil-alt')) {
            alert(`Edit user: ${username}`); // Replace with actual edit logic
        } else if (target.hasClass('fa-key')) {
            alert(`Reset password for user: ${username}`); // Replace with actual reset logic
        } else if (target.hasClass('fa-toggle-on') || target.hasClass('fa-toggle-off')) {
            alert(`Toggle status for user: ${username}`); // Replace with toggle logic
        } else if (target.hasClass('fa-trash')) {
            if (confirm(`Are you sure you want to delete user: ${username}?`)) {
                alert(`User ${username} deleted.`); // Replace with actual delete logic
            }
        }
    });
});