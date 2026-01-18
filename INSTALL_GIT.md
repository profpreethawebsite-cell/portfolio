# Install Git on Windows - Step by Step

## Quick Installation

### Step 1: Download Git
1. Go to: https://git-scm.com/download/win
2. The download will start automatically
3. Or click the download button for Windows

### Step 2: Install Git
1. **Run the installer** (Git-2.x.x-64-bit.exe)
2. **Click "Next"** through the setup wizard
3. **Important settings:**
   - ✅ Select "Git from the command line and also from 3rd-party software"
   - ✅ Use default editor (or choose VS Code if you prefer)
   - ✅ Use bundled OpenSSH
   - ✅ Use the OpenSSL library
   - ✅ Checkout Windows-style, commit Unix-style line endings
   - ✅ Use MinTTY (default terminal)
   - ✅ Enable file system caching
   - ✅ Enable Git Credential Manager
4. **Click "Install"**
5. **Wait for installation** (1-2 minutes)
6. **Click "Finish"**

### Step 3: Verify Installation
1. **Close and reopen** your PowerShell/terminal
2. **Or open a new terminal window**
3. **Test Git:**
   ```powershell
   git --version
   ```
4. You should see: `git version 2.x.x`

### Step 4: Configure Git (First Time)
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## After Installing Git

Once Git is installed, you can proceed with deployment:

### 1. Initialize Git Repository
```powershell
cd C:\Users\kamle\portfolio-website
git init
git add .
git commit -m "Initial commit - Portfolio website"
```

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `portfolio-website`
3. **Don't** initialize with README
4. Click "Create repository"

### 3. Push to GitHub
```powershell
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git branch -M main
git push -u origin main
```
(You'll need to login to GitHub)

### 4. Deploy to Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Add environment variables
5. Deploy!

---

## Alternative: Use GitHub Desktop

If you prefer a GUI instead of command line:

1. **Download GitHub Desktop:**
   - https://desktop.github.com/
   - This includes Git automatically

2. **Install and sign in** with GitHub

3. **Add your repository:**
   - File > Add Local Repository
   - Select your project folder
   - Publish to GitHub

4. **Then deploy to Vercel** as above

---

## Troubleshooting

### Git still not recognized after install:
1. **Close all terminal windows**
2. **Restart VS Code** (if using it)
3. **Open new PowerShell window**
4. Try `git --version` again

### If still not working:
1. Check if Git is in PATH:
   ```powershell
   $env:PATH
   ```
2. Git should be in: `C:\Program Files\Git\cmd\`
3. If not, add it manually or reinstall Git

---

**After installing Git, come back and we'll deploy your website!** 🚀
