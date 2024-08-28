const chatToggle = document.getElementById('chatToggle');
const chatContainer = document.getElementById('chatContainer');

chatToggle.addEventListener('click', function () {
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'block';
        chatToggle.style.display = 'none';
    } else {
        chatContainer.style.display = 'none';
        chatToggle.style.display = 'block';
    }
});