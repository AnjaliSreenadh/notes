import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes
  useEffect(() => {
    fetch("/api/notes/")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  // Add note
  const addNote = () => {
    fetch("/api/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(newNote => {
        setNotes([...notes, newNote]);
        setTitle("");
        setContent("");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <br /><br />

      <button onClick={addNote}>Add Note</button>

      <hr />

      {notes.map(note => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;