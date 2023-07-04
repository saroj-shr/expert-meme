import './App.css';
import Login from "./component/login"
import Signup from "./component/signup";
import Home from "./component/home";
import '@elastic/eui/dist/eui_theme_light.css';
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';
import ProtectedRoute from "./component/util/protectedRoute";

import { EuiProvider, EuiText } from '@elastic/eui';

function App() {
  return (
    <div className="App">
      <EuiProvider colorMode="light">
        <Router>
          <Routes>
            <Route path="/"  element={<Login/>}/>
            <Route path="/signup"  element={<Signup/>}/>
            <Route path="/home"  element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          </Routes>
        </Router>
    
      </EuiProvider>
     
    </div>
  );
}

export default App;
