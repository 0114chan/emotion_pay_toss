import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

interface EmotionDetectorProps {
    onDetect: (emotion: string) => void;
}

export default function EmotionDetector({ onDetect }: EmotionDetectorProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const loadModels = async () => {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models'),
            ]);
            await startVideo();
        };

        const startVideo = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        };

        (async () => {
            await loadModels();
        })();

        const interval = setInterval(async () => {
            if (videoRef.current) {
                const detections = await faceapi
                    .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                    .withFaceExpressions();
                if (detections.length > 0) {
                    const expressions = detections[0].expressions;
                    const topEmotion = Object.entries(expressions).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
                    onDetect(topEmotion);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [onDetect]);

    return (
        <div className="flex flex-col items-center gap-4">
            <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full max-w-xs rounded-lg border border-gray-200 shadow-md"
            />
            <p className="text-lg text-gray-700 font-medium">얼굴을 보여주세요</p>
        </div>
    );
}