import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  createTheme,
} from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  ); // fetching from redux store

  const dispatch = useDispatch(); // This allows us to dispatch actions

  useEffect(() => {
    if (post) setPostData(post); // if post changes just change it
  }, [post]); // change form when post value changes from null to something

  const handleSubmit = (e) => {
    e.preventDefault(); // to avoid refresh in the browser

    if (currentId) {
      // if we have a currentId we are not going to dispatch createPost rather
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const theme = createTheme({
    spacing: [0, 1, 2],
  });

  return (
    //paper is like a <div> with withish background
    <Paper
      sx={(theme) => ({
        padding: theme.spacing(2),
      })}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        sx={[
          {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          },

          (theme) => ({
            "& .MuiTextField-root": {
              margin: theme.spacing(1),
            },
          }),
        ]}
      >
        <Typography variant="h6" align="center">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>

        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          margin="normal"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          margin="normal"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          margin="normal"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          margin="normal"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} //split it into array based on ','
        />
        <div style={{ width: "97%", margin: "10px 0" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          sx={{ marginBottom: 1 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          margin="normal"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          margin="normal"
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
