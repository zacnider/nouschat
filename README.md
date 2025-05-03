# Nous Chat Interface

A modern, responsive, and multilingual chat interface for interacting with Nous AI models. This application provides a clean and intuitive user experience for testing and using Nous AI's language models through their API.

## Features

- **Modern UI**: Clean, responsive design with light and dark mode support
- **Multilingual**: Full support for English, Turkish, and German interfaces
- **Conversation Management**: Create, rename, delete, and switch between multiple conversations
- **Export Options**: Save your conversations as PDF, JSON, or CSV files
- **Customizable Settings**: Configure model parameters including temperature and token limits
- **System Message Templates**: Choose from predefined templates or create your own custom instructions
- **Token Usage Tracking**: Monitor your API usage with real-time token counting and cost estimation

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- A valid Nous API key (get one from [portal.nousresearch.com](https://portal.nousresearch.com/))

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nous-chat-interface.git
   cd nous-chat-interface
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. **First Launch**: Enter your Nous API key in the Settings tab
2. **Sending Messages**: Type in the chat input and press Enter or click the send button
3. **Creating New Chats**: Click the "New Chat" button to start a fresh conversation
4. **Managing Conversations**: Use the sidebar to switch between, rename, or delete conversations
5. **Customizing Settings**: Adjust model parameters in the Settings tab
6. **Exporting Chats**: Save your conversations using the Export tab
7. **Changing Language**: Select your preferred language using the buttons in the sidebar footer
8. **Toggling Theme**: Switch between light and dark mode using the theme buttons

## Project Structure

```
nous-chat-app/
├── package.json          # Project dependencies and scripts
├── server.js             # Express server & API routes
├── public/
│   ├── index.html        # Main application HTML
│   ├── styles.css        # All application styling
│   ├── app.js            # Frontend JavaScript
│   ├── localization.js   # Multilingual text strings
│   └── assets/           # Images, icons, etc.
```

## Customization

### Adding More Languages

To add support for additional languages:

1. Add a new language object in `public/localization.js`
2. Update the language selector in the sidebar
3. Add translation strings for all UI elements

### Adding New System Message Templates

To create additional system message templates:

1. Add new template keys and values in the `systemTemplates` object in `app.js`
2. Add corresponding entries in the language files
3. Update the template dropdown in the Settings tab

## API Key Security

Your Nous API key is stored securely in your browser's local storage and is only sent to the Nous API when making requests. The application never transmits your API key to any other third-party services.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Nous Research](https://nousresearch.com/) for creating accessible AI models
- [Express.js](https://expressjs.com/) for the server framework
- [Font Awesome](https://fontawesome.com/) for the icons

## Support

For bug reports, feature requests, or general questions, please open an issue on GitHub.
