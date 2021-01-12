import React, { useEffect } from "react";
import Box from '@material-ui/core/Box';
import SignIn from './components/signIn';

const App = () => {
  useEffect( () => {
    window.history.replaceState(window.history.state, 'Login', '/login');
    document.title = `Login-App`;
  }, []);
  return (
    <Box>
      <SignIn />
    </Box>
  );
}
export default App;