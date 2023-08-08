document.addEventListener('DOMContentLoaded', () => {
    const textTool = document.getElementById('textTool');
    const imageInput = document.getElementById('imageInput');
    const canvas = document.querySelector('.canvas');
    const collapseButton = document.getElementById('collapseButton');
    const toolPalette = document.getElementById('toolPalette');

    collapseButton.addEventListener('click', () => {
        toolPalette.classList.toggle('collapsed');
    });
    textTool.addEventListener('click', () => {
        const textElement = createTextElement();
        canvas.appendChild(textElement);
        makeElementDraggable(textElement);
    });

    imageInput.addEventListener('change', (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const imageElement = createImageElement(imageFile);
            canvas.appendChild(imageElement);
            makeElementDraggable(imageElement);
            makeElementResizable(imageElement);
        }
    });

    function createTextElement() {
        const textElement = document.createElement('p');
        textElement.classList.add('draggable-text');
        textElement.innerText = 'Editable Text';
        
        textElement.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevents text selection while dragging
        });

        textElement.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // Prevent default context menu
            toggleLockPosition(textElement);
            return false;
        });

        makeElementEditable(textElement);

        return textElement;
    }
    function toggleLockPosition(element) {
        element.classList.toggle('locked'); // Add a locked class to the element
    }

    function makeElementEditable(element) {
        let isEditing = false;

        element.addEventListener('dblclick', () => {
            isEditing = true;
            element.contentEditable = 'true';
            element.focus();
        });

        element.addEventListener('blur', () => {
            if (isEditing) {
                isEditing = false;
                element.contentEditable = 'false';
            }
        });
    }

    function createImageElement(imageFile) {
        const imageElement = document.createElement('img');
        imageElement.classList.add('draggable-image');
        imageElement.src = URL.createObjectURL(imageFile);
        return imageElement;
    }

    function makeElementDraggable(element) {
        
        let isDragging = false;
        let initialX, initialY;

        element.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            initialX = e.clientX - element.getBoundingClientRect().left;
            initialY = e.clientY - element.getBoundingClientRect().top;
            element.style.zIndex = "100"; // Bring the element to the front while dragging
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const newX = e.clientX - initialX;
            const newY = e.clientY - initialY;
            element.style.left = `${newX}px`;
            element.style.top = `${newY}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            element.style.zIndex = "auto"; // Reset the zIndex after dragging
        });
    }

    function makeElementResizable(element) {
        // Your resizable logic
    }
});
