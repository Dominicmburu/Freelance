const chatToggle = document.getElementById('chatToggle');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.querySelector('.close-chat');

chatToggle.addEventListener('click', function () {
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'block';
        chatToggle.style.display = 'none';
    } else {
        chatContainer.style.display = 'none';
        chatToggle.style.display = 'block';
    }
});

closeChat.addEventListener('click', function () {
    chatContainer.style.display = 'none';
    chatToggle.style.display = 'flex';
});