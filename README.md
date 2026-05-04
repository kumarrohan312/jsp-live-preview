# 🚀 JSP Live Preview Tool

**Creator:** Rohan Sharma

A browser-based tool for instantly previewing JSP layouts and styling without deploying or running a server.

## 🚀 What It Does

**Problem:** Traditional JSP development requires:
- Full server deployment
- Rebuild for every change
- 5-15 minute cycle to see visual updates
- Can't quickly test layout/CSS changes

**Solution:** This tool lets you:
- Paste JSP code (with CSS)
- See visual layout instantly
- Test styling without server
- Perfect for frontend JSP work

## 📦 What's Included

### Two Modes:

**1. Visual Mode** (`visual-mode.html`) ⭐ **START HERE**
- Quick layout preview
- Paste JSP → See styled output
- All JSTL tags auto-filled with sample data
- **Use for:** Visual design, CSS testing, layout verification

**2. Full Mode** (`index.html`)
- Complete JSP preview with JSTL logic
- Define mock data (JSON)
- Test actual tag behavior
- **Use for:** JSTL logic testing, EL expression validation

## 🏁 Quick Start

### Option 1: Local File (Fastest)

1. **Open directly in browser:**
   ```
   Double-click: visual-mode.html
   ```
   
2. **Paste your JSP code** (include `<style>` tags)

3. **Click "Preview"** → See instant visual

### Option 2: Local Server (Recommended)

1. **Start server:**
   ```bash
   # Python 3
   cd jsp-live-preview
   python -m http.server 8080
   ```
   
   ```bash
   # Node.js
   npx http-server -p 8080
   ```

2. **Open browser:**
   ```
   http://localhost:8080/visual-mode.html
   ```

3. **Paste & Preview**

📖 **See [QUICKSTART.md](QUICKSTART.md) for detailed walkthrough**

## ✨ Features

### Visual Mode
✅ Instant visual preview  
✅ CSS extraction and application  
✅ JSTL tag placeholder generation  
✅ EL expression auto-fill  
✅ No configuration needed  

### Full Mode (index.html)
✅ JSTL core tags (`<c:if>`, `<c:forEach>`, `<c:choose>`, etc.)  
✅ EL expression evaluation (`${bean.field}`)  
✅ Custom mock data (JSON)  
✅ Map-based dropdowns  
✅ CDN CSS link support  
✅ Export rendered HTML  

## 🎯 Common Use Cases

### 1. Quick CSS Testing
```
Copy JSP section → Paste in visual-mode → Tweak styles → See instant results
Time saved: 10-15 minutes per iteration
```

### 2. Layout Verification
```
Complex flexbox/grid → Visual preview → Debug without deployment
Time saved: 20-30 minutes
```

### 3. Client Demos
```
Generate preview → Export HTML → Share with stakeholders
No server access needed
```

## 📖 Supported JSTL Tags

### Core Tags
- `<c:if test="${condition}">` - Conditional rendering
- `<c:forEach var="item" items="${list}">` - Loops
- `<c:out value="${expr}"/>` - Safe output
- `<c:choose>/<c:when>/<c:otherwise>` - Multi-conditionals
- `<c:set var="name" value="value"/>` - Variables

### Both Prefixes Work
- `<c:tagname>` - Standard JSTL core
- `<core:tagname>` - Custom core prefix

## 💡 Examples

### Visual Mode Example

```jsp
<style>
  .header { 
    background: #0c087a; 
    color: white; 
    padding: 15px; 
  }
  .field { 
    margin: 10px 0; 
    padding: 8px;
    border: 1px solid #ddd;
  }
</style>

<div class="header">
  <h2>${applicant.firstName} ${applicant.lastName}</h2>
  <p>SSN: ${applicant.ssn}</p>
</div>

<c:forEach var="item" items="${addressList}">
  <div class="field">
    <strong>${item.type}:</strong> ${item.street}, ${item.city}
  </div>
</c:forEach>
```

**Result:** Styled layout with sample data auto-filled

### Full Mode Example

**JSP:**
```jsp
<c:if test="${user.isAdmin}">
  <div class="admin-panel">Welcome, Administrator!</div>
</c:if>

<c:forEach var="status" items="${statusMap}">
  <option value="${status.key}">${status.value}</option>
</c:forEach>
```

**Mock Data:**
```json
{
  "user": {
    "isAdmin": true
  },
  "statusMap": {
    "A": "Active",
    "I": "Inactive",
    "P": "Pending"
  }
}
```

## 🔧 Tips & Best Practices

### Visual Mode Tips

1. **Always include CSS:**
   ```jsp
   <style type="text/css">
     /* Your complete styles */
   </style>
   <!-- Your HTML -->
   ```

2. **CDN links work:**
   ```jsp
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
   ```

3. **Copy complete sections** (don't split mid-table/div)

### Full Mode Tips

1. **Match mock data to EL expressions:**
   ```json
   {
     "applicant": {
       "firstName": "John",
       "physicalAddress": {
         "street1": "123 Main St"
       }
     }
   }
   ```
   Access: `${applicant.firstName}`, `${applicant.physicalAddress.street1}`

2. **Map-based dropdowns:**
   ```json
   {
     "states": {
       "TX": "Texas",
       "CA": "California"
     }
   }
   ```

## 🚦 Which Mode to Use?

| Task | Use This | Why |
|------|----------|-----|
| Quick CSS test | visual-mode | Instant, no setup |
| Layout preview | visual-mode | Fast visual |
| JSTL logic test | index.html | Evaluates conditions |
| EL expression test | index.html | Mock data driven |
| Client demo | visual-mode | Clean output |

## 🛠️ Troubleshooting

### Preview Not Showing
✓ Clicked "Preview" button?  
✓ Complete HTML with closing tags?  
✓ `<style>` tags properly closed?  

### CSS Not Applied
✓ `<style>` tags inside pasted code?  
✓ CSS selectors match HTML?  
✓ Try pasting just `<style>` block first  

### JSTL Tags Visible
- **Visual Mode:** Shows placeholders (expected)
- **Full Mode:** Check mock data structure

## 📂 File Structure

```
jsp-live-preview/
├── visual-mode.html      # ⭐ Quick visual preview (START HERE)
├── index.html            # Full JSTL preview mode
├── QUICKSTART.md         # 60-second startup guide
├── README.md             # This file
├── css/
│   └── app.css          # UI styling
└── js/
    ├── app.js           # Main application
    ├── el-evaluator.js  # EL expression handler
    ├── jsp-parser.js    # JSTL parser
    └── renderer.js      # HTML renderer
```

## 🎓 Real-World Example

**Problem:** Form padding looks wrong on deployed JSP

**Traditional approach:**
1. Edit JSP CSS (2 min)
2. Rebuild project (3 min)
3. Deploy to server (5 min)
4. Test in browser (1 min)
5. Not perfect? Repeat
**Total:** 11+ minutes per iteration

**With Visual Preview:**
1. Copy JSP section (10 sec)
2. Paste in visual-mode (5 sec)
3. Adjust CSS (30 sec)
4. See result instantly (0 sec)
5. Copy back when perfect (10 sec)
**Total:** ~1 minute

**Time saved:** 10 minutes per iteration

## 📄 License

Free to use, modify, and distribute.

## 🆘 FAQ

**Q: Does this replace my dev server?**  
A: No - use for frontend/visual work only. Backend logic needs real server.

**Q: Works offline?**  
A: Yes! Open visual-mode.html directly (no internet needed).

**Q: Can I save my work?**  
A: Currently no - paste fresh each session. Browser storage could be added.

**Q: Mobile friendly?**  
A: Preview shows responsive CSS. Tool itself is desktop-optimized.

**Q: What about custom tag libraries?**  
A: Only JSTL core supported. Custom tags won't render.

---

**Ready?** → Open `visual-mode.html` and paste your JSP! 🚀

**Need help?** → Read [QUICKSTART.md](QUICKSTART.md) for step-by-step guide
```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
    <c:if test="${user.isAdmin}">
        <p>Welcome, Administrator!</p>
    </c:if>
    
    <c:forEach var="item" items="${items}">
        <div>${item.name}: $${item.price}</div>
    </c:forEach>
</div>
```

### 3. Define Mock Data
Switch to "Mock Data" tab and provide JSON:
```json
{
  "user": {
    "isAdmin": true,
    "name": "John Doe"
  },
  "items": [
    {"name": "Widget", "price": 29.99},
    {"name": "Gadget", "price": 49.99}
  ]
}
```

### 4. Add CSS (Optional)
Switch to "CSS" tab and add styles:
```css
div { padding: 10px; }
.badge { color: green; }
```

Or use CDN links in your JSP:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

### 5. View Live Preview
The right panel shows your rendered HTML in real-time.

## Mock Data Patterns

### Simple Beans
```json
{
  "user": {
    "name": "John",
    "email": "john@example.com",
    "role": "Admin"
  }
}
```
Use: `${user.name}`, `${user.email}`

### Maps for Dropdowns
```json
{
  "statusMap": {
    "A": "Active",
    "I": "Inactive",
    "P": "Pending"
  }
}
```
Use in JSP:
```jsp
<select>
    <c:forEach var="status" items="${statusMap}">
        <option value="${status.key}">${status.value}</option>
    </c:forEach>
</select>
```

### Lists/Arrays
```json
{
  "items": [
    {"id": 1, "name": "Item 1"},
    {"id": 2, "name": "Item 2"}
  ]
}
```
Use: `<c:forEach var="item" items="${items}">`

## Supported JSTL Examples

### Conditional Rendering
```jsp
<c:if test="${user.age >= 18}">
    <p>You are an adult.</p>
</c:if>
```

### Multi-way Conditionals
```jsp
<c:choose>
    <c:when test="${score >= 90}">Grade: A</c:when>
    <c:when test="${score >= 80}">Grade: B</c:when>
    <c:otherwise>Grade: C</c:otherwise>
</c:choose>
```

### Loops with Status
```jsp
<c:forEach var="item" items="${items}">
    Item #${itemStatus.count}: ${item.name}
    <c:if test="${itemStatus.last}">(Last item)</c:if>
</c:forEach>
```

## Tips

1. **Use Bootstrap CDN** - Quick styling without writing CSS
2. **Test edge cases** - Empty lists, null values, missing fields
3. **Export HTML** - Click "Copy HTML" to get rendered output
4. **View source** - Click "Show/Hide" to see full generated HTML

## Limitations

- No custom tag library support (only JSTL core)
- No JSP scriptlets (`<% Java code %>`)
- No server-side includes
- No database queries or external resources

## Deployment

### GitHub Pages
1. Create repo
2. Upload all files
3. Enable Pages in Settings
4. Share the URL

### Local Network
1. Run a local server: `python -m http.server 8000`
2. Access at `http://localhost:8000`

### VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

Free to use, modify, and distribute.

---

**Pro tip:** Bookmark this tool for daily JSP development. No more waiting for rebuilds! 🎉
