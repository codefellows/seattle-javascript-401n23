import Auth from "./components/auth/auth.jsx";
import Login from "./components/auth/login.jsx";
import LoginContext from "./components/auth/context.jsx";

const App = () => {
  return (
    <LoginContext>
      <Login />

      <Auth>
        <div>Any valid user can see this</div>
      </Auth>

      <Auth capability="create">
        <div>Users with create access can see this</div>
      </Auth>

      <Auth capability="update">
        <div>Users with update access can see this</div>
      </Auth>

      <Auth capability="delete">
        <div>Users with delete access can see this</div>
      </Auth>
    </LoginContext>
  );
};

export default App;
