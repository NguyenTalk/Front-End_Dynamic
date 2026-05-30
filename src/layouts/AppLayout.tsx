// ⚠️ File cũ không được sử dụng trong Next.js app - Vui lòng xóa
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { login, logout, selectUser } from '@/features/userSlice';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import LoadingScreen from '@/components/ui/LoadingScreen';

const AppLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        dispatch(login({ uid: firebaseUser.uid, email: firebaseUser.email }));
      } else {
        dispatch(logout());
        router.push('/auth/login');
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
        <ErrorBoundary>
          <div>{/* Outlet from Next.js routing should be here */}</div>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
