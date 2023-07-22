import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

import useMarvelServices from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMesage/ErrorMessage';

import './comicsList.scss';

const Comics = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(300);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [itemEnded, setItemEnded] = useState(false);

    const { loading, error, getComics } = useMarvelServices();

    useEffect(() => onComicsLoaded(offset, true), []);

    const onComicsLoaded = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(false);
        getComics(offset).then(onComicsAdd);
    };

    const onComicsAdd = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        setComics(() => [...comics, ...newComics]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 8);
        setItemEnded(ended);
    };

    const comicsList = (arr) => {
        const items = arr.map((item) => {
            return (
                <CSSTransition
                    timeout={500}
                    key={item.id}
                    classNames={'comics__item'}
                >
                    <li className='comics__item' key={item.id}>
                        <Link to={`/comics/${item.id}`}>
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className='comics__item-img'
                            />
                            <div className='comics__item-name'>
                                {item.title}
                            </div>
                            <div className='comics__item-price'>
                                {item.price}
                            </div>
                        </Link>
                    </li>
                </CSSTransition>
            );
        });
        return (
            <ul className='comics__grid'>
                <TransitionGroup component={null}>{items}</TransitionGroup>
            </ul>
        );
    };
    const items = comicsList(comics);

    console.log(comics);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className='comics__list'>
            {errorMessage}
            {spinner}
            {items}
            <button
                className='button button__main button__long'
                disabled={newItemLoading}
                style={{ display: itemEnded ? 'none' : 'block' }}
                onClick={() => onComicsLoaded(offset)}
            >
                <div className='inner'>load more</div>
            </button>
        </div>
    );
};

export default Comics;
