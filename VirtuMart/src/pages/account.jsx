import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function Account() {
  const navigate = useNavigate();
  return (
    <Box mx={3}>
      <Box display="flex" flexDirection={"column"}>
        <Typography>Sign In</Typography>
      </Box>
    </Box>
  );
}
