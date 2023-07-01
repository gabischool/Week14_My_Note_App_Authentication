/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetNotesQuery,
  useDeleteNoteMutation,
} from "../store/api/NoteSlice";
import { useGetUserQuery } from "../store/api/UserSlice";

function Notes() {
  const { data: notes = [] } = useGetNotesQuery();
  const [deleteNote] = useDeleteNoteMutation();
  const { data: user = {} } = useGetUserQuery();

  const deleteNoteHandler = (id) => {
    deleteNote(id);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {notes.map((note) => (
        <div
          className="relative bg-white w-[20rem] h-64 m-5   rounded overflow-hidden transition-all duration-100 hover:scale-105"
          key={note.id}>
          <div className="p-5">
            <h3 className="font-bold text-2xl mb-4">{note.title}</h3>
            <p>{note.content}</p>
          </div>
          <div className="absolute w-12 h-12 rotate-45 -top-8 -left-8" />
          {user && user.id === note.user_id && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4">
              <Link to={`/edit/${note.id}`}>
                <button className="mr-2 text-[#EAB308]">🖊</button>
              </Link>
              <button
                onClick={() => deleteNoteHandler(note.id)}
                className="text-red-600">
                ✖
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notes;
