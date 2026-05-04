/**
 * JSP/JSTL Parser
 * Parses JSTL core tags and converts to executable structure
 */

class JSPParser {
    constructor(evaluator) {
        this.evaluator = evaluator;
    }

    /**
     * Parse JSP content and return rendered HTML
     * @param {string} jspContent
     * @returns {string} - Rendered HTML
     */
    parse(jspContent) {
        try {
            // Process JSTL tags in order
            let html = jspContent;

            // Add JSTL namespace if not present (for parsing)
            html = this.normalizeJSTL(html);

            // Process tags from innermost to outermost
            html = this.processSetTags(html);
            html = this.processChooseTags(html);
            html = this.processIfTags(html);
            html = this.processForEachTags(html);
            html = this.processOutTags(html);

            // Replace remaining EL expressions
            html = this.evaluator.replaceExpressions(html);

            // Clean up JSTL artifacts
            html = this.cleanupJSTL(html);

            return html;

        } catch (error) {
            throw new Error(`JSP parsing error: ${error.message}`);
        }
    }

    /**
     * Normalize JSTL tag prefixes (c: or core:)
     */
    normalizeJSTL(html) {
        // Support both c: and core: prefixes
        html = html.replace(/<core:/g, '<c:');
        html = html.replace(/<\/core:/g, '</c:');
        return html;
    }

    /**
     * Process <c:set> tags
     */
    processSetTags(html) {
        const setRegex = /<c:set\s+var=["']([^"']+)["']\s+value=["']([^"']+)["']\s*\/>/g;
        
        return html.replace(setRegex, (match, varName, value) => {
            const resolvedValue = this.evaluator.replaceExpressions(value);
            this.evaluator.context[varName] = resolvedValue;
            return ''; // Remove the tag from output
        });
    }

    /**
     * Process <c:if> tags
     */
    processIfTags(html) {
        const ifRegex = /<c:if\s+test=["']([^"']+)["']\s*>([\s\S]*?)<\/c:if>/g;
        
        return html.replace(ifRegex, (match, condition, content) => {
            const result = this.evaluator.evaluateCondition(condition);
            return result ? content : '';
        });
    }

    /**
     * Process <c:forEach> tags
     */
    processForEachTags(html) {
        const forEachRegex = /<c:forEach\s+(?:var=["']([^"']+)["']\s+)?items=["']([^"']+)["'](?:\s+var=["']([^"']+)["'])?\s*>([\s\S]*?)<\/c:forEach>/g;
        
        return html.replace(forEachRegex, (match, var1, itemsExpr, var2, content) => {
            const varName = var1 || var2;
            const items = this.evaluator.evaluate(itemsExpr);
            
            if (!Array.isArray(items)) {
                console.warn(`forEach items not an array: ${itemsExpr}`);
                return '';
            }

            let output = '';
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                
                // Create a new context with loop variable
                const originalValue = this.evaluator.context[varName];
                this.evaluator.context[varName] = item;
                this.evaluator.context[varName + 'Status'] = {
                    index: i,
                    count: i + 1,
                    first: i === 0,
                    last: i === items.length - 1
                };

                // Process the content with the loop variable in scope
                let iterationContent = content;
                iterationContent = this.evaluator.replaceExpressions(iterationContent);
                output += iterationContent;

                // Restore original context
                if (originalValue !== undefined) {
                    this.evaluator.context[varName] = originalValue;
                } else {
                    delete this.evaluator.context[varName];
                }
                delete this.evaluator.context[varName + 'Status'];
            }

            return output;
        });
    }

    /**
     * Process <c:choose>, <c:when>, <c:otherwise> tags
     */
    processChooseTags(html) {
        const chooseRegex = /<c:choose\s*>([\s\S]*?)<\/c:choose>/g;
        
        return html.replace(chooseRegex, (match, content) => {
            // Extract all when/otherwise blocks
            const whenRegex = /<c:when\s+test=["']([^"']+)["']\s*>([\s\S]*?)<\/c:when>/g;
            const otherwiseRegex = /<c:otherwise\s*>([\s\S]*?)<\/c:otherwise>/;

            let whenMatch;
            let matched = false;

            // Check each when condition
            while ((whenMatch = whenRegex.exec(content)) !== null) {
                const [, condition, whenContent] = whenMatch;
                if (this.evaluator.evaluateCondition(condition)) {
                    matched = true;
                    return whenContent;
                }
            }

            // If no when matched, try otherwise
            if (!matched) {
                const otherwiseMatch = content.match(otherwiseRegex);
                if (otherwiseMatch) {
                    return otherwiseMatch[1];
                }
            }

            return '';
        });
    }

    /**
     * Process <c:out> tags
     */
    processOutTags(html) {
        // <c:out value="${expr}" default="..." />
        const outRegex = /<c:out\s+value=["']([^"']+)["'](?:\s+default=["']([^"']*)["'])?\s*\/>/g;
        
        return html.replace(outRegex, (match, value, defaultValue = '') => {
            const resolvedValue = this.evaluator.replaceExpressions(value);
            return resolvedValue || defaultValue;
        });
    }

    /**
     * Clean up any remaining JSTL artifacts
     */
    cleanupJSTL(html) {
        // Remove JSP directives
        html = html.replace(/<%@[^%]*%>/g, '');
        
        // Remove JSP comments
        html = html.replace(/<%--[\s\S]*?--%>/g, '');
        
        return html;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JSPParser;
}
