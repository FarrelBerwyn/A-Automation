#!/usr/bin/env python3
"""
GitHub Pages Configuration Script
Configures GitHub Pages settings for the repository
"""

import subprocess
import sys
import json
import os

def run_command(cmd):
    """Run a shell command and return output"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.stdout, result.stderr, result.returncode
    except Exception as e:
        return "", str(e), 1

def configure_github_pages():
    """Configure GitHub Pages using gh CLI"""
    
    print("🔧 Configuring GitHub Pages...")
    print("-" * 50)
    
    # Check if gh CLI is installed
    stdout, stderr, code = run_command("gh --version")
    if code != 0:
        print("❌ GitHub CLI not found. Please install it first:")
        print("   https://cli.github.com")
        return False
    
    print(f"✅ GitHub CLI: {stdout.strip()}")
    
    # Check authentication
    print("\n🔐 Checking authentication...")
    stdout, stderr, code = run_command("gh auth status")
    if code != 0:
        print("⏳ Need to authenticate with GitHub...")
        run_command("gh auth login")
    else:
        print("✅ Already authenticated")
        print(stdout)
    
    # Configure Pages
    print("\n📄 Configuring GitHub Pages for FarrelBerwyn/A-Automation...")
    
    # Using gh API to configure pages
    cmd = '''gh api \
        --method PUT \
        repos/FarrelBerwyn/A-Automation/pages \
        -f source[branch]=gh-pages \
        -f source[path]=/'''
    
    stdout, stderr, code = run_command(cmd)
    
    if code == 0:
        print("✅ GitHub Pages configured successfully!")
        print("\n📋 Configuration:")
        print("   Branch: gh-pages")
        print("   Path: /")
        print("   URL: https://farrelberwyn.github.io/A-Automation/")
        return True
    else:
        print(f"❌ Configuration failed: {stderr}")
        return False

def main():
    print("\n" + "=" * 50)
    print("GitHub Pages Configuration Tool")
    print("=" * 50 + "\n")
    
    success = configure_github_pages()
    
    print("\n" + "=" * 50)
    if success:
        print("✅ Setup Complete!")
        print("\nYou can now access your site at:")
        print("   https://farrelberwyn.github.io/A-Automation/")
        print("\nWait 1-2 minutes for GitHub to deploy...")
    else:
        print("⚠️  Manual Configuration Required")
        print("\nPlease visit:")
        print("   https://github.com/FarrelBerwyn/A-Automation/settings/pages")
        print("\nAnd set:")
        print("   Source: Deploy from a branch")
        print("   Branch: gh-pages")
        print("   Folder: / (root)")
    print("=" * 50 + "\n")

if __name__ == "__main__":
    main()
