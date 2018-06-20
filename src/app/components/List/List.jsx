import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Draggable} from "react-beautiful-dnd";
import ListHeader from "./ListHeader";
import Cards from "./Cards";
import CardAdder from "../CardAdder/CardAdder";
import "./List.scss";

class List extends Component {
    static propTypes = {
        boardId: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        list: PropTypes.shape({_id: PropTypes.string.isRequired}).isRequired
    };

    render = () => {
        const {list, boardId, index} = this.props;
        console.log(index);
        return (
            <Draggable
                draggableId={list._id}
                index={index}
                disableInteractiveElementBlocking>
                {(provided) => (
                    <>
                    <div
                        ref={provided.innerRef}
                        className={'list-wrapper position-'+(boardId=="DOWN LEFT"?'bottom-left-':(boardId=="DOWN RIGHT"?'bottom-right-':''))+index}
                    >
                        <div
                            className={"list height-"+(boardId=="DOWN LEFT"?'bottom-left-':(boardId=="DOWN RIGHT"?'bottom-right-':''))+index}
                        >
                            <ListHeader
                                dragHandleProps={provided.dragHandleProps}
                                listTitle={list.title}
                                listId={list._id}
                                cards={list.cards}
                                boardId={boardId}
                            />
                            <div className={index==5 || index==6 ? 'cards-wrapper list-card' : 'card-wrapper'}>
                                <Cards listId={list._id} index={index} boardId={boardId} listTitle={list.title}/>
                            </div>
                        </div>
                        {boardId=="DOWN LEFT"?(index!=0? <CardAdder listId={list._id}/> : ''):(boardId=="DOWN RIGHT"?(index!=0 && index!=1?<CardAdder listId={list._id}/>:''):<CardAdder listId={list._id}/>)}
                    </div>
                    {provided.placeholder}
                    </>
                )}
            </Draggable>
        );
    };
}

export default connect()(List);
