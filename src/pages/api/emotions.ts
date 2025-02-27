import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { emotion } = req.body;
        const discount = emotion === 'sad' ? 10 : emotion === 'happy' ? 5 : 0;
        await addDoc(collection(db, 'emotions'), { emotion, timestamp: Date.now() });
        res.status(200).json({ emotion, discount });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}