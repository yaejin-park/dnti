import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { pink } from "@mui/material/colors";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function PostRow({
  Id,
  title,
  createdTime,
  commentCount,
  hit,
  boardLike,
}) {
  const user = useSelector((state) => state.user);
  function increaseHit() {
    axios.patch(`/board/hit/${Id}`)
    .then((res) => {
      console.log(res.data);
      views++;
    })
  }

  return (
    <Link to="/board/postview"
      state={{boardId: Id}}
      onClick={() => {increaseHit()}}
    >
      <div className="flex flex-row w-full items-center p-1">
        <div className="flex flex-row w-full items-stretch justify-between">
          <div className="flex flex-row items-center w-1/3">
            <p>{title}</p>
          </div>
          <div className="flex flex-row justify-between items-center w-2/3">
            <div className="flex flex-row w-full justify-between">
              <p>{createdTime}</p>
              <div className="flex flex-row items-center">
                <ChatBubbleOutlineOutlinedIcon />
                <p>{commentCount}</p>
              </div>
              <div className="flex flex-row items-center">
                <VisibilityOutlinedIcon />
                <p>{hit}</p>
              </div>
              <div className="flex flex-row items-center">
                <FavoriteIcon sx={{ color: pink[500] }} />
                <p>{boardLike}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
