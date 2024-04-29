import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import "./styles.css"
import { useDispatch } from 'react-redux'; // to have access to reducers i.e redux store here
import { deletePost, getPosts, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {

  const dispatch = useDispatch();

  const handleDeletion = (_id) => {
    dispatch(deletePost(_id));
    //dispatch(getPosts()); added so that we can get changes reflected without refreshing the page
  }
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
      }}
    >
      <CardMedia
        sx={{
            height: 0,
            paddingTop: "56.25%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",
          }}
        image={post.selectedFile}
        title={post.title}
      />
      <div
        style={{ position: "absolute", top: "20px", left: "20px", color: "white" }}
      >
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div
        style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "white",
          }}
      >
        <Button style={{ color: "white" }} size="small" onClick={() =>  setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div
        style = {{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
        }}
      >
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        sx = {{
            padding: "0 16px",
        }}
        variant="h5"
        gutterBottom
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions sx = {{
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between'
      }}
      >
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => handleDeletion(post._id)}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
// &nbsp; is code for space character

export default Post;
