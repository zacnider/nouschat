const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const sanitizeHtml = require('sanitize-html');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to proxy requests to Nous API
app.post('/api/chat', async (req, res) => {
  try {
    const { apiKey, model, messages, temperature, maxTokens } = req.body;
    
    // Validate required fields
    if (!apiKey || !model || !messages) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Prepare request to Nous API
    const nousResponse = await axios.post(
      'https://inference-api.nousresearch.com/v1/chat/completions',
      {
        model,
        messages,
        temperature: temperature || 0.7,
        max_tokens: maxTokens || 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Return the API response
    res.json(nousResponse.data);
  } catch (error) {
    console.error('Error calling Nous API:', error);
    
    // Forward API error if available, or return a generic error
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Nous API Error',
        details: error.response.data
      });
    }
    
    res.status(500).json({ 
      error: 'Server Error', 
      message: error.message 
    });
  }
});

// Export chat history to PDF
app.post('/api/export/pdf', (req, res) => {
  try {
    const { chatHistory, title, language } = req.body;
    
    if (!chatHistory || !chatHistory.length) {
      return res.status(400).json({ error: 'No chat history to export' });
    }
    
    // Create PDF document
    const doc = new PDFDocument();
    const chunks = [];
    
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => {
      const pdfData = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(title || 'chat-export')}.pdf`);
      res.send(pdfData);
    });
    
    // Add title
    doc.fontSize(24).text(title || 'Chat Export', { align: 'center' });
    doc.moveDown();
    
    // Add chat content
    chatHistory.forEach(message => {
      const role = message.role === 'user' 
        ? (language === 'en' ? 'You' : language === 'tr' ? 'Siz' : 'Sie')
        : 'Nous';
      
      doc.fontSize(12).font('Helvetica-Bold').text(`${role}:`, { continued: false });
      doc.moveDown(0.5);
      doc.font('Helvetica').text(sanitizeHtml(message.content, {
        allowedTags: [],
        allowedAttributes: {}
      }));
      doc.moveDown();
    });
    
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ 
      error: 'PDF Generation Error', 
      message: error.message 
    });
  }
});

// Export chat history to JSON
app.post('/api/export/json', (req, res) => {
  try {
    const { chatHistory, title } = req.body;
    
    if (!chatHistory || !chatHistory.length) {
      return res.status(400).json({ error: 'No chat history to export' });
    }
    
    const jsonData = JSON.stringify(chatHistory, null, 2);
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(title || 'chat-export')}.json`);
    res.send(jsonData);
  } catch (error) {
    console.error('Error generating JSON:', error);
    res.status(500).json({ 
      error: 'JSON Generation Error', 
      message: error.message 
    });
  }
});

// Export chat history to CSV
app.post('/api/export/csv', (req, res) => {
  try {
    const { chatHistory, title, language } = req.body;
    
    if (!chatHistory || !chatHistory.length) {
      return res.status(400).json({ error: 'No chat history to export' });
    }
    
    // Create CSV content
    let csvContent = 'Role,Message\n';
    
    chatHistory.forEach(message => {
      const role = message.role === 'user' 
        ? (language === 'en' ? 'You' : language === 'tr' ? 'Siz' : 'Sie')
        : 'Nous';
      
      // Escape quotes in the content and wrap in quotes
      const content = message.content.replace(/"/g, '""');
      csvContent += `"${role}","${content}"\n`;
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(title || 'chat-export')}.csv`);
    res.send(csvContent);
  } catch (error) {
    console.error('Error generating CSV:', error);
    res.status(500).json({ 
      error: 'CSV Generation Error', 
      message: error.message 
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
