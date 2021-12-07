import renderer from 'react-test-renderer';

import { SearchForm } from './SearchForm';
import { Search } from '../search/Search';

describe('SearchForm', () => {
    const SearchFormProps = {
        searchTerm: 'React',
        onSearchInput: jest.fn(),
        onSearchSubmit: jest.fn(),
    };

    let component;

    beforeEach(() => {
        component = renderer.create(
            <SearchForm {...SearchFormProps} />
        );
    });

    it('renders input field with its value', () => {
        const input = component.root.findByType(Search).props.value;
        expect(input).toBe(SearchFormProps.searchTerm);
    });


    it('changes the input field', () => {
        const pseudoEvent = { target: 'Redux' };

        component.root.findByType(Search).props.onChange(pseudoEvent);

        expect(SearchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
        expect(SearchFormProps.onSearchInput).toHaveBeenCalledWith(pseudoEvent);
    });

    it('submits the form', () => {
        const pseudoEvent = {};

        component.root.findByType('form').props.onSubmit(pseudoEvent);

        expect(SearchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
        expect(SearchFormProps.onSearchSubmit).toHaveBeenCalledWith(pseudoEvent);
    });

    it('disables the button and prevents submit', () => {
        component.update(
            <SearchForm {...SearchFormProps} searchTerm="" />
        )
        expect(component.root.findByType('button').props.disabled).toBeTruthy;
    });
});