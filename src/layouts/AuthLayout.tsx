// ⚠️ File cũ không được sử dụng trong Next.js app - Vui lòng xóa
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { login } from '@/features/userSlice';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

const AuthLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        dispatch(login({ uid: firebaseUser.uid, email: firebaseUser.email }));
        router.push('/');
      }
      setAuthChecked(true);
    });
    return unsubscribe;
  }, [dispatch, router]);

  if (!authChecked) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-netflix-black">
      <ErrorBoundary>
        <div>{/* Outlet from Next.js routing should be here */}</div>
      </ErrorBoundary>
    </div>
  );
};

export default AuthLayout;
