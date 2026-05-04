# JSP Live Preview - Startup Guide

**Created by:** Rohan Sharma  
**Version:** 1.0  
**Date:** May 2026

---

## 🚀 Quick Start (3 Steps)

### Step 1: Start the Server

**Option A: Python (Recommended)**
```bash
cd d:\BMAD\jsp-live-preview
python -m http.server 8080
```

**Option B: Node.js**
```bash
cd d:\BMAD\jsp-live-preview
npx http-server -p 8080
```

**Option C: VS Code Live Server**
1. Install "Live Server" extension
2. Right-click any `.html` file → "Open with Live Server"

### Step 2: Open in Browser

Navigate to:
```
http://localhost:8080
```

### Step 3: Choose Your Mode

**Two Modes Available:**

#### **Mode 1: Visual Preview** (Recommended for quick layout checks)
- **File:** `visual-mode.html`
- **URL:** http://localhost:8080/visual-mode.html
- **Use Case:** See JSP layout/styling instantly without mock data
- **Best For:** Checking CSS, layout structure, visual design

#### **Mode 2: Functional Preview** (Full JSTL simulation)
- **File:** `index.html`
- **URL:** http://localhost:8080/index.html
- **Use Case:** Test JSP logic with mock data
- **Best For:** Testing JSTL tags, EL expressions, data binding

---

## 📋 Mode Comparison

| Feature | Visual Mode | Functional Mode |
|---------|-------------|-----------------|
| **Layout Preview** | ✅ Instant | ✅ Yes |
| **CSS Rendering** | ✅ Full | ✅ Full |
| **JSTL Tags** | ⚡ Auto-placeholder | 🔧 Requires mock data |
| **EL Expressions** | ⚡ Auto-filled | 🔧 Needs JSON context |
| **Setup Time** | 🚀 Instant (paste & preview) | ⏱️ 2-3 minutes (define data) |
| **Best For** | Quick visual checks | Logic testing |

---

## 🎯 Usage Examples

### Visual Mode - Quick Layout Check

**Scenario:** You have a JSP with complex CSS and want to see how it looks.

1. Open `visual-mode.html`
2. Paste your entire JSP code (including `<style>` tags)
3. Click **Preview**
4. See rendered layout instantly

**Example:**
```jsp
<style>
.header { background: #0c087a; color: white; padding: 10px; }
.container { display: flex; gap: 20px; }
</style>

<div class="header">
    <h1>Driver License Review</h1>
    <p>Applicant: <core:out value="${applicant.firstName}"/> <core:out value="${applicant.lastName}"/></p>
</div>
<div class="container">
    <div>Current Data: ${applicant.ssn}</div>
    <div>OA Data: ${oaApplicant.ssn}</div>
</div>
```

**Result:** Immediate visual with all placeholders filled (John Doe, 123-45-6789, etc.)

---

### Functional Mode - Test JSTL Logic

**Scenario:** Test a dropdown populated from a Map.

1. Open `index.html`
2. **JSP Code Panel:**
```jsp
<select name="status">
    <c:forEach var="item" items="${statusMap}">
        <option value="${item.key}">${item.value}</option>
    </c:forEach>
</select>
```

3. **Mock Data Panel (JSON):**
```json
{
  "statusMap": {
    "A": "Active",
    "I": "Inactive",
    "P": "Pending"
  }
}
```

4. Click **Preview** → See working dropdown with 3 options

---

## 🛠️ Common Workflows

### Workflow 1: Daily JSP Development

**Problem:** You edit a JSP, want to see changes without rebuilding app.

**Solution:**
```
1. Open visual-mode.html
2. Keep browser open on second monitor
3. Edit JSP in IDE → Copy → Paste → Preview
4. Iterate quickly (no rebuild/deploy)
```

**Time Saved:** 10-15 minutes per change cycle

---

### Workflow 2: Debugging JSTL Logic

**Problem:** `<c:forEach>` not working as expected.

**Solution:**
```
1. Open index.html
2. Paste problematic JSP snippet
3. Define mock data matching your beans
4. Test different data scenarios
5. See exactly what renders
```

---

### Workflow 3: Team Code Review

**Problem:** Need to show JSP changes to team without deploying.

**Solution:**
```
1. Use visual-mode.html
2. Paste JSP code
3. Share screenshot or screen share preview
4. Team sees exact visual output
```

---

## 🔧 Troubleshooting

### Issue: Styling not appearing

**Cause:** CSS not included in JSP paste

**Fix:**
- Make sure `<style>` tags are included
- OR use "CSS" tab in functional mode
- OR add CDN links in JSP: `<link href="https://...bootstrap.css">`

---

### Issue: EL expressions showing as ${...}

**In Visual Mode:**
- This shouldn't happen - placeholders auto-fill
- Check console for errors

**In Functional Mode:**
- You need to define mock data in JSON panel
- Example: `${user.name}` requires `{"user": {"name": "John"}}`

---

### Issue: JSTL tags not rendering

**In Visual Mode:**
- Tags automatically simplified to show structure
- `<c:if>` shows content
- `<c:forEach>` repeats 2-3 times

**In Functional Mode:**
- Verify tag syntax: `<c:if>` not `<core:if>` (both supported)
- Check mock data structure matches tag references

---

### Issue: Layout looks different from production

**Common causes:**
1. Missing external CSS files (add CDN links)
2. Different browser rendering
3. JavaScript dependencies (not supported - static preview only)

**Fix:**
- Include all CSS inline or via CDN
- Reference production stylesheets

---

## 📦 File Structure

```
jsp-live-preview/
├── index.html              # Functional mode (JSTL + mock data)
├── visual-mode.html        # Visual mode (instant layout)
├── css/
│   └── app.css            # UI styling
├── js/
│   ├── app.js            # Main application
│   ├── el-evaluator.js   # EL expression handler
│   ├── jsp-parser.js     # JSTL parser
│   └── renderer.js       # HTML renderer
├── README.md             # Feature documentation
└── STARTUP-GUIDE.md      # This file
```

---

## 🎓 Best Practices

### DO:
✅ Include all CSS in JSP or use CDN links  
✅ Use realistic mock data in functional mode  
✅ Test edge cases (empty lists, null values)  
✅ Keep JSP snippets focused for faster iteration  

### DON'T:
❌ Expect server-side includes to work  
❌ Use custom tag libraries (only JSTL core)  
❌ Rely on JavaScript execution (static preview)  
❌ Include JSP scriptlets `<% code %>`  

---

## 🚀 Advanced Tips

### Tip 1: Quick CSS Tweaks
In visual mode, edit CSS directly in JSP, click Preview to see changes instantly.

### Tip 2: Testing Responsive Design
Resize browser window - preview updates in real-time.

### Tip 3: Comparing Layouts
Open two browser tabs, paste different JSP versions, compare side-by-side.

### Tip 4: Export HTML
In functional mode, click "Show/Hide" under HTML output, copy rendered HTML for documentation.

---

## 📞 Support & Feedback

**Creator:** Rohan Sharma  
**Purpose:** Eliminate JSP rebuild/redeploy cycle  
**Target Users:** Java/JSP developers maintaining legacy codebases  

---

## 🎉 Success Metrics

After using this tool, you should see:
- **90% reduction** in rebuild/redeploy cycles
- **5-10 minutes saved** per JSP edit
- **Faster iteration** on UI changes
- **Better collaboration** with designers (visual preview)

---

## 📝 Quick Reference Card

```
┌─────────────────────────────────────────┐
│  JSP LIVE PREVIEW - QUICK REFERENCE     │
├─────────────────────────────────────────┤
│  START SERVER:                          │
│    python -m http.server 8080           │
│                                         │
│  MODES:                                 │
│    Visual:     /visual-mode.html       │
│    Functional: /index.html             │
│                                         │
│  WORKFLOW:                              │
│    1. Paste JSP code                    │
│    2. (Functional only) Add mock data   │
│    3. Click Preview                     │
│    4. See result instantly              │
│                                         │
│  CREATOR: Rohan Sharma                  │
└─────────────────────────────────────────┘
```

---

**Ready to preview JSP like never before!** 🎨🚀
