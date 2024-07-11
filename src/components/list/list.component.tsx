import {FC, memo, useState} from "react";
import {MODELS} from "../../data/models";
import ListItem from "./list-item.component";
import {Col, Container, Row} from "react-bootstrap";
import {ModelDto} from "../../models/model.model";

const List: FC = memo(() => {
	const [models] = useState<ModelDto[]>(MODELS);
	return (
		<Container className="mt-4" fluid={true}>
			<Row className="mb-4">
				<Col>
					<h2>Models</h2>
				</Col>
				<Col className="d-flex justify-content-end">
				</Col>
			</Row>
			<Row>
				{models.map(item => (
					<Col lg={4} className="mb-4">
						<ListItem item={item}/>
					</Col>
				))}
			</Row>
		</Container>
	);
});

export default List;
