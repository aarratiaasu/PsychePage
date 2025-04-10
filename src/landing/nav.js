import { moveToSection } from './sectionTracking.js';

export function animateScrollIndicator() {
    const smi = document.getElementById("mouse-scroll-indicator");
    smi.style.display = "block";
    
    const scrollIndicator = document.querySelector(".mouse-scroll-indicator");

    if (!scrollIndicator) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const dynamicScale = Math.min(viewportWidth, viewportHeight) / 300; 

    document.documentElement.style.setProperty("--dynamic-scale", dynamicScale);

    const scrollText = document.createElement("div");
    scrollText.id = "scroll-text";
    scrollText.textContent = "SCROLL UP OR DOWN TO EXPLORE";
    document.body.appendChild(scrollText);

    setTimeout(() => {
        scrollIndicator.classList.add("moved");
        scrollText.classList.add("fade-out");
    }, 3000);

    setTimeout(() => {
        scrollText.remove();
    }, 4500);
}

export function setupNavigation(sections) {
    const iconWrapper = document.getElementById("cn-icon-wrapper");
    const menuWrapper = document.getElementById("cn-wrapper");
    const overlay = document.getElementById("cn-overlay");
    const navList = document.createElement("ul");
    navList.style.listStyle = "none";
    navList.style.padding = "0";

    let isOpen = false;
    let wasClicked = false;
    let closeTimeout = null;
    let hoverTimeout = null;

    navList.innerHTML = "";

    sections.forEach((section, index) => {
        const listItem = document.createElement("li");

        // Was broken; must fix:
        // titleWrapper.textContent.section.name -> titleWrapper.textContent = section.name;
        // We'll leave the titleWrapper in place, although we won't fully use it:
        const titleWrapper = document.createElement("div");
        titleWrapper.textContent = section.name;

        // This arrow only applies if subsections exist
        const arrow = document.createElement("span");
        arrow.textContent = "►";
        arrow.style.cursor = "pointer";
        arrow.style.marginLeft = "15px";
        
        listItem.style.cursor = "pointer";
        listItem.style.padding = "10px";
        listItem.style.color = "black";
        listItem.style.borderBottom = "1px solid rgba(255,255,255,0.3)";

        // Original line setting textContent:
        listItem.textContent = section.name;

        // Clicking the main listItem itself moves to that section
        listItem.addEventListener("click", () => {
            moveToSection(index, section.position);
            closeMenu();
        });

        // If there are subsections, create the subList and add toggle logic
        if (section.subsections && section.subsections.length > 0) {
            // Re-append the arrow so it appears after setting listItem.textContent
            listItem.appendChild(arrow);
            // Create another <ul> for subsections, hidden by default
            const subList = document.createElement("ul");
            subList.style.listStyle = "none";
            subList.style.marginLeft = "5px";
            subList.style.display = "none"; // Hidden until arrow is clicked

            section.subsections.forEach((sub) => {
                const subItem = document.createElement("li");
                subItem.textContent = sub.name;
                subItem.style.cursor = "pointer";

                subItem.addEventListener("click", (evt) => {
                    evt.stopPropagation();  // Prevent the parent’s click
                    moveToSection(index, sub.position);
                    closeMenu();
                });

                subList.appendChild(subItem);
            });

            // Toggle show/hide when arrow is clicked
            arrow.addEventListener("click", (evt) => {
                evt.stopPropagation(); // Prevent also triggering listItem's click
                if (subList.style.display === "none") {
                    subList.style.display = "block";
                    arrow.classList.toggle("arrow-rotated");
                } else {
                    subList.style.display = "none";
                    arrow.classList.toggle("arrow-rotated");
                }
            });

            // Append subList to the main listItem
            listItem.appendChild(subList);
        }

        // Add each main listItem to the navigation list
        navList.appendChild(listItem);
        
        // Add submenu for Games Section
        if (section.name === "Games Section") {
            // Create submenu container
            const submenu = document.createElement("ul");
            submenu.className = "submenu";
            submenu.style.listStyle = "none";
            submenu.style.padding = "0";
            submenu.style.marginLeft = "20px";
            submenu.style.display = "block"; // Make submenu visible by default
            submenu.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            submenu.style.borderRadius = "5px";
            submenu.style.overflow = "hidden";
            
            // Add submenu items for each game
            const games = [
                { name: "PsycheJR", path: "../PsycheJR/kids.html" },
                { name: "Escape Velocity", path: "../escapeVelocity/escape-velocity.html" },
                { name: "SpacePic", path: "../spacepic/photo.html" }
                // Removed Balance Game and Name Generator games
            ];
            
            games.forEach(game => {
                const gameItem = document.createElement("li");
                gameItem.textContent = game.name;
                gameItem.style.cursor = "pointer";
                gameItem.style.padding = "8px 15px";
                gameItem.style.color = "#00aaff";
                gameItem.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
                gameItem.style.fontSize = "0.9em";
                
                // Add hover effect without fading
                gameItem.addEventListener("mouseover", () => {
                    gameItem.style.backgroundColor = "rgba(0, 170, 255, 0.2)";
                    // Ensure no opacity change on hover
                    gameItem.style.opacity = "1";
                    // Change text color to black on hover
                    gameItem.style.color = "black";
                });
                
                gameItem.addEventListener("mouseout", () => {
                    gameItem.style.backgroundColor = "transparent";
                    // Ensure no opacity change on mouseout
                    gameItem.style.opacity = "1";
                    // Restore original text color
                    gameItem.style.color = "#00aaff";
                });
                
                // Add click event to open the specific game viewport directly
                gameItem.addEventListener("click", (e) => {
                    e.stopPropagation(); // Prevent triggering parent click
                    
                    // Import and use the appropriate viewport based on the game
                    if (game.name === "PsycheJR") {
                        import('../../public/PsycheJR/kidsViewport.js').then(module => {
                            module.showKidsViewport();
                        });
                    } else if (game.name === "Escape Velocity") {
                        import('../../public/games/viewportescapevelocity.js').then(module => {
                            module.showEscapeVelocityViewport();
                        });
                    } else if (game.name === "SpacePic") {
                        import('../../public/games/viewportspacepic.js').then(module => {
                            module.showSpacePicViewport();
                        });
                    }
                    
                    // Hide the menu
                    document.body.classList.remove("overlay-open");
                });
                
                submenu.appendChild(gameItem);
            });
            
            listItem.appendChild(submenu);
            
            // Toggle submenu on click
            listItem.addEventListener("click", (e) => {
                const currentDisplay = submenu.style.display;
                
                // Hide all other submenus first
                document.querySelectorAll('.submenu').forEach(menu => {
                    menu.style.display = 'none';
                });
                
                // Toggle this submenu
                submenu.style.display = currentDisplay === "none" ? "block" : "none";
                
                // Stop propagation to prevent navigation
                e.stopPropagation();
            });
            
            // Add dropdown indicator
            const dropdownIndicator = document.createElement("span");
            dropdownIndicator.textContent = " ▼";
            dropdownIndicator.style.fontSize = "0.8em";
            dropdownIndicator.style.marginLeft = "5px";
            listItem.appendChild(dropdownIndicator);
        }
    });

    menuWrapper.appendChild(navList);

    function openMenu() {
        clearTimeout(closeTimeout); // Reset any pending close event
        clearTimeout(hoverTimeout);

        isOpen = true;
        wasClicked = true;

        menuWrapper.classList.remove("closing");
        menuWrapper.classList.add("opened-nav");
        overlay.classList.add("active");
        iconWrapper.classList.add("active");

        // Ensure full 360° rotation
        iconWrapper.style.transition = "transform 0.5s ease-in-out";
        iconWrapper.style.transform = "rotate(360deg)";
    }

    function closeMenu() {
        if (!isOpen) return;

        isOpen = false;
        wasClicked = false;
        menuWrapper.classList.add("closing");

        closeTimeout = setTimeout(() => {
            menuWrapper.classList.remove("opened-nav");
            menuWrapper.classList.remove("closing");
        }, 300);

        overlay.classList.remove("active");
        iconWrapper.classList.remove("active");
        // Reverse rotate back
        iconWrapper.style.transition = "transform 0.5s ease-in-out";
        iconWrapper.style.transform = "rotate(0deg)";
    }

    function toggleMenu() {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function delayedClose() {
        // Prevent hover delay from closing if explicitly clicked
        if (wasClicked) return; 

        hoverTimeout = setTimeout(() => {
            closeMenu();
        }, 250); 
    }

    // Hover opens menu
    iconWrapper.addEventListener("mouseenter", () => {
        if (!wasClicked) openMenu();
    });

    menuWrapper.addEventListener("mouseenter", () => {
        if (!wasClicked) openMenu();
    });

    // Add delay before closing when hover is removed
    iconWrapper.addEventListener("mouseleave", delayedClose);
    menuWrapper.addEventListener("mouseleave", delayedClose);
    // Click toggles menu open/close
    iconWrapper.addEventListener("click", toggleMenu);
    // Click outside should close the menu
    overlay.addEventListener("click", closeMenu);
    document.addEventListener("click", (event) => {
        if (!menuWrapper.contains(event.target) && !iconWrapper.contains(event.target)) {
            closeMenu();
        }
    });
}