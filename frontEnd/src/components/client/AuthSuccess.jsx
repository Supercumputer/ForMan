import { Spinner } from 'flowbite-react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();

  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Spinner aria-label="Center-aligned spinner example" size={"xl"}/>
    </div>
  );
};

export default AuthSuccess;
