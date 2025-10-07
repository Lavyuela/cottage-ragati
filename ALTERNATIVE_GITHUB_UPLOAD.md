# Alternative: Upload to GitHub Without Git Command Line

Since Git command line is not working yet, here are 3 alternative methods:

---

## ✅ METHOD 1: GitHub Desktop (Easiest - RECOMMENDED)

### Step 1: Install GitHub Desktop
1. Download from: https://desktop.github.com/
2. Install and sign in with: ivy.waliaula@gmail.com

### Step 2: Add Your Repository
1. Open GitHub Desktop
2. Click **File** → **Add Local Repository**
3. Choose folder: `C:\Users\Admin\Downloads\Cottage Ragati`
4. Click **Add Repository**

### Step 3: Publish to GitHub
1. Click **Publish repository**
2. Name: `cottage-ragati`
3. **Uncheck** "Keep this code private" (must be public!)
4. Click **Publish repository**

**Done!** Your code is now on GitHub.

---

## ✅ METHOD 2: Upload via GitHub Web Interface

### Step 1: Create Files on GitHub
1. Go to: https://github.com/Lavyuela/cottage-ragati
2. Click **uploading an existing file**

### Step 2: Upload Project Files
1. Drag and drop ALL folders and files from `C:\Users\Admin\Downloads\Cottage Ragati`
2. **Important:** Upload these folders:
   - `client` (entire folder)
   - `server` (entire folder)
   - All `.md` files
   - `package.json`
   - `.gitignore`

3. Commit message: "Initial commit - Cottage Ragati website"
4. Click **Commit changes**

**Done!** Your code is now on GitHub.

---

## ✅ METHOD 3: Fix Git PATH and Use Command Line

### Step 1: Add Git to PATH
1. Press **Windows + R**
2. Type: `sysdm.cpl` and press Enter
3. Click **Advanced** tab
4. Click **Environment Variables**
5. Under **System variables**, find **Path**
6. Click **Edit**
7. Click **New**
8. Add: `C:\Program Files\Git\bin`
9. Click **OK** on all windows
10. **Restart PowerShell**

### Step 2: Run Commands
Open NEW PowerShell and run:

```powershell
cd "C:\Users\Admin\Downloads\Cottage Ragati"
git init
git config user.email "ivy.waliaula@gmail.com"
git config user.name "Lavyuela"
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Lavyuela/cottage-ragati.git
git push -u origin main
```

---

## 🎯 RECOMMENDED: Use GitHub Desktop (Method 1)

It's the easiest and most reliable method!

Download: https://desktop.github.com/

---

## After Uploading to GitHub

Once your code is on GitHub (using any method above), continue with:

### STEP 2: Deploy Backend to Render
1. Go to: https://render.com/dashboard
2. New + → Web Service
3. Connect GitHub → Select cottage-ragati
4. Configure:
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `node server.js`
5. Add environment variables
6. Deploy!

### STEP 3: Deploy Frontend to Vercel
1. Go to: https://vercel.com/new
2. Import cottage-ragati repository
3. Configure:
   - Root Directory: `client`
   - Framework: Vite
4. Add VITE_API_URL environment variable
5. Deploy!

See MANUAL_DEPLOYMENT_STEPS.md for detailed instructions.

---

**Choose Method 1 (GitHub Desktop) for the easiest experience!**
