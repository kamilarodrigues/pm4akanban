import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";

class Cards extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.string).isRequired,
    index: PropTypes.number.isRequired,
    boardId: PropTypes.string.isRequired,
    listTitle: PropTypes.string.isRequired
  };

  componentDidUpdate = prevProps => {
    // Scroll to bottom of list if a new card has been added
    /*if (
      this.props.cards[this.props.cards.length - 2] ===
      prevProps.cards[prevProps.cards.length - 1]
    ) {
      this.scrollToBottom();
    }*/
  };

  scrollToBottom = () => {
    this.listEnd.scrollIntoView();
  };

  isNotDroppable = (boardId, index) => {
    if(boardId == "BUSINESS GOALS") {
      if(index == 0) {
        return true;
      } else {
        return false;
      }
    } else if(boardId == "DATA SOURCES") {
      if(index == 0) {
        return true;
      } else {
        return false;
      }
    } else if(boardId == "DOWN RIGHT") {
      if(index == 0 || index == 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  render() {
    const { listId, cards, index, boardId, listTitle } = this.props;
    return (
      <Droppable droppableId={listId} isDropDisabled={this.isNotDroppable(boardId, index)}>
        {(provided, { isDraggingOver }) => (
          <>
            <div className="cards" ref={provided.innerRef}>
              {cards.map((cardId, index) => (
                <Card
                  isDraggingOver={isDraggingOver}
                  key={cardId}
                  cardId={cardId}
                  index={index}
                  listId={listId}
                  listTitle={listTitle}
                />
              ))}
              {provided.placeholder}
              <div
                style={{ float: "left", clear: "both" }}
                ref={el => {
                  this.listEnd = el;
                }}
              />
            </div>
          </>
        )}
      </Droppable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  cards: state.listsById[ownProps.listId].cards
});

export default connect(mapStateToProps)(Cards);
