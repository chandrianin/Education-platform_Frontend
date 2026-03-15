import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import {Navigation} from "../widgets/navigation/ui/Navigation";

export const Layout = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "surface"
            }}
        >
            <Navigation/>

            <Box sx={{p: 3}}>
                <Outlet/>
            </Box>
        </Box>
    );
};