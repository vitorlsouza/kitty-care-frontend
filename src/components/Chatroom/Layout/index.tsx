import TopCorner from "/assets/svg/TopCorner.svg";
import BottomCorner from "/assets/svg/BottomCorner.svg";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import { fetchCatsAsync } from "../../../Redux/features/catsSlice";
import { createConversationAsync, fetchConversationsAsync } from "../../../Redux/features/chatSlice";

const ChatroomLayout = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const element = document.querySelector('[data-id="mainLY"]');
    if (element) element.remove();

    dispatch(fetchConversationsAsync())
      .unwrap()
      .then((result) => {
        if (!result) {
          dispatch(createConversationAsync());
        }
      })
      .catch((error) => {
        console.error('Error fetching conversations:', error);
        dispatch(createConversationAsync());
      });

    dispatch(fetchCatsAsync());
  }, [dispatch]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-between fixed bg-[#FAF6F3] -z-50 top-0 right-0">
        <div className="flex justify-end top-0">
          <div className="w-1/4 h-1/4 sm:w-auto">
            <img src={TopCorner} alt="TopCorner" />
          </div>
        </div>
        <div className="flex justify-end items-end">
          <div className="w-1/3 sm:w-auto">
            <img src={BottomCorner} alt="BottomCorner" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatroomLayout;
