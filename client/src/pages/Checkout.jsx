import { Link  } from 'react-router-dom';
import StripeContainer from '../components/StripeContainer';
import { useState } from 'react';

function Checkout() {
	const [showItem, setShowItem] = useState(false);
	return (
		<div className="mx-auto p-6 ">
			<>
			<Link to="/">← return the slab or suffer my curse</Link>
					<h1>[Project Name Here]</h1>
					{showItem ? (
						<StripeContainer />
					) : (
						<>
						<h3>$10.00</h3>
							<button onClick={() => setShowItem(true)}>Confirm Your Purchase</button>
						</>
						)}
				</>
			</div>
		);
}
export default Checkout;
