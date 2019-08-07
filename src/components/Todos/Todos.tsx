import * as React from 'react';
import TodoInput from 'src/components/Todos/TodoInput'


class Component extends React.Component {
    public render() {
        return (
            <div className="Todos" id="Todos">
                {/* tslint:disable-next-line:jsx-self-close */}
                <TodoInput></TodoInput>
            </div>
        );
    }
}

export default Component;
