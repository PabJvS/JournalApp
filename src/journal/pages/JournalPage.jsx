import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";

export const JournalPage = () => {
   const { isSaving, active } = useSelector((state) => state.journal);

   const dispatch = useDispatch();

   const onClickNewNote = () => {
      dispatch(startNewNote());
   };

   return (
      <JournalLayout>
         {/* NothinSelecter */}

         {!!active ? <NoteView /> : <NothingSelectedView />}

         {/* NoteView */}
         {/* <NoteView /> */}
         <IconButton
            onClick={onClickNewNote}
            size="large"
            disabled={isSaving}
            sx={{
               color: "white",
               backgroundColor: "error.main",
               ":hover": { backgroundColor: "error.main", opacity: 0.9 },
               position: "fixed",
               right: 60,
               bottom: 40,
            }}
         >
            <AddOutlined sx={{ fontSize: 30 }} />
         </IconButton>
      </JournalLayout>
   );
};
