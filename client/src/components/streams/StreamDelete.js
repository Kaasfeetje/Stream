import React, { useEffect } from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";
function StreamDelete({ fetchStream, deleteStream, match, stream }) {
    const actions = (
        <React.Fragment>
            <button
                onClick={() => deleteStream(match.params.id)}
                className="ui button negative"
            >
                Delete
            </button>
            <Link to="/" className="ui button">
                Cancel
            </Link>
        </React.Fragment>
    );

    useEffect(() => {
        fetchStream(match.params.id);
    }, [match.params.id, fetchStream]);

    return (
        <Modal
            title="Delete Stream"
            content={`Are you sure you want to delete: ${
                stream ? stream.title : ""
            }`}
            actions={actions}
            onDismiss={() => history.push("/")}
        />
    );
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
    StreamDelete
);
