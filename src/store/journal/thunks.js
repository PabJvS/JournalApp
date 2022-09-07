import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers/';
import {
   addNewEmptyNote,
   deleteNoteById,
   savingNewNote,
   setActiveNote,
   setNotes,
   setPhotosToActiveNote,
   setSaving,
   updateNote,
} from './journalSlice';

//* Crear nota en la firebase=========================
export const startNewNote = () => {
   return async (dispatch, getState) => {
      //getState Obtiene el stado del reducer para obtener el uid
      // console.log(getState());

      // TODO: tarea dispatch
      dispatch(savingNewNote());

      const { uid } = getState().auth;

      const newNote = {
         title: '',
         body: '',
         imageUrls: [],
         date: new Date().getTime(),
      };

      const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
      const setDocResp = await setDoc(newDoc, newNote);

      console.log({ newDoc, setDocResp });

      newNote.id = newDoc.id;

      //! dispatch
      // dispatch( newNote )
      dispatch(addNewEmptyNote(newNote));
      //dispatch( activarNote ) // nota para establecer en pantalla para editar etc.
      dispatch(setActiveNote(newNote));
   };
};

// * Cargar notas de firebase ==================================
export const starLoadingNotes = () => {
   return async (dispatch, getState) => {
      const { uid } = getState().auth;

      if (!uid) throw new Error('El UID del usuario no exite');
      const notes = await loadNotes(uid);

      dispatch(setNotes(notes));
   };
};

//* Actulizar la nota actual ====================================
export const startSaveNote = () => {
   return async (dispatch, getState) => {
      dispatch(setSaving());

      const { uid } = getState().auth;
      const { active: note } = getState().journal;
      const noteToFireStore = { ...note };
      delete noteToFireStore.id;

      // console.log(noteToFireStore);
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
      await setDoc(docRef, noteToFireStore, { merge: true });

      dispatch(updateNote(note));
   };
};

//* Subir la imagenes a cloudinary ===========================
export const startUpLoadingFiles = (files = []) => {
   //
   return async (dispatch) => {
      //
      dispatch(setSaving());
      // console.log(files);
      // await fileUpload(files[0]);
      const fileUploadPromises = [];
      for (const file of files) {
         fileUploadPromises.push(fileUpload(file));
      }

      const photosUrls = await Promise.all(fileUploadPromises);

      dispatch(setPhotosToActiveNote(photosUrls));
   };
};

export const startDeletingNote = () => {
   return async (dispatch, getState) => {
      const { uid } = getState().auth;
      const { active: note } = getState().journal;
      // cosole.log({ uid, note });
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
      await deleteDoc(docRef);

      dispatch(deleteNoteById(note.id));
   };
};
