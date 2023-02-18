import { ApiProvider } from "@/providers/ApiProvider";
import { AxiosInstanceProvider } from "@/providers/AxiosInstanceProvider";
import { TanstackQueryProvider } from "@/providers/TanstackQueryProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
          },
        },
      })
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AxiosInstanceProvider>
          <ApiProvider>
            <TanstackQueryProvider>
              {router.isReady && <Component {...pageProps} />}
            </TanstackQueryProvider>
          </ApiProvider>
        </AxiosInstanceProvider>
      </QueryClientProvider>
    </>
  );
}
