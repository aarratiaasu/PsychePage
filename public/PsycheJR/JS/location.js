
gsap.set([
    "#page-header", 
    "#div1", 
    "#div2", 
    "#div3", 
    "#div4", 
], { opacity: 0 });


const tl = gsap.timeline({
    defaults: {duration: .75, ease: "power4.out"}
})
tl.to('body', {background: "black"});
tl.to('#background-video', { opacity: 1, duration: 1.5, ease: "power1.inOut" });
tl.fromTo('#logo', {scale: 4, y: 500, opacity: 0}, {scale: 1, y: 0, duration: 2, delay: 1, opacity: 1})
tl.fromTo(
    '#page-header', 
    {
        opacity: 0, 
        x: -400,
        y: -400
    }, 
    {
        opacity: 1, 
        x: 0, 
        y: 0, 
        duration: 1
    }
)

tl.to('#background-video', { opacity: 0, duration: 2, delay: 0, ease: "power1.inOut" });

tl.fromTo(
    '#div1', 
    {opacity: 0}, 
    {
        opacity: 1,
        duration: 1
    }, "<50%"
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
            trigger: '#div1',
            start: 'top center',
            end: '50% center',
            scrub: true
        }
    }, "<"
)

tl.to('body', {background: 'white', delay: 0, opacity: 1})

if (window.innerWidth > "1100px") {
    tl.fromTo(
        '#div2',
        { 
            x: 1000, 
            opacity: 0 
        },
        {
            x: 0,
            opacity: 1,
            duration: 7,
            scrollTrigger: {
                trigger: '#div2',
                start: 'top center',
                end: '40% center',
                scrub: true
            }
        }
    );

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
                end: '60% center',
                scrub: true
            }
        }
    );

    tl.fromTo(
        '#div4',
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
                trigger: '#div4',
                start: '-50% center',
                end: '50% center',
                scrub: true
            }
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
                start: '40% center',
                end: '60% center',
                scrub: true
            }
        }
    );
} else {
    gsap.set([
        "#div2", 
        "#div3", 
        "#div4", 
    ], { opacity: 1 });
}

