import Home from "./home";
import { APIGetPage } from "./services/Strapi";
import { ErrorFallback } from "./components/ErrorFallback";

export default async function Page() { 
  try {
    const home = await APIGetPage("Home");
    return <Home {...home} />;
  } catch (error) {
    return <ErrorFallback error="No se pudo cargar la página de inicio" />;
  }
}