import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getIssueComments } from '../../actions';
import { getIssueComments as getIssueCommentsSelector } from '../../selectors/Issues';
import IssueCommentsList from '../../components/issue/IssueCommentsList';

function mapStateToProps(state, props) {
	return {
		comments: getIssueCommentsSelector(state, props)
	};
}

class IssueCommentsListContainer extends Component {
	componentDidMount() {
		const { match, getIssueComments } = this.props;
		getIssueComments(match.params.org, match.params.repo, match.params.issueId);
	}

	componentDidUpdate(prevProps) {
		const { match, getIssueComments } = this.props;
		if (prevProps.match.params.issueId !== match.params.issueId) {
			getIssueComments(match.params.org, match.params.repo, match.params.issueId);
		}
	}

	render() {
		const { comments } = this.props;
		return (
			<IssueCommentsList comments={comments.toJS()} />
		);
	}
}

export default connect(
	mapStateToProps,
	{ getIssueComments }
)(IssueCommentsListContainer);