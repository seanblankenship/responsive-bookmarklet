#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const JS_FILE = 'app.js';
const CSS_FILE = 'app.css';
const OUTPUT_FILE = 'bookmarklet.txt';

// Read files
const jsContent = fs.readFileSync(JS_FILE, 'utf8');
const cssContent = fs.readFileSync(CSS_FILE, 'utf8');

// Minify CSS
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/\s*{\s*/g, '{') // Remove spaces around braces
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*:\s*/g, ':') // Remove spaces around colons
        .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
        .replace(/\s*,\s*/g, ',') // Remove spaces around commas
        .replace(/;\}/g, '}') // Remove trailing semicolons
        .trim(); // Trim whitespace
}

// Minify JavaScript
function minifyJS(js, cssString) {
    // First replace CSS_PLACEHOLDER with the minified CSS
    let result = js.replace(/CSS_PLACEHOLDER/g, JSON.stringify(cssString));

    return result
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\/\/[^\n]*\n/g, '\n') // Remove single-line comments
        .replace(/\s*\n\s*/g, ' ') // Convert newlines to spaces
        .replace(/\s+/g, ' ') // Collapse multiple spaces to single space
        .replace(/\s+([{}()[\]:;,.])/g, '$1') // Remove spaces before punctuation
        .replace(/([{}()[\]:;,.+\-*\/])\s+/g, '$1') // Remove spaces after punctuation
        .replace(/\s*===\s*/g, '===') // Clean up operators
        .replace(/\s*!==\s*/g, '!==')
        .replace(/\s*==\s*/g, '==')
        .replace(/\s*!=\s*/g, '!=')
        .replace(/\s*&&\s*/g, '&&')
        .replace(/\s*\|\|\s*/g, '||')
        .replace(/\s*\+\s*/g, '+')
        .replace(/\s*\-\s*/g, '-')
        .replace(/\s*\*\s*/g, '*')
        .replace(/\s*\/\s*/g, '/')
        .replace(/\s*=\s*/g, '=')
        .replace(/\s*>\s*/g, '>')
        .replace(/\s*<\s*/g, '<')
        .replace(/\s*>=\s*/g, '>=')
        .replace(/\s*<=\s*/g, '<=')
        .replace(/;\}/g, '}') // Remove unnecessary semicolons
        .replace(/\}\s*else/g, '}else') // Fix else statements
        .replace(/if\s*\(/g, 'if(') // Fix if statements
        .replace(/\)\s*\{/g, '){') // Fix function and if blocks
        .replace(/for\s*\(/g, 'for(') // Fix for loops
        .replace(/while\s*\(/g, 'while(') // Fix while loops
        .replace(/function\s*\(/g, 'function(') // Fix function declarations
        .replace(/}\n/g, '}') // Remove newlines between blocks
        .trim(); // Final trim
}

// URL encode the bookmarklet
function encodeBookmarklet(code) {
    // First get the proper JavaScript code
    let jsCode = code.replace(/^javascript:/, '');

    // URL encode the code
    return 'javascript:' + encodeURIComponent(jsCode);
}

// Process files
const minifiedCSS = minifyCSS(cssContent);
const minifiedJS = minifyJS(jsContent, minifiedCSS);

// Create two versions - one encoded and one not encoded
const bookmarklet = `javascript:${minifiedJS}`;
const encodedBookmarklet = encodeBookmarklet(bookmarklet);

// Write output
fs.writeFileSync(OUTPUT_FILE, bookmarklet, 'utf8');
fs.writeFileSync(OUTPUT_FILE + '.encoded', encodedBookmarklet, 'utf8');

// Calculate file size
const stats = fs.statSync(OUTPUT_FILE);
const encodedStats = fs.statSync(OUTPUT_FILE + '.encoded');

console.log(
    `Bookmarklet created in ${OUTPUT_FILE} (Size: ${stats.size} bytes)`
);
console.log(
    `URL-encoded bookmarklet created in ${OUTPUT_FILE}.encoded (Size: ${encodedStats.size} bytes)`
);

if (stats.size > 2000) {
    console.log(
        `Warning: The bookmarklet is quite large (${stats.size} bytes).`
    );
    console.log(
        'Some browsers might have issues with bookmarklets larger than 2000-2500 bytes.'
    );
    console.log(
        'Try using the encoded version for better browser compatibility.'
    );
}

console.log('Done!');
