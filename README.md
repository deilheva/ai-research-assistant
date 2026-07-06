# 🤖 AI Research Assistant API

An intelligent API for searching and retrieving academic papers from Semantic Scholar. Built with Node.js + Express.

## Features

✨ **Paper Search**
- Search by query/keywords
- Search by title
- Search by author
- Get detailed paper information

📊 **Rich Metadata**
- Paper title, authors, year
- Abstract and citation counts
- Venue and publication date
- Direct paper URLs

🚀 **Easy to Use**
- RESTful API endpoints
- JSON responses
- Error handling
- CORS enabled

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/deilheva/ai-research-assistant.git
cd ai-research-assistant
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
```

### 4. Start Server
```bash
# Production
npm start

# Development (with nodemon)
npm run dev
```

Server will run on `http://localhost:3000`

## API Endpoints

### 🏥 Health Check
```
GET /health
```
Check if the API is running.

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

### 🔍 Search Papers by Query
```
GET /api/search/papers?query=machine%20learning&limit=10&offset=0
```

**Parameters:**
- `query` (required) - Search keywords
- `limit` (optional) - Results per page, max 100 (default: 10)
- `offset` (optional) - Pagination offset (default: 0)
- `sort` (optional) - Sort by 'relevance' or 'citationCount' (default: relevance)

**Example:**
```bash
curl "http://localhost:3000/api/search/papers?query=deep%20learning&limit=5"
```

**Response:**
```json
{
  "success": true,
  "query": "deep learning",
  "total": 1234,
  "offset": 0,
  "limit": 5,
  "papers": [
    {
      "id": "abc123",
      "title": "Deep Learning Fundamentals",
      "authors": ["John Doe", "Jane Smith"],
      "year": 2021,
      "abstract": "...",
      "venue": "arXiv",
      "citationCount": 150,
      "influentialCitationCount": 45,
      "url": "https://...",
      "publicationDate": "2021-01-15"
    }
  ]
}
```

---

### 📖 Search by Title
```
GET /api/search/title?title=Your%20Paper%20Title&limit=5
```

**Parameters:**
- `title` (required) - Paper title
- `limit` (optional) - Max results (default: 5, max: 50)

**Example:**
```bash
curl "http://localhost:3000/api/search/title?title=Transformers&limit=3"
```

---

### ✍️ Search by Author
```
GET /api/search/author?author=Geoffrey%20Hinton&limit=10
```

**Parameters:**
- `author` (required) - Author name
- `limit` (optional) - Max results (default: 10, max: 100)

**Example:**
```bash
curl "http://localhost:3000/api/search/author?author=Yann%20LeCun"
```

---

### 📄 Get Paper Details
```
GET /api/search/paper/:paperId
```

**Parameters:**
- `paperId` (required) - Semantic Scholar Paper ID

**Example:**
```bash
curl "http://localhost:3000/api/search/paper/abc123xyz"
```

---

## Project Structure

```
ai-research-assistant/
├── server.js           # Main Express server
├── routes/
│   └── search.js       # Search endpoints
├── .env.example        # Environment template
├── package.json        # Dependencies
└── README.md          # This file
```

## Technologies Used

- **Express.js** - Web framework
- **Axios** - HTTP client
- **Semantic Scholar API** - Paper data source
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Error Handling

All errors return JSON responses with descriptive messages:

```json
{
  "success": false,
  "error": "Failed to search papers",
  "message": "Connection timeout"
}
```

## Rate Limiting

Semantic Scholar API has rate limits. Check their documentation for limits:
- https://www.semanticscholar.org/product/api

## Development

Install dev dependencies:
```bash
npm install --save-dev nodemon
```

Run with auto-reload:
```bash
npm run dev
```

## Future Features

- [ ] Advanced filtering (year range, venue)
- [ ] Paper recommendation engine
- [ ] User authentication & saved searches
- [ ] Database caching
- [ ] PDF text extraction
- [ ] Citation graph analysis

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project however you want.

## Contact

Created by **deilheva** for AI Research purposes.

---

**Happy Researching! 📚🚀**
