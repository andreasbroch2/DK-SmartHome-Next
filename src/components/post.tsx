import Link from 'next/link';
import Image from 'next/image';

const Post = ({ post }) => {
	return (
		<div className="mb-8 relative">
			<Link href={`/artikler/${post?.slug}/`}>
			<figure className="overflow-hidden relative h-64">
				<Image className='blog-box-image relative' src={post?.featuredImage.node.sourceUrl} alt={post?.featuredImage.node.altText} fill title={post?.title ?? ''} sizes='100vw' />
			</figure>
			<div className='textbox'>
				
					<h2 className="font-bold mb-3 text-lg hover:text-blue-500" dangerouslySetInnerHTML={{ __html: post?.title ?? '' }} />
				
				<div dangerouslySetInnerHTML={{ __html: post?.excerpt ?? '' }} />
			</div>
			</Link>

		</div>
	);
};

export default Post;
