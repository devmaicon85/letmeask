import { Home } from "./pages/Home";
import { NewRoom } from "./pages/Home/newRoom";
import { Room } from "./pages/Room";
import { NotFound } from "./pages/NotFound";
// import { AdminRoom } from "./pages/AdminRoom";

import { Route, BrowserRouter, Switch } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="*" component={NotFound} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
