import { AppProvider } from "./components/AppProvider";
import { APIGetManifiest, APIGetSocial } from "./services/Strapi";
import { ConditionalLayout } from "./components/ConditionalLayout";
import { ErrorFallback } from "./components/ErrorFallback";
import { IManifiest, ISocial } from "./interfaces/interfaces";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let social: ISocial[] = [];
  let manifiest: IManifiest = { content: "", profileUrl: "", backgroundUrl: "" };
  let hasError = false;
  let errorMessage = "";

  try {
    social = await APIGetSocial();
    manifiest = await APIGetManifiest();
  } catch (error) {
    hasError = true;
    errorMessage = error instanceof Error 
      ? `Error connecting API : ${error.message}` 
      : "Unknown error loading data from API";
    console.error("Error fetching data:", error);
  }  

  if (hasError) {
    return (
      <html lang="en">
        <body>
          <ErrorFallback error={errorMessage} />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <AppProvider value={{ manifiest, social }}>
          <ConditionalLayout manifiest={manifiest} social={social}>
            {children}
          </ConditionalLayout>
        </AppProvider>
      </body>
    </html>
  );
}