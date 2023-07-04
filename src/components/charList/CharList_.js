import { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelServices from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMesage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newCharLoading: false,
        offset: 210,
        charEnded: false,
    };

    marvelService = new MarvelServices();

    // componentDidMount() {
    //     console.log('badabum');
    //     this.onCharAdd();
    // }

    componentWillMount() {
        this.onCharAdd();
    }

    onCharAdd = (offset) => {
        this.onCharLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    onCharLoading = () => {
        this.setState({ newCharLoading: true });
    };

    onCharLoaded = (newChar) => {
        let ended = false;
        if (newChar.length < 9) {
            ended = true;
        }
        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newChar],
            loading: false,
            newCharLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    };

    focusOnItem = (id) => {
        this.itemRefs.forEach((ref) => {
            ref.classList.remove('char__item_selected');
        });
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    };

    character = (arr) => {
        const items = arr.map((item, i) => {
            const styleNotFound =
                item.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                    ? { objectFit: 'contain' }
                    : null;

            return (
                <li
                    className='char__item'
                    key={item.id}
                    tabIndex={0}
                    ref={this.setRef}
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);
                    }}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={styleNotFound}
                    />
                    <div className='char__name'>{item.name}</div>
                </li>
            );
        });
        return <ul className='char__grid'>{items}</ul>;
    };

    render() {
        const { charList, error, loading, offset, onCharLoading, charEnded } =
            this.state;
        const items = this.character(charList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className='char__list'>
                {errorMessage}
                {spinner}
                {content}
                <button
                    className='button button__main button__long'
                    disabled={onCharLoading}
                    style={{ display: charEnded ? 'none' : 'block' }}
                    onClick={() => this.onCharAdd(offset)}
                >
                    <div className='inner'>load more</div>
                </button>
            </div>
        );
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
