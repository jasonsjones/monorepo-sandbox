/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core';

const rotation = keyframes`
    0% {
        transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
         transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
`;

const spinner = css`
    height: 50vh;
    position: relative;
    transition: opacity linear 0.1s;

    &::before {
        border: solid 4px #ccc;
        border-bottom-color: #ff8600e6;
        border-radius: 50%;
        content: '';
        height: 40px;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 40px;
        animation: 1s linear infinite ${rotation};
        opacity: inherit;
        transform: translate3d(-50%, -50%, 0);
        transform-origin: center;
        will-change: transform;
    }
`;

const Spinner = () => {
    return <div css={spinner}></div>;
};

export default Spinner;
