// Save platform settings
$('#platform-settings-form').on('submit', function (e) {
    e.preventDefault();
    const paymentMethod = $('#payment-method').val();
    const notifications = $('#notifications').val();
    const permissions = $('#permissions').val();
    alert(`Platform settings saved!\nPayment Method: ${paymentMethod}\nNotifications: ${notifications}\nPermissions: ${permissions}`);
});

// Save security settings
$('#security-settings-form').on('submit', function (e) {
    e.preventDefault();
    const twoFactorAuth = $('#two-factor-auth').val();
    const passwordPolicy = $('#password-policy').val();
    const loginRestrictions = $('#login-restrictions').val();
    alert(`Security settings saved!\nTwo-Factor Authentication: ${twoFactorAuth}\nPassword Policy: ${passwordPolicy}\nLogin Restrictions: ${loginRestrictions}`);
});

// Update API access
$('#api-access-form').on('submit', function (e) {
    e.preventDefault();
    const apiAccess = $('#api-access').val();
    alert(`API access updated!\nAccess Level: ${apiAccess}`);
});