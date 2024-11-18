import React from 'react';
import {useGetTodolistsQuery} from './api/todolistsApi';

export const Todolists = () => {

    const {data: todolists} = useGetTodolistsQuery()

    return (
        <div>
            <ol>
                {todolists?.map(tl => {
                    return <li key={tl.id}>{tl.title}</li>
                })}

            </ol>
        </div>
    )
}