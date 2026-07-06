const express = require('express');
const axios = require('axios');
const router = express.Router();

const SEMANTIC_SCHOLAR_API = 'https://api.semanticscholar.org/graph/v1';

/**
 * Search papers by query
 * GET /api/search/papers?query=machine%20learning&limit=10
 */
router.get('/papers', async (req, res) => {
  try {
    const { query, limit = 10, offset = 0, sort = 'relevance' } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const params = {
      query: query.trim(),
      limit: Math.min(parseInt(limit) || 10, 100),
      offset: parseInt(offset) || 0,
      sort: sort || 'relevance',
      fields: 'paperId,title,authors,year,abstract,venue,publicationDate,citationCount,influentialCitationCount,url'
    };

    const response = await axios.get(`${SEMANTIC_SCHOLAR_API}/paper/search`, { params });

    res.json({
      success: true,
      query: query,
      total: response.data.total,
      offset: params.offset,
      limit: params.limit,
      papers: response.data.data.map(paper => ({
        id: paper.paperId,
        title: paper.title,
        authors: paper.authors?.map(a => a.name) || [],
        year: paper.year,
        abstract: paper.abstract || 'N/A',
        venue: paper.venue || 'N/A',
        citationCount: paper.citationCount || 0,
        influentialCitationCount: paper.influentialCitationCount || 0,
        url: paper.url,
        publicationDate: paper.publicationDate || 'N/A'
      }))
    });
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to search papers',
      message: error.message
    });
  }
});

/**
 * Search paper by title
 * GET /api/search/title?title=Deep%20Learning
 */
router.get('/title', async (req, res) => {
  try {
    const { title, limit = 5 } = req.query;

    if (!title) {
      return res.status(400).json({ error: 'Title parameter is required' });
    }

    const params = {
      query: title.trim(),
      limit: Math.min(parseInt(limit) || 5, 50),
      sort: 'relevance',
      fields: 'paperId,title,authors,year,abstract,venue,citationCount,url'
    };

    const response = await axios.get(`${SEMANTIC_SCHOLAR_API}/paper/search`, { params });

    res.json({
      success: true,
      searchTitle: title,
      results: response.data.data.map(paper => ({
        id: paper.paperId,
        title: paper.title,
        authors: paper.authors?.map(a => a.name) || [],
        year: paper.year,
        abstract: paper.abstract || 'N/A',
        venue: paper.venue || 'N/A',
        citationCount: paper.citationCount || 0,
        url: paper.url
      }))
    });
  } catch (error) {
    console.error('Title search error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to search by title',
      message: error.message
    });
  }
});

/**
 * Search paper by author
 * GET /api/search/author?author=Geoffrey%20Hinton
 */
router.get('/author', async (req, res) => {
  try {
    const { author, limit = 10 } = req.query;

    if (!author) {
      return res.status(400).json({ error: 'Author parameter is required' });
    }

    const params = {
      query: author.trim(),
      limit: Math.min(parseInt(limit) || 10, 100),
      sort: 'relevance',
      fields: 'paperId,title,authors,year,abstract,citationCount,url'
    };

    const response = await axios.get(`${SEMANTIC_SCHOLAR_API}/paper/search`, { params });

    res.json({
      success: true,
      searchAuthor: author,
      totalResults: response.data.total,
      papers: response.data.data.map(paper => ({
        id: paper.paperId,
        title: paper.title,
        authors: paper.authors?.map(a => a.name) || [],
        year: paper.year,
        abstract: paper.abstract || 'N/A',
        citationCount: paper.citationCount || 0,
        url: paper.url
      }))
    });
  } catch (error) {
    console.error('Author search error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to search by author',
      message: error.message
    });
  }
});

/**
 * Get paper details by Paper ID
 * GET /api/search/paper/:paperId
 */
router.get('/paper/:paperId', async (req, res) => {
  try {
    const { paperId } = req.params;

    if (!paperId) {
      return res.status(400).json({ error: 'Paper ID is required' });
    }

    const params = {
      fields: 'paperId,title,authors,year,abstract,venue,publicationDate,citationCount,influentialCitationCount,url,references,citations'
    };

    const response = await axios.get(`${SEMANTIC_SCHOLAR_API}/paper/${paperId}`, { params });

    res.json({
      success: true,
      paper: {
        id: response.data.paperId,
        title: response.data.title,
        authors: response.data.authors?.map(a => a.name) || [],
        year: response.data.year,
        abstract: response.data.abstract || 'N/A',
        venue: response.data.venue || 'N/A',
        citationCount: response.data.citationCount || 0,
        influentialCitationCount: response.data.influentialCitationCount || 0,
        url: response.data.url,
        publicationDate: response.data.publicationDate || 'N/A'
      }
    });
  } catch (error) {
    console.error('Paper details error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch paper details',
      message: error.message
    });
  }
});

module.exports = router;
