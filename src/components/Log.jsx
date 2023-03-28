const Log = ({ log }) => {
	console.log(log);
	return (
		<div className=" text-center my-5">
			<div className="log">
				<p>Battle Log...</p>
				{log.map((entry, index) => (
					<p className="message" key={index}>
						{entry}
					</p>
				))}
			</div>
		</div>
	);
};

export default Log;
