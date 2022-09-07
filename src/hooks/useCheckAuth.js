import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth/authSlice";
import { FirebaseAuth } from "../firebase/config";
import { starLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
   //
   const { status } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   useEffect(() => {
      onAuthStateChanged(FirebaseAuth, async (user) => {
         if (!user) return dispatch(logout());

         const { uid, email, displayName, photoURL } = user;
         dispatch(login({ uid, email, displayName, photoURL }));
         dispatch(starLoadingNotes());
      });
   }, []);

   return status;
};
