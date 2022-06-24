import "./App.css";
import { useState } from "react";
import ProgressBar from "./components/ProgressBar/ProgressBar";

function App() {
    const title = "Progress Bar component";

    // input
    const [percentage, setPercentage] = useState(0);
    const [value, setValue] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    // loading demo
    let [load, setload] = useState(0);
    let [loadText, setloadText] = useState("");
    setTimeout(() => {
        (() => {
            if (load < 100) {
                setload(load + 4);
                if (loadText !== "Loading...") {
                    setloadText("Loading...");
                }
            } else if (load > 99) {
                setloadText("Complete!");
                setTimeout(() => {
                    setload(0);
                    setloadText("Loading...");
                }, 1500);
            }
        })();
    }, 150);

    return (
        <div className="App">
            <h1 id="title">{title}</h1>
            <img id="logo" src="/progressbar-removebg-preview.png" alt="logo" />

            <h2>{loadText}</h2>
            <ProgressBar percentage={load} />

            <h2>Percentage based</h2>
            <ProgressBar percentage={0} />
            <ProgressBar percentage={1} />
            <ProgressBar percentage={50} />
            <ProgressBar percentage={99} />
            <ProgressBar percentage={100} />

            <div sx={{ textAlign: "center" }}>
                <code> Enter a value (percentage based):</code>
                <input
                    type="number"
                    name="value"
                    value={percentage}
                    onInput={(e) => setPercentage(e.target.value)}
                />
                <ProgressBar percentage={percentage} />
            </div>

            <h2>Value, minValue, maxValue based</h2>
            <ProgressBar value={20} minValue={0} maxValue={100} />

            <div sx={{ textAlign: "center" }}>
                <code> Enter a value, minValue, maxValue:</code>
                <br />
                <br />
                <input
                    type="number"
                    name="value"
                    value={value}
                    onInput={(e) => setValue(e.target.value)}
                />
                {"\n"}
                <code>-</code>
                {"\n"}
                <input
                    type="number"
                    name="minValue"
                    value={minValue}
                    onInput={(e) => setMinValue(e.target.value)}
                />
                {"\n"}
                <code>-</code>
                {"\n"}
                <input
                    type="number"
                    name="maxValue"
                    value={maxValue}
                    onInput={(e) => setMaxValue(e.target.value)}
                />
                <ProgressBar
                    value={value}
                    minValue={minValue}
                    maxValue={maxValue}
                />
            </div>

            <div sx={{ textAlign: "center" }}>
                <h2>Error handling:</h2>

                <code>Negative value</code>
                <ProgressBar percentage={-10} />
                <code>Value over 100 </code>
                <ProgressBar percentage={101} />
                <code>Value greater than maxValue</code>
                <ProgressBar maxValue={99} value={100} />
                <code>Value lower than minValue</code>
                <ProgressBar minValue={1} value={0} />
            </div>
        </div>
    );
}

export default App;
