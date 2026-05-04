/**
 * HTML Renderer
 * Renders parsed JSP content in preview iframe
 */

class HTMLRenderer {
    constructor(iframeElement) {
        this.iframe = iframeElement;
    }

    /**
     * Render HTML content with CSS in iframe
     * @param {string} htmlContent
     * @param {string} cssContent
     */
    render(htmlContent, cssContent) {
        const doc = this.iframe.contentDocument || this.iframe.contentWindow.document;
        
        // Extract CSS links from HTML
        const cssLinks = this.extractCSSLinks(htmlContent);
        
        // Build complete HTML document
        const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    ${cssLinks}
    ${cssContent ? `<style>${cssContent}</style>` : ''}
    <style>
        /* Base preview styles */
        body {
            margin: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>
        `;

        doc.open();
        doc.write(fullHTML);
        doc.close();

        return fullHTML;
    }

    /**
     * Extract CSS link tags from HTML
     * @param {string} html
     * @returns {string}
     */
    extractCSSLinks(html) {
        const linkRegex = /<link[^>]*rel=["']stylesheet["'][^>]*>/gi;
        const matches = html.match(linkRegex);
        return matches ? matches.join('\n    ') : '';
    }

    /**
     * Clear the preview
     */
    clear() {
        const doc = this.iframe.contentDocument || this.iframe.contentWindow.document;
        doc.open();
        doc.write('');
        doc.close();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HTMLRenderer;
}
