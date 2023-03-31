const Automation = ( {automation} ) => {
	return (
		<div className="mb-8">
					<h2 className="font-bold mb-3 text-lg hover:text-blue-500" dangerouslySetInnerHTML={{__html: automation?.title ?? '' }}/>
			<div dangerouslySetInnerHTML={{__html: automation?.content ?? '' }}/>
		</div>
	);
};

export default Automation;
