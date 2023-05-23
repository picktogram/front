import React from 'react';

import Pagination from './Pagination/Pagination.container';

interface ListProps {
    body? : React.ReactElement;
    page : number;
    setPage :  React.Dispatch<React.SetStateAction<number>>;
    totalPage : number | undefined;
}

const List : React.FC<ListProps> = ({
    body,
    page,
    setPage,
    totalPage
}) => {
    return (
        <>
            <div>
                {body}
            </div>
            <Pagination page={page} setPage={setPage} totalPage={totalPage}/>
        </>

    );
};

export default List;