import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import AppBanner from '../appBanner/AppBanner';
import Comics from '../comics/Comics';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    };

    return (
        <div className='app'>
            <AppHeader />
            <main>
                <AppBanner />
                {/* <RandomChar />
                <div className='char__content'>
                    <CharList onCharSelected={onCharSelected} />
                    <CharInfo charId={selectedChar} />
                </div>
                <img className='bg-decoration' src={decoration} alt='vision' /> */}
                <Comics />
            </main>
        </div>
    );
};

export default App;
