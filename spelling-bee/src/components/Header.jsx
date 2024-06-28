import { useContext } from 'react';
import { DataContext } from '../contexts/Contexts';

export function Header() {
    const data = useContext(DataContext);
    return (
        <header>
            <h1 className={'title'}>Spelling Bee</h1>
            <p className={'date'}> {data.displayDate} </p>
            <p className={'editor'}> NYT game edited by {data.editor} </p>
        </header>
    );
}
