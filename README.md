# Responsive View Bookmarklet

A lightweight, browser-based tool that helps web developers and designers test websites across multiple device dimensions with a single click.

## Overview

The Responsive View Bookmarklet provides an easy way to test how websites appear on different devices without needing to use browser developer tools or install additional software. By simply clicking a bookmark in your browser, you can instantly generate a panel of device options and preview your website in various screen sizes.

## Features

-   Pre-configured dimensions for popular devices:
    -   Phones (iPhone, Google Pixel, Samsung Galaxy)
    -   Tablets (iPad, Surface Pro)
    -   Laptops (MacBook Air/Pro, standard laptop resolutions)
    -   Desktops (Full HD, QHD, 4K)
-   Custom dimension option for specific testing needs
-   Clean, unobtrusive UI that overlays on any website
-   One-click device simulation
-   Works in any modern browser
-   No installation required - just add as a bookmark

## Installation

1. Build the bookmarklet:

    ```
    ./build.sh
    ```

    This will generate a `bookmarklet.txt` file containing the ready-to-use code.

2. Create a new bookmark in your browser:
    - Right-click on your bookmarks bar and select "Add page" or "Add bookmark"
    - Enter "Responsive View" as the name
    - Copy the entire contents of `bookmarklet.txt` or `bookmarlet.txt.encoded` and paste it into the URL/location field
    - Save the bookmark

## Usage

1. Drag the bookmarklet link to your bookmarks bar
2. Visit any website
3. Click the bookmarklet
4. Select a device size or enter custom dimensions

## Bookmarklet Files

The build process generates two bookmarklet files:

-   `bookmarklet.txt` - Regular minified version
-   `bookmarklet.txt.encoded` - URL-encoded version for better browser compatibility

The URL-encoded version is recommended for most browsers as it properly escapes special characters.

## Building from Source

To build the bookmarklet yourself:

1. Make sure Node.js is installed
2. Run `chmod +x minify.js` to make the script executable
3. Run `./minify.js` to generate the bookmarklet

The script will create both versions of the bookmarklet in the same directory.

## Development

The project consists of three main files:

-   `app.js` - The main JavaScript functionality
-   `app.css` - Styling for the responsive view panel
-   `build.sh` - Build script that compiles the files into a bookmarklet

To modify the bookmarklet:

1. Edit the JavaScript or CSS files as needed
2. Run `./build.sh` to regenerate the bookmarklet
3. Update your browser bookmark with the new code from `bookmarklet.txt`

## Browser Compatibility

The bookmarklet has been tested and works in:

-   Google Chrome
-   Mozilla Firefox
-   Microsoft Edge
-   Safari

## License

This project is open source and available under the MIT License.
