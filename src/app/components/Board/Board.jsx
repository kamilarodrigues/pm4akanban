import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import classnames from "classnames";
import List from "../List/List";
import "./Board.scss";

class Board extends Component {
  static propTypes = {
    lists: PropTypes.arrayOf(
      PropTypes.shape({ _id: PropTypes.string.isRequired })
    ).isRequired,
    boardId: PropTypes.string.isRequired,
    boardTitle: PropTypes.string.isRequired,
    boardColor: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      startX: null,
      startScrollX: null
    };
  }

  // boardId is stored in the redux store so that it is available inside middleware
  componentDidMount = () => {
    const { boardId, dispatch } = this.props;
    dispatch({
      type: "PUT_BOARD_ID_IN_REDUX",
      payload: { boardId }
    });
  };

  handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const { dispatch, boardId } = this.props;

    // Move list
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
          type: "MOVE_LIST",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index,
            boardId: source.droppableId
          }
        });
      }
      return;
    }
    // Move card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
          boardId
        }
      });
    }
  };

  // The following three methods implement dragging of the board by holding down the mouse
  handleMouseDown = ({ target, clientX }) => {
    if (target.className !== "list-wrapper" && target.className !== "lists") {
      return;
    }
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.setState({
      startX: clientX,
      startScrollX: window.scrollX
    });
  };

  // Go to new scroll position every time the mouse moves while dragging is activated
  handleMouseMove = ({ clientX }) => {
    const { startX, startScrollX } = this.state;
    const scrollX = startScrollX - clientX + startX;
    window.scrollTo(scrollX, 0);
    const windowScrollX = window.scrollX;
    if (scrollX !== windowScrollX) {
      this.setState({
        startX: clientX + windowScrollX - startScrollX
      });
    }
  };

  // Remove drag event listeners
  handleMouseUp = () => {
    if (this.state.startX) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      window.removeEventListener("mouseup", this.handleMouseUp);
      this.setState({ startX: null, startScrollX: null });
    }
  };

  handleWheel = ({ target, deltaY }) => {
    // Scroll page right or left as long as the mouse is not hovering a card-list (which could have vertical scroll)
    if (
      target.className !== "list-wrapper" &&
      target.className !== "lists" &&
      target.className !== "open-composer-button" &&
      target.className !== "list-title-button"
    ) {
      return;
    }
    // Move the board 80 pixes on every wheel event
    if (Math.sign(deltaY) === 1) {
      window.scrollTo(window.scrollX + 80, 0);
    } else if (Math.sign(deltaY) === -1) {
      window.scrollTo(window.scrollX - 80, 0);
    }
  };

  render = () => {
    const { lists, boardTitle, boardId, boardColor } = this.props;
    var businessGoalsList = [lists[0], lists[1], lists[2], lists[3]];
    var investigationsAndQuestionsList = [lists[4]];
    var discoveriesList = [lists[5]];
    var solutionsList = [lists[6]];
    var dataSourcesList = [lists[7], lists[8], lists[9], lists[10], lists[11]];
    var downRightList = [lists[12], lists[13], lists[14], lists[15]];
    return (
      <>
      <div>
        <div className={classnames("board", boardColor)}>
          <Helmet>
            <title>{boardTitle} | React Kanban</title>
          </Helmet>
          <div className="lists-wrapper"
            onMouseDown={this.handleMouseDown}
            onWheel={this.handleWheel}
          >
            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable
                droppableId="BUSINESS GOALS"
                type="COLUMN"
                direction="horizontal">
                {provided => (
                  <div className="lists" ref={provided.innerRef}>
                    {businessGoalsList.map((list, index) => (
                      <List
                         list={list}
                        boardId="BUSINESS GOALS"
                         index={index}
                        key={list._id}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="board-underlay" />
        </div>

        <div className={classnames("board", boardColor)}>
          <Helmet>
            <title>{boardTitle} | React Kanban</title>
          </Helmet>
          <div className="lists-wrapper"
            onMouseDown={this.handleMouseDown}
            onWheel={this.handleWheel}
          >
            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable
                droppableId="INVESTIGATIONS AND QUESTIONS"
                type="COLUMN"
                direction="horizontal">
                {provided => (
                  <div className="lists" ref={provided.innerRef}>
                    {investigationsAndQuestionsList.map((list, index) => (
                      <List
                         list={list}
                        boardId="INVESTIGATIONS AND QUESTIONS"
                         index={index}
                        key={list._id}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="board-underlay" />
        </div>

        <div className={classnames("board", boardColor)}>
          <Helmet>
            <title>{boardTitle} | React Kanban</title>
          </Helmet>
          <div className="lists-wrapper"
            onMouseDown={this.handleMouseDown}
            onWheel={this.handleWheel}
          >
            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable
                droppableId="DISCOVERIES"
                type="COLUMN"
                direction="horizontal">
                {provided => (
                  <div className="lists" ref={provided.innerRef}>
                    {discoveriesList.map((list, index) => (
                      <List
                         list={list}
                        boardId="DISCOVERIES"
                         index={index}
                        key={list._id}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="board-underlay" />
        </div>

        <div className={classnames("board", boardColor)}>
          <Helmet>
            <title>{boardTitle} | React Kanban</title>
          </Helmet>
          <div className="lists-wrapper"
            onMouseDown={this.handleMouseDown}
            onWheel={this.handleWheel}
          >
            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable
                droppableId="SOLUTIONS"
                type="COLUMN"
                direction="horizontal">
                {provided => (
                  <div className="lists" ref={provided.innerRef}>
                    {solutionsList.map((list, index) => (
                      <List
                         list={list}
                        boardId="SOLUTIONS"
                         index={index}
                        key={list._id}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="board-underlay" />
        </div>
        </div>

        <div>
        <div className={classnames("board", boardColor)}>
          <Helmet>
            <title>{boardTitle} | React Kanban</title>
          </Helmet>
          <div className="lists-wrapper"
            onMouseDown={this.handleMouseDown}
            onWheel={this.handleWheel}
          >
            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable
                droppableId="DATA SOURCES"
                type="COLUMN"
                direction="horizontal">
                {provided => (
                  <div className="lists" ref={provided.innerRef}>
                    {dataSourcesList.map((list, index) => (
                      <List
                         list={list}
                        boardId="DATA SOURCES"
                         index={index}
                        key={list._id}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="board-underlay" />
        </div>

        <div className={classnames("board", boardColor)}>
          <Helmet>
            <title>{boardTitle} | React Kanban</title>
          </Helmet>
          <div className="lists-wrapper"
            onMouseDown={this.handleMouseDown}
            onWheel={this.handleWheel}
          >
            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable
                droppableId="DOWN RIGHT"
                type="COLUMN"
                direction="horizontal">
                {provided => (
                  <div className="lists" ref={provided.innerRef}>
                    {downRightList.map((list, index) => (
                      <List
                        list={list}
                        boardId={"DOWN RIGHT"}
                        index={index}
                        key={list._id}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="board-underlay" />
        </div>
        </div>
        <div className="space" />
      </>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { board } = ownProps;
  return {
    lists: board.lists.map(listId => state.listsById[listId]),
    boardTitle: board.title,
    boardColor: board.color,
    boardId: board._id
  };
};

export default connect(mapStateToProps)(Board);
