import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./Post/Post.js";
import { useSelector } from "react-redux";
import "./styles.css";
// we can fetch the data from redux store using useSelectors

const Posts = ({ setCurrentId }) => {
  // we get access to store and how de know it is posts, since in index.js of reducers we have mentioned posts in combined reducers
  const posts = useSelector((state) => state.posts);

  console.log(posts);
  // if there is no posts then show circular progress loading bar otherwise we are going to show posts
  // {} to show javascript logic
  return (!posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      container
      alignItems="stretch"
      spacing={3}
      sx = {{
        display: "flex",
        alignItems: "center",
      }}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId = {setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
  );
};

export default Posts;
