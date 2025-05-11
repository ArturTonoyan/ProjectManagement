import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/app.scss";
import Authorization from "./pages/entrance/Authorization/Authorization";
import Registration from "./pages/entrance/Registration/Registration";
import Admin from "./pages/Admin/Admin";
import Offices from "./pages/Admin/Offices/Offices";
import Floors from "./pages/Admin/Floors/Floors";
import Users from "./pages/Admin/Users/Users";
import Equipments from "./pages/Admin/Equipments/Equipments";
import { apiGetUser } from "./api/apirequests";
import { useEffect } from "react";
import { setUserData } from "./store/userSlice/user.Slice";
import Profile from "./pages/Profile/Profile";

function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const userRole = useSelector(
    (state) => state.user.user.data?.roles?.[0]?.value
  );

  const funUpdUser = () => {
    apiGetUser().then((res) => {
      dispatch(setUserData({ data: res.data }));
    });
  };

  useEffect(() => {
    funUpdUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <main>
          <Routes>
            <Route
              path="/"
              element={<Authorization funUpdUser={funUpdUser} />}
            ></Route>
            <Route
              path="/registration"
              element={<Registration funUpdUser={funUpdUser} />}
            ></Route>
            <Route
              path="/profile"
              element={<Profile funUpdUser={funUpdUser} />}
            ></Route>
            {userRole === "ADMIN" && (
              <>
                <Route path="/home" element={<Admin />}>
                  <Route path="" element={<Offices />}></Route>
                  <Route path="floors" element={<Floors />}></Route>
                  <Route path="users" element={<Users />}></Route>
                  <Route path="tasks" element={<Equipments />}></Route>
                </Route>
              </>
            )}
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
