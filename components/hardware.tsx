const Hardware = ( {hardware} ) => {
	return (
		<div className="mb-8">
					<h2 className="font-bold mb-3 text-lg hover:text-blue-500" dangerouslySetInnerHTML={{__html: hardware?.title ?? '' }}/>
			<div dangerouslySetInnerHTML={{__html: hardware?.content ?? '' }}/>
		</div>
	);
};

export default Hardware;
