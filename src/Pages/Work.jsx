import { useState } from "react";
import Book from "../components/Work/Book";

export default function Work({ isMaximized = false }) {
  const [darkBook, setDarkBook] = useState(false);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Book
        isMaximized={isMaximized}
        darkBook={darkBook}
        onToggleDark={() => setDarkBook((d) => !d)}
      />
    </div>
  );
}
