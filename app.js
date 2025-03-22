/**
 * Responsive View Bookmarklet
 * Creates a UI to test websites in different device dimensions
 */
(function () {
    const styles = CSS_PLACEHOLDER;

    function injectStyles(css) {
        const styleElement = document.createElement('style');
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
    }

    injectStyles(styles);

    const existingContainers = document.querySelectorAll('.rv-container');
    existingContainers.forEach((container) => {
        container.classList.add('rv-closing');
        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, 400);
    });

    const devices = [
        // Phones
        { name: 'iPhone SE ', width: 375, height: 667 },
        { name: 'iPhone 12/13/14 ', width: 390, height: 844 },
        { name: 'iPhone 12/13/14 Pro Max ', width: 428, height: 926 },
        { name: 'iPhone 15 Pro ', width: 393, height: 852 },
        { name: 'Google Pixel 7 ', width: 412, height: 915 },
        { name: 'Samsung Galaxy S23 ', width: 360, height: 800 },

        // Tablets
        { name: 'iPad ', width: 768, height: 1024 },
        { name: 'iPad Pro 11" ', width: 834, height: 1194 },
        { name: 'iPad Pro 12.9" ', width: 1024, height: 1366 },
        { name: 'Surface Pro ', width: 912, height: 1368 },

        // Laptops
        { name: 'MacBook Air 13" ', width: 1280, height: 800 },
        { name: 'MacBook Pro 14" ', width: 1512, height: 982 },
        { name: 'Laptop (HD) ', width: 1366, height: 768 },
        { name: 'Laptop (FHD) ', width: 1920, height: 1080 },

        // Desktops
        { name: 'Desktop (FHD) ', width: 1920, height: 1080 },
        { name: 'Desktop (QHD) ', width: 2560, height: 1440 },
        { name: 'Desktop (4K) ', width: 3840, height: 2160 },

        // Current size
        {
            name: 'Current Window ',
            width: window.innerWidth,
            height: window.innerHeight,
        },
    ];

    // Create UI container
    const container = document.createElement('div');
    container.className = 'rv-container';

    // Add titlebar
    const titlebar = document.createElement('div');
    titlebar.className = 'rv-titlebar';

    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Responsive Device View';
    title.className = 'rv-title';
    titlebar.appendChild(title);

    // Add X button
    const closeX = document.createElement('button');
    closeX.textContent = '×';
    closeX.className = 'rv-close-x';
    closeX.onclick = function () {
        animateClose(container);
    };
    titlebar.appendChild(closeX);

    container.appendChild(titlebar);

    // Add device categories
    const categories = ['Phones', 'Tablets', 'Laptops', 'Desktops', 'Custom'];
    let deviceIndex = 0;

    categories.forEach((category) => {
        const categoryHeader = document.createElement('h4');
        categoryHeader.textContent = category;
        categoryHeader.className = 'rv-category';
        container.appendChild(categoryHeader);

        if (category === 'Custom') {
            // Add custom dimension inputs
            const customForm = document.createElement('div');
            customForm.className = 'rv-custom-form';

            const widthInput = document.createElement('input');
            widthInput.type = 'number';
            widthInput.placeholder = 'Width';
            widthInput.className = 'rv-input';

            const heightInput = document.createElement('input');
            heightInput.type = 'number';
            heightInput.placeholder = 'Height';
            heightInput.className = 'rv-input';

            const applyBtn = document.createElement('button');
            applyBtn.textContent = 'Apply';
            applyBtn.className = 'rv-apply-button';
            applyBtn.onclick = function () {
                const width = parseInt(widthInput.value) || 375;
                const height = parseInt(heightInput.value) || 667;
                window.open(
                    window.location.href,
                    '_blank',
                    `width=${width},height=${height},resizable=yes`
                );
            };

            customForm.appendChild(widthInput);
            customForm.appendChild(heightInput);
            customForm.appendChild(applyBtn);
            container.appendChild(customForm);
        } else {
            // Add device buttons for this category
            let endIndex = deviceIndex;
            while (
                endIndex < devices.length &&
                ((category === 'Phones' && endIndex < 6) ||
                    (category === 'Tablets' &&
                        endIndex >= 6 &&
                        endIndex < 10) ||
                    (category === 'Laptops' &&
                        endIndex >= 10 &&
                        endIndex < 14) ||
                    (category === 'Desktops' && endIndex >= 14))
            ) {
                const device = devices[endIndex];
                const button = document.createElement('button');
                button.textContent = `${device.name}(${device.width}×${device.height})`;
                button.className = 'rv-button';
                button.onclick = function () {
                    window.open(
                        window.location.href,
                        '_blank',
                        `width=${device.width},height=${device.height},resizable=yes`
                    );
                };
                container.appendChild(button);
                endIndex++;
            }
            deviceIndex = endIndex;
        }
    });

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.className = 'rv-close-button';
    closeBtn.onclick = function () {
        animateClose(container);
    };
    container.appendChild(closeBtn);

    // Function to handle animated closing
    function animateClose(element) {
        element.classList.add('rv-closing');
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 400); // Match animation duration
    }

    // Add to page
    document.body.appendChild(container);
})();
