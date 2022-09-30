import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, Rating, TextField } from "@mui/material";
import axios from "../../../utils/axios";
import { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { pink } from "@mui/material/colors";
import { useSelector } from "react-redux";

export default function ReviewViewComponent() {
  const [reviewContents, setReviewContents] = React.useState("");
  const [isLike, setIsLike] = React.useState(false);
  const [totalScore, setTotalScore] = React.useState(0);
  const [rentScore, setRentScore] = React.useState(0);
  const [infraScore, setInfraScore] = React.useState(0);
  const [envScore, setEnvScore] = React.useState(0);
  const [safeScore, setSafeScore] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getDetail(location.state.reviewId);
    getReviewLike(location.state.reviewId);
  }, []);

  function getDetail(reviewId) {
    console.log("reviewId =====================");
    console.log(reviewId);
    axios.get(`/review/detail/${reviewId}`).then((res) => {
      console.log(res.data);
      setReviewContents(res.data.response);
      setTotalScore(res.data.response.score);
      setRentScore(res.data.response.rental);
      setInfraScore(res.data.response.infra);
      setEnvScore(res.data.response.environment);
      setSafeScore(res.data.response.safety);
    });
  }

  function getReviewLike(reviewId) {
    axios
      .get(`review/reviewlike?reviewId=${reviewId}&email=${user.userId}`)
      .then(({ data }) => {
        setIsLike(data.response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function deleteReview() {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      axios.delete(`/review/delete/${location.state.reviewId}`).then(() => {
        console.log("리뷰 삭제 완료!");
        navigate("/board/review", true);
      });
    }
  }

  function clickLike() {
    if (!isLike) {
      axios
        .get(`/review/reviewlike/save?id=${location.state.reviewId}`)
        .then(() => {
          console.log("좋아요 등록 성공");
        })
        .catch(() => {
          console.log("좋아요 등록 실패");
        });
    } else {
      axios
        .get(`/review/reviewlike/delete?id=${location.state.reviewId}`)
        .then(() => {
          console.log("좋아요 취소 성공");
        })
        .catch(() => {
          console.log("좋아요 취소 실패");
        });
    }
    setIsLike(!isLike);
    getDetail(location.state.reviewId);
  }

  let reviewControlPanel;
  if (user.userId === reviewContents.email) {
    reviewControlPanel = (
      <div className="flex flex-row w-full justify-center mt-10">
        <Link
          to="/board/review/write"
          state={{ reviewId: location.state.reviewId }}
        >
          <Button>수정</Button>
        </Link>
        <Link to="/board/review">
          <Button>목록</Button>
        </Link>
        <Button onClick={deleteReview}>삭제</Button>
      </div>
    );
  } else {
    reviewControlPanel = (
      <div className="flex flex-row w-full justify-center mt-10">
        <Link
          to="/board/review/write"
          state={{ reviewId: location.state.reviewId }}
        >
          <Button>수정</Button>
        </Link>
        <Link to="/board/review">
          <Button>목록</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <p className="">리뷰 보기</p>
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row w-1/2">
            <p className="w-1/4">{reviewContents.dong}</p>
            <p className="">{reviewContents.title}</p>
          </div>
          <div className="flex flex-row w-1/2 justify-between">
            <p className="">{reviewContents.email}</p>
            <div className="flex flex-row">
              <div className="px-1">
                <FavoriteIcon sx={{ color: pink[500] }} />
              </div>
              <p className="">{reviewContents.reviewLike}</p>
            </div>
          </div>
        </div>
        <div className="flex h-80 p-5">
          <p>{reviewContents.content}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row">
            <p>총점</p>
            <Rating name="total" value={totalScore} precision={0.25} readOnly />
          </div>
          <div className="flex flex-row">
            <p>임대료</p>
            <Rating name="total" value={rentScore} readOnly />
          </div>
          <div className="flex flex-row">
            <p>인프라</p>
            <Rating name="total" value={infraScore} readOnly />
          </div>
          <div className="flex flex-row">
            <p>환경</p>
            <Rating name="total" value={envScore} readOnly />
          </div>
          <div className="flex flex-row">
            <p>안전</p>
            <Rating name="total" value={safeScore} readOnly />
          </div>
        </div>
        <div className="flex w-full justify-center mt-10">
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => {
              clickLike();
            }}
          >
            {isLike ? (
              <FavoriteIcon sx={{ color: pink[500] }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: pink[500] }} />
            )}
          </IconButton>
        </div>
        {reviewControlPanel}
      </div>
    </div>
  );
}
