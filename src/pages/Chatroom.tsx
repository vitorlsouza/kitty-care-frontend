import { useEffect, useRef } from "react";
import ChatroomLayout from "../components/Chatroom/Layout";
import SideBar from "../components/Chatroom/SideBar";
import ChatField from "../components/Chatroom/ChatField";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/hooks";
import { createConversationAsync, fetchConversationsAsync } from "../Redux/features/chatSlice";
import { fetchCatsAsync } from "../Redux/features/catsSlice";
import { setLoading } from "../store/ui/actions";

const Chatroom = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const element = document.querySelector('[data-id="mainLY"]');
    if (element) element.remove();

    dispatch(setLoading(true));

    Promise.all([
      dispatch(fetchConversationsAsync())
        .unwrap()
        .then((result) => {
          if (!result) {
            return dispatch(createConversationAsync()).unwrap();
          }
        }),
      dispatch(fetchCatsAsync()).unwrap()
    ])
      .catch((error) => {
        console.error('Error initializing chatroom:', error);
        dispatch(createConversationAsync());
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const subscriptionId = localStorage.getItem("subscriptionId");
    if (!subscriptionId || subscriptionId === "undefined") {
      navigate("/priceselection?" + urlParams.toString());
    } else {
      const catId = localStorage.getItem("catId");
      if (!catId || catId === "undefined") {
        navigate("/progress");
      }
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <ChatroomLayout />
      <SideBar />
      <ChatField />
    </div>
  );
};

export default Chatroom;
