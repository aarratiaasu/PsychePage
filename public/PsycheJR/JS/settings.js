let dark = false; // Track the dark mode state globally

document.addEventListener("DOMContentLoaded", function () {
    function createPopup() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'overlay';

        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
        });

        // Create popup
        const popup = document.createElement('div');
        popup.id = 'reference-popup';
        Object.assign(popup.style, {
            position: 'relative',
            backgroundColor: 'white',
            color: 'black',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            width: '90%',
            height: '90%',
        });

        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        Object.assign(closeButton.style, {
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '5px 10px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        });

        closeButton.addEventListener('mouseover', () => {
            closeButton.style.backgroundColor = 'black';
            closeButton.style.color = 'red';
        });

        closeButton.addEventListener('mouseout', () => {
            closeButton.style.backgroundColor = 'red';
            closeButton.style.color = 'white';
        });

        // Popup content
        popup.innerHTML = `
            <h1>Website Settings</h1>
            <p>This website uses animations that may be problematic to individuals prone
            to motion sickness or light. Please adjust settings to your liking:</p>
            <ul>
                <li>Animations
                    <label class="switch">
                        <input type="checkbox" id="animation-switch">
                        <span class="slider round"></span>
                    </label>
                </li>
                <li>Dark Mode
                    <label class="switch">
                        <input type="checkbox" id="dark-mode-switch">
                        <span class="slider round"></span>
                    </label>
                </li>
            </ul>
        `;

        popup.appendChild(closeButton);
        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        // Set dark mode switch state based on the current `dark` value
        const darkModeSwitch = document.getElementById('dark-mode-switch');
        if (darkModeSwitch) {
            darkModeSwitch.checked = dark; // Sync the switch state with `dark`
        }

        // Add event listeners for toggles
        animationsOff();
        darkMode();

        // Close popup functionality
        closeButton.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
    }

    // Load popup after a delay
    setTimeout(createPopup, 1500);

    // Add manual popup trigger to settings button
    const settingsButton = document.getElementById("settings-button");
    if (settingsButton) {
        settingsButton.addEventListener("click", createPopup);
    }
});

// Dark mode functionality
function darkMode() {
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const settingsIcon = document.getElementById('settings-icon'); 
    const topElements = document.getElementById('sub-one');
    const lineElements = document.querySelectorAll('.line');
    const gridThree = document.querySelectorAll('.grid-three');

    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', (event) => {
            if (event.target.checked) {
                dark = true; // Update global state
                document.body.style.backgroundColor = "black";
                document.body.style.color = "white";
                topElements.style.color = "white";
                lineElements.forEach(element => {
                    element.style.color = "white";
                });
                gridThree.forEach(element => {
                    element.style.border = "3px solid white";
                    element.classList.add('.white');
                });

                console.log('dark mode on');
                if (settingsIcon) settingsIcon.src = 'img/white_gear.png';
            } else {
                dark = false; // Update global state
                document.body.style.backgroundColor = "white";
                document.body.style.color = "greenyellow";
                topElements.style.color = "greenyellow";
                lineElements.forEach(element => {
                    element.style.color = "greenyellow";
                });
                gridThree.forEach(element => {
                    element.style.border = "3px solid greenyellow";
                });
                console.log('dark mode off');
                if (settingsIcon) settingsIcon.src = 'img/black_gear.png';
            }
        });

        darkModeSwitch.checked = dark;
    }
}

function animationsOff() {
    const animationSwitch = document.getElementById('animation-switch');
    if (animationSwitch) {
        animationSwitch.addEventListener('change', (event) => {
            const html = document.documentElement; 
            if (event.target.checked) {
                // Enable animations
                html.classList.remove('disable-animations');
                console.log('Animations enabled');
            } else {
                // Disable animations
                html.classList.add('disable-animations');
                console.log('Animations disabled');
            }
        });
        const html = document.documentElement;
        animationSwitch.checked = !html.classList.contains('disable-animations');
    }
}


