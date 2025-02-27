import { css } from '@emotion/react';

export default function Success() {
    return (
        <div css={successStyle}>
            <h1>결제 성공</h1>
            <p>커피 주문이 완료됐어요! 즐거운 시간 보내세요.</p>
        </div>
    );
}

const successStyle = css`
    text-align: center;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;