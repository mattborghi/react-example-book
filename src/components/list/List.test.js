import renderer from 'react-test-renderer';

import { Item, List } from "./List";

describe('item', () => {
    const item = {
        objectID: 1,
        title: 'React',
        author: 'Jordan Walke',
        url: 'https://www.google.com',
        num_comments: 1,
        points: 1,
    };
    const handleRemoveItem = jest.fn();

    let component;

    beforeEach(() => {
        component = renderer.create(
            <Item item={item} onRemoveItem={handleRemoveItem} />
        );
    });

    // test inputs: item
    it('renders all properties', () => {
        expect(component.root.findByType('a').props.href).toEqual(item.url);
        expect(component.root.findAllByProps({ children: item.author }).length).toEqual(1);
        expect(component.root.findAllByProps({ children: item.title }).length).toEqual(1);
    });

    // test outputs: onRemoveItem
    it('calls onRemoveItem on button click', () => {
        component.root.findByType('button').props.onClick();
        // how many times was handleRemoveItem called?
        expect(handleRemoveItem).toHaveBeenCalledTimes(1);
        // verify arguments passed to the function
        expect(handleRemoveItem).toHaveBeenCalledWith(item);
        // was the component rendered only once?
        expect(component.root.findAllByType(Item).length).toEqual(1);
    });

    test('renders snapshot', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('list', () => {
    const handleRemoveItem = jest.fn();
    const list = [
        {
            objectID: 12,
            title: 'React',
            author: 'Jordan Walke',
            url: 'https://www.google.com',
            num_comments: 1,
            points: 1,
        },
        {
            objectID: 2,
            title: 'Redux',
            author: 'Dan Abramov',
            url: 'https://www.react.org',
            num_comments: 10,
            points: 10,
        }
    ];
    let component;

    beforeEach(() => {
        component = renderer.create(
            <List values={list} onRemoveItem={handleRemoveItem} />
        );
    });

    it('renders two times', () => {
        expect(component.root.findAllByType(Item).length).toEqual(2);
    });

});