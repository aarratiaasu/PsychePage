document.getElementById("closeIframe").addEventListener("click", function () {
    const iframe = parent.document.getElementById("infoFrame");

    if (iframe) {
        iframe.style.transition = "bottom 0.5s ease-in, opacity 0.5s ease-in"; 
        iframe.style.bottom = "-100%"; 
        iframe.style.opacity = "0"; 

        setTimeout(() => {
            iframe.remove(); 
        }, 500); 
    }
});
