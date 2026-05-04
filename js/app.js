/**
 * Main Application
 * Coordinates JSP parsing and rendering
 */

// Global state
let evaluator, parser, renderer;
let renderTimeout;
let cssCounter = 1;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const jspInput = document.getElementById('jsp-input');
    const mockDataInput = document.getElementById('mock-data');
    const previewFrame = document.getElementById('preview-frame');
    const htmlOutput = document.getElementById('html-output');
    const errorDisplay = document.getElementById('error-display');

    // Initialize renderer
    renderer = new HTMLRenderer(previewFrame);

    // Auto-render on input change (debounced)
    jspInput.addEventListener('input', debounceRender);
    mockDataInput.addEventListener('input', debounceRender);
    
    // Listen to CSS input changes
    document.getElementById('css-inputs').addEventListener('input', (e) => {
        if (e.target.classList.contains('css-input')) {
            debounceRender();
        }
    });

    // Load example on start
    loadExample();
});

/**
 * Debounce render calls
 */
function debounceRender() {
    clearTimeout(renderTimeout);
    renderTimeout = setTimeout(renderPreview, 300);
}

/**
 * Render the preview
 */
function renderPreview() {
    const jspInput = document.getElementById('jsp-input');
    const mockDataInput = document.getElementById('mock-data');
    const htmlOutput = document.getElementById('html-output');
    const errorDisplay = document.getElementById('error-display');

    try {
        // Parse mock data
        let mockData = {};
        if (mockDataInput.value.trim()) {
            try {
                mockData = JSON.parse(mockDataInput.value);
            } catch (e) {
                // Check if user accidentally pasted JSP code in mock data
                if (mockDataInput.value.includes('<%')) {
                    throw new Error('Mock Data should be JSON, not JSP code. Use the "Mock Data" tab, not the JSP Code panel.');
                }
                throw new Error(`Invalid JSON in mock data: ${e.message}\n\nExpected format:\n{\n  "beanName": { "field": "value" }\n}`);
            }
        }

        // Initialize evaluator and parser
        evaluator = new ELEvaluator(mockData);
        parser = new JSPParser(evaluator);

        // Parse JSP
        const parsedHTML = parser.parse(jspInput.value);

        // Collect all CSS from multiple inputs
        const allCss = getAllCss();

        // Render in iframe
        const fullHTML = renderer.render(parsedHTML, allCss);

        // Update HTML output
        htmlOutput.value = fullHTML;

        // Clear any errors
        errorDisplay.classList.remove('show');
        errorDisplay.textContent = '';

    } catch (error) {
        // Display error
        errorDisplay.textContent = `Error: ${error.message}`;
        errorDisplay.classList.add('show');
        console.error('Render error:', error);
    }
}

/**
 * Get all CSS from multiple textareas
 */
function getAllCss() {
    const cssTextareas = document.querySelectorAll('.css-input');
    let allCss = '';
    cssTextareas.forEach(textarea => {
        if (textarea.value.trim()) {
            allCss += textarea.value + '\n\n';
        }
    });
    return allCss;
}

/**
 * Switch between tabs
 */
function switchTab(tabName, event) {
    const mockData = document.getElementById('mock-data');
    const cssInput = document.getElementById('css-input');
    const tabs = document.querySelectorAll('.tab-btn');

    // Update tab buttons
    tabs.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        // Fallback: activate the correct tab by name
        tabs.forEach(btn => {
            if (btn.textContent.toLowerCase().includes(tabName.replace('-', ' '))) {
                btn.classList.add('active');
            }
        });
    }

    // Show/hide content
    if (tabName === 'mock-data') {
        mockData.classList.add('active');
        cssInput.classList.remove('active');
    } else if (tabName === 'css') {
        cssInput.classList.add('active');
        mockData.classList.remove('active');
    }
}

/**
 * Toggle HTML source visibility
 */
function toggleHtmlSource() {
    const htmlOutput = document.getElementById('html-output');
    htmlOutput.style.display = htmlOutput.style.display === 'none' ? 'block' : 'none';
}

/**
 * Copy rendered HTML to clipboard
 */
function copyToClipboard(event) {
    const htmlOutput = document.getElementById('html-output');
    htmlOutput.select();
    document.execCommand('copy');
    
    // Visual feedback
    const btn = event ? event.target : null;
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }
}

/**
 * Load example JSP
 */
function loadExample() {
    const jspInput = document.getElementById('jsp-input');
    const mockDataInput = document.getElementById('mock-data');
    
    // Get first CSS input
    const firstCssInput = document.querySelector('.css-input');

    jspInput.value = `<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>User Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1>Welcome, <c:out value="\${user.name}" />!</h1>
        
        <!-- Conditional Display -->
        <c:if test="\${user.isAdmin}">
            <div class="alert alert-info">
                You have administrator privileges.
            </div>
        </c:if>
        
        <!-- Status Dropdown (Map-based) -->
        <div class="mb-3">
            <label class="form-label">Status:</label>
            <select class="form-select">
                <c:forEach var="status" items="\${statusMap}">
                    <option value="\${status.key}">\${status.value}</option>
                </c:forEach>
            </select>
        </div>
        
        <!-- Items Table -->
        <h2>Your Items</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="item" items="\${items}">
                    <tr>
                        <td>\${item.id}</td>
                        <td>\${item.name}</td>
                        <td>$\${item.price}</td>
                        <td>
                            <c:choose>
                                <c:when test="\${item.price > 100}">
                                    <span class="badge bg-success">Premium</span>
                                </c:when>
                                <c:when test="\${item.price > 50}">
                                    <span class="badge bg-primary">Standard</span>
                                </c:when>
                                <c:otherwise>
                                    <span class="badge bg-secondary">Budget</span>
                                </c:otherwise>
                            </c:choose>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</body>
</html>`;

    mockDataInput.value = `{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": true
  },
  "statusMap": {
    "active": "Active",
    "inactive": "Inactive",
    "pending": "Pending Review",
    "suspended": "Suspended"
  },
  "items": [
    {
      "id": 1,
      "name": "Premium Widget",
      "price": 149.99
    },
    {
      "id": 2,
      "name": "Standard Gadget",
      "price": 79.99
    },
    {
      "id": 3,
      "name": "Budget Tool",
      "price": 29.99
    }
  ]
}`;

    if (firstCssInput) {
        firstCssInput.value = `/* Custom styles */
.container {
    max-width: 960px;
}

h1 {
    color: #667eea;
    margin-bottom: 1.5rem;
}

.table {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
}`;
    }

    renderPreview();
}

/**
 * Add CSS input
 */
function addCssInput() {
    cssCounter++;
    const cssInputsContainer = document.getElementById('css-inputs');
    
    const cssItem = document.createElement('div');
    cssItem.className = 'css-item';
    cssItem.innerHTML = `
        <div class="css-item-header">
            <span>CSS #${cssCounter}</span>
            <button class="remove-css-btn" onclick="removeCssInput(this)">✕ Remove</button>
        </div>
        <textarea class="css-input" placeholder="/* Paste your CSS here */"></textarea>
    `;
    
    cssInputsContainer.appendChild(cssItem);
}

/**
 * Remove CSS input
 */
function removeCssInput(btn) {
    const cssItem = btn.closest('.css-item');
    cssItem.remove();
    debounceRender();
}

/**
 * Generate in new window
 */
function generateNewWindow() {
    const htmlOutput = document.getElementById('html-output');
    
    if (!htmlOutput.value.trim()) {
        alert('Nothing to generate! Please add JSP code first.');
        return;
    }
    
    // Open in new window
    const newWindow = window.open('', '_blank', 'width=1200,height=800');
    
    if (newWindow) {
        newWindow.document.write(htmlOutput.value);
        newWindow.document.close();
    } else {
        alert('Pop-up blocked! Please allow pop-ups for this site.');
    }
}
