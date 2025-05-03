/**
 * Multilingual support for Nous Chat Interface
 * Supports English, Turkish, and German
 */
const localization = {
  // English strings
  "en": {
    // App title and general
    "appTitle": "Nous AI Chat Interface",
    "appSubtitle": "A powerful interface for conversing with Nous AI models",
    "footer": "Developed for personal use only. Not affiliated with Nous Research.",
    
    // Navigation and sections
    "navChat": "Chat",
    "navSettings": "Settings",
    "navExport": "Export",
    "navConversations": "Conversations",
    "conversationList": "Your Conversations",
    "activeChat": "Active Chat",
    
    // Chat interface
    "messagePlaceholder": "Type your message here...",
    "sendButton": "Send",
    "newChatButton": "New Chat",
    "waitingResponse": "Nous is thinking...",
    "typingIndicator": "typing...",
    "emptyChat": "Start a new conversation by typing a message",
    "you": "You",
    
    // Conversation management
    "newConversation": "New Conversation",
    "renameConversation": "Rename Conversation",
    "deleteConversation": "Delete Conversation",
    "clearConversation": "Clear Chat",
    "confirmDelete": "Are you sure you want to delete this conversation?",
    "confirmClear": "Are you sure you want to clear this conversation?",
    "newConversationName": "New name",
    "untitledConversation": "Untitled Conversation",
    "saveButton": "Save",
    "cancelButton": "Cancel",
    "deleteButton": "Delete",
    
    // API settings
    "apiSettings": "API Settings",
    "apiKey": "Nous API Key",
    "apiKeyPlaceholder": "Enter your Nous API key here",
    "apiKeyInfo": "Your API key is stored locally in your browser.",
    "saveSettings": "Save Settings",
    
    // Model settings
    "modelSettings": "Model Settings",
    "modelSelection": "Model",
    "temperatureLabel": "Temperature",
    "temperatureInfo": "Lower values make responses more focused and deterministic. Higher values make output more random and creative.",
    "maxTokensLabel": "Maximum Length",
    "maxTokensInfo": "Maximum number of tokens to generate. Higher values allow for longer responses.",
    "systemMessageLabel": "System Message",
    "systemMessageInfo": "Sets the behavior and context for the AI assistant.",
    
    // System message templates
    "systemTemplates": "System Message Templates",
    "customSystemMessage": "Custom System Message",
    "useCustomTemplate": "Use Custom Template",
    
    // System message preset names
    "defaultAssistant": "Default Assistant",
    "creativeWriter": "Creative Writer",
    "codeHelper": "Code Helper",
    "thoughtfulAnalyst": "Thoughtful Analyst",
    "conciseResponder": "Concise Responder",
    
    // Export options
    "exportTitle": "Export Conversation",
    "exportFormat": "Format",
    "exportButton": "Export",
    "formatPDF": "PDF Document",
    "formatJSON": "JSON File",
    "formatCSV": "CSV File",
    "noConversationToExport": "No conversation to export",
    
    // Settings UI
    "appearance": "Appearance",
    "lightMode": "Light Mode",
    "darkMode": "Dark Mode",
    "language": "Language",
    
    // Notifications
    "settingsSaved": "Settings saved",
    "errorTitle": "Error",
    "apiError": "API Error",
    "exportError": "Export Error",
    "missingApiKey": "Please enter your API key in the settings",
    "messageRequired": "Please enter a message",
    
    // Usage stats
    "usageStats": "Usage Statistics",
    "totalTokens": "Total Tokens",
    "promptTokens": "Prompt Tokens",
    "completionTokens": "Completion Tokens",
    "estimatedCost": "Estimated Cost",
    
    // System message templates content
    "defaultSystemMessage": "You are a helpful, harmless, and honest assistant.",
    "creativeSystemMessage": "You are a creative assistant with a vivid imagination. Provide detailed, descriptive, and original responses that engage the user's imagination.",
    "codeSystemMessage": "You are a coding assistant specializing in software development. Provide clear explanations, working code examples, and best practices.",
    "thoughtfulSystemMessage": "You are a thoughtful and analytical assistant. Carefully consider multiple perspectives and provide nuanced, well-reasoned responses that explore the complexity of topics.",
    "conciseSystemMessage": "You are a concise and direct assistant. Provide brief, to-the-point responses that efficiently address the user's query without unnecessary information."
  },

  // Turkish strings
  "tr": {
    // App title and general
    "appTitle": "Nous AI Sohbet Arayüzü",
    "appSubtitle": "Nous AI modelleriyle sohbet etmek için güçlü bir arayüz",
    "footer": "Sadece kişisel kullanım için geliştirilmiştir. Nous Research ile bağlantısı yoktur.",
    
    // Navigation and sections
    "navChat": "Sohbet",
    "navSettings": "Ayarlar",
    "navExport": "Dışa Aktar",
    "navConversations": "Konuşmalar",
    "conversationList": "Konuşmalarınız",
    "activeChat": "Aktif Sohbet",
    
    // Chat interface
    "messagePlaceholder": "Mesajınızı buraya yazın...",
    "sendButton": "Gönder",
    "newChatButton": "Yeni Sohbet",
    "waitingResponse": "Nous düşünüyor...",
    "typingIndicator": "yazıyor...",
    "emptyChat": "Bir mesaj yazarak yeni bir konuşma başlatın",
    "you": "Siz",
    
    // Conversation management
    "newConversation": "Yeni Konuşma",
    "renameConversation": "Konuşmayı Yeniden Adlandır",
    "deleteConversation": "Konuşmayı Sil",
    "clearConversation": "Sohbeti Temizle",
    "confirmDelete": "Bu konuşmayı silmek istediğinizden emin misiniz?",
    "confirmClear": "Bu konuşmayı temizlemek istediğinizden emin misiniz?",
    "newConversationName": "Yeni isim",
    "untitledConversation": "İsimsiz Konuşma",
    "saveButton": "Kaydet",
    "cancelButton": "İptal",
    "deleteButton": "Sil",
    
    // API settings
    "apiSettings": "API Ayarları",
    "apiKey": "Nous API Anahtarı",
    "apiKeyPlaceholder": "Nous API anahtarınızı buraya girin",
    "apiKeyInfo": "API anahtarınız yalnızca tarayıcınızda yerel olarak saklanır.",
    "saveSettings": "Ayarları Kaydet",
    
    // Model settings
    "modelSettings": "Model Ayarları",
    "modelSelection": "Model",
    "temperatureLabel": "Sıcaklık",
    "temperatureInfo": "Düşük değerler yanıtları daha odaklı ve belirleyici yapar. Yüksek değerler çıktıyı daha rastgele ve yaratıcı yapar.",
    "maxTokensLabel": "Maksimum Uzunluk",
    "maxTokensInfo": "Oluşturulacak maksimum token sayısı. Daha yüksek değerler daha uzun yanıtlara izin verir.",
    "systemMessageLabel": "Sistem Mesajı",
    "systemMessageInfo": "AI asistanı için davranışı ve bağlamı belirler.",
    
    // System message templates
    "systemTemplates": "Sistem Mesajı Şablonları",
    "customSystemMessage": "Özel Sistem Mesajı",
    "useCustomTemplate": "Özel Şablon Kullan",
    
    // System message preset names
    "defaultAssistant": "Varsayılan Asistan",
    "creativeWriter": "Yaratıcı Yazar",
    "codeHelper": "Kod Yardımcısı",
    "thoughtfulAnalyst": "Düşünceli Analist",
    "conciseResponder": "Özlü Yanıtlayıcı",
    
    // Export options
    "exportTitle": "Konuşmayı Dışa Aktar",
    "exportFormat": "Format",
    "exportButton": "Dışa Aktar",
    "formatPDF": "PDF Belgesi",
    "formatJSON": "JSON Dosyası",
    "formatCSV": "CSV Dosyası",
    "noConversationToExport": "Dışa aktarılacak konuşma yok",
    
    // Settings UI
    "appearance": "Görünüm",
    "lightMode": "Açık Mod",
    "darkMode": "Koyu Mod",
    "language": "Dil",
    
    // Notifications
    "settingsSaved": "Ayarlar kaydedildi",
    "errorTitle": "Hata",
    "apiError": "API Hatası",
    "exportError": "Dışa Aktarma Hatası",
    "missingApiKey": "Lütfen ayarlarda API anahtarınızı girin",
    "messageRequired": "Lütfen bir mesaj girin",
    
    // Usage stats
    "usageStats": "Kullanım İstatistikleri",
    "totalTokens": "Toplam Token",
    "promptTokens": "İstem Token",
    "completionTokens": "Yanıt Token",
    "estimatedCost": "Tahmini Maliyet",
    
    // System message templates content
    "defaultSystemMessage": "Yardımsever, zararsız ve dürüst bir asistansın.",
    "creativeSystemMessage": "Canlı bir hayal gücüne sahip yaratıcı bir asistansın. Kullanıcının hayal gücünü harekete geçiren ayrıntılı, betimleyici ve özgün yanıtlar sağla.",
    "codeSystemMessage": "Yazılım geliştirme konusunda uzmanlaşmış bir kodlama asistanısın. Net açıklamalar, çalışan kod örnekleri ve en iyi uygulamaları sağla.",
    "thoughtfulSystemMessage": "Düşünceli ve analitik bir asistansın. Birden fazla bakış açısını dikkatlice değerlendir ve konuların karmaşıklığını keşfeden nüanslı, iyi düşünülmüş yanıtlar sun.",
    "conciseSystemMessage": "Özlü ve doğrudan bir asistansın. Gereksiz bilgiler olmadan kullanıcının sorgusuyla verimli bir şekilde ilgilenen kısa ve öz yanıtlar sağla."
  },
  
  // German strings
  "de": {
    // App title and general
    "appTitle": "Nous AI Chat-Schnittstelle",
    "appSubtitle": "Eine leistungsstarke Schnittstelle für Gespräche mit Nous AI-Modellen",
    "footer": "Nur für den persönlichen Gebrauch entwickelt. Nicht mit Nous Research verbunden.",
    
    // Navigation and sections
    "navChat": "Chat",
    "navSettings": "Einstellungen",
    "navExport": "Exportieren",
    "navConversations": "Gespräche",
    "conversationList": "Ihre Gespräche",
    "activeChat": "Aktiver Chat",
    
    // Chat interface
    "messagePlaceholder": "Geben Sie Ihre Nachricht hier ein...",
    "sendButton": "Senden",
    "newChatButton": "Neuer Chat",
    "waitingResponse": "Nous denkt nach...",
    "typingIndicator": "tippt...",
    "emptyChat": "Beginnen Sie ein neues Gespräch, indem Sie eine Nachricht eingeben",
    "you": "Sie",
    
    // Conversation management
    "newConversation": "Neues Gespräch",
    "renameConversation": "Gespräch umbenennen",
    "deleteConversation": "Gespräch löschen",
    "clearConversation": "Chat leeren",
    "confirmDelete": "Sind Sie sicher, dass Sie dieses Gespräch löschen möchten?",
    "confirmClear": "Sind Sie sicher, dass Sie diesen Chat leeren möchten?",
    "newConversationName": "Neuer Name",
    "untitledConversation": "Unbenanntes Gespräch",
    "saveButton": "Speichern",
    "cancelButton": "Abbrechen",
    "deleteButton": "Löschen",
    
    // API settings
    "apiSettings": "API-Einstellungen",
    "apiKey": "Nous API-Schlüssel",
    "apiKeyPlaceholder": "Geben Sie hier Ihren Nous API-Schlüssel ein",
    "apiKeyInfo": "Ihr API-Schlüssel wird lokal in Ihrem Browser gespeichert.",
    "saveSettings": "Einstellungen speichern",
    
    // Model settings
    "modelSettings": "Modelleinstellungen",
    "modelSelection": "Modell",
    "temperatureLabel": "Temperatur",
    "temperatureInfo": "Niedrigere Werte machen Antworten fokussierter und deterministischer. Höhere Werte machen die Ausgabe zufälliger und kreativer.",
    "maxTokensLabel": "Maximale Länge",
    "maxTokensInfo": "Maximale Anzahl zu generierender Token. Höhere Werte ermöglichen längere Antworten.",
    "systemMessageLabel": "Systemnachricht",
    "systemMessageInfo": "Legt das Verhalten und den Kontext für den KI-Assistenten fest.",
    
    // System message templates
    "systemTemplates": "Systemnachrichtenvorlagen",
    "customSystemMessage": "Benutzerdefinierte Systemnachricht",
    "useCustomTemplate": "Benutzerdefinierte Vorlage verwenden",
    
    // System message preset names
    "defaultAssistant": "Standard-Assistent",
    "creativeWriter": "Kreativer Schriftsteller",
    "codeHelper": "Code-Helfer",
    "thoughtfulAnalyst": "Nachdenklicher Analyst",
    "conciseResponder": "Präziser Beantworter",
    
    // Export options
    "exportTitle": "Gespräch exportieren",
    "exportFormat": "Format",
    "exportButton": "Exportieren",
    "formatPDF": "PDF-Dokument",
    "formatJSON": "JSON-Datei",
    "formatCSV": "CSV-Datei",
    "noConversationToExport": "Kein Gespräch zum Exportieren",
    
    // Settings UI
    "appearance": "Erscheinungsbild",
    "lightMode": "Heller Modus",
    "darkMode": "Dunkler Modus",
    "language": "Sprache",
    
    // Notifications
    "settingsSaved": "Einstellungen gespeichert",
    "errorTitle": "Fehler",
    "apiError": "API-Fehler",
    "exportError": "Export-Fehler",
    "missingApiKey": "Bitte geben Sie Ihren API-Schlüssel in den Einstellungen ein",
    "messageRequired": "Bitte geben Sie eine Nachricht ein",
    
    // Usage stats
    "usageStats": "Nutzungsstatistiken",
    "totalTokens": "Gesamttoken",
    "promptTokens": "Prompt-Token",
    "completionTokens": "Antwort-Token",
    "estimatedCost": "Geschätzte Kosten",
    
    // System message templates content
    "defaultSystemMessage": "Sie sind ein hilfreicher, harmloser und ehrlicher Assistent.",
    "creativeSystemMessage": "Sie sind ein kreativer Assistent mit einer lebhaften Fantasie. Bieten Sie detaillierte, beschreibende und originelle Antworten, die die Fantasie des Benutzers anregen.",
    "codeSystemMessage": "Sie sind ein Programmierassistent, der sich auf Softwareentwicklung spezialisiert hat. Bieten Sie klare Erklärungen, funktionierende Codebeispiele und bewährte Praktiken.",
    "thoughtfulSystemMessage": "Sie sind ein nachdenklicher und analytischer Assistent. Berücksichtigen Sie sorgfältig mehrere Perspektiven und geben Sie nuancierte, gut durchdachte Antworten, die die Komplexität von Themen untersuchen.",
    "conciseSystemMessage": "Sie sind ein präziser und direkter Assistent. Bieten Sie kurze, prägnante Antworten, die effizient auf die Anfrage des Benutzers eingehen, ohne unnötige Informationen."
  }
};
