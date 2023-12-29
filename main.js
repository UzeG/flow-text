let flowText = "Hello World!";
let flowSpeedRate = 2;
let sizeRate = 1;

const setElTranslateX = (el, px) => {
    el.style.transform = `translate(${px}px)`;
}

const resolveUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return { text: urlParams.get('text'), speed: Number(urlParams.get('speed')), size: Number(urlParams.get('size')) };
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
    })

    const { text, speed, size } = resolveUrl();

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

    if (size) {
        sizeRate = size;
        localStorage.setItem('size', sizeRate);
    } else {
        const l_sizeRate = localStorage.getItem('size');
        l_sizeRate ? (sizeRate = l_sizeRate) : localStorage.setItem('size', sizeRate);
    }

    const rootEl = document.getElementById("root");

    let flowTextEl1 = document.createElement("div");
    flowTextEl1.textContent = flowText;
    flowTextEl1.classList.add("flow-text");
    flowTextEl1.style.setProperty('font-size', `${10 * sizeRate}rem`)
    let flowTextEl2 = flowTextEl1.cloneNode(true);

    rootEl.appendChild(flowTextEl1);
    rootEl.appendChild(flowTextEl2);

    setElTranslateX(flowTextEl2, -flowTextEl2.clientWidth);


    const deltaTime = 1; // ms
    let translateX = 0;
    setInterval(() => {
        translateX += deltaTime * flowSpeedRate;

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