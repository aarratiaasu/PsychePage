const tl = gsap.timeline()

        tl.fromTo(
            "#sun",
            {
                y: -300
            },
            {
                y: -300
            }
        );

        tl.fromTo (
            "#spaceship",
            {
                rotate: 0,
                x: 0, 
                y: -300
            },
            {
                rotate: 45, 
                duration: 4
            }
    );

    tl.fromTo(
        "#spaceship",
        {
            x: 0, 
            y: -300
        },
        {
            x: 500,
            y: -500,
            duration: 5
        }
    );

    tl.to (
        "#flames",
        {
            opacity: 0,
            repeat: 5,
            yoyo: true
        }, "<"
    )

    tl.to(
        ".flames",
        {
            opacity: 1,
            fill: "orange",
            repeat: 7,
            yoyo: true
        }, "<"
    );

    
    tl.to (
        "#spaceship",
        {
            rotate: 140,
            duration: 2
        }
    );

    tl.fromTo(
        "#spaceship",
        {
            x: 500, 
            y: -300
        },
        {
            x: 3000,
            y: 3000,
            duration: 5
        }

    );

    tl.to (
        ".flames",
        {
            opacity: 0,
            repeat: 5,
            yoyo: true
        }, "<"
    )

    tl.to(
        ".flames",
        {
            opacity: 1,
            fill: "orange",
            repeat: 7,
            yoyo: true
        }, "<"
    );

    tl.fromTo(
        "#header-img",
        {
            visibility: "hidden",
            scale: 4,
            y: 400,
            opacity: 0
        },
        {
            visibility: "visible",
            delay: 0.2,
            scale: 1,
            y: 0,
            opacity: 1,
            duration:5
        }, "<"
    );

    tl.fromTo (
        "#sun",
        {
            y: -300
        },
        {
            y: -200,
            scale: 0.5,
            duration: 3, 
            ease: Linear.easeNone, 
        }, "<30%"
    );

    tl.to(
        "header",
        {
            visibility: "visible"
        },"<80%"
    );

    tl.fromTo(
        "#spaceship",
        {
            x: -300,
            y: 300
        },
        {
            rotate: 45,
            x: 0,
            y: 0,
            duration: 1
        }, "<"
    );

    tl.fromTo(
        "#div-astronaut",
        {
            visibility: "hidden",
            opacity: 0
        },
        {
            visibility: "visible",
            opacity: 1
        }
    );

    const button = document.getElementById('submit');

    button.addEventListener("click", () => {
        const nameDDL = document.getElementById("astronautNameChoice");
        const nameValue = nameDDL.value;
        const hiText = document.getElementById("hi");
        const welcome = document.getElementById("welcome-p");

        if (nameValue) {
            hiText.style.fontSize = "50px";
            hiText.textContent = `Hi astronaut ${nameValue}!`;
            button.style.opacity = 0;
            welcome.style.visibility = "visible";
            nameDDL.style.display = "none";
            button.style.visibility = "hidden";
            gsap.to(
                "#hi",
                {
                    y: 100,
                    duration: 1
                }
            )
        } else {
            hiText.textContent = "Hi astronaut! What is your name?";
        }
    });

    gsap.set(".flames", {opacity: 1});

    tl.fromTo(
        "#spaceship",
        {
            x: 0,
            y: 0
        },
        {
            rotate: 90,
            x: 1000,
            duration: 4,
            scrollTrigger: {
                trigger: '#div1',
                start: 'top 50%, center',
                end: 'bottom center',
                scrub: true
            }
        }
    );

    tl.to (
        "#flames",
        {
            opacity: 0,
            repeat: 5,
            yoyo: true
        }, "<"
    )

    tl.to(
        ".flames",
        {
            opacity: 1,
            fill: "orange",
            repeat: 7,
            yoyo: true
        }, "<"
    );

    tl.fromTo(
        "#div2",
        {
            x: -3000,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
            trigger: '#div2',
            start: 'top center',
            end: '10% center',
            scrub: true
            }
        }
    );

    tl.fromTo(
        "#spaceship",
        {
            x: 1000,
            y: 0,
            rotate: 90
        },
        {
            rotate: 220,
            x: 850,
            y: 2000,
            duration: 6,
            scrollTrigger: {
                trigger: '#div2',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        }
    );

    tl.to (
        "#flames",
        {
            opacity: 0,
            repeat: 5,
            yoyo: true
        }, "<"
    )

    tl.to(
        ".flames",
        {
            opacity: 1,
            fill: "orange",
            repeat: 7,
            yoyo: true
        }, "<"
    );

    tl.fromTo(
        "#spaceship",
        {
            x: 850,
            y: 2000,
            rotate: 220
        },
        {
            rotate: 200,
            x: 50,
            y: 3000,
            duration: 6,
            scrollTrigger: {
                trigger: '#div3',
                start: 'top center',
                end: 'bottom 60%, center',
                scrub: true
            }
        }
    );

    tl.to (
        "#flames",
        {
            opacity: 0,
            repeat: 5,
            yoyo: true
        }, "<"
    )

    tl.to(
        ".flames",
        {
            opacity: 1,
            fill: "orange",
            repeat: 7,
            yoyo: true
        }, "<"
    );

    tl.fromTo(
        "#spaceship",
        {
            x: 50,
            y: 3000,
            rotate: 200
        },
        {
            rotate: 180,
            x: 60,
            y: 3700,
            duration: 6,
            scrollTrigger: {
                trigger: '#div4',
                start: 'top center',
                end: 'bottom 60%, center',
                scrub: true
            }
        }
    );

    tl.to (
        "#flames",
        {
            opacity: 0,
            repeat: 5,
            yoyo: true
        }, "<"
    )

    tl.to(
        ".flames",
        {
            opacity: 1,
            fill: "orange",
            repeat: 7,
            yoyo: true
        }, "<"
    );

    tl.fromTo(
        "#spaceship",
        {
            x: 60,
            y: 3700,
            rotate: 180
        },
        {
            rotate: 150,
            x: 500,
            y: 4800,
            duration: 6,
            scrollTrigger: {
                trigger: '#div4',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        }
    );

    tl.to (
        "#flames",
        {
            opacity: 0,
            repeat: 5,
            yoyo: true
        }, "<"
    )

    tl.to(
        ".flames",
        {
            opacity: 1,
            fill: "orange",
            repeat: 7,
            yoyo: true
        }, "<"
    );

    tl.fromTo(
        "#spaceship",
        {
            x: 500,
            y: 4800,
            rotate: 150
        },
        {
            rotate: 120,
            x: 1000,
            y: 8600,
            duration: 6,
            scrollTrigger: {
                trigger: '#div5',
                start: '50% center',
                end: 'bottom center',
                scrub: true
            }
        }
    );

    tl.to (
        "#flames",
        {
            opacity: 0,
            repeat: 5,
            yoyo: true
        }, "<"
    )

    tl.to(
        ".flames",
        {
            opacity: 1,
            fill: "orange",
            repeat: 7,
            yoyo: true
        }, "<"
    );

    const tl2 = gsap.timeline()

    tl2.to(
        "#Earth",
        {
            x: 140,
            y: -140,
            duration: 3,
            scrollTrigger: {
                trigger: '#solar',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        }
    );

    tl2.to(
        "#Mars",
        {
            x: 180,
            y: -180,
            duration: 3,
            scrollTrigger: {
                trigger: '#solar',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        }
    );

    tl2.to(
        "#Psyche",
        {
            x: 180,
            y: -80,
            duration: 7,
            scrollTrigger: {
                trigger: '#solar',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        }
    );

    tl2.to(
        "#Jupiter",
        {
            x: 280,
            y: -140,
            duration: 7,
            scrollTrigger: {
                trigger: '#solar',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        }
    );

    tl2.fromTo(
        "#Arrow",
        {
            opacity: 0
        },
        {
            opacity: 1,
            x: 150,
            y: -70,
            scaleY: 3,
            duration: 7,
            scrollTrigger: {
                trigger: '#solar',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        }
    );

    tl2.to (
        "#ArrowColor",
        {
            fill: "red"
        }, "<"
    )

    const button2 = document.getElementById('ageButton');
    const ageInput = document.getElementById('ageText');
    const psycheAge = document.getElementById('psycheAge');
    const planetSelect = document.getElementById('ageOnPlanet');
    const showResults = document.getElementById('newAge');


    const planetYears = {
        Mercury: 0.241,
        Venus: 0.616,
        Mars: 1.882,
        Jupiter: 11.871,
        Saturn: 29.477,
        Uranus: 84.074,
        Neptune: 164.904,
        Pluto: 247.9,
        Psyche: 5.008
    };


    function getPlanetInfo(planetName) {
        return planetYears[planetName] || 1; 
    }


    function calculateAge() {
        const age = parseFloat(ageInput.value.trim()); 
        const selectedPlanet = planetSelect.value; 

        if (!isNaN(age) && age > 0) {
            // Psyche Age Calculation
            const psycheCalc = age / 5;
            psycheAge.textContent = `You are approximately ${psycheCalc.toFixed(2)} years old on Psyche!`;

            // Planet Age Calculation
            const planetFactor = getPlanetInfo(selectedPlanet);
            const planetAge = age * planetFactor;
            showResults.textContent = `If you are ${age} years old on Earth, you would be approximately ${planetAge.toFixed(0)} years old on ${selectedPlanet}!`;
        } else {
            psycheAge.textContent = "Please enter a valid age!";
            showResults.textContent = "";
        }
    }

    button2.addEventListener("click", calculateAge); 
    planetSelect.addEventListener("change", calculateAge);

    gsap.fromTo(
        ".arrows", 
        {
            color: "white",
            opacity: 0
        },
        { 
        opacity: 1, 
        color: "orange",
        duration: 1, 
        repeat: -1, 
        yoyo: true, 
        ease: "power4.inOut"
    });

    gsap.fromTo(
        "#findYourAge", 
        {
            color: "white",
            opacity: 0
        },
        { 
        opacity: 1, 
        color: "orange",
        duration: 1, 
        repeat: -1, 
        yoyo: true, 
        ease: "power4.inOut"
    });


    const button3 = document.getElementById("changeColorBtn");
    const button4 = document.getElementById("changeSquareColor");
    const colorPicker = document.getElementById("color");
    const colorOutput = document.getElementById("color-output");
    let selectedColor = colorPicker.value;

    // Update color when user picks a color
    colorPicker.addEventListener("input", (event) => {
        selectedColor = event.target.value; // Get selected color
        colorOutput.innerText = selectedColor; // Update label with new color
    });

    // Change astronaut suit color
    button3.addEventListener("click", () => {
        gsap.to(".changeSuitColor", {
            fill: selectedColor, // Apply selected color
            duration: 0
        });
    });

    // Change car color
    button4.addEventListener("click", () => {
        gsap.to(".changeCarColor", {
            fill: selectedColor, // Apply selected color
            duration: 0
        });
    });


    const liftCarButton = document.getElementById("liftCar");
    let carRaised = false;
    gsap.set("#ArmLower", {rotate: 30});
    gsap.set("#car", {y: -30, x: -50});

    liftCarButton.addEventListener("click", () =>{
        if (!carRaised){
            carRaised = true;
            liftCarButton.textContent = "Lower the Car";
            gsap.fromTo(
                '#ArmLower',
                { rotate: 30 },
                { rotate: 0, duration: 4, ease: "power2.out", delay: 0 }
            )
        
            // Move the car while the arm moves
            gsap.fromTo(
                '#car',
                { y: -30, x: -50 },
                { y: -100, x: -15, duration: 4, ease: "power2.out" }, "<" 
            )
        
            // Blink the headlights only when arm and car move
            gsap.fromTo(
                ".changeHeadlightColor",
                { fill: "yellow" },
                { fill: "white", duration: 0.2, repeat: 18, yoyo: true }, "<" 
            );
        } else {
            liftCarButton.textContent = "Lift the Car";
            carRaised = false;
            gsap.fromTo(
                '#ArmLower',
                { rotate: 0 },
                { rotate: 30, duration: 4, ease: "power2.out", delay: 0 }
            )
        
            // Move the car while the arm moves
            gsap.fromTo(
                '#car',
                { y: -100, x: -15 },
                { y: -30, x: -50, duration: 4, ease: "power2.out" }, "<" 
            )
        
            // Blink the headlights only when arm and car move
            gsap.fromTo(
                ".changeHeadlightColor",
                { fill: "yellow" },
                { fill: "white", duration: 0.2, repeat: 18, yoyo: true }, "<" 
            );
        }
        
    });

    const liftDogButton = document.getElementById("liftDog");
    let dogRaised = false;
    gsap.set("#Arm", {rotate: 10, y: 0});
    gsap.set("#sleeve", {rotate: 15, x: 0, y: 0});
    gsap.set("#dog", {y: -250, x: -70});
    
    liftDogButton.addEventListener("click", () =>{
        let tl3 = gsap.timeline({ repeat: 0, repeatDelay: 1, yoyo: true });
        if (!dogRaised) {
            dogRaised = true;
            liftDogButton.textContent = "Lower the Dog";
            tl3.to(
                '#Arm',
                {
                    y: -30,
                    rotate: -20,
                    duration: 4, 
                    ease: "power2.out"
                }, "<"
            )
        
            tl3.to(
                '#sleeve',
                {
                    y: -18,
                    x: 15,
                    rotate: -22,
                    duration: 4, 
                    ease: "power2.out"
                }, "<"
            )
        
            tl3.to(
                '#dog',
                {
                    y: -350,
                    x: 10,
                    duration: 4, 
                    ease: "power2.out"
                }, "<"
            );
        } else {
            dogRaised = false;
            liftDogButton.textContent = "Lift the Dog";
            tl3.to(
                '#Arm',
                {
                    y: 0,
                    rotate: 10,
                    duration: 4, 
                    ease: "power2.out"
                }, "<"
            )
        
            tl3.to(
                '#sleeve',
                {
                    y: 0,
                    x: 0,
                    rotate: 15,
                    duration: 4, 
                    ease: "power2.out"
                }, "<"
            )
        
            tl3.to(
                '#dog',
                {
                    y: -250,
                    x: -70,
                    duration: 4, 
                    ease: "power2.out"
                }, "<"
            );
        }
    });

    //automate the above
    // const tl3 = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });

    // tl3.fromTo(
    //     '#ArmLower',
    //     { rotate: 30 },
    //     { rotate: 0, duration: 4, ease: "power2.out", delay: 3 }
    // )

    // // Move the car while the arm moves
    // .fromTo(
    //     '#car',
    //     { y: -30, x: -50 },
    //     { y: -100, x: -15, duration: 4, ease: "power2.out" }, "<" 
    // )

    // // Blink the headlights only when arm and car move
    // .fromTo(
    //     ".changeHeadlightColor",
    //     { fill: "yellow" },
    //     { fill: "white", duration: 0.2, repeat: 18, yoyo: true }, "<" 
    // );

    // tl3.fromTo(
    //     '#Arm',
    //     {
    //         y: 0,
    //         rotate: 0
    //     },
    //     {
    //         y: -30,
    //         rotate: -20,
    //         duration: 4, 
    //         ease: "power2.out"
    //     }, "<"
    // )

    // tl3.fromTo(
    //     '#sleeve',
    //     {
    //         y: 0,
    //         x: 0,
    //         rotate: 0
    //     },
    //     {
    //         y: -18,
    //         x: 15,
    //         rotate: -20,
    //         duration: 4, 
    //         ease: "power2.out"
    //     }, "<"
    // )

    // .fromTo(
    //     '#dog',
    //     {
    //         y: -250,
    //         x: -25
    //     },
    //     {
    //         y: -400,
    //         x: 30,
    //         duration: 4, 
    //         ease: "power2.out"
    //     }, "<"
    // );

    const dress = document.getElementById('outfitTwo');
    const shorts = document.getElementById('outfitOne');
    const shortHair = document.getElementById('shortHair');
    const longHair = document.getElementById('longHair');
    const colorPicker2 = document.getElementById("color2");
    const skinColor = document.getElementById("changeColorBtnHuman");
    let chosenColor = colorPicker2.value;

    colorPicker2.addEventListener("input", (event) => {
        chosenColor = event.target.value; // Get selected color
        console.log(chosenColor);
    });

    dress.addEventListener("click", () => {
        gsap.set("#shirt", {visibility:"hidden"})
        gsap.set("#shorts", {visibility: "hidden"})
        gsap.set("#belt", {visibility: "hidden"})
        gsap.set("#Girls", {visibility: "visible"})
    });

    shorts.addEventListener("click", () => {
        gsap.set("#shirt", {visibility: "visible"})
        gsap.set("#shorts", {visibility: "visible"})
        gsap.set("#belt", {visibility: "visible"})
        gsap.set("#Girls", {visibility: "hidden"})
    });

    shortHair.addEventListener("click", () => {
        gsap.set("#Short", {visibility: "visible"})
        gsap.set("#Long", {visibility: "hidden"})
    });

    longHair.addEventListener("click", () => {
        gsap.set("#Long", {visibility: "visible"})
        gsap.set("#Short", {visibility: "hidden"})
    });

    skinColor.addEventListener("click", () => {
        gsap.to(
            "#head1",
            {
                fill: chosenColor,
                duration: 0
            }
        );

        gsap.to(
            "#hand",
            {
                fill: chosenColor,
                duration: 0
            }
        );

        gsap.to(
            "#armLower",
            {
                fill: chosenColor,
                duration: 0
            }
        );

        gsap.to(
            "#legs",
            {
                fill: chosenColor,
                duration: 0
            }
        );
    });

    changeOutfitColor.addEventListener("click", () => {
        gsap.to(
            "#shirtSleeve1",
            {
                fill: chosenColor,
                duration: 0
            }
        );

        gsap.to(
            "#shirt",
            {
                fill: chosenColor,
                duration: 0
            }
        );

        gsap.to(
            "#shorts",
            {
                fill: chosenColor,
                duration: 0
            }
        );

        gsap.to(
            "#dress1",
            {
                fill: chosenColor,
                duration: 0
            }
        );

        gsap.to(
            "#Shoes",
            {
                fill: chosenColor,
                duration: 0
            }
        );
    });

    changeHairColor.addEventListener("click", () => {
        gsap.to(
            "#Long",
            {
                fill: chosenColor,
                duration: 0
            }
        );

        gsap.to(
            "#Short",
            {
                fill: chosenColor,
                duration: 0
            }
        );
    });

    const tl4 = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });

    tl4.fromTo("#abc-section", {opacity: 0}, {opacity: 1, duration: 3})
    tl4.fromTo("#sleep-section", {opacity: 0}, {opacity: 1, duration: 3}, "<50%")

    const tl5 = gsap.timeline({repeat: -1, duration: 2});
    gsap.set("#goddess-cupid", {opacity: 0});
    gsap.set("#cupid", {opacity: 0});

    tl5.fromTo(
        "#goddess-alone", 
        {
            opacity: 1
        },
        {
            opacity: 0,
            duration: 8
        }
    )

    tl5.fromTo(
        "#goddess-cupid",
        {
            opacity: 0
        },
        {
            opacity: 1,
            duration: 8
        }, "<"
    )

    tl5.fromTo(
        "#goddess-cupid",
        {
            opacity: 1
        },
        {
            opacity: 0,
            duration: 8
        }
    )

    tl5.fromTo(
        "#cupid",
        {
            opacity: 0
        },
        {
            opacity: 1,
            duration: 8
        }, "<"
    )

    tl5.fromTo(
        "#cupid",
        {
            opacity: 1
        },
        {
            opacity: 0,
            duration: 8
        }
    )

    tl5.fromTo(
        "#goddess-alone",
        {
            opacity: 0
        },
        {
            opacity: 1,
            duration: 8
        }, "<"
    )

    const tl6 = gsap.timeline(
        {
            defaults: {
                yoyo: true,
                repeat: -1,
                duration: 5,
                repeatDelay: 1
    
    }})
    
    tl6.fromTo(
        '#bottomLeft',
        { 
            x: -52,
            y: 98,
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
    
    tl6.fromTo(
        '#bottomRight',
        { 
            x: -60,
            y: 98,
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
    
    tl6.fromTo(
        '#topLeft',
        { 
            x: -52,
            y: 105,
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
    
    tl6.fromTo(
        '#topRight',
        { 
            x: -60,
            y: 105,
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

    const tl7 = gsap.timeline();
    tl7.fromTo(
        "#div11-inner",
        {
            color: "#54b6ff"
        },
        {
            color: "white",
            duration: 4,
            yoyo: true,
            repeat: -1
        }
    )

    tl7.fromTo(
        ".big-snow",
        {
            opacity: 0,
            scale:3
        },
        {
            opacity: 1,
            scale: 0,
            duration: 7,
            repeat: -1,
            ease: "power2.inOut",
            yoyo: true
        }
    )
    tl7.fromTo(
        ".med-snow",
        {
            opacity: 0,
            scale: 2,
            y: -100
        },
        {
            opacity: 1,
            scale: 0,
            y: 0,
            duration: 6,
            repeat: -1,
            yoyo:true,
            ease: "power2.inOut"
        }
    )
    tl7.fromTo(
        ".small-snow",
        {
            opacity: 0,
            scale: 6
        },
        {
            opacity: 1,
            scale: 0,
            duration: 5,
            repeat: -1,
            ease: "power2.inOut"
        }
    )

   
