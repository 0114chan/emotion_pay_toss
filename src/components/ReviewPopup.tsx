import { css } from '@emotion/react';

interface ReviewPopupProps {
    emotion: string;
    onClose: () => void;
}

export default function ReviewPopup({ emotion, onClose }: ReviewPopupProps) {
    const reviewText = emotion === 'sad' ? '스트레스받았는데 할인 덕분에 기뻤어요!' : '행복한 날이 더 좋아졌어요!';

    const handleSubmit = async () => {
        await fetch('/api/review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emotion, review: reviewText }),
        });
        onClose();
    };

    return (
        <div css={popupStyle}>
            <h2>결제가 완료되었어요!</h2>
            <p>리뷰 제안: "{reviewText}"</p>
            <div css={starsStyle}>
                {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                ))}
            </div>
            <button css={submitButtonStyle} onClick={handleSubmit}>
                리뷰 남기기
            </button>
            <button css={closeButtonStyle} onClick={onClose}>
                나중에
            </button>
        </div>
    );
}

const popupStyle = css`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const starsStyle = css`
  margin: 10px 0;
  color: #ffd700;
  font-size: 24px;
`;

const submitButtonStyle = css`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const closeButtonStyle = css`
  padding: 10px 20px;
  background-color: #999;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;