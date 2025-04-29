import { Outlet, createBrowserRouter } from "react-router-dom";
import { UserContainer, AuthContainer,CompanyContainer,CustomerContainer,CategoryContainer,DashboardContainer,SupplierContainer} from "./imports";
import { PrivateRoute } from "./private"; // Asegúrate de importar esto

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <AuthContainer />,
      },
      {
        path: "users",
        element: <PrivateRoute />, 
        children: [
          {
            index: true,
            element: <UserContainer />,
          },
        ],
      },
      {
        path: "dashboard",
        element: (
          <DashboardContainer/>
        ),
        children: [
          
          {
            path: "clientes",
            element: <CustomerContainer />,
          },
          {
            path: "proveedores",
            element: <SupplierContainer/>,
          },
          {
            path: "categorias",
            element: <CategoryContainer />,
          },
          {
            path: "empresa",
            element: <CompanyContainer />,
          },
        ],
      },
    ],
  },
]);
