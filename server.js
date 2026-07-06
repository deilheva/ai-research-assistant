require('dotenv').config();
const express = require('express');
const cors = require('cors');
const searchRoutes = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/search', searchRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to AI Research Assistant API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      search_papers: '/api/search/papers?query=YOUR_QUERY&limit=10',
      search_by_title: '/api/search/title?title=YOUR_TITLE',
      search_by_author: '/api/search/author?author=AUTHOR_NAME'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Research Assistant API running on http://localhost:${PORT}`);
  console.log(`📚 Open http://localhost:${PORT} to see available endpoints`);
});
