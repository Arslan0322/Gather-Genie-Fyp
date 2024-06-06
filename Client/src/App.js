import { useEffect } from "react";
import "./global.css";
import { RoutersProvider } from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { socket } from "./socket";
import { useDispatch, useSelector } from "react-redux"
import { setOnlineUsers } from "./store/onlineUsersSlice"

function App() {
  const user = useSelector(state => state?.user?.userInfo?.data)
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("new-user-add", user?._id);
    socket.on("get-users", (users) => {
      dispatch(setOnlineUsers(users));
    })
  }, [user])
  
  return (
    <>
      <RoutersProvider />
      <ToastContainer />
    </>
  );
}

export default App;