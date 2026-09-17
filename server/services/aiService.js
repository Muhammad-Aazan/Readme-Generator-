/**
 * Isolated AI Assistant Service for future enhancements
 * (e.g. bio generation, grammar improvement, project summaries)
 */
class AIService {
  static isAvailable() {
    return Boolean(process.env.AI_API_KEY);
  }

  static async enhanceBio(currentBio, tone = 'professional') {
    if (!this.isAvailable()) {
      return currentBio || 'Full Stack Developer crafting scalable, resilient, and accessible web experiences.';
    }
    // Future expansion for OpenAI/Gemini/Anthropic API integration
    return 'Enhanced: ' + currentBio;
  }

  static async generateProjectDescription(title, technologies = []) {
    return 'A high-performance ' + title + ' engineered using ' + (technologies.join(', ') || 'modern web technologies') + '.';
  }
}

module.exports = AIService;