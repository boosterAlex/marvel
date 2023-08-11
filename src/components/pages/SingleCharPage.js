import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMesage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

import useMarvelServices from '../../services/MarvelService';
import './singleCharPage.scss';

const SingleComicPage = () => {
    const [singleChar, setSingleChar] = useState([]);
    const { charId } = useParams();

    const { loading, error, getCharacterById, clearError } =
        useMarvelServices();

    useEffect(() => renderComicInfo(), [charId]);

    const renderComicInfo = () => {
        if (!charId) {
            return;
        }
        clearError();
        getCharacterById(charId).then((data) => setSingleChar(data));
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !singleChar) ? (
        <View singleChar={singleChar} />
    ) : null;

    return (
        <>
            <Helmet>
                <meta
                    name='description'
                    content={`${singleChar.name} chracter page`}
                />
                <title>{singleChar.name}</title>
            </Helmet>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ singleChar }) => {
    const { thumbnail, description, name } = singleChar;
    return (
        <div className='single-comic'>
            <div className='single-comic'>
                <img
                    src={thumbnail}
                    alt={name}
                    className='single-comic__char-img'
                />
                <div className='single-comic__info'>
                    <h2 className='single-comic__name'>{name}</h2>
                    <p className='single-comic__descr'>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleComicPage;
