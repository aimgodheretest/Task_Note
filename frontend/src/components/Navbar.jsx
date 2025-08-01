import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
function Navbar() {
  return (
    <header className="bg-base-300 border-b border-base-content">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-primary font-bold font-mono tracking-tighter">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Notes</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
