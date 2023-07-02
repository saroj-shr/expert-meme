import './App.css';
import Login from "./component/login"
import Signup from "./component/signup";
import Admin from "./component/Admin/admin"
import User from "./component/User/user";
import '@elastic/eui/dist/eui_theme_light.css';
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';

import { EuiProvider, EuiText } from '@elastic/eui';

function App() {
  return (
    <div className="App">
      <EuiProvider colorMode="light">
        <Router>
          <Routes>
            <Route path="/"  element={<Login/>}/>
            <Route path="/signup"  element={<Signup/>}/>
            <Route path="/admin"  element={<Admin/>}/>
            <Route path="/user"  element={<User/>}/>
          </Routes>
        </Router>
    
      </EuiProvider>
     
    </div>
  );
}

export default App;
