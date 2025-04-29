// dashboard/components/DashboardMenu.tsx
import { Link } from "react-router-dom";
import{UsersRound,Truck,AlignStartVertical,Building2} from 'lucide-react'
export const DashboardMenu = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-4">
    <nav className="flex flex-col gap-2">
      <Link to="/dashboard/clientes" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
        <UsersRound />
        <span>CLIENTES</span>
      </Link>
      <Link to="/dashboard/proveedores" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
        <Truck />
        <span>PROVEEDORES</span>
      </Link>
      <Link to="/dashboard/categorias" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
        <AlignStartVertical />
        <span>CATEGORÍAS</span>
      </Link>
      <Link to="/dashboard/empresa" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
        <Building2 />
        <span>EMPRESA</span>
      </Link>
    </nav>
  </aside>
  
  );
};
