import GoDaddy from "../assets/icons/GoDaddy";
import Hostgator from "../assets/icons/HostGator";

export default function Hosting() {
  return (
    <ul className="flex gap-10 w-full justify-start px-6 pt-6 text-6xl">
      <GoDaddy />
      <Hostgator />
      {/* <li>Bluehost</li>
              <li>Hostinger</li>
              <li>SiteGround</li> */}
    </ul>
  );
}
