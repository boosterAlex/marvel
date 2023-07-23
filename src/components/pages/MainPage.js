import { useState } from 'react';

import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import RandomChar from '../randomChar/RandomChar';
import CharSearchForm from '../charSearchForm/CharSearchForm';
import AppBanner from '../appBanner/AppBanner';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    };
    return (
        <>
            <RandomChar />
            <div className='char__content'>
                <CharList onCharSelected={onCharSelected} />
                <div>
                    <CharInfo charId={selectedChar} />
                    <CharSearchForm />
                </div>
            </div>
            <img className='bg-decoration' src={decoration} alt='vision' />
        </>
    );
};

export default MainPage;
