import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const API = "https://keep-notes-xadd.onrender.com";

  // Fetch notes on load
  const getNotes = async () => {
    try {
      const res = await axios.get(`${API}/notes`);
      setNotes(res.data);
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  // Add new note
  const addNote = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(`${API}/notes`, { text });
      setText("");
      getNotes(); // Refresh list after adding
    } catch (error) {
      console.log("Error adding note:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Notes App</h1>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your note"
        />
        <button style={styles.button} onClick={addNote}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {notes.map((note, index) => (
          <li key={index} style={styles.item}>
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    fontFamily: "Arial",
    textAlign: "center",
  },
  title: {
    fontSize: "30px",
    marginBottom: "20px",
  },
  inputBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    width: "70%",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    background: "#f7f7f7",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    textAlign: "left",
  },
};

export default App;
