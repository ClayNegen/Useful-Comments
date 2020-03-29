import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function InputWithIcon() {
  const classes = useStyles();
  const [newItem, setNewItem] = React.useState("");

  const onCreate = () => {
    console.log("Added: ", newItem);
  };

  const keyPressed = event => {
    if (event.key === "Enter") {
      onCreate();
    }
  };

  return (
    <div className={classes.margin}>
      <FormControl>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <IconButton onClick={onCreate}></IconButton>
          </Grid>
          <Grid item>
            <TextField
              id="input-with-icon-grid"
              type="text"
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              onKeyPress={keyPressed}
              label="Add To-Do"
              color="primary"
            />
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );
}
