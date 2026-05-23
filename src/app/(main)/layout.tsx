'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '@/firebase';
import { login, logout, selectUser } from '@/features/userSlice';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { RootState } from '@/store/store';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => selectUser(state));
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          login({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
          })
        );
      } else {
        dispatch(logout());
        router.push('/login');
      }
      setAuthChecked(true);
    });
    return unsubscribe;
  }, [dispatch, router]);

  if (!authChecked) return <LoadingScreen />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <main>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
