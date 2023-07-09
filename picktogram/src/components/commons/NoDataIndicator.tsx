import React from 'react';

interface NoDataIndicatorProps<T extends {count : number}> {
    title : string;
    data : T;
}

const NoDataIndicator = <T extends {count : number}>({
    data,
    title
} : NoDataIndicatorProps<T>) => {

    if(data.count) {
        return null
    }

    return (
        <h4>
            {title}
        </h4>
    );
};

export default NoDataIndicator;