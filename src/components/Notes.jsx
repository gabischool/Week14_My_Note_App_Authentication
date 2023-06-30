import { TiDocumentDelete } from "react-icons/ti";
import { LuFileEdit } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useDeleteNotesMutation, useGetNotesQuery } from "../store/api/NoteSlice";
import { useGetUserQuery } from "../store/api/UserSlice";
const Notes = () => {
  const [deleteNotes] = useDeleteNotesMutation();
  const { data: notes = [] } = useGetNotesQuery();
  const { data: users = {} } = useGetUserQuery();

  console.log(notes);
  console.log("users", users);
  const handleDlete = (id)=>{
    deleteNotes(id)
  }
  return (
    <div className="mt-10 p-5 w-full lg:w-10/12 shadow-inner  lg:mx-auto ">
      <p className="text-3xl p-3 my-3 text-slate-600">List notes </p>
      <div className="grid lg:grid-cols-3 gap-3">

        {
          notes.map(note => {
           {
            if(users.id === note.user_id){
              return (
                <div className=" shadow p-3" key={note.id}>
                  <h1 className="text-xl">{note.title}</h1>
                  <p className="text-base">{note.content}</p>
                  <div className="flex flex-row border-t-2 p-2">
                    <button><Link to={`/EditNote/${note.id}`}><LuFileEdit size={25} className="text-green-500" /></Link></button>
                    <button onClick={()=>handleDlete(note.id)}><TiDocumentDelete size={25} className="text-red-500" /></button>
                  </div>
                </div>
              )
            }
          }

          })
        }

      </div>

    </div>
  )
}

export default Notes