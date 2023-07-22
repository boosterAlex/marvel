import { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import useMarvelServices from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMesage/ErrorMessage';

import './charList.scss';

const CharList = ({ onCharSelected }) => {
    const [charList, setCharList] = useState([]);
    const [newCharLoading, setNewCharLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    useEffect(() => onCharLoaded(offset, true), []);

    const { loading, error, getAllCharacters } = useMarvelServices();

    const onCharLoaded = (offset, initial) => {
        initial ? setNewCharLoading(false) : setNewCharLoading(false);
        getAllCharacters(offset).then(onCharAdd);
    };

    const onCharAdd = (newChar) => {
        let ended = false;
        if (newChar.length < 9) {
            ended = true;
        }
        setCharList(() => [...charList, ...newChar]);
        setNewCharLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded((charEnded) => ended);
    };

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach((ref) => {
            ref.classList.remove('char__item_selected');
        });
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    };

    const character = (arr) => {
        const items = arr.map((item, i) => {
            const styleNotFound =
                item.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                    ? { objectFit: 'contain' }
                    : null;
            return (
                <CSSTransition
                    timeout={500}
                    key={item.id}
                    classNames={'char__item'}
                >
                    <li
                        className='char__item'
                        key={item.id}
                        tabIndex={0}
                        ref={(el) => (itemRefs.current[i] = el)}
                        onClick={() => {
                            onCharSelected(item.id);
                            focusOnItem(i);
                        }}
                    >
                        <img
                            src={item.thumbnail}
                            alt={item.name}
                            style={styleNotFound}
                        />
                        <div className='char__name'>{item.name}</div>
                    </li>
                </CSSTransition>
            );
        });
        return (
            <ul className='char__grid'>
                <TransitionGroup component={null}>{items}</TransitionGroup>
            </ul>
        );
    };

    const items = character(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newCharLoading ? <Spinner /> : null;

    return (
        <div className='char__list'>
            {errorMessage}
            {spinner}
            {items}
            <button
                className='button button__main button__long'
                disabled={newCharLoading}
                style={{ display: charEnded ? 'none' : 'block' }}
                onClick={() => onCharLoaded(offset)}
            >
                <div className='inner'>load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
