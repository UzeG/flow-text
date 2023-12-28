let flowText = "Hello World!";
let flowSpeedRate = 2;

const setElTranslateX = (el, px) => {
    el.style.transform = `translate(${px}px)`;
}

const resolveUrl = () => {
    console.log(window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    return { text: urlParams.get('text'), speed: urlParams.get('speed') };
}

window.onload = function () {
    const { text, speed } = resolveUrl();
    text && (flowText = text);
    speed && (flowSpeedRate = speed);

    const rootEl = document.getElementById("root");

    let flowTextEl1 = document.createElement("div");
    flowTextEl1.textContent = flowText;
    flowTextEl1.classList.add("flow-text");
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