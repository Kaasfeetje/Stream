import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import flv from "flv.js";

function StreamShow({ fetchStream, match, stream }) {
    const videoRef = useRef(null);
    let player = null;
    useEffect(() => {
        fetchStream(match.params.id);
        buildPlayer();
    }, [fetchStream, match.params.id]);

    useEffect(() => {
        buildPlayer();
    });

    const buildPlayer = () => {
        if (player || !stream) {
            return;
        }
        player = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${match.params.id}.flv`,
        });
        player.attachMediaElement(videoRef.current);
        player.load();
    };

    if (!stream) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <video controls style={{ width: "100%" }} ref={videoRef} />
            <h1>{stream.title}</h1>
            <h5>{stream.description}</h5>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
