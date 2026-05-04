# JSP Live Preview - Quick Reference

**Creator:** Rohan Sharma

## 🚀 Start Server

```bash
python -m http.server 8080
```

## 🌐 URLs

- **Visual Mode:** http://localhost:8080/visual-mode.html
- **Full Mode:** http://localhost:8080/index.html

## 📖 Two Modes

### Visual Mode (Instant)
- Paste JSP → Click Preview
- Auto-fills JSTL with placeholders
- Perfect for: Layout checks, CSS testing

### Full Mode (Advanced)
- Paste JSP + Mock Data (JSON)
- Real JSTL evaluation
- Perfect for: Logic testing, data binding

## 🎯 Quick Workflow

```
1. Start server
2. Open browser → choose mode
3. Paste JSP code
4. (Full mode only) Add mock data
5. Click Preview
6. See result
```

## 💡 Tips

✅ Include `<style>` tags in JSP  
✅ Use CDN for external CSS  
✅ Test with realistic mock data  
✅ Keep browser tab open for quick iterations  

## 🚫 Limitations

- No server-side includes
- No custom tag libraries (JSTL core only)
- No JavaScript execution
- No JSP scriptlets `<% %>`

---

**Purpose:** Eliminate JSP rebuild/deploy cycle  
**Time Saved:** 5-10 minutes per edit  
**Target:** Legacy JSP developers  

**Created by Rohan Sharma - May 2026**
