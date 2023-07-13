import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMarvelServices from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMesage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import { Link } from 'react-router-dom';

import './charInfo.scss';
const CharInfo = ({ charId }) => {
    const [char, setChar] = useState(null);
    const [comics, setComics] = useState(null);

    const {
        loading,
        error,
        getCharacter,
        clearError,
        getComicsListForCharacter,
    } = useMarvelServices();

    useEffect(() => updateChar(), [charId]);
    useEffect(() => updateComics(), [charId]);

    const updateChar = () => {
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId).then((char) => {
            setChar(char);
        });
    };

    const updateComics = () => {
        if (!charId) {
            return;
        }
        getComicsListForCharacter(charId).then((comics) => setComics(comics));
    };

    const skeleton = comics || char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char || !comics) ? (
        <View char={char} comics={comics} />
    ) : null;

    return (
        <div className='char__info'>
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ char, comics }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    const styleNotFound =
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ? { objectFit: 'contain' }
            : null;

    const comicsList = (arr) => {
        if (arr.length === 0) {
            return 'Comics not found';
        }
        return arr.map((item, i) => {
            // eslint-disable-next-line
            if (i > 9) return;
            if (i < 1) {
            }
            return (
                <Link to={`/comics/${item.id}`}>
                    <li className='char__comics-item' key={item.id}>
                        {item.title}
                    </li>
                </Link>
            );
        });
    };
    const comicsItem = comicsList(comics);

    return (
        <>
            <div className='char__basics'>
                <img src={thumbnail} alt={name} style={styleNotFound} />
                <div>
                    <div className='char__info-name'>{name}</div>
                    <div className='char__btns'>
                        <a href={homepage} className='button button__main'>
                            <div className='inner'>homepage</div>
                        </a>
                        <a href={wiki} className='button button__secondary'>
                            <div className='inner'>Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className='char__descr'>{description}</div>
            <div className='char__comics'>Comics:</div>
            <ul className='char__comics-list'>{comicsItem}</ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;
