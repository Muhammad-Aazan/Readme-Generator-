import { saveAs } from 'file-saver';
import { toast } from 'sonner';

/**
 * Copy text content to clipboard with browser fallback
 */
export const copyToClipboard = async (text, message = 'Copied Markdown to clipboard!') => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    toast.success(message);
    return true;
  } catch (err) {
    toast.error('Failed to copy to clipboard');
    return false;
  }
};

/**
 * Download raw README.md file
 */
export const downloadReadmeFile = (markdown, filename = 'README.md') => {
  try {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, filename);
    toast.success(`Downloaded ${filename}`);
  } catch (err) {
    toast.error('Could not download file');
  }
};