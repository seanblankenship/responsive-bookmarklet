#!/bin/bash

# Responsive View Bookmarklet Builder
# ===================================
# This script builds the responsive view bookmarklet by:
# 1. Running the Node.js minification script to create the bookmarklet files
# 2. Checking if the bookmarklet was created successfully

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building Responsive View Bookmarklet...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is required but not installed.${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

# Check if the minify.js script exists
if [ ! -f "minify.js" ]; then
    echo -e "${RED}Error: minify.js script not found.${NC}"
    exit 1
fi

# Make sure the script is executable
chmod +x minify.js

# Run the minification script
echo "Running minification script..."
./minify.js

# Check if the bookmarklet was created
if [ -f "bookmarklet.txt" ] && [ -f "bookmarklet.txt.encoded" ]; then
    echo -e "${GREEN}Success! Bookmarklet files created.${NC}"
    
    # Get file sizes
    NORMAL_SIZE=$(stat -f%z "bookmarklet.txt" 2>/dev/null || stat -c%s "bookmarklet.txt")
    ENCODED_SIZE=$(stat -f%z "bookmarklet.txt.encoded" 2>/dev/null || stat -c%s "bookmarklet.txt.encoded")
    
    echo "Regular bookmarklet size: $NORMAL_SIZE bytes"
    echo "Encoded bookmarklet size: $ENCODED_SIZE bytes"
    
    if [ $NORMAL_SIZE -gt 2000 ]; then
        echo -e "${YELLOW}Warning: The bookmarklet is quite large ($NORMAL_SIZE bytes).${NC}"
        echo -e "${YELLOW}Some browsers might have issues with bookmarklets larger than 2000-2500 bytes.${NC}"
        echo -e "${YELLOW}Use the encoded version for better compatibility.${NC}"
    fi
    
    echo -e "${GREEN}Files created:${NC}"
    echo " - bookmarklet.txt (regular version)"
    echo " - bookmarklet.txt.encoded (URL-encoded version)"
    echo ""
    echo -e "${GREEN}To use the bookmarklet:${NC}"
    echo "1. Open index.html in your browser"
    echo "2. Drag the 'Responsive View' button to your bookmarks bar"
    echo "3. Navigate to any website and click the bookmark"
else
    echo -e "${RED}Error: Bookmarklet files not created.${NC}"
    exit 1
fi

echo -e "${GREEN}Build completed!${NC}"
exit 0