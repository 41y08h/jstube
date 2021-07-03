import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => (
  <footer className="p-6 pt-0">
    <div className="text-xs font-medium text-secondary space-y-2">
      <div className="space-x-3">
        <Link href="/about">About</Link>
        <a target="blank" href="https://github.com/41y08h/jstube">
          Source
        </a>
        <a target="blank" href="https://github.com/41y08h">
          Developer
        </a>
      </div>
      <div className="space-x-3">
        <a target="blank" href="https://github.com/41y08h/jstube/issues">
          Report Bug
        </a>
        <a target="blank" href="/copyright">
          Copyright
        </a>
      </div>
    </div>
    <span className="block mt-4 text-xs text-secondary">
      &copy; {new Date().getFullYear()} JsTube
    </span>
  </footer>
);

export default Footer;
