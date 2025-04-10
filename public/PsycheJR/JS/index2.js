function updateScreenWidth() {
    const box = document.getElementById("screen-width-box");
    box.textContent = `Width: ${window.innerWidth}px`;
}

window.addEventListener("resize", updateScreenWidth);

updateScreenWidth();


let windowWidth = window.outerWidth;
let dpr = window.devicePixelRatio;
let trueSize = Math.round(windowWidth * dpr);

console.log("window.innerWidth:", window.innerWidth);
console.log("window.innerHeight:", window.innerHeight);
console.log("window.outerWidth:", window.outerWidth);
console.log("devicePixelRatio:", window.devicePixelRatio);
console.log("Effective Width:", window.innerWidth * window.devicePixelRatio);
console.log("Zoom Level:", Math.round(window.outerWidth / window.innerWidth * 100) + "%");
console.log("width of device:", windowWidth, "dpr:", dpr, "trueSize:", trueSize);


gsap.set([
    "#page-header", 
    "#welcome", 
    "#view3D",
    "#div2", 
    "#div3", 
    "#div4", 
    "footer"
], { opacity: 0 });

const tl = gsap.timeline({
    defaults: {duration: .75, ease: "power4.out"}
})

tl.fromTo('header', {scale: 10}, {scale: 1, duration: 6})
tl.to('body', {background: 'linear-gradient(to right, #f9a000, #f47c33, #ef5966, #a53f5b, #592651, #302144)'})
tl.to('body', {background: 'white', delay: 1})

tl.fromTo(
    '#page-header', 
    {
        opacity: 0
    }, 
    {
        opacity: 1,
        duration: 2
    }
)

tl.fromTo(
    '#view3D',
    {
        opacity: 0
    },
    {
        opacity: 1,
        duration: 1
    },
    "<"
)

tl.fromTo(
    '#welcome', 
    {
        opacity: 0
    }, 
    {
        opacity: 1,
        duration: 0.5
    }
)


tl.fromTo(
    '#location-title',
    {
        y: 0
    },
    {
        y: 150,
        duration: 1,
        scrollTrigger: {
            trigger: '#welcome',
            start: 'top center',
            end: '50% center',
            scrub: true,
            once: true
        }
    }
)

tl.fromTo(
    '#div3',
    {
        opacity: 0
    },
    {
        opacity: 1,
        duration: 7,
        scrollTrigger: {
            trigger: '#div3',
            start: 'top center',
            end: 'bottom center',
            scrub: true,
            once: true
        }
    }
);

tl.fromTo(
    '#div4',
    {
        opacity: 0,
        x: 1000,
        pointerEvents: "none"
    },
    {
        opacity: 1,
        x: 0,
        duration: 2,
        pointerEvents: "auto",
        scrollTrigger: {
            trigger: '#div4',
            start: 'top center',
            end: '50% center',
            scrub: true,
            once: true
        }
    }
);

tl.fromTo(
    '#div5',
    {
        opacity: 0,
        x: -1000,
        pointerEvents: "none"
    },
    {
        opacity: 1,
        x: 0,
        duration: 2,
        pointerEvents: "auto",
        scrollTrigger: {
            trigger: '#div5',
            start: 'top center',
            end: '50% center',
            scrub: true,
            once: true
        }
    }
);

tl.fromTo(
    '#div8',
    {
        opacity: 0,
        y: 100,
        pointerEvents: "none"
    },
    {
        opacity: 1,
        y: 0,
        duration: 4,
        pointerEvents: "auto",
    }
);

tl.fromTo(
    'footer',
    {
        opacity: 0,
        y: 100
    },
    {
        opacity: 1,
        y: 0,
        duration: 7,
        scrollTrigger: {
            trigger: '#div4',
            start: 'top center',
            end: '50% center',
            scrub: true,
            once: true
        }
    }
);

const tl2 = gsap.timeline(
    {
        defaults: {
            yoyo: true,
            repeat: -1,
            duration: 5,
            repeatDelay: 1
        }
    }
);

tl2.fromTo(
    '#bottomLeft',
    { 
        x: -75,
        y: 75,
        opacity: 1
    },
    { 
        x: -300,
        y: 300,
        opacity: 0,
        duration: 4, 
        ease: "power2.out"
    }
)

tl2.fromTo(
    '#bottomRight',
    { 
        x: -75,
        y: 75,
        opacity: 1
    },
    { 
        x: 300,
        y: 300,
        opacity: 0,
        duration: 4, 
        ease: "power2.out"
    }, '<'
)

tl2.fromTo(
    '#topLeft',
    { 
        x: -75,
        y: 75,
        opacity: 1
    },
    { 
        x: -300,
        y: -300,
        opacity: 0,
        duration: 4, 
        ease: "power2.out" 
    }, '<'
)

tl2.fromTo(
    '#topRight',
    { 
        x: -75,
        y: 75,
        opacity: 1
    },
    { 
        x: 300,
        y: -300,
        opacity: 0,
        duration: 4, 
        ease: "power2.out"
    }, '<'
)

const surfaceButton = document.getElementById('div8-btn');
const locationButton = document.getElementById('div4-btn');

surfaceButton.addEventListener("click", () => {
    window.open("surface2.html")
});

locationButton.addEventListener("click", () => {
    window.open("location2.html")
});