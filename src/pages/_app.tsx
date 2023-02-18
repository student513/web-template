import { ApiProvider } from "@/providers/ApiProvider";
import { AxiosInstanceProvider } from "@/providers/AxiosInstanceProvider";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
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
            <Component {...pageProps} />
          </ApiProvider>
        </AxiosInstanceProvider>
      </QueryClientProvider>
    </>
  );
}
