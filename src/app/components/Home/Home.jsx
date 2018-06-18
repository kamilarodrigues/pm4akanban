import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import slugify from "slugify";
import classnames from "classnames";
import "./Home.scss";

class Home extends Component {
    static propTypes = {
        boards: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                color: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired
            }).isRequired
        ).isRequired
    };


    render = () => {
        const {boards} = this.props;
        return (
            <>
            <div className="home">
                <div className="main-content">
                    <div className="boards">
                        {boards.map(board => (
                            <Link
                                key={board._id}
                                className={classnames("board-link", board.color)}
                                to={`/b/${board._id}/${slugify(board.title, {
                                    lower: true
                                })}`}/>
                        ))}
                    </div>
                </div>
            </div>
            </>
        );
    };
}

const mapStateToProps = state => ({
    boards: Object.values(state.boardsById)
});

export default connect(mapStateToProps)(Home);
