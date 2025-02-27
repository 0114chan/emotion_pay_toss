//index.tsx
import { useState } from 'react';
import { css } from '@emotion/react';
import EmotionDetector from '../components/EmotionDetector';
import PaymentScreen from '../components/PaymentScreen';
import ReviewPopup from '../components/ReviewPopup';
import '../styles/index.module.css'; // 글로벌 CSS 또는 CSS Modules 임포트

export default function Home() {
  const [emotion, setEmotion] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const handleEmotionDetected = (detectedEmotion: string) => {
    setEmotion(detectedEmotion);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowReview(true);
  };

  return (
      <div css={containerStyle}>

        {!emotion && <EmotionDetector onDetect={handleEmotionDetected} />}
        {showPayment && <PaymentScreen emotion={emotion!} onSuccess={handlePaymentSuccess} />}
        {showReview && <ReviewPopup emotion={emotion!} onClose={() => setShowReview(false)} />}
      </div>
  );
}

const containerStyle = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #e6f0ff, #fff);
  padding: 20px;
`;

const logoStyle = css`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
`;