import React, { useState, useContext } from "react";
import { GraphQLClient } from 'graphql-request'
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";

import Context from "../../context"
import { CREATE_PIN_MUTATION } from '.../../graphql/mutations'

const CreatePin = ({ classes }) => {
  const { state, dispatch } = useContext(Context)
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false)

  const handleDeleteDraft = () => {
    setTitle("")
    setImage("")
    setContent("")
    dispatch({ type: "DELETE_DRAFT" });
  };

  const handleImageUpload = async () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "geopins")
    data.append("cloud_name", "drtnf4gmb")
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/drtnf4gmb/image/upload", data
    )
    return res.data.url
  }

  const handleSubmit = async event => {
    try {

      event.preventDefault();
      setSubmitting(true)
      const idToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
      const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: { authorization: idToken }
      })
      const url = await handleImageUpload();
      const { latitude, longitude } = state.draft
      const variables = { title, image: url, content, latitude, longitude }
      const { CreatePin } = await client.request(CREATE_PIN_MUTATION, variables)
      console.log("Pin Created", { createPin })
      console.log({ title, image, url, content, latitude, longitude });
      handleDeleteDraft()
    } catch (err) {
      setSubmitting(false)
      console.error("Error creating pin", err)

    }
  };

  return (
    <form className={classes.form}>
      <Typography
        className={classes.alignCenter}
        component="h2"
        variant="h4"
        color="secondary"
      >
        <LandscapeIcon className={classes.iconLarge} /> Pin Location Mark
      </Typography>
      <div>
        <TextField 
          name='title' label='Title' placeholder='Insert pin title'
            onChange={e => setTitle(e.target.value)}
        />
      
        <input 
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={e => setImage(e.target.files[0])}
        />
        <label htmlFor="image">
          <Button
            style={{ color: image && "green" }}
            component="span"
            size="small"
            className={classes.button}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className={classes.contentField}>
        <TextField 
          name="content"
          label="Content"
          multiline
          rows="6"
          margin="normal"
          fullWidth
          variant="outlined"
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <div>
        <Button onClick={handleDeleteDraft} className={classes.button} variant="contained"
          color="primary"
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="secondary"
          disabled={!title.trim() || !content.trim() || !image || submitting}
          onClick={handleSubmit}
        >
          Submit
          <SaveIcon className={classes.RightIcon} />
        </Button>
      </div>
    </form>
  );
};

const styles = theme => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing.unit
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%"
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0
  }
});

export default withStyles(styles)(CreatePin);
