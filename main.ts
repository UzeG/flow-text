let flowText = "Hello World!";
let flowSpeedRate = 2;

const setElTranslateX = (el: HTMLElement, px: number) => {
    el.style.transform = `translate(${px}px)`;
}

const resolveUrl = (url: string = document.URL): { text: string | null, speedRate: number | null } => {
    const splitRes = url.split("/");
    const res: { text: string | null, speedRate: number | null } = { text: null, speedRate: null };
    try {
        res.text = splitRes[3];
    } catch { }
    try {
        res.speedRate = Number(splitRes[4]);
    } catch { }
    return res;
}

window.onload = function () {
    const { text, speedRate } = resolveUrl();
    text && (flowText = text);
    speedRate && (flowSpeedRate = speedRate);

    const rootEl = document.getElementById("root") as HTMLDivElement;

    let flowTextEl1 = document.createElement("div");
    flowTextEl1.textContent = flowText;
    flowTextEl1.classList.add("flow-text");
    let flowTextEl2 = flowTextEl1.cloneNode(true) as HTMLDivElement;

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