$(document).ready(function () {
    const roles = [
        { name: 'Superadmin', permissions: ['Create', 'Read', 'Update', 'Delete'] },
        { name: 'Admin', permissions: ['Create', 'Read', 'Update'] },
        { name: 'Moderator', permissions: ['Read', 'Update'] }
    ];

    const users = [
        { user: 'John Doe', role: 'Admin', permissions: ['Create', 'Read', 'Update'] },
        { user: 'Jane Smith', role: 'Moderator', permissions: ['Read', 'Update'] }
    ];

    function renderRoles() {
        const roleManagementBody = $('#role-management-body');
        roleManagementBody.empty();

        roles.forEach(role => {
            const row = `
                <tr>
                    <td>${role.name}</td>
                    <td>${role.permissions.join(', ')}</td>
                    <td class="action-buttons">
                        <i class="fa fa-edit edit-role" title="Edit Role" data-role-name="${role.name}"></i>
                        <i class="fa fa-trash delete-role" title="Delete Role" data-role-name="${role.name}"></i>
                    </td>
                </tr>
            `;
            roleManagementBody.append(row);
        });
    }

    function renderUserPermissions() {
        const userPermissionsBody = $('#user-permissions-body');
        userPermissionsBody.empty();

        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.user}</td>
                    <td>${user.role}</td>
                    <td>${user.permissions.join(', ')}</td>
                    <td class="action-buttons">
                        <i class="fa fa-edit edit-permissions" title="Edit Permissions" data-user-name="${user.user}"></i>
                    </td>
                </tr>
            `;
            userPermissionsBody.append(row);
        });
    }

    // Initialize tables
    renderRoles();
    renderUserPermissions();

    // Event listener for creating a role
    $('#roleForm').on('submit', function (e) {
        e.preventDefault();
        const roleName = $('#role-name').val();
        const rolePermissions = $('#role-permissions').val();
        roles.push({ name: roleName, permissions: rolePermissions });
        $('#createRoleModal').modal('hide');
        renderRoles();
    });

    // Event listener for editing a role
    $(document).on('click', '.edit-role', function () {
        const roleName = $(this).data('role-name');
        const role = roles.find(r => r.name === roleName);

        $('#edit-role-name').val(role.name);
        $('#edit-role-permissions').val(role.permissions);
        $('#editRoleModal').modal('show');
    });

    // Event listener for saving edited role
    $('#editRoleForm').on('submit', function (e) {
        e.preventDefault();
        const editedRoleName = $('#edit-role-name').val();
        const editedPermissions = $('#edit-role-permissions').val();
        const roleIndex = roles.findIndex(r => r.name === editedRoleName);
        roles[roleIndex].permissions = editedPermissions;
        $('#editRoleModal').modal('hide');
        renderRoles();
    });

    // Event listener for editing user permissions
    $(document).on('click', '.edit-permissions', function () {
        const userName = $(this).data('user-name');
        const user = users.find(u => u.user === userName);

        $('#user-role').val(user.role);
        $('#user-permissions').val(user.permissions);
        $('#editPermissionsModal').modal('show');
    });

    // Event listener for saving user permissions
    $('#editPermissionsForm').on('submit', function (e) {
        e.preventDefault();
        const userName = $('#user-role').val();
        const newPermissions = $('#user-permissions').val();
        const userIndex = users.findIndex(u => u.user === userName);
        users[userIndex].permissions = newPermissions;
        $('#editPermissionsModal').modal('hide');
        renderUserPermissions();
    });
});