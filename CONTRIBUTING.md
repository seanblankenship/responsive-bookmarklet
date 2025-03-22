# Contributing to Responsive View Bookmarklet

Thank you for your interest in contributing to the Responsive View Bookmarklet! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork to your local machine
3. Make your changes
4. Test your changes by running `./build.sh` and testing the bookmarklet
5. Commit your changes with a meaningful commit message
6. Push to your fork
7. Open a pull request

## Development Guidelines

### Code Style

-   Use consistent indentation (2 spaces)
-   Use meaningful variable and function names
-   Add comments for complex logic

### Project Structure

-   `app.js` - Main JavaScript code
-   `app.css` - All styles for the bookmarklet
-   `build.sh` - Build script to generate the bookmarklet

### Adding New Device Presets

When adding new device presets, follow these guidelines:

1. Place the device in the appropriate category (phones, tablets, laptops, desktops)
2. Use accurate device dimensions
3. Format the device name as: `Brand Device Model (width×height)`
4. Keep the devices list in app.js organized by category

### Performance Considerations

-   Minimize the size of the generated bookmarklet
-   Avoid unnecessary DOM operations
-   Use efficient CSS selectors

## Testing

Before submitting changes, test the bookmarklet in multiple browsers:

-   Chrome
-   Firefox
-   Safari
-   Edge

## Pull Request Process

1. Ensure all code follows the guidelines
2. Update the README.md with any necessary changes
3. Update the CHANGELOG.md with details of your changes
4. Your pull request will be reviewed by maintainers

## Code of Conduct

-   Be respectful and inclusive in your language and contributions
-   Focus on the technical merit of contributions
-   Help others learn and grow

Thank you for contributing!
