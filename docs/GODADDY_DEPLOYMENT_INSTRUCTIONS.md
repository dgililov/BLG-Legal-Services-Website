# BLG Legal Services Website - GoDaddy Deployment Instructions

**Date:** January 3, 2026  
**Prepared for:** BLG Legal Services  
**Attachment:** `BLG-Website-Deploy.zip` (416 KB)

---

## Overview

This document provides step-by-step instructions for deploying the BLG Legal Services website to GoDaddy hosting.

**Website Features:**
- Professional legal services website
- 8 languages supported (English, Spanish, French, Russian, Hebrew, Georgian, Farsi, Uzbek)
- Responsive design for all devices
- Contact form integration
- Google Reviews and Facebook integration ready

---

## Prerequisites

Before you begin, ensure you have:
- [ ] GoDaddy hosting account credentials
- [ ] Access to GoDaddy cPanel or File Manager
- [ ] The deployment package: `BLG-Website-Deploy.zip`

---

## Method 1: GoDaddy File Manager (Recommended)

### Step 1: Login to GoDaddy

1. Go to [https://www.godaddy.com](https://www.godaddy.com)
2. Click **Sign In** in the top right corner
3. Enter your GoDaddy account credentials

### Step 2: Access Your Hosting

1. Click on your profile icon → **My Products**
2. Find **Web Hosting** section
3. Click **Manage** next to your hosting plan

### Step 3: Open File Manager

1. In your hosting dashboard, look for **File Manager** or **cPanel**
2. If using cPanel, click on **File Manager** icon
3. Navigate to the **public_html** folder (this is your website root)

### Step 4: Backup Existing Files (Important!)

1. If there are existing files in `public_html`:
   - Select all files
   - Right-click → **Compress** to create a backup
   - Name it `backup_YYYY-MM-DD.zip`
   - Download the backup to your computer
2. Delete the old files (keep the backup ZIP)

### Step 5: Upload the Deployment Package

1. Click **Upload** in the File Manager toolbar
2. Click **Select File** or drag and drop
3. Choose `BLG-Website-Deploy.zip` from your computer
4. Wait for the upload to complete (should take less than a minute)

### Step 6: Extract the ZIP File

1. In File Manager, find `BLG-Website-Deploy.zip`
2. Right-click on the ZIP file
3. Select **Extract** or **Extract Here**
4. Extraction location: `public_html` (current directory)
5. Click **Extract File(s)**

### Step 7: Verify the Extraction

After extraction, your `public_html` folder should contain:
```
public_html/
├── index.html          ← Main homepage
├── assets/             ← CSS, JS, images
│   ├── css/
│   ├── js/
│   ├── images/
│   └── fonts/
├── pages/              ← English subpages
├── es/                 ← Spanish version
├── fr/                 ← French version
├── ru/                 ← Russian version
├── he/                 ← Hebrew version
├── ka/                 ← Georgian version
├── fa/                 ← Farsi version
└── uz/                 ← Uzbek version
```

### Step 8: Clean Up

1. Delete `BLG-Website-Deploy.zip` from `public_html`
2. Delete any `.DS_Store` files if visible

### Step 9: Test Your Website

1. Open your browser
2. Go to your domain: `https://blglegalservices.com`
3. Verify:
   - [ ] Homepage loads correctly
   - [ ] Navigation menu works
   - [ ] Language switcher works (try clicking different flag icons)
   - [ ] Contact form displays
   - [ ] Mobile responsiveness (resize browser or use phone)

---

## Method 2: FTP Upload

If you prefer using FTP (File Transfer Protocol):

### Step 1: Get FTP Credentials

1. Login to GoDaddy → My Products → Web Hosting → Manage
2. Go to **Settings** or **cPanel** → **FTP Accounts**
3. Note down:
   - **FTP Host:** (e.g., `ftp.yourdomain.com`)
   - **FTP Username:** (e.g., `yourusername@yourdomain.com`)
   - **FTP Password:** (your FTP password)
   - **Port:** 21 (standard FTP)

### Step 2: Install FTP Client

Download and install [FileZilla](https://filezilla-project.org/) (free)

### Step 3: Connect to Your Server

1. Open FileZilla
2. Enter your FTP credentials:
   - Host: `ftp.yourdomain.com`
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
3. Click **Quickconnect**

### Step 4: Upload Files

1. In the left panel (Local), navigate to the extracted website folder
2. In the right panel (Remote), navigate to `public_html`
3. Select all files in the local panel
4. Drag and drop to the remote `public_html` folder
5. Wait for all transfers to complete

---

## Post-Deployment Configuration

### Update Contact Form (If Needed)

The contact form is configured to send emails to:
- `law@blglegalservices.com`

To change this, edit the form action in contact pages or use your own form handler.

### SSL Certificate

Ensure SSL is enabled for HTTPS:
1. In GoDaddy cPanel, go to **Security** → **SSL/TLS**
2. Enable free SSL or install your certificate
3. Force HTTPS redirect if available

### Custom Domain Settings

If using a custom domain with GoDaddy:
1. Ensure your domain points to GoDaddy nameservers
2. Or configure A records to point to your hosting IP

---

## Troubleshooting

### Website Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Wait 5-10 minutes for DNS propagation
- Verify `index.html` is in `public_html` root

### Images Not Showing
- Check that `assets/images/` folder was uploaded
- Verify file permissions (should be 644 for files, 755 for folders)

### CSS/Styling Broken
- Verify `assets/css/` folder exists
- Clear browser cache
- Check browser console for 404 errors

### Language Switcher Not Working
- Ensure all language folders (es/, fr/, ru/, etc.) were uploaded
- Check that JavaScript files are loading (check browser console)

---

## Support

For technical support or questions about this deployment:
- Email: law@blglegalservices.com
- Website: https://github.com/dgililov/BLG-Legal-Services-Website

---

## File Checklist

Verify these files/folders exist after deployment:

- [ ] `index.html`
- [ ] `assets/css/style.css`
- [ ] `assets/css/responsive.css`
- [ ] `assets/js/main.js`
- [ ] `assets/js/lang.js`
- [ ] `assets/js/translations.js`
- [ ] `assets/images/logo.png`
- [ ] `assets/images/favicon.png`
- [ ] `pages/` folder with all HTML files
- [ ] All language folders (es/, fr/, ru/, he/, ka/, fa/, uz/)

---

**Deployment package attached:** `BLG-Website-Deploy.zip`

*This document was auto-generated on January 3, 2026*

