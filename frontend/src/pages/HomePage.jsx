import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/rateLimitedUI";
import axios from "axios";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/notes");
        console.log(response.data);
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error Fetching Notes...");
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to Load Notes");
        }
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl max-auto p-4 mt-6">
        {loading && (
          <div className="text-primary text-center py-10">Loading Notes...</div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
