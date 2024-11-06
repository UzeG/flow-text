let flowText = "Hello World!";
let flowSpeedRate = 2;

let windowWidthRate = 0.4;

let windowWidth = 0;

const setElTranslateX = (el, px) => {
    el.style.transform = `translate(${px}px)`;
}

const resolveUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return { text: urlParams.get('text'), speed: Number(urlParams.get('speed')), rate: Number(urlParams.get('rate')) };
}

let isFullScreen = false;

window.onload = function () {
    window.addEventListener('dblclick', () => {
        if (isFullScreen) {
            document.exitFullscreen()
        } else {
            document.body.requestFullscreen();
        }
        isFullScreen = !isFullScreen;
    });

    window.addEventListener('resize', () => {
        translateX = 0;

        adjustFlowTextElWidth();
        windowWidth = window.innerWidth;

        setElTranslateX(flowTextEl2, -flowTextEl1.clientWidth);
    });

    windowWidth = window.innerWidth;

    const { text, speed, size, rate } = resolveUrl();

    if (text) {
        flowText = text;
        localStorage.setItem('text', flowText);
    } else {
        const l_flowText = localStorage.getItem('text');
        l_flowText ? (flowText = l_flowText) : localStorage.setItem('text', flowText);
    }

    if (speed) {
        flowSpeedRate = speed;
        localStorage.setItem('speed', flowSpeedRate);
    } else {
        const l_flowSpeedRate = localStorage.getItem('speed');
        l_flowSpeedRate ? (flowSpeedRate = l_flowSpeedRate) : localStorage.setItem('speed', flowSpeedRate);
    }

    if (rate) {
        windowWidthRate = rate;
        localStorage.setItem('rate', windowWidthRate);
    } else {
        const l_windowWidthRate = localStorage.getItem('rate');
        l_windowWidthRate ? (windowWidthRate = l_windowWidthRate) : localStorage.setItem('rate', windowWidthRate);
    }


    const rootEl = document.getElementById("root");
    const cloakEl = document.getElementById("cloak");

    let flowTextEl1 = document.createElement("div");
    flowTextEl1.textContent = flowText;
    flowTextEl1.classList.add("flow-text");
    flowTextEl1.style.fontSize = windowWidth * windowWidthRate + 'px';
    let flowTextEl2 = flowTextEl1.cloneNode(true);

    const adjustFlowTextElWidth = () => {
        flowTextEl1.style.setProperty('width', window.innerWidth * windowWidthRate + 'px');

        let f = Number(flowTextEl1.style.fontSize.split('px')[0]);
        if (window.innerWidth > windowWidth) {
            while (flowTextEl1.scrollWidth <= flowTextEl1.clientWidth) {
                f += 1;
                flowTextEl1.style.fontSize = f + 'px'
            }
        } else {
            while (flowTextEl1.scrollWidth > flowTextEl1.clientWidth) {
                f -= 1;
                flowTextEl1.style.fontSize = f + 'px'
            }
        }
        flowTextEl2.style.setProperty('width', flowTextEl1.style.width);
        flowTextEl2.style.setProperty('font-size', flowTextEl1.style.fontSize);
    }

    setTimeout(() => {
        flowTextEl1.style.setProperty('width', windowWidth * windowWidthRate + 'px');
        let f = windowWidth * windowWidthRate;
        while (flowTextEl1.scrollWidth > flowTextEl1.clientWidth) {
            f -= 1;
            flowTextEl1.style.fontSize = f + 'px'
        }
        // while (flowTextEl1.scrollWidth < flowTextEl1.clientWidth) {
        //     f += 1;
        //     flowTextEl1.style.fontSize = f + 'px'
        // }
        flowTextEl2.style.fontSize = flowTextEl1.style.fontSize;
        cloakEl.style.opacity = 0;
    }, 100);

    rootEl.appendChild(flowTextEl1);
    rootEl.appendChild(flowTextEl2);

    setElTranslateX(flowTextEl2, -flowTextEl2.clientWidth);


    const deltaTime = 1; // ms
    let translateX = 0;
    setInterval(() => {
        translateX += deltaTime * flowSpeedRate;
        // translateX = 0;
        setElTranslateX(flowTextEl1, translateX);

        const overLength = translateX - (rootEl.clientWidth - flowTextEl1.clientWidth);
        if (overLength > 0) {
            if (overLength < flowTextEl1.clientWidth) {
                setElTranslateX(flowTextEl2, overLength - flowTextEl1.clientWidth);
            } else {
                setElTranslateX(flowTextEl1, -flowTextEl1.clientWidth);
                const temp = flowTextEl1;
                flowTextEl1 = flowTextEl2;
                flowTextEl2 = temp;
                translateX = 0;
            }
        }
    }, deltaTime);
}