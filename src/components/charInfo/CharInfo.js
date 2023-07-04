import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMarvelServices from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMesage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
const CharInfo = ({ charId }) => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = useMarvelServices();

    useEffect(() => updateChar(), [charId]);

    const updateChar = () => {
        if (!charId) {
            return;
        }
        onCharLoading();
        marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
    };

    const onCharLoading = () => {
        setLoading(true);
    };

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className='char__info'>
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

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
                <li className='char__comics-item' key={i}>
                    {item.name}
                </li>
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
