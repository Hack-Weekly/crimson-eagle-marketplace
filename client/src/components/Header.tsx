import { SidebarContext } from "../contexts/SidebarContext";
import { useContext } from "react";
import { BsBag } from "react-icons/bs";

const Header = () => {
  const {isOpen,setIsOpen} = useContext(SidebarContext)
  return (
  <header className="bg-orange-500">
    <div>Header</div>
    <div onClick={()=> setIsOpen(!isOpen)}
    className="cursor-pointer flex relative">
      <BsBag className="text-2xl"/>
    </div>
  </header>
  );
};

export default Header;
