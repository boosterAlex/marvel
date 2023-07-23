import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMesage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import useMarvelServices from '../../services/MarvelService';
import './singleComicPage.scss';

const SingleComicPage = () => {
    const [singleComic, setSingleComic] = useState([]);
    const { comicId } = useParams();

    const { loading, error, getSingleComic, clearError } = useMarvelServices();

    useEffect(() => renderComicInfo(), [comicId]);

    const renderComicInfo = () => {
        if (!comicId) {
            return;
        }
        clearError();
        getSingleComic(comicId).then((data) => setSingleComic(data));
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !singleComic) ? (
        <View singleComic={singleComic} />
    ) : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ singleComic }) => {
    const { thumbnail, title, description, price, pageCount, language } =
        singleComic;
    return (
        <div className='single-comic'>
            <img src={thumbnail} alt={title} className='single-comic__img' />
            <div className='single-comic__info'>
                <h2 className='single-comic__name'>{title}</h2>
                <p className='single-comic__descr'>{description}</p>
                <p className='single-comic__descr'>{pageCount}</p>
                <p className='single-comic__descr'>Language: {language}</p>
                <div className='single-comic__price'>{price}</div>
            </div>
            <Link to='/comics' className='single-comic__back'>
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
