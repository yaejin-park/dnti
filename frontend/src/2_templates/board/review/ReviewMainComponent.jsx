import * as React from "react";
import { Pagination, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReviewRow from "../../../1_molecules/ReviewRow";
import { useEffect } from "react";
import axios from "../../../utils/axios";

export default function ReviewMainComponent() {
  const [reviews, setReviews] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(0);
  useEffect(() => {
    axios
      .get(`review/list?page=${currentPage}&size=10`)
      .then(({ data }) => {
        console.log("리뷰 조회 성공!");
        setReviews(data.response);
        console.log(reviews);
      })
      .catch(() => {
        console.log("리뷰 조회에 실패했습니다.");
      });
  }, [currentPage]);
  return (
    <div className="flex flex-col h-full w-full items-center">
      <div className="flex flex-col h-4/5 w-full p-5">
        {reviews &&
          reviews.map((review) => {
            return (
              <ReviewRow
                key={review.id}
                id={review.id}
                title={review.title}
                writer={review.email}
                score={review.score}
                likes={review.reviewLike}
              />
            );
          })}
      </div>
      <div className="flex flex-row justify-center items-center pb-10">
        <TextField variant="outlined" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
      <Pagination count={10} variant="outlined" color="primary" />
    </div>
  );
}
