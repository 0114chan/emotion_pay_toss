import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

interface CustomPaymentWidgetProps {
    emotion: string;
    onSuccess: () => void;
}

const CustomPaymentWidget = ({ emotion, onSuccess }: CustomPaymentWidgetProps) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [animation, setAnimation] = useState(false);

    // Enable animation after initial render
    useEffect(() => {
        setAnimation(true);
    }, []);

    // Get emotion details (icon, colors, message)
    const getEmotionDetails = (emotion: string) => {
        switch (emotion) {
            case 'sad':
                return {
                    icon: '😢',
                    color: '#e6f0ff', // 밝은 파란색 배경
                    textColor: '#007bff', // 파란색 텍스트
                    message: '힘든 날엔 할인으로 위로드릴게요!'
                };
            case 'happy':
                return {
                    icon: '😊',
                    color: '#fef3e7', // 밝은 노란색 배경
                    textColor: '#f59e0b', // 노란색 텍스트
                    message: '기쁜 날엔 커피가 더 달콤해요!'
                };
            case 'angry':
                return {
                    icon: '😠',
                    color: '#fee2e2', // 밝은 빨간색 배경
                    textColor: '#ef4444', // 빨간색 텍스트
                    message: '화난 날엔 커피로 진정하세요!'
                };
            case 'surprised':
                return {
                    icon: '😲',
                    color: '#f3e8ff', // 밝은 보라색 배경
                    textColor: '#9333ea', // 보라색 텍스트
                    message: '놀란 날엔 작은 할인으로 기분 전환!'
                };
            case 'neutral':
                return {
                    icon: '😐',
                    color: '#f3f4f6', // 밝은 회색 배경
                    textColor: '#6b7280', // 회색 텍스트
                    message: '평온한 날엔 커피 한 잔 어때요?'
                };
            default:
                return {
                    icon: '☕',
                    color: '#e6f0ff', // 기본 밝은 파란색 배경
                    textColor: '#007bff', // 기본 파란색 텍스트
                    message: '커피로 하루를 채워보세요!'
                };
        }
    };

    const emotionDetails = getEmotionDetails(emotion);

    // Calculate discount based on emotion
    const discount =
        emotion === 'sad' ? 10 :
            emotion === 'happy' ? 5 :
                emotion === 'angry' ? 8 :
                    emotion === 'surprised' ? 3 :
                        emotion === 'neutral' ? 0 : 0;

    const basePrice = 5000;
    const finalPrice = basePrice * (1 - discount / 100);

    // Format card input handlers
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        return parts.length ? parts.join(' ') : value;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted.slice(0, 19));
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        return v.length >= 2 ? `${v.slice(0, 2)}/${v.slice(2, 4)}` : v;
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatExpiryDate(e.target.value);
        setExpiryDate(formatted.slice(0, 5));
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCvv(value.slice(0, 3));
    };

    const handlePayment = () => {
        if (!cardNumber || !expiryDate || !cvv || !agreed) {
            alert('모든 정보를 입력하고 약관에 동의해주세요.');
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            onSuccess();
        }, 1500);
    };

    return (
        <div css={containerStyle(emotionDetails.color, animation)}>
            <h1 css={logoStyle}>EmotionPay</h1>
            <div css={cardStyle}>
                <h2 css={titleStyle}>커피 주문</h2>
                <p css={messageStyle}>{emotionDetails.message}</p>

                <img src="/coffee-machine.png" alt="Coffee Machine" css={imageStyle} />

                {/* Emotion and discount section */}
                <div css={emotionSectionStyle}>
                    <p css={labelStyle}>현재 감정</p>
                    <p css={emotionTextStyle(emotionDetails.textColor)}>{emotion}</p>
                    <p css={labelStyle}>감정 할인</p>
                    <p css={emotionTextStyle(emotionDetails.textColor)}>{discount}%</p>
                    <p css={labelStyle}>최종 가격</p>
                    <p css={priceStyle}>{finalPrice.toLocaleString()}원</p>
                </div>

                {/* Payment method selection */}
                <div css={paymentMethodSectionStyle}>
                    <p css={sectionTitleStyle}>결제 수단 선택</p>
                    <div css={buttonGroupStyle}>
                        <button
                            css={paymentButtonStyle(paymentMethod === 'card', emotionDetails.textColor)}
                            onClick={() => setPaymentMethod('card')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                css={iconStyle}
                            >
                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                <path
                                    fillRule="evenodd"
                                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            카드
                        </button>
                        <button
                            css={paymentButtonStyle(paymentMethod === 'bank', emotionDetails.textColor)}
                            onClick={() => setPaymentMethod('bank')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                css={iconStyle}
                            >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            계좌이체
                        </button>
                    </div>
                </div>

                {/* Card form */}
                {paymentMethod === 'card' && (
                    <div css={formSectionStyle}>
                        <div>
                            <label css={labelStyle}>카드 번호</label>
                            <input
                                type="text"
                                css={inputStyle}
                                placeholder="0000 0000 0000 0000"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                            />
                        </div>
                        <div css={inputRowStyle}>
                            <div>
                                <label css={labelStyle}>유효기간</label>
                                <input
                                    type="text"
                                    css={inputStyle}
                                    placeholder="MM/YY"
                                    value={expiryDate}
                                    onChange={handleExpiryDateChange}
                                />
                            </div>
                            <div>
                                <label css={labelStyle}>CVV</label>
                                <input
                                    type="text"
                                    css={inputStyle}
                                    placeholder="123"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Bank transfer info */}
                {paymentMethod === 'bank' && (
                    <div css={bankInfoStyle}>
                        <div css={bankHeaderStyle}>
                            <p css={sectionTitleStyle}>계좌이체 정보</p>
                        </div>
                        <div>
                            <div css={bankRowStyle}>
                                <span css={bankLabelStyle}>은행</span>
                                <span css={bankValueStyle}>디지털은행</span>
                            </div>
                            <div css={bankRowStyle}>
                                <span css={bankLabelStyle}>계좌번호</span>
                                <span css={bankValueStyle}>123-456-789012</span>
                            </div>
                            <div css={bankRowStyle}>
                                <span css={bankLabelStyle}>예금주</span>
                                <span css={bankValueStyle}>커피샵</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Agreement */}
                <div css={agreementStyle}>
                    <label css={checkboxLabelStyle}>
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            css={checkboxStyle}
                        />
                        <span css={checkboxTextStyle}>결제 진행 및 개인정보 수집에 동의합니다</span>
                    </label>
                </div>

                {/* Payment button */}
                <button
                    css={paymentButtonStyleFinal(isProcessing, emotionDetails.textColor)}
                    onClick={handlePayment}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <div css={loadingStyle}>
                            <span css={loadingTextStyle}>처리 중...</span>
                            <span css={spinnerStyle}></span>
                        </div>
                    ) : (
                        '결제하기'
                    )}
                </button>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    css={lockIconStyle}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2h-1.172a2 2 0 01-1.414-.586L11 10.586A2 2 0 009.172 9H8a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                </svg>

                {/* Footer */}
                <p css={footerStyle}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        css={lockIconStyleSmall}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    안전한 결제 시스템으로 처리됩니다
                </p>
            </div>
        </div>
    );
};

// Emotion-specific container style with animation
//노란색 백그라운드
const containerStyle = (backgroundColor: string, animate: boolean) => css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color:#FFF176;
  padding: 20px;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  opacity: ${animate ? 1 : 0};
  transform: ${animate ? 'translateY(0)' : 'translateY(20px)'};
`;

const logoStyle = css`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
`;

const cardStyle = css`
  width: 100%;
  max-width: 480px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const titleStyle = css`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

const messageStyle = css`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const imageStyle = css`
  width: 192px;
  height: 192px;
  display: block;
  margin: 0 auto 16px;
`;

const emotionSectionStyle = css`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
`;

const labelStyle = css`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
`;

const emotionTextStyle = (textColor: string) => css`
  font-size: 18px;
  font-weight: bold;
  color: ${textColor};
  margin-bottom: 12px;
`;

const priceStyle = css`
  font-size: 24px;
  font-weight: bold;
  color: #111827;
  margin-top: 8px;
`;

const paymentMethodSectionStyle = css`
  margin-bottom: 24px;
`;

const sectionTitleStyle = css`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
`;

const buttonGroupStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const paymentButtonStyle = (isActive: boolean, textColor: string) => css`
  padding: 12px;
  background-color: ${isActive ? '#e6f0ff' : 'white'};
  color: ${isActive ? textColor : '#6b7280'};
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s, box-shadow 0.3s, color 0.3s;
  box-shadow: ${isActive ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'};
  &:hover:not(:disabled) {
    background-color: ${isActive ? '#d1e7ff' : '#f3f4f6'};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  &:active:not(:disabled) {
    transform: translateY(2px);
    box-shadow: none;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const iconStyle = css`
  width: 20px;
  height: 20px;
`;

const formSectionStyle = css`
  margin-bottom: 24px;
`;

const inputStyle = css`
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  transition: border-color 0.3s, box-shadow 0.3s;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
`;

const inputRowStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const bankInfoStyle = css`
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const bankHeaderStyle = css`
  background-color: #f3f4f6;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
`;

const bankRowStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
  &:last-child {
    border-bottom: none;
  }
`;

const bankLabelStyle = css`
  font-size: 14px;
  color: #6b7280;
`;

const bankValueStyle = css`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
`;

const agreementStyle = css`
  margin-bottom: 24px;
`;

const checkboxLabelStyle = css`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
`;

const checkboxStyle = css`
  margin-top: 4px;
  margin-right: 8px;
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  &:checked {
    border-color: #007bff;
    background-color: #007bff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
`;

const checkboxTextStyle = css`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
`;

const paymentButtonStyleFinal = (isProcessing: boolean, textColor: string) => css`
  width: 100%;
  padding: 12px;
  background-color: ${isProcessing ? '#007bff' : '#007bff'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${isProcessing ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  &:hover:not(:disabled) {
    background-color: ${isProcessing ? '#a0aec0' : '#0056b3'};
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
  }
  &:active:not(:disabled) {
    transform: translateY(2px);
    box-shadow: none;
  }
  &:disabled {
    opacity: 0.7;
  }
`;

const loadingStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const loadingTextStyle = css`
  margin-right: 8px;
`;

const spinnerStyle = css`
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const lockIconStyle = css`
  width: 64px;
  height: 64px;
  color: #6b7280;
  display: block;
  margin: 16px auto;
`;

const lockIconStyleSmall = css`
  width: 12px;
  height: 12px;
  margin-right: 4px;
`;

const footerStyle = css`
  font-size: 12px;
  color: #a0aec0;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default CustomPaymentWidget;