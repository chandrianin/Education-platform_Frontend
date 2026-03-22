import {Box} from "@mui/material";
import {Welcome} from "../features/main/components/Welcome";
import {WeeklyGoal} from "../features/main/components/WeeklyGoal";
import {Progress} from "../features/main/components/Progress";
import useAuth from "../features/auth/hooks/useAuth.js";

export default function MainPage() {
    // const {user} = useAuth();

    {/*user?.full_name || user?.username ||*/
    }
    return (
        <Box sx={{maxWidth: "840px", mx: "auto"}}>
            <Welcome userName={"Пользователь"}/>
            <WeeklyGoal/>
            <Progress/>
        </Box>
    );
}
;