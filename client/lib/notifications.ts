import { collection, addDoc, query, where, orderBy, onSnapshot, doc, updateDoc, limit } from 'firebase/firestore';
import { db } from './firebase';
import type { NotificationDoc } from './types';

export async function pushNotification(params: Omit<NotificationDoc, 'id' | 'read' | 'createdAt'>) {
  await addDoc(collection(db, 'notifications'), {
    ...params,
    read: false,
    createdAt: Date.now()
  });
}

export function subscribeToNotifications(userId: string, cb: (items: NotificationDoc[]) => void) {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(30)
  );
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as NotificationDoc));
  });
}

export async function markNotificationRead(id: string) {
  await updateDoc(doc(db, 'notifications', id), { read: true });
}
