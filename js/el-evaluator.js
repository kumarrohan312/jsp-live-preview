/**
 * EL Expression Evaluator
 * Resolves ${...} expressions against mock data context
 */

class ELEvaluator {
    constructor(context) {
        this.context = context || {};
    }

    /**
     * Evaluate an EL expression
     * @param {string} expression - EL expression without ${}
     * @returns {any} - Resolved value
     */
    evaluate(expression) {
        try {
            // Trim whitespace
            expression = expression.trim();

            // Handle empty or null checks
            if (expression === 'null' || expression === 'undefined') {
                return null;
            }

            // Handle string literals
            if ((expression.startsWith("'") && expression.endsWith("'")) ||
                (expression.startsWith('"') && expression.endsWith('"'))) {
                return expression.slice(1, -1);
            }

            // Handle numeric literals
            if (!isNaN(expression)) {
                return Number(expression);
            }

            // Handle boolean literals
            if (expression === 'true') return true;
            if (expression === 'false') return false;

            // Handle simple expressions: bean.field or map['key']
            return this.resolveExpression(expression);

        } catch (error) {
            console.warn(`EL evaluation error for "${expression}":`, error);
            return `\${${expression}}`;
        }
    }

    /**
     * Resolve complex expressions with dot notation and bracket notation
     * @param {string} expression
     * @returns {any}
     */
    resolveExpression(expression) {
        // Handle bracket notation: map['key'] or map["key"]
        const bracketMatch = expression.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[['"]([^'"]+)['"]\]$/);
        if (bracketMatch) {
            const [, objName, key] = bracketMatch;
            const obj = this.context[objName];
            return obj ? obj[key] : undefined;
        }

        // Handle nested bracket notation: obj.map['key']
        const nestedBracketMatch = expression.match(/^(.+)\[['"]([^'"]+)['"]\]$/);
        if (nestedBracketMatch) {
            const [, basePath, key] = nestedBracketMatch;
            const obj = this.resolveExpression(basePath);
            return obj ? obj[key] : undefined;
        }

        // Handle dot notation: bean.field or bean.field.subfield
        const parts = expression.split('.');
        let value = this.context;

        for (const part of parts) {
            if (value === null || value === undefined) {
                return undefined;
            }
            value = value[part];
        }

        return value;
    }

    /**
     * Check if expression evaluates to truthy value
     * @param {string} expression
     * @returns {boolean}
     */
    evaluateCondition(expression) {
        // Handle negation
        if (expression.trim().startsWith('!')) {
            return !this.evaluateCondition(expression.trim().substring(1));
        }

        // Handle comparisons
        const comparisonOps = ['==', '!=', '>', '<', '>=', '<='];
        for (const op of comparisonOps) {
            if (expression.includes(op)) {
                const [left, right] = expression.split(op).map(s => s.trim());
                const leftVal = this.evaluate(left);
                const rightVal = this.evaluate(right);
                
                switch (op) {
                    case '==': return leftVal == rightVal;
                    case '!=': return leftVal != rightVal;
                    case '>': return leftVal > rightVal;
                    case '<': return leftVal < rightVal;
                    case '>=': return leftVal >= rightVal;
                    case '<=': return leftVal <= rightVal;
                }
            }
        }

        // Handle logical operators
        if (expression.includes('&&') || expression.includes('and')) {
            const parts = expression.split(/&&|and/).map(s => s.trim());
            return parts.every(part => this.evaluateCondition(part));
        }

        if (expression.includes('||') || expression.includes('or')) {
            const parts = expression.split(/\|\||or/).map(s => s.trim());
            return parts.some(part => this.evaluateCondition(part));
        }

        // Handle 'empty' operator: empty variable
        if (expression.trim().startsWith('empty ')) {
            const varName = expression.trim().substring(6);
            const value = this.evaluate(varName);
            return value === null || value === undefined || value === '' || 
                   (Array.isArray(value) && value.length === 0);
        }

        if (expression.trim().startsWith('not empty ')) {
            const varName = expression.trim().substring(10);
            const value = this.evaluate(varName);
            return !(value === null || value === undefined || value === '' || 
                    (Array.isArray(value) && value.length === 0));
        }

        // Simple truthy check
        const value = this.evaluate(expression);
        return !!value;
    }

    /**
     * Replace all EL expressions in a string
     * @param {string} text
     * @returns {string}
     */
    replaceExpressions(text) {
        if (!text) return '';
        
        return text.replace(/\$\{([^}]+)\}/g, (match, expression) => {
            const value = this.evaluate(expression);
            return value !== undefined && value !== null ? String(value) : '';
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ELEvaluator;
}
