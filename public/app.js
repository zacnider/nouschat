/**
 * Nous Chat Interface - Main Application JavaScript
 * Provides functionality for the chat application, including:
 * - Chat functionality
 * - API interaction
 * - Settings management
 * - Conversation handling
 * - UI management
 * - Localization
 */

// State management
const state = {
    currentLanguage: 'en',
    currentTheme: localStorage.getItem('theme') || 'light',
    currentTab: 'chat',
    conversations: {},
    currentConversationId: null,
    apiKey: localStorage.getItem('nousApiKey') || '',
    model: localStorage.getItem('nousModel') || 'DeepHermes-3-Mistral-24B-Preview',
    temperature: parseFloat(localStorage.getItem('temperature')) || 0.7,
    maxTokens: parseInt(localStorage.getItem('maxTokens')) || 1000,
    systemTemplate: localStorage.getItem('systemTemplate') || 'default',
    useCustomTemplate: localStorage.getItem('useCustomTemplate') === 'true',
    customSystemMessage: localStorage.getItem('customSystemMessage') || '',
    tokenUsage: {
        totalTokens: parseInt(localStorage.getItem('totalTokens')) || 0,
        promptTokens: parseInt(localStorage.getItem('promptTokens')) || 0,
        completionTokens: parseInt(localStorage.getItem('completionTokens')) || 0
    },
    estimatedCost: parseFloat(localStorage.getItem('estimatedCost')) || 0,
    waitingForResponse: false,
    editingConversationId: null
};

// System message templates
const systemTemplates = {
    'default': {
        en: localization.en.defaultSystemMessage,
        tr: localization.tr.defaultSystemMessage,
        de: localization.de.defaultSystemMessage
    },
    'creative': {
        en: localization.en.creativeSystemMessage,
        tr: localization.tr.creativeSystemMessage,
        de: localization.de.creativeSystemMessage
    },
    'code': {
        en: localization.en.codeSystemMessage,
        tr: localization.tr.codeSystemMessage,
        de: localization.de.codeSystemMessage
    },
    'thoughtful': {
        en: localization.en.thoughtfulSystemMessage,
        tr: localization.tr.thoughtfulSystemMessage,
        de: localization.de.thoughtfulSystemMessage
    },
    'concise': {
        en: localization.en.conciseSystemMessage,
        tr: localization.tr.conciseSystemMessage,
        de: localization.de.conciseSystemMessage
    }
};

// DOM Elements
const elements = {
    // Tabs
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Chat elements
    chatMessages: document.getElementById('chat-messages'),
    messageInput: document.getElementById('message-input'),
    sendButton: document.getElementById('send-message-btn'),
    newChatButton: document.getElementById('new-chat-btn'),
    activeChatName: document.getElementById('active-chat-name'),
    conversationsList: document.getElementById('conversations-list'),
    
    // Settings elements
    apiKeyInput: document.getElementById('api-key'),
    modelSelection: document.getElementById('model-selection'),
    temperatureSlider: document.getElementById('temperature'),
    temperatureValue: document.getElementById('temperature-value'),
    maxTokensSlider: document.getElementById('max-tokens'),
    maxTokensValue: document.getElementById('max-tokens-value'),
    systemTemplateSelect: document.getElementById('system-template'),
    useCustomTemplateCheckbox: document.getElementById('use-custom-template'),
    customSystemMessageTextarea: document.getElementById('custom-system-message'),
    saveSettingsButton: document.getElementById('save-settings-btn'),
    
    // Export elements
    exportFormatSelect: document.getElementById('export-format'),
    exportButton: document.getElementById('export-btn'),
    
    // Modals
    modalOverlay: document.getElementById('modal-overlay'),
    renameModal: document.getElementById('rename-modal'),
    deleteModal: document.getElementById('delete-modal'),
    clearModal: document.getElementById('clear-modal'),
    newConversationNameInput: document.getElementById('new-conversation-name'),
    saveRenameButton: document.getElementById('save-rename-btn'),
    cancelRenameButton: document.getElementById('cancel-rename-btn'),
    confirmDeleteButton: document.getElementById('confirm-delete-btn'),
    cancelDeleteButton: document.getElementById('cancel-delete-btn'),
    confirmClearButton: document.getElementById('confirm-clear-btn'),
    cancelClearButton: document.getElementById('cancel-clear-btn'),
    
    // Theme toggle
    lightThemeButton: document.getElementById('light-theme-btn'),
    darkThemeButton: document.getElementById('dark-theme-btn'),
    
    // Language selector
    languageButtons: document.querySelectorAll('.lang-btn'),
    
    // Stats elements
    totalTokensElement: document.getElementById('total-tokens'),
    promptTokensElement: document.getElementById('prompt-tokens'),
    completionTokensElement: document.getElementById('completion-tokens'),
    estimatedCostElement: document.getElementById('estimated-cost'),
    
    // Toast
    toast: document.getElementById('toast')
};

// Initialize the application
function initializeApp() {
    loadConversations();
    updateUIForCurrentLanguage();
    updateThemeUI();
    updateStatsDisplay();
    setupEventListeners();
    
    // Set up the UI based on stored state
    elements.apiKeyInput.value = state.apiKey;
    elements.modelSelection.value = state.model;
    elements.temperatureSlider.value = state.temperature;
    elements.temperatureValue.textContent = state.temperature;
    elements.maxTokensSlider.value = state.maxTokens;
    elements.maxTokensValue.textContent = state.maxTokens;
    elements.systemTemplateSelect.value = state.systemTemplate;
    elements.useCustomTemplateCheckbox.checked = state.useCustomTemplate;
    elements.customSystemMessageTextarea.value = state.customSystemMessage;
    elements.customSystemMessageTextarea.disabled = !state.useCustomTemplate;
    
    // If no conversations exist, create a default one
    if (Object.keys(state.conversations).length === 0) {
        createNewConversation();
    } else if (!state.currentConversationId || !state.conversations[state.currentConversationId]) {
        // Set the first conversation as active if none is selected
        state.currentConversationId = Object.keys(state.conversations)[0];
    }
    
    // Update UI with current conversation
    updateConversationsList();
    displayCurrentConversation();
}

// Set up all event listeners
function setupEventListeners() {
    // Tab navigation
    elements.tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Chat functionality
    elements.sendButton.addEventListener('click', sendMessage);
    elements.messageInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    elements.newChatButton.addEventListener('click', createNewConversation);
    
    // Settings
    elements.temperatureSlider.addEventListener('input', e => {
        elements.temperatureValue.textContent = e.target.value;
    });
    elements.maxTokensSlider.addEventListener('input', e => {
        elements.maxTokensValue.textContent = e.target.value;
    });
    elements.useCustomTemplateCheckbox.addEventListener('change', e => {
        elements.customSystemMessageTextarea.disabled = !e.target.checked;
        
        if (e.target.checked && elements.customSystemMessageTextarea.value === '') {
            // Pre-fill with the current template
            const templateKey = elements.systemTemplateSelect.value;
            elements.customSystemMessageTextarea.value = systemTemplates[templateKey][state.currentLanguage];
        }
    });
    elements.systemTemplateSelect.addEventListener('change', e => {
        if (!elements.useCustomTemplateCheckbox.checked) {
            return;
        }
        
        // Update custom message with selected template
        const templateKey = e.target.value;
        elements.customSystemMessageTextarea.value = systemTemplates[templateKey][state.currentLanguage];
    });
    elements.saveSettingsButton.addEventListener('click', saveSettings);
    
    // Export
    elements.exportButton.addEventListener('click', exportConversation);
    
    // Modals
    elements.modalOverlay.addEventListener('click', closeAllModals);
    elements.cancelRenameButton.addEventListener('click', closeAllModals);
    elements.cancelDeleteButton.addEventListener('click', closeAllModals);
    elements.cancelClearButton.addEventListener('click', closeAllModals);
    elements.saveRenameButton.addEventListener('click', renameCurrentConversation);
    elements.confirmDeleteButton.addEventListener('click', deleteCurrentConversation);
    elements.confirmClearButton.addEventListener('click', clearCurrentConversation);
    
    // Theme toggle
    elements.lightThemeButton.addEventListener('click', () => setTheme('light'));
    elements.darkThemeButton.addEventListener('click', () => setTheme('dark'));
    
    // Language selector
    elements.languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.getAttribute('data-lang'));
        });
    });
}

// Localization functions
function updateUIForCurrentLanguage() {
    const currentLangData = localization[state.currentLanguage];
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (currentLangData[key]) {
            element.textContent = currentLangData[key];
        }
    });
    
    // Update all elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (currentLangData[key]) {
            element.placeholder = currentLangData[key];
        }
    });
    
    // Update active language button
    elements.languageButtons.forEach(button => {
        const lang = button.getAttribute('data-lang');
        if (lang === state.currentLanguage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Update document title
    document.title = currentLangData.appTitle;
}

function setLanguage(lang) {
    if (!localization[lang]) return;
    
    state.currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateUIForCurrentLanguage();
    updateConversationsList(); // Update conversation list with correct labels
}

// Theme functions
function setTheme(theme) {
    state.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeUI();
}

function updateThemeUI() {
    if (state.currentTheme === 'dark') {
        elements.darkThemeButton.classList.add('active');
        elements.lightThemeButton.classList.remove('active');
    } else {
        elements.lightThemeButton.classList.add('active');
        elements.darkThemeButton.classList.remove('active');
    }
}

// Tab navigation
function switchTab(tabName) {
    state.currentTab = tabName;
    
    // Update tab buttons
    elements.tabButtons.forEach(button => {
        if (button.getAttribute('data-tab') === tabName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Update tab content
    elements.tabContents.forEach(content => {
        if (content.id === `${tabName}-tab`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Conversation management
function loadConversations() {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
        state.conversations = JSON.parse(savedConversations);
    }
    
    const currentConversationId = localStorage.getItem('currentConversationId');
    if (currentConversationId && state.conversations[currentConversationId]) {
        state.currentConversationId = currentConversationId;
    }
}

function saveConversations() {
    localStorage.setItem('conversations', JSON.stringify(state.conversations));
    localStorage.setItem('currentConversationId', state.currentConversationId);
}

function createNewConversation() {
    const timestamp = new Date().toLocaleString();
    const texts = localization[state.currentLanguage];
    const newId = 'conv_' + Date.now();
    const newName = `${texts.untitledConversation} (${timestamp})`;
    
    state.conversations[newId] = {
        name: newName,
        messages: []
    };
    
    state.currentConversationId = newId;
    saveConversations();
    updateConversationsList();
    displayCurrentConversation();
    
    // Focus the message input
    elements.messageInput.focus();
    
    // Show chat tab if not active
    if (state.currentTab !== 'chat') {
        switchTab('chat');
    }
}

function updateConversationsList() {
    elements.conversationsList.innerHTML = '';
    
    Object.entries(state.conversations).forEach(([id, conversation]) => {
        const item = document.createElement('div');
        item.className = 'conversation-item';
        if (id === state.currentConversationId) {
            item.classList.add('active');
        }
        
        const textSpan = document.createElement('span');
        textSpan.className = 'conversation-text';
        textSpan.textContent = conversation.name;
        
        const actions = document.createElement('div');
        actions.className = 'conversation-actions';
        
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            openRenameModal(id);
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            openDeleteModal(id);
        });
        
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        
        item.appendChild(textSpan);
        item.appendChild(actions);
        
        item.addEventListener('click', () => {
            switchConversation(id);
        });
        
        elements.conversationsList.appendChild(item);
    });
}

function switchConversation(conversationId) {
    if (!state.conversations[conversationId]) return;
    
    state.currentConversationId = conversationId;
    saveConversations();
    updateConversationsList();
    displayCurrentConversation();
    
    // Show chat tab if not active
    if (state.currentTab !== 'chat') {
        switchTab('chat');
    }
}

function displayCurrentConversation() {
    const conversation = state.conversations[state.currentConversationId];
    if (!conversation) return;
    
    // Update chat header
    elements.activeChatName.textContent = conversation.name;
    
    // Clear chat messages
    elements.chatMessages.innerHTML = '';
    
    // Display messages or empty state
    if (conversation.messages.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-chat-message';
        emptyMessage.innerHTML = `
            <i class="fas fa-comment-dots"></i>
            <p>${localization[state.currentLanguage].emptyChat}</p>
        `;
        elements.chatMessages.appendChild(emptyMessage);
    } else {
        conversation.messages.forEach(message => {
            addMessageToUI(message.role, message.content);
        });
    }
    
    // Scroll to bottom
    scrollToBottom();
}

// Chat functionality
function sendMessage() {
    const messageText = elements.messageInput.value.trim();
    if (!messageText || state.waitingForResponse) return;
    
    if (!state.apiKey) {
        showToast(localization[state.currentLanguage].missingApiKey, 'error');
        switchTab('settings');
        return;
    }
    
    // Add user message to UI and state
    addMessageToConversation('user', messageText);
    elements.messageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Disable input while waiting for response
    state.waitingForResponse = true;
    elements.sendButton.disabled = true;
    elements.messageInput.disabled = true;
    
    // Prepare messages for API request
    const conversation = state.conversations[state.currentConversationId];
    const messages = [
        {
            role: 'system',
            content: getSystemMessage()
        }
    ];
    
    // Add previous messages for context (limit to last 10 messages to avoid token limits)
    const contextMessages = conversation.messages.slice(-10);
    contextMessages.forEach(msg => {
        messages.push({
            role: msg.role,
            content: msg.content
        });
    });
    
    // Send request to API
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: state.apiKey,
            model: state.model,
            messages: messages,
            temperature: state.temperature,
            maxTokens: state.maxTokens
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add AI response to conversation
        const aiMessage = data.choices[0].message.content;
        addMessageToConversation('assistant', aiMessage);
        
        // Update token usage stats
        if (data.usage) {
            updateTokenUsage(data.usage);
        }
    })
    .catch(error => {
        console.error('Error calling API:', error);
        removeTypingIndicator();
        showToast(`${localization[state.currentLanguage].apiError}: ${error.message}`, 'error');
    })
    .finally(() => {
        // Re-enable input
        state.waitingForResponse = false;
        elements.sendButton.disabled = false;
        elements.messageInput.disabled = false;
        elements.messageInput.focus();
    });
}

function addMessageToConversation(role, content) {
    const conversation = state.conversations[state.currentConversationId];
    conversation.messages.push({ role, content });
    
    addMessageToUI(role, content);
    saveConversations();
    scrollToBottom();
}

function addMessageToUI(role, content) {
    // Hide empty chat message if present
    const emptyMessage = elements.chatMessages.querySelector('.empty-chat-message');
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role === 'user' ? 'message-user' : 'message-ai'}`;
    
    // Create message header with role label
    const messageHeader = document.createElement('div');
    messageHeader.className = `message-header ${role}`;
    
    // Set proper label based on role and language
    let roleLabel = '';
    if (role === 'user') {
        roleLabel = localization[state.currentLanguage].you;
    } else {
        roleLabel = 'Nous';
    }
    
    messageHeader.textContent = roleLabel;
    
    // Create message content with markdown rendering
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = formatMessage(content);
    
    messageDiv.appendChild(messageHeader);
    messageDiv.appendChild(messageContent);
    
    // Add animation class
    messageDiv.classList.add('fade-in');
    
    elements.chatMessages.appendChild(messageDiv);
}

function formatMessage(content) {
    // Basic markdown formatting
    let formatted = content
        // Code blocks
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Bold
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // Line breaks
        .replace(/\n/g, '<br>');
    
    return formatted;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'message message-ai';
    
    const messageHeader = document.createElement('div');
    messageHeader.className = 'message-header ai';
    messageHeader.textContent = 'Nous';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content typing-indicator';
    messageContent.textContent = localization[state.currentLanguage].typingIndicator;
    
    typingDiv.appendChild(messageHeader);
    typingDiv.appendChild(messageContent);
    
    elements.chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// Settings management
function saveSettings() {
    state.apiKey = elements.apiKeyInput.value;
    state.model = elements.modelSelection.value;
    state.temperature = parseFloat(elements.temperatureSlider.value);
    state.maxTokens = parseInt(elements.maxTokensSlider.value);
    state.systemTemplate = elements.systemTemplateSelect.value;
    state.useCustomTemplate = elements.useCustomTemplateCheckbox.checked;
    state.customSystemMessage = elements.customSystemMessageTextarea.value;
    
    // Save to localStorage
    localStorage.setItem('nousApiKey', state.apiKey);
    localStorage.setItem('nousModel', state.model);
    localStorage.setItem('temperature', state.temperature);
    localStorage.setItem('maxTokens', state.maxTokens);
    localStorage.setItem('systemTemplate', state.systemTemplate);
    localStorage.setItem('useCustomTemplate', state.useCustomTemplate);
    localStorage.setItem('customSystemMessage', state.customSystemMessage);
    
    showToast(localization[state.currentLanguage].settingsSaved, 'success');
}

function getSystemMessage() {
    if (state.useCustomTemplate && state.customSystemMessage) {
        return state.customSystemMessage;
    }
    
    return systemTemplates[state.systemTemplate][state.currentLanguage];
}

// Modal functions
function openRenameModal(conversationId) {
    state.editingConversationId = conversationId;
    elements.newConversationNameInput.value = state.conversations[conversationId].name;
    
    elements.modalOverlay.style.display = 'block';
    elements.renameModal.style.display = 'block';
    
    elements.newConversationNameInput.focus();
}

function openDeleteModal(conversationId) {
    state.editingConversationId = conversationId;
    
    elements.modalOverlay.style.display = 'block';
    elements.deleteModal.style.display = 'block';
}

function openClearModal() {
    elements.modalOverlay.style.display = 'block';
    elements.clearModal.style.display = 'block';
}

function closeAllModals() {
    elements.modalOverlay.style.display = 'none';
    elements.renameModal.style.display = 'none';
    elements.deleteModal.style.display = 'none';
    elements.clearModal.style.display = 'none';
    
    state.editingConversationId = null;
}

function renameCurrentConversation() {
    if (!state.editingConversationId) return;
    
    const newName = elements.newConversationNameInput.value.trim();
    if (!newName) return;
    
    state.conversations[state.editingConversationId].name = newName;
    saveConversations();
    updateConversationsList();
    
    // Update active chat name if this is the current conversation
    if (state.editingConversationId === state.currentConversationId) {
        elements.activeChatName.textContent = newName;
    }
    
    closeAllModals();
}

function deleteCurrentConversation() {
    if (!state.editingConversationId) return;
    
    delete state.conversations[state.editingConversationId];
    
    // If we deleted the current conversation, switch to another one
    if (state.editingConversationId === state.currentConversationId) {
        const conversationIds = Object.keys(state.conversations);
        if (conversationIds.length > 0) {
            state.currentConversationId = conversationIds[0];
            displayCurrentConversation();
        } else {
            createNewConversation();
        }
    }
    
    saveConversations();
    updateConversationsList();
    closeAllModals();
}

function clearCurrentConversation() {
    if (!state.currentConversationId) return;
    
    state.conversations[state.currentConversationId].messages = [];
    saveConversations();
    displayCurrentConversation();
    closeAllModals();
}

// Export functions
function exportConversation() {
    if (!state.currentConversationId || state.conversations[state.currentConversationId].messages.length === 0) {
        showToast(localization[state.currentLanguage].noConversationToExport, 'warning');
        return;
    }
    
    const format = elements.exportFormatSelect.value;
    const conversation = state.conversations[state.currentConversationId];
    
    let endpoint = '';
    switch (format) {
        case 'pdf':
            endpoint = '/api/export/pdf';
            break;
        case 'json':
            endpoint = '/api/export/json';
            break;
        case 'csv':
            endpoint = '/api/export/csv';
            break;
        default:
            return;
    }
    
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chatHistory: conversation.messages,
            title: conversation.name,
            language: state.currentLanguage
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        
        // Handle different response types
        if (format === 'pdf') {
            return response.blob().then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `${conversation.name}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
        } else if (format === 'csv') {
            return response.blob().then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `${conversation.name}.csv`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
        }
    })
    .catch(error => {
        console.error('Error exporting conversation:', error);
        showToast(`${localization[state.currentLanguage].exportError}: ${error.message}`, 'error');
    });
}

// Stats management
function updateTokenUsage(usage) {
    state.tokenUsage.promptTokens += usage.prompt_tokens || 0;
    state.tokenUsage.completionTokens += usage.completion_tokens || 0;
    state.tokenUsage.totalTokens += usage.total_tokens || 0;
    
    // Approximate cost calculation (adjust prices as needed)
    const promptCost = (usage.prompt_tokens || 0) * 0.000001; // $0.001 per 1000 tokens
    const completionCost = (usage.completion_tokens || 0) * 0.000002; // $0.002 per 1000 tokens
    state.estimatedCost += promptCost + completionCost;
    
    // Save to localStorage
    localStorage.setItem('totalTokens', state.tokenUsage.totalTokens);
    localStorage.setItem('promptTokens', state.tokenUsage.promptTokens);
    localStorage.setItem('completionTokens', state.tokenUsage.completionTokens);
    localStorage.setItem('estimatedCost', state.estimatedCost);
    
    updateStatsDisplay();
}

function updateStatsDisplay() {
    elements.totalTokensElement.textContent = state.tokenUsage.totalTokens.toLocaleString();
    elements.promptTokensElement.textContent = state.tokenUsage.promptTokens.toLocaleString();
    elements.completionTokensElement.textContent = state.tokenUsage.completionTokens.toLocaleString();
    elements.estimatedCostElement.textContent = state.estimatedCost.toFixed(6);
}

// Utility functions
function showToast(message, type = 'default') {
    elements.toast.textContent = message;
    elements.toast.className = `toast ${type}`;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// Initialize app on load
document.addEventListener('DOMContentLoaded', initializeApp);
(url);
            });
        } else if (format === 'json') {
            return response.blob().then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `${conversation.name}.json`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL
