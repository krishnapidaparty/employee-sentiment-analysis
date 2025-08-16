# 🚀 Deploy Slack Pulse on Replit

This guide will help you deploy your Slack Pulse Dashboard on Replit.

## 📋 Prerequisites

1. **Replit Account**: Sign up at [replit.com](https://replit.com)
2. **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
3. **Slack Bot Token**: Create a Slack app with proper permissions

## 🚀 Step-by-Step Deployment

### Step 1: Create New Repl

1. **Go to Replit**: Visit [replit.com](https://replit.com)
2. **Click "Create Repl"**
3. **Choose Template**: Select "Node.js" template
4. **Name your Repl**: e.g., "slack-pulse-dashboard"
5. **Click "Create Repl"**

### Step 2: Import Your Code

#### Option A: Import from GitHub
1. **In your Repl**, click the "Version Control" icon (Git icon)
2. **Click "Import from GitHub"**
3. **Enter your repository URL**: `https://github.com/krishnapidaparty/employee-sentiment-analysis`
4. **Click "Import from GitHub"**

#### Option B: Manual Upload
1. **Download your code** from GitHub as ZIP
2. **Upload files** to your Repl
3. **Extract and replace** existing files

### Step 3: Install Dependencies

1. **Open the Shell** in your Repl
2. **Run installation**:
   ```bash
   npm install
   ```

### Step 4: Set Environment Variables

1. **Click on "Tools"** in the left sidebar
2. **Select "Secrets"**
3. **Add your secrets**:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
4. **Click "Add Secret"**

### Step 5: Configure Replit

1. **Open `.replit` file** and ensure it contains:
   ```toml
   run = "npm run dev"
   entrypoint = "src/app/page.tsx"
   ```

2. **Open `replit.nix`** and ensure it contains:
   ```nix
   { pkgs }: {
     deps = [
       pkgs.nodejs-18_x
       pkgs.nodePackages.typescript
       pkgs.yarn
       pkgs.replitPackages.jest
     ];
   }
   ```

### Step 6: Start the Application

1. **Click "Run"** button
2. **Wait for installation** to complete
3. **Application will start** on the provided URL

## 🔧 Replit-Specific Configuration

### Environment Variables in Replit
- Use **Secrets** feature for sensitive data
- Access via `process.env.VARIABLE_NAME`
- Never commit secrets to code

### Port Configuration
- Replit automatically assigns ports
- Your app will be available at the provided URL
- No need to configure ports manually

### File Structure
```
slack-pulse-dashboard/
├── .replit              # Replit configuration
├── replit.nix           # Dependencies
├── package.json         # Node.js dependencies
├── src/
│   └── app/
│       ├── api/
│       │   └── analyze/
│       │       └── route.ts
│       ├── page.tsx
│       └── layout.tsx
└── README.md
```

## 🎯 Using Your Deployed App

1. **Open the provided URL** from Replit
2. **Enter your Slack Bot Token** (xoxb-...)
3. **Enter your Channel ID** (C...)
4. **Click "Analyze Channel"**
5. **View results** with charts and insights

## 🔒 Security Notes for Replit

### Environment Variables
- ✅ Use Replit Secrets for `OPENAI_API_KEY`
- ✅ Never hardcode API keys in code
- ✅ Keep secrets private

### Slack Tokens
- ⚠️ **Important**: Don't store Slack tokens in Replit Secrets
- ⚠️ **Security**: Enter tokens manually in the UI
- ⚠️ **Best Practice**: Use workspace-specific tokens

## 🚀 Sharing Your Repl

### Public Repl
1. **Click "Share"** button
2. **Set to "Public"**
3. **Share the URL** with others

### Private Repl
1. **Keep as "Private"**
2. **Invite specific users** if needed
3. **Control access** to your application

## 🔧 Troubleshooting

### Common Issues

#### "Module not found" errors
```bash
npm install
npm run dev
```

#### Environment variables not working
- Check Secrets are properly set
- Restart the Repl after adding secrets

#### Port issues
- Replit handles ports automatically
- Use the provided URL, not localhost

#### Build errors
- Check Node.js version compatibility
- Ensure all dependencies are installed

### Getting Help
- Check Replit documentation
- Use Replit community forums
- Review error logs in the console

## 🎉 Success!

Your Slack Pulse Dashboard is now live on Replit! 

**Features Available:**
- ✅ Real-time sentiment analysis
- ✅ Interactive charts and visualizations
- ✅ AI-powered insights
- ✅ Modern responsive UI
- ✅ Secure environment variable handling

**Next Steps:**
1. Test with your Slack data
2. Share with your team
3. Monitor usage and performance
4. Consider upgrading to paid Replit plan for more features

---

**Happy analyzing! 🚀**
