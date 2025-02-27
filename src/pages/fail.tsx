import { css } from '@emotion/react';

export default function Fail() {
    return (
        <div css={failStyle}>
            <h1>결제 실패</h1>
            <p>결제에 문제가 생겼어요. 다시 시도해주세요.</p>
        </div>
    );
}

const failStyle = css`
    text-align: center;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;