import React, { useEffect, useState } from "react";
import { getReorderedDateStr } from "../lib/records";

function Timer(props) {
    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        const difference = +new Date(`${year}-${month}-${day + 1}`) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((difference / 1000 / 60) % 60),
                segundos: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
            props.timeLeft(timeLeft);
        }, 1000);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });
    return (
        <div>
            <h3>Inscrições para o dia <span>{getReorderedDateStr(new Date().toISOString().split('T')[0], '-')} fecham em {timerComponents}</span></h3>
        </div>
    );
}

export default Timer;