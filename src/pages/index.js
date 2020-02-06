import React from 'react';
import PostLink from '../components/PostLink';
import { graphql, useStaticQuery } from 'gatsby';

const IndexPage = () => {
	const data = useStaticQuery(query);
	console.log(data);
	const { allMarkdownRemark } = data;
	const { edges } = allMarkdownRemark;
	const Posts = edges
		.filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
		.map(edge => <PostLink key={edge.node.id} post={edge.node} />);

	return <div>{Posts}</div>;
};

export default IndexPage;

const query = graphql`
	query {
		allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
			edges {
				node {
					id
					excerpt(pruneLength: 250)
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						path
						title
					}
				}
			}
		}
	}
`;
