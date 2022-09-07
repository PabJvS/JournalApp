import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Google } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayaout } from '../layout/AuthLayaout';
import { useForm } from '../../hooks/';
import {
   checkingAuthentication,
   startGoogleSingIn,
   startLoginWithEmailPassword,
} from '../../store/auth/thunks';

const fromData = {
   email: '',
   password: '',
};
export const LoginPage = () => {
   //
   const { status, errorMessage } = useSelector((state) => state.auth);
   // console.log(errorMessage);
   const isAuthenticating = useMemo(() => status === 'checking', [status]);

   const dispatch = useDispatch();

   const { email, password, onInputChange } = useForm(fromData);

   const onSubmit = (event) => {
      event.preventDefault();
      console.log({ email, password });

      // ! ESTA NO ES LA  ACCION A DISPARAR
      // dispatch(checkingAuthentication());
      dispatch(startLoginWithEmailPassword({ email, password }));
   };

   const googleSingIN = () => {
      // console.log("OnGoogle SingIN");
      dispatch(startGoogleSingIn());
   };

   return (
      <AuthLayaout title='Login'>
         <form
            onSubmit={onSubmit}
            className='animate__animated animate__fadeIn animate__faster'
         >
            <Grid container>
               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label='Correo'
                     placeholder='example@google.com'
                     fullWidth
                     type='email'
                     name='email'
                     onChange={onInputChange}
                  />
               </Grid>

               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label='Contaseña'
                     placeholder='contraseña'
                     fullWidth
                     type='password'
                     name='password'
                     onChange={onInputChange}
                  />
               </Grid>

               <Grid container display={!!errorMessage ? '' : 'none'} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                     <Alert severity='error'>{errorMessage}</Alert>
                  </Grid>
               </Grid>

               <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                     <Button
                        disabled={isAuthenticating}
                        type='submit'
                        variant='contained'
                        fullWidth
                     >
                        Login
                     </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <Button
                        disabled={isAuthenticating}
                        variant='contained'
                        fullWidth
                        onClick={googleSingIN}
                     >
                        <Google />
                        <Typography sx={{ ml: 1 }}>Google</Typography>
                     </Button>
                  </Grid>
               </Grid>

               <Grid container direction='row' justifyContent='end'>
                  <Link component={RouterLink} color='inherit' to='/auth/register'>
                     Crear una cuenta
                  </Link>
               </Grid>
            </Grid>
         </form>
      </AuthLayaout>
   );
};
