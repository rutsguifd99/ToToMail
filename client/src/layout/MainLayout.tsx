import { Grid } from "@mui/material";
import MessagesGrid from "../components/MessagesGrid";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <Grid container direction="row" spacing={3} p={3}>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        <MessagesGrid />
      </Grid>
      {/* <Grid item xs={3}>
        <Sidebar />
      </Grid> */}
    </Grid>
  );
};

export default MainLayout;
