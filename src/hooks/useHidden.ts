import { useEffect, useState } from 'react';

export default function useHidden() {
  const [isHidden, setIsHidden] = useState(false);

  function _listen() {
    // console.log(`is Hidden: ${document.hidden}`);
    setIsHidden(document.hidden);
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', _listen);
    return () => {
      document.removeEventListener('visibilitychange', _listen);
    };
  }, []);

  return isHidden;
}
