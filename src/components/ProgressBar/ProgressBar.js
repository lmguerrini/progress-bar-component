import "./ProgressBar.css";
import { ImWarning } from "react-icons/im";

function ProgressBar(props) {
    let { percentage, value, minValue, maxValue } = props;
    let ProgressBarStyle = "ProgressBar";
    let ProgressStyle = "progress";
    let error;

    try {
        if (minValue === undefined) {
            minValue = 0;
        } else if (maxValue === undefined) {
            maxValue = 0;
        }
        percentage =
            percentage ??
            Math.floor((value / (maxValue - minValue)).toFixed(2) * 100);
    } catch (error) {
        percentage = 100;
        ProgressBarStyle += " error";
    }

    if (percentage === 100) {
        ProgressStyle += " complete";
    } else if (percentage < 0) {
        percentage = null;
        ProgressBarStyle += " error";
        error = "Negative value";
    } else if (percentage > 100) {
        percentage = null;
        ProgressBarStyle += " error";
        if (maxValue === undefined) {
            error = ["Percentage over default maxValue", `(100)`].join(" ");
        } else if (maxValue === "") {
            error = "MaxValue not defined. Please insert a maxValue";
        } else if (value > maxValue) {
            error = [
                "Value",
                `(${value})`,
                " greater than maxValue",
                `(${maxValue})`,
            ].join(" ");
        }
    } else if (value < minValue) {
        error = [
            "Value",
            `(${value})`,
            " lower than minValue",
            `(${minValue})`,
        ].join(" ");
        percentage = null;
        ProgressBarStyle += " error";
    } else if (percentage > 99 && error === undefined) {
        ProgressStyle += " complete";
    }

    return (
        <div className={ProgressBarStyle} {...props}>
            <div
                className={ProgressStyle}
                style={!error ? { width: `${percentage}%` } : { width: `100%` }}
            >
                {error && (
                    <code className="errorText">
                        {" "}
                        <ImWarning id="warningIcon" /> {error}{" "}
                        <ImWarning id="warningIcon" />
                    </code>
                )}
                <span>{!error && `${percentage}%`}</span>
            </div>
        </div>
    );
}

export default ProgressBar;
