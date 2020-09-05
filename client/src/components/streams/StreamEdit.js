import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

function StreamEdit({ fetchStream, editStream, stream, match }) {
    useEffect(() => {
        fetchStream(match.params.id);
    }, [fetchStream, match]);

    if (!stream) {
        return <div>Loading...</div>;
    }

    const onSubmit = (formValues) => {
        editStream(match.params.id, formValues);
    };

    return (
        <div>
            <h3>{stream.title}</h3>
            <StreamForm
                onSubmit={onSubmit}
                initialValues={_.pick(stream, ["title", "description"])}
            />
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
    StreamEdit
);
