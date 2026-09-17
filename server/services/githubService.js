const axios = require('axios');

class GithubService {
  /**
   * Get GitHub profile information
   */
  static async getProfile(accessToken) {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: 'token ' + accessToken,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'README-Generator-App'
      }
    });
    return response.data;
  }

  /**
   * Get user public repositories
   */
  static async getRepositories(accessToken, sort = 'updated', perPage = 30) {
    const response = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: 'token ' + accessToken,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'README-Generator-App'
      },
      params: {
        sort,
        per_page: perPage,
        affiliation: 'owner'
      }
    });
    return response.data;
  }

  /**
   * Get repository README if it exists
   */
  static async getReadme(accessToken, owner, repo) {
    try {
      const response = await axios.get('https://api.github.com/repos/' + owner + '/' + repo + '/readme', {
        headers: {
          Authorization: 'token ' + accessToken,
          Accept: 'application/vnd.github.v3.raw',
          'User-Agent': 'README-Generator-App'
        }
      });
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Commit or create README.md in a repository
   */
  static async pushReadme(accessToken, { owner, repo, branch = 'main', path = 'README.md', message, content }) {
    // 1. Check if the file already exists to obtain SHA
    let fileSha = null;
    try {
      const fileRes = await axios.get('https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path, {
        headers: {
          Authorization: 'token ' + accessToken,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'README-Generator-App'
        },
        params: { ref: branch }
      });
      fileSha = fileRes.data.sha;
    } catch (err) {
      // 404 means the file doesn't exist yet, which is fine
    }

    // 2. Put file contents (base64 encoded)
    const payload = {
      message: message || 'docs: update README.md via README Generator',
      content: Buffer.from(content).toString('base64'),
      branch
    };

    if (fileSha) {
      payload.sha = fileSha;
    }

    const response = await axios.put('https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + path, payload, {
      headers: {
        Authorization: 'token ' + accessToken,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'README-Generator-App'
      }
    });

    return response.data;
  }
}

module.exports = GithubService;