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

    listPosition = (boardId, index) => {
        if(boardId == "BUSINESS GOALS") {
            return('list-wrapper position-businessgoals-'+index);
        } else if(boardId == "INVESTIGATIONS AND QUESTIONS") {
            return('list-wrapper position-investigationsandquestions');
        } else if(boardId == "DISCOVERIES") {
            return('list-wrapper position-discoveries');
        } else if(boardId == "SOLUTIONS") {
            return('list-wrapper position-solutions');
        } else if(boardId == "DATA SOURCES") {
            return('list-wrapper position-datasources-'+index);
        } else if(boardId == "DOWN RIGHT") {
            return ('list-wrapper position-bottom-right-' + index);
        }
    };

    listHeight = (boardId, index) => {
        if(boardId == "BUSINESS GOALS") {
            return('list height-businessgoals-'+index);
        } else if(boardId == "INVESTIGATIONS AND QUESTIONS") {
            return('list height-investigationsandquestions');
        } else if(boardId == "DISCOVERIES") {
            return('list height-discoveries');
        } else if(boardId == "SOLUTIONS") {
            return('list height-solutions');
        } else if(boardId == "DATA SOURCES") {
            return('list height-datasources-'+index);
        } else if(boardId=="DOWN RIGHT") {
            return('list height-bottom-right-'+index);
        }
    };

    listScrollHeight = (boardId, index) => {
        if(boardId == "BUSINESS GOALS") {
            return('cards-wrapper list-card-businessgoals-'+index);
        } else if(boardId == "INVESTIGATIONS AND QUESTIONS") {
            return('cards-wrapper list-card-investigationsandquestions');
        } else if(boardId == "DISCOVERIES") {
            return('cards-wrapper list-card-discoveries');
        } else if(boardId == "SOLUTIONS") {
            return('cards-wrapper list-card-solutions');
        } else if(boardId == "DATA SOURCES") {
            return('cards-wrapper list-card-datasources-'+index);
        } else if(boardId == "DOWN RIGHT") {
            if(index == 2 || index == 3) {
                return ('cards-wrapper list-card-down-right');
            } else {
                return ('cards-wrapper');
            }
        }
    };

    shouldAddCard = (boardId, index) => {
        if(boardId == "BUSINESS GOALS") {
            if(index == 0) {
                return false;
            } else {
                return true;
            }
        } else if(boardId == "DATA SOURCES") {
            if(index == 0) {
                return false;
            } else {
                return true;
            }
        } else if(boardId == "DOWN RIGHT") {
            if(index == 0 || index == 1) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    render = () => {
        const {list, boardId, index} = this.props;
        return (
            <Draggable
                draggableId={list._id}
                index={index}
                disableInteractiveElementBlocking>
                {(provided) => (
                    <>
                    <div
                        ref={provided.innerRef}
                        className={this.listPosition(boardId, index)}
                    >
                        <div
                            className={this.listHeight(boardId, index)}
                        >
                            <ListHeader
                                dragHandleProps={provided.dragHandleProps}
                                listTitle={list.title}
                                listId={list._id}
                                cards={list.cards}
                                boardId={boardId}
                            />
                            <div className={this.listScrollHeight(boardId, index)}>
                                <Cards listId={list._id} index={index} boardId={boardId} listTitle={list.title}/>
                            </div>
                        </div>
                        {this.shouldAddCard(boardId,index)?<CardAdder listId={list._id}/>:''}
                    </div>
                    {boardId=="BUSINESS GOALS" && index==0?<div className={'dashed-line-businessgoals'}></div>:''}
                    {boardId=="BUSINESS GOALS" && index==0?<div className={'dashed-line-vertical-businessgoals'}></div>:''}
                    {boardId=="BUSINESS GOALS" && index==0?<div className={'success-indicator'}>Indicador de sucesso</div>:''}
                    {boardId=="BUSINESS GOALS" && index==0?<div className={'goal'}>Meta</div>:''}
                    {boardId=="DATA SOURCES" && index==0?<div className={'available'}>Disponíveis</div>:''}
                    {boardId=="DATA SOURCES" && index==0?<div className={'missing'}>Faltantes</div>:''}
                    {boardId=="DATA SOURCES" && index==0?<div className={'dashed-line'} />:''}
                    {boardId=="DATA SOURCES" && index==0?<div className={'dashed-line-vertical'} />:''}
                    {boardId=="DOWN RIGHT" && index==0?<div className={'influence-power'}>Poder de influência</div>:''}
                    {boardId=="DOWN RIGHT" && index==0?<div className={'impact'}>Impacto</div>:''}
                    {boardId=="DOWN RIGHT" && index==0?<div className={'line'}></div>:''}
                    {boardId=="DOWN RIGHT" && index==0?<div className={'line-vertical'}></div>:''}
                    {boardId=="DOWN RIGHT" && index==0?<div className={'arrow'}></div>:''}
                    {boardId=="DOWN RIGHT" && index==0?<div className={'arrow-vertical'}></div>:''}
                    {provided.placeholder}
                    </>
                )}
            </Draggable>
        );
    };
}

export default connect()(List);
