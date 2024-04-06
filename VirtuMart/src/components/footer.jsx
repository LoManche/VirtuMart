import { Box, Button, Divider } from "@mui/material";

import virtumartLogo from "../assets/VirtuMartLogo.png";
import { useNavigate } from "react-router";
export default function Footer() {
  const navigate = useNavigate();
  return (
    <div style={{ position: "fixed", width: "100%", bottom: 0, backgroundColor: "#FFFFFF" }}>
      <Box display="flex" flexDirection="column" width="100%" height="100%">
        <Divider variant="middle" />
        <Box display="flex" justifyContent={"center"}>
          <Button
            onClick={() => navigate("/")}
            variant="text"
            color="inherit"
            sx={{ bottom: 0, "&:hover": { backgroundColor: "#FFFFFF" } }}>
            <img
              src={virtumartLogo}
              height={"50px"}
              width={"100%"}
              style={{ position: "static", zIndex: 3 }}
            />
          </Button>
        </Box>
      </Box>
    </div>
  );
}
