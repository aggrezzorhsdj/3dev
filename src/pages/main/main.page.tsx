import {FC, memo} from "react";
import {Container, Navbar} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import "./main.page.scss";

const Main: FC = memo(function() {
	return (
		<div className="main">
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container fluid={true}>
					<Link to="/">
						<Navbar.Brand>EV3D</Navbar.Brand>
					</Link>
				</Container>
			</Navbar>
			<main className="main__wrapper">
				<Outlet/>
			</main>
		</div>
	);
});

export default Main;
