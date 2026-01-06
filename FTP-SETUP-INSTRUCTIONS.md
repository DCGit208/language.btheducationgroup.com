# GitHub Actions FTP Auto-Deploy Setup Instructions

## ✅ Workflow Created
Your repository now has automatic FTP deployment configured via GitHub Actions.

---

## 🔐 REQUIRED: Add FTP Credentials to GitHub

You must add your FTP credentials as **GitHub Secrets** (encrypted variables):

### Step-by-Step:

1. **Go to your GitHub repository:**
   https://github.com/DCGit208/language.btheducationgroup.com

2. **Navigate to Settings:**
   Click "Settings" tab at the top

3. **Access Secrets:**
   - Left sidebar: Click "Secrets and variables"
   - Click "Actions"

4. **Add Three Secrets:**
   Click "New repository secret" for each:

   **Secret 1: FTP_SERVER**
   - Name: `FTP_SERVER`
   - Value: Your FTP server address (e.g., `ftp.btheducationgroup.com` or `192.168.1.100`)
   - Click "Add secret"

   **Secret 2: FTP_USERNAME**
   - Name: `FTP_USERNAME`
   - Value: Your FTP username
   - Click "Add secret"

   **Secret 3: FTP_PASSWORD**
   - Name: `FTP_PASSWORD`
   - Value: Your FTP password
   - Click "Add secret"

---

## 📁 FTP Server Directory

The workflow is configured to deploy to: `/language/`

This means files will be uploaded to:
```
ftp://your-server.com/language/
```

Which corresponds to the subdirectory:
```
https://btheducationgroup.com/language
```

**If your FTP path is different**, update line 20 in `.github/workflows/deploy-ftp.yml`:
```yaml
server-dir: /your-actual-path/
```

Common FTP paths:
- cPanel: `/public_html/language/` or `/home/username/public_html/language/`
- Plesk: `/httpdocs/language/`
- Generic: `/www/language/` or `/htdocs/language/`

---

## 🚀 How It Works

### Automatic Deployment:
Every time you push code to the `main` branch, GitHub will:
1. Trigger the workflow
2. Connect to your FTP server
3. Upload all changed files to `/language/` directory
4. Your website updates automatically!

### Manual Deployment:
You can also trigger deployment manually:
1. Go to repository → "Actions" tab
2. Click "Deploy to FTP" workflow
3. Click "Run workflow" → "Run workflow"

---

## 📝 Deployment Process

**When you make changes:**
```bash
# Make your edits to HTML, CSS, JS files

# Stage changes
git add .

# Commit changes
git commit -m "Update contact information"

# Push to GitHub (triggers auto-deploy)
git push origin main
```

**GitHub Actions will:**
- ✅ Detect the push
- ✅ Start deployment workflow
- ✅ Upload files to FTP server
- ✅ Complete in 30-60 seconds

---

## 📊 Monitoring Deployments

### View Deployment Status:
1. Go to your repository
2. Click "Actions" tab
3. See all deployment runs with status:
   - 🟢 Green checkmark = Success
   - 🔴 Red X = Failed
   - 🟡 Yellow dot = In progress

### View Deployment Logs:
1. Click on any deployment run
2. Click "Deploy to FTP Server"
3. Expand steps to see detailed logs
4. Troubleshoot any issues

---

## ⚙️ Advanced Configuration

### Change Deployment Branch:
Edit `.github/workflows/deploy-ftp.yml` line 5:
```yaml
branches:
  - main        # Change to 'production' or other branch
```

### Deploy Multiple Branches to Different Directories:
Create separate workflow files for each environment:
- `.github/workflows/deploy-staging.yml` → `/language-staging/`
- `.github/workflows/deploy-production.yml` → `/language/`

### Exclude Additional Files:
Edit `.github/workflows/deploy-ftp.yml` lines 25-35:
```yaml
exclude: |
  **/.git*
  **/*.md
  **/backup/**
  **/tests/**
```

### Use SFTP Instead of FTP:
If your server supports SFTP (more secure), update line 15:
```yaml
protocol: ftps  # or 'sftp'
```

### Specify Custom Port:
Add after line 20:
```yaml
port: 2121  # Default FTP is 21, SFTP is 22
```

---

## 🔒 Security Best Practices

✅ **DO:**
- Use SFTP/FTPS if available (encrypted)
- Keep secrets in GitHub (never in code)
- Use strong FTP passwords
- Limit FTP user permissions to necessary directories only

❌ **DON'T:**
- Commit FTP credentials to code
- Share your GitHub secrets
- Use weak passwords
- Give FTP user full server access

---

## 🐛 Troubleshooting

### Deployment Fails - "Connection refused"
- **Check:** FTP server address is correct
- **Check:** FTP port is open (default 21)
- **Check:** Server firewall allows GitHub IPs
- **Solution:** Contact your hosting provider

### Deployment Fails - "Authentication failed"
- **Check:** FTP username is correct
- **Check:** FTP password is correct (no extra spaces)
- **Check:** FTP user has write permissions
- **Solution:** Test FTP credentials with FileZilla first

### Files Not Updating on Website
- **Check:** Correct server directory path
- **Check:** FTP user has write permissions
- **Check:** Clear browser cache (Ctrl+Shift+R)
- **Solution:** Verify files uploaded via FTP client

### Deployment Takes Too Long
- **Check:** Large files being uploaded
- **Check:** Slow FTP server
- **Solution:** Optimize images, use CDN for assets

### Wrong Directory Structure
- **Issue:** Files uploading to wrong location
- **Fix:** Update `server-dir` in workflow file
- **Example:** Change `/language/` to `/public_html/language/`

---

## 📋 Testing Your Setup

### 1. Add Secrets to GitHub (Required)
Follow steps above to add FTP_SERVER, FTP_USERNAME, FTP_PASSWORD

### 2. Test Deployment
```bash
# Make a small test change
echo "<!-- Test deployment -->" >> index.html

# Commit and push
git add index.html
git commit -m "Test FTP auto-deploy"
git push origin main
```

### 3. Watch Deployment
- Go to GitHub → Actions tab
- Watch deployment progress
- Should complete in ~30-60 seconds

### 4. Verify Website
- Visit: https://btheducationgroup.com/language
- Check if test comment appears
- Deployment successful! ✅

---

## 🔄 Alternative: Subdomain Setup

If you want `language.btheducationgroup.com` (subdomain) instead of `/language/`:

### FTP Configuration:
Update `server-dir` to root:
```yaml
server-dir: /public_html/  # or /httpdocs/ depending on host
```

### DNS Configuration:
Add DNS record in your domain registrar:
```
Type: A Record (or CNAME)
Name: language
Value: [Your Server IP]
TTL: 3600
```

### cPanel Subdomain Setup:
1. Login to cPanel
2. Go to "Subdomains"
3. Create: `language.btheducationgroup.com`
4. Document root: `/public_html/language/` (or auto-created path)
5. Update workflow `server-dir` to match

---

## 📞 Support

**Workflow Issues:**
- Check GitHub Actions logs
- Review secrets configuration
- Test FTP credentials with FileZilla

**FTP Server Issues:**
- Contact your hosting provider
- Verify FTP is enabled on your plan
- Check server firewall settings

**DNS/Domain Issues:**
- Contact domain registrar
- Allow 24-48 hours for DNS propagation
- Use DNS checker tools online

---

## ✅ Quick Checklist

Before first deployment:
- [ ] GitHub secrets added (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)
- [ ] FTP server directory path verified
- [ ] FTP user has write permissions
- [ ] Tested FTP credentials with FTP client (FileZilla)
- [ ] Pushed workflow file to GitHub
- [ ] Watched first deployment in Actions tab
- [ ] Verified website updates live

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action)
- [FileZilla FTP Client](https://filezilla-project.org/) (for testing)

---

**Status:** Ready for deployment once secrets are configured! 🚀
