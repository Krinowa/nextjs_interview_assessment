import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";


export default function Home() {
  const router = useRouter();
  
  const redirection = useCallback(() => {
    router?.replace('/mainmenu')
  })

  useEffect(() => {
    redirection();
  }, [redirection]);
}
