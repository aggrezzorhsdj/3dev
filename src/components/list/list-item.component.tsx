import {FC, memo} from "react";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ModelDto} from "../../models/model.model";

const ListItem: FC<{ item: ModelDto }> = memo(({item}) => {
	return (
		<Card>
			<Card.Body>
				<Card.Title>{item.name}</Card.Title>
				{!!item.description && <Card.Text>{item.description}</Card.Text>}
			</Card.Body>
			<Card.Footer className="d-flex gap-2">
				<Link to={`/edit/${item.name}`}>
					<Button>Edit</Button>
				</Link>
				<Link to={`/view/${item.name}`}>
					<Button>View</Button>
				</Link>
			</Card.Footer>
		</Card>
	);
})

export default ListItem;
