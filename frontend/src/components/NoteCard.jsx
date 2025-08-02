import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import axiosApi from "./../lib/axios";
import { toast } from "react-hot-toast";

function NoteCard({ note,setNotes }) {
  async function deleteHandler(e, id) {
    e.preventDefault();

    if (!window.confirm("Are you sure to delete this note?")) return;

    try {
      await axiosApi.delete(`/notes/${id}`);
      setNotes((prev)=> prev.filter(note=>note._id !==id))
      toast.success("Notes Deleted Successfully...");
    } catch (error) {
      console.log("Error in deleteHandler", error);
      toast.error("Failed to Delete Note");
    }
  }
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#dc5ce7]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70  line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            <PenSquareIcon className="size-4" />
            <button
              onClick={(e) => deleteHandler(e, note._id)}
              className=" btn btn-ghost text-xs text-error"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
