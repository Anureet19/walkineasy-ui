import { Container, Link, styled, Typography } from "@mui/material";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../../forms/LoginForm";
import useToast from "../../../hooks/useToast";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const StyledContent = styled("div")(({ theme }) => ({
	maxWidth: 480,
	margin: "auto",
	minHeight: "100vh",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	padding: theme.spacing(12, 0),
}));

const ClinicLogin = () => {
	const { showToast, Toast } = useToast("right");
	const navigate = useNavigate();
	const onLogin = async (email: string, password: string) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				alert("User verified!");
				showToast("User verified!");
				navigate("/clinic/dashboard");
			})
			.catch((error) => {
				showToast(error.message, "error");
			});
	};
	return (
		<Container maxWidth="sm">
			<StyledContent>
				<Typography variant="h4" gutterBottom>
					Sign in as a Clinic
				</Typography>

				<Typography variant="body2" sx={{ mb: 5 }}>
					Not a clinic?{" "}
					<Link href="/client" variant="subtitle2">
						Sign in as a client
					</Link>
				</Typography>

				<LoginForm
					registerPath="register"
					forgotPath="forgot"
					onLogin={onLogin}
				/>
			</StyledContent>
			{Toast}
		</Container>
	);
};

export default ClinicLogin;
