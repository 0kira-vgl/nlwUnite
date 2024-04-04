import UiniteIcon from "/uiniteIcon.svg";
import { NavLink } from "../NavLink";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={UiniteIcon} alt="Logo do Uinite" />

      <nav className="flex items-center gap-5">
        <NavLink href="#">Eventos</NavLink>
        <NavLink href="#">Participantes</NavLink>
      </nav>
    </div>
  );
}
