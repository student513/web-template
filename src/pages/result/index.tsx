import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();

  return <>{router.isReady && <></>}</>;
}
