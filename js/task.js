function updateAllProgressBars() {
    const taskItems = document.querySelectorAll('.task-item-c');

    taskItems.forEach((taskItem, index) => {
        const progressSteps = taskItem.querySelectorAll('.progress-step');
        const progressBar = taskItem.querySelector('.progress');

        const currentStep = taskItem.querySelectorAll('.progress-step-active').length;

        progressSteps.forEach((progressStep, idx) => {
            if (idx < currentStep) {
                progressStep.classList.add('progress-step-active');
            } else {
                progressStep.classList.remove('progress-step-active');
            }
        });

        progressBar.style.width = ((currentStep - 1) / (progressSteps.length - 1)) * 100 + '%';
    });
}

updateAllProgressBars();


document.querySelectorAll('.task-item-header-th').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.toggle-icon');
        const declinedSection = content.querySelector('.declined-section');

        if (content.style.display === 'block') {
            content.style.display = 'none';
            icon.classList.replace('fa-minus', 'fa-plus');
        } else {
            content.style.display = 'block';
            icon.classList.replace('fa-plus', 'fa-minus');
            // Show or hide the declined section based on the status
            const isDeclined = false; // Set this to true if the task is declined
            declinedSection.style.display = isDeclined ? 'block' : 'none';
        }
    });
});




document.querySelectorAll('.prof-chat-toggle-btn').forEach(button => {
    button.addEventListener('click', function () {
        const chatArea = this.parentElement.nextElementSibling;
        chatArea.style.display = chatArea.style.display === 'block' ? 'none' : 'block';
    });
});

document.querySelectorAll('.prof-send-message-btn').forEach(button => {
    button.addEventListener('click', function () {
        const chatArea = this.closest('.prof-chat-area');
        const messageInput = chatArea.querySelector('input[type="text"]');
        const chatMessages = chatArea.querySelector('.prof-chat-messages');

        const message = messageInput.value.trim();
        if (message) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('you');
            messageDiv.textContent = `${message}`;

            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            messageInput.value = '';
        }
    });
});

function addProfessorMessage(message) {
    const chatAreas = document.querySelectorAll('.prof-chat-area');

    chatAreas.forEach(chatArea => {
        const chatMessages = chatArea.querySelector('.prof-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.classList.add('professor'); // Add class for professor messages
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    });
}

addProfessorMessage('This is a professor message.');




