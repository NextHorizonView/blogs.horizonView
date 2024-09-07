"use client";
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import useSWRSubscription from 'swr/subscription';

export function useAdmin({ uid }) {
  const { data, error } = useSWRSubscription(
    uid ? [`admins/${uid}`] : null, // Use the correct path
    ([path], { next }) => {
      const ref = doc(db, path);
      const unsub = onSnapshot(
        ref,
        (snapshot) => {
          next(null, snapshot.exists() ? snapshot.data() : null);
        },
        (error) => {
          next(error.message);
        }
      );
      return () => unsub(); // Clean up listener on unmount
    }
  );

  return {
    data,
    error,
    isLoading: data === undefined && !error // Adjust loading condition
  };
}
