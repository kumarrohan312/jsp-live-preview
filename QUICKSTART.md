# 🏁 Quick Start Guide - JSP Visual Preview

Get started in 60 seconds! 

## ⚡ Fastest Way (No Setup)

1. **Find the file:**
   ```
   d:\BMAD\jsp-live-preview\visual-mode.html
   ```

2. **Double-click** `visual-mode.html`
   - Opens in your default browser
   - No server needed!

3. **Paste your JSP code:**
   - Copy JSP from your project (include `<style>` tags)
   - Paste in left panel

4. **Click "Preview"**
   - See styled layout instantly!

✅ **Done!** That's it.

---

## 🌐 Recommended Way (With Server)

### Windows (PowerShell)

```powershell
cd d:\BMAD\jsp-live-preview
python -m http.server 8080
```

**Then open:** http://localhost:8080/visual-mode.html

### Why use a server?
- Avoids browser file:// restrictions
- Better for testing external CSS links
- Easier to refresh/reload

---

## 🎯 First Test

Try this simple example:

1. **Copy this code:**

```jsp
<style>
  .demo-box {
    background: #0c087a;
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin: 10px;
  }
  .field {
    background: #f0f0f0;
    padding: 10px;
    margin: 5px 0;
  }
</style>

<div class="demo-box">
  <h2>Applicant: ${applicant.firstName} ${applicant.lastName}</h2>
  <p>SSN: ${applicant.ssn}</p>
</div>

<c:forEach var="item" items="${items}">
  <div class="field">
    <strong>${item.label}:</strong> ${item.value}
  </div>
</c:forEach>
```

2. **Paste in visual-mode.html**

3. **Click "Preview"**

4. **You should see:**
   - Blue header box with name
   - SSN field
   - Multiple gray field boxes (auto-generated)

---

## 📖 Usage Modes

### Mode 1: Visual-Only (Quickest)

**File:** `visual-mode.html`

**Use when:**
- Testing CSS changes
- Verifying layout
- Quick visual check
- Showing mockups to team

**Steps:**
1. Paste JSP
2. Click Preview
3. Done!

### Mode 2: Full JSTL Testing

**File:** `index.html`

**Use when:**
- Testing JSTL logic (`<c:if>`, `<c:forEach>`)
- Need specific mock data
- Validating EL expressions
- Testing Map-based dropdowns

**Steps:**
1. Paste JSP (left panel)
2. Add mock JSON data (middle panel, "Mock Data" tab)
3. Optional: Add CSS (middle panel, "CSS" tab)
4. See live preview (right panel)

---

## 🔄 Typical Workflow

```
┌─────────────────────────────────────┐
│   1. Edit JSP in your IDE           │
│                                     │
│   2. Copy section you're working on │
│                                     │
│   3. Paste in visual-mode.html      │
│                                     │
│   4. See instant preview            │
│                                     │
│   5. Adjust CSS/layout              │
│                                     │
│   6. Copy changes back to IDE       │
│                                     │
│   7. Commit when perfect            │
└─────────────────────────────────────┘
```

**Time saved per change:** 5-15 minutes (no rebuild/deploy)

---

## 💡 Pro Tips

### Tip 1: Keep Server Running
```powershell
# Start once, use all day
cd d:\BMAD\jsp-live-preview
python -m http.server 8080

# Bookmark: http://localhost:8080/visual-mode.html
```

### Tip 2: Copy Full Sections
❌ Don't copy partial HTML:
```jsp
<div class="container">
  <table>
    <tr><td>Field</td></tr>  ← Only copying this
```

✅ Copy complete sections:
```jsp
<div class="container">
  <table>
    <tr><td>Field</td></tr>
    <tr><td>Another</td></tr>
  </table>
</div>
```

### Tip 3: Include Styles
Always paste with your `<style>` block:
```jsp
<style type="text/css">
  .your-class { ... }
</style>

<!-- Your HTML below -->
<div class="your-class">...</div>
```

---

## 🐛 Common Issues

### "Nothing appears in preview"

**Fix:** Make sure you:
- Clicked "Preview" button
- Have complete HTML (closing tags)
- Pasted in left text area

### "Styles not applied"

**Fix:** 
- Include `<style>` tags in your paste
- Check CSS selectors match HTML
- Try pasting just `<style>` block first

### "Layout looks wrong"

**Remember:**
- Visual mode shows approximate layout
- Some server-side behavior won't work
- Use full mode (index.html) for accurate JSTL

---

## 📱 What Works

✅ HTML structure  
✅ CSS styling (inline, `<style>`, CDN links)  
✅ JSTL tags (auto-filled with data)  
✅ EL expressions (placeholder data)  
✅ Flexbox/Grid layouts  
✅ Bootstrap/Tailwind  
✅ Responsive design  

## ❌ What Doesn't Work

❌ Server-side Java code (`<% ... %>`)  
❌ Custom tag libraries (beyond JSTL core)  
❌ Database queries  
❌ Session data  
❌ Form submissions  
❌ JavaScript that depends on server  

---

## 🎓 Learning Path

### Day 1: Try Visual Mode
1. Open visual-mode.html
2. Paste simple JSP
3. See instant preview
4. Tweak some CSS
5. Get comfortable

### Day 2: Add Complexity
1. Paste more complex JSP
2. Test different layouts
3. Try with/without Bootstrap
4. Copy working code back

### Day 3: Full Mode
1. Open index.html
2. Add mock JSON data
3. Test JSTL conditions
4. Test forEach loops
5. Export HTML

### Week 2: Daily Usage
- Keep server running
- Quick preview before commits
- Share visual demos
- Build component library

---

## 🎯 Real Example

You have this JSP:
```jsp
<%-- File: applicantForm.jsp --%>

<style>
.form-section {
  border: 2px solid #888;
  padding: 15px;
  margin: 10px 0;
  background: #f9f9f9;
}
.form-section h3 {
  color: #0c087a;
  margin-bottom: 10px;
}
.field-row {
  display: flex;
  gap: 10px;
  margin: 5px 0;
}
.field-label {
  font-weight: bold;
  min-width: 120px;
}
</style>

<div class="form-section">
  <h3>Personal Information</h3>
  
  <div class="field-row">
    <span class="field-label">First Name:</span>
    <span>${applicant.firstName}</span>
  </div>
  
  <div class="field-row">
    <span class="field-label">Last Name:</span>
    <span>${applicant.lastName}</span>
  </div>
  
  <div class="field-row">
    <span class="field-label">Date of Birth:</span>
    <span><fmt:formatDate value="${applicant.dob}" pattern="MM/dd/yyyy"/></span>
  </div>
</div>
```

**Your workflow:**

1. **Copy entire block above** (Ctrl+C from your IDE)

2. **Open visual-mode.html**

3. **Paste** (Ctrl+V in left panel)

4. **Click "Preview"**

5. **See rendered form** with:
   - Gray bordered box
   - Purple heading
   - Neat field rows
   - Sample data filled in

6. **Notice:** "Padding too small? Border color wrong?"

7. **Edit CSS in left panel:**
   ```css
   .form-section {
     border: 2px solid #0c087a; /* Changed! */
     padding: 25px;              /* Changed! */
     ...
   }
   ```

8. **Click "Preview" again** → See changes instantly!

9. **Perfect? Copy CSS back to your IDE**

10. **Commit** knowing it looks right

**Time to verify styling: 30 seconds** (vs 10 minutes with rebuild)

---

## 🚀 You're Ready!

**Next step:** Open visual-mode.html and paste your first JSP!

**Questions?** Check README.md for detailed docs.

**Want more?** Try index.html (full mode) with mock data.

---

**Happy previewing!** 🎨
