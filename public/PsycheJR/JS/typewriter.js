document.addEventListener("DOMContentLoaded", () => {
    const headOne = document.querySelector("#main h1");
    const h3 = document.querySelector("#sub-one h3");
    const lines = document.querySelectorAll("#sub-one p .line");
    const gridThreeElements = document.querySelectorAll(".grid-three");

    // Start typing animation for h1
    headOne.addEventListener("animationend", () => {
        headOne.classList.add("typing-complete"); // Stop caret blinking
        h3.classList.add("start-typing");
    });

    // Start typing animation for h3
    h3.addEventListener("animationend", () => {
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add("start-typing");
            }, index * 1000); // Delay each line's animation
        });

        // After all lines are done typing, reveal grid-three elements
        setTimeout(() => {
            gridThreeElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add("show"); // Add show class one by one
                }, index * 1000); // Delay each grid-three by 1 second
            });
        }, lines.length * 1500); // Delay revealing grid-three until all lines finish
    });
});


