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
                            <div className={boardId=="DOWN RIGHT"?(index==2||index==3?'cards-wrapper list-card-down-right':'cards-wrapper'):(boardId=="DOWN LEFT"?(index!=0?'cards-wrapper list-card-'+(index==1||index==2?'down-left-available':'down-left-missing'):'cards-wrapper'):'cards-wrapper')}>
                                <Cards listId={list._id} index={index} boardId={boardId} listTitle={list.title}/>
                            </div>
                        </div>
                        {boardId=="DOWN LEFT"?(index!=0? <CardAdder listId={list._id}/> : ''):(boardId=="DOWN RIGHT"?(index!=0 && index!=1?<CardAdder listId={list._id}/>:''):<CardAdder listId={list._id}/>)}
                    </div>
                    {boardId=="DOWN LEFT" && index==0?<div className={'available'}>Disponíveis</div>:''}
                    {boardId=="DOWN LEFT" && index==0?<div className={'missing'}>Faltantes</div>:''}
                    {boardId=="DOWN LEFT" && index==0?<div className={'dashed-line'} />:''}
                    {boardId=="DOWN LEFT" && index==0?<div className={'dashed-line-vertical'} />:''}
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
