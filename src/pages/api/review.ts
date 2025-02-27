import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { emotion, review } = req.body;
        await addDoc(collection(db, 'reviews'), { emotion, review, timestamp: Date.now() });
        res.status(200).json({ message: '리뷰 저장 완료' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}