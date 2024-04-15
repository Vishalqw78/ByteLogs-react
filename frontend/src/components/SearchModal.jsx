import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import "../styles/ab.css";
import "../styles/abc.css";

const SearchModal = ({ searchModal, setSearchModal }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (searchModal) {
      document.getElementById("searchModal").focus();
      document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          console.log(input);
          setSearchModal(false);
        }
        if (e.key === "Escape") {
          setSearchModal(false);
        }
      });
    }
  });
  return (
    <div className={`search-modal ${searchModal ? "open" : ""}`}>
      <button onClick={() => setSearchModal(false)} className="search-close">
        <IoCloseCircleOutline />
      </button>
      <input
        type="text"
        className="form-input"
        id="searchModal"
        placeholder="Type and hit enter..."
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchModal;
