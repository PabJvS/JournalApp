import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../components';

const drawerWidth = 250;
export const JournalLayout = ({ children }) => {
   return (
      <Box
         sx={{ display: 'flex' }}
         className='animate__animated animate__fadeIn animate__faster'
      >
         {/* Navbar drawerWidth */}
         <NavBar drawerWidth={drawerWidth} />

         {/* Sidebar drawerWidth */}
         <SideBar drawerWidth={drawerWidth} />
         <Box component='main' sx={{ flexGrow: 1, p: 9, px: 5 }}>
            {children}
            <Toolbar />
         </Box>
      </Box>
   );
};
