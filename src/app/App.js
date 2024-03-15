import React from 'react';
import { Route, useHistory, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/ui/NavBar';
import Main from './layouts/Main';
import Login from './layouts/Login';
import Users from './layouts/Users';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        {/* <Route path="/:userId?" render={(props) => <UserPage {...props} />} /> */}
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login/:type?" exact component={Login} />
        <Route path="/" exact component={Main} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </>
  );
};

export default App;

// <div>
//   <NavBar />
//   <h1>App</h1>
//   <Switch>
//     <Route path="/" exact component={Home} />
//     <Route path="/dashboard/stats" component={Stats} />
//     <Route path="/dashboard" component={Dashboard} />
//     <Route path="/login" component={Login} />
//     {/* <Route path="/posts/:postId?" render={(props) => <Posts {...props} />} /> */}
//     {/* Как передаются параметры в оcmponent={Posts}? Почему работает ? */}
//     <Route path="/posts/:postId?" component={Posts} />
//     <Route path="/404" component={NotFound} />
//     <Redirect to="/404" />
//   </Switch>
// </div>;
