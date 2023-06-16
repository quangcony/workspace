import React from 'react';

const ItemDashBoard = ({title}) => {

    const styleItem = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    }
    return (
        <div style={styleItem}>
            <h4 style={{opacity: 0.6 }}>{title}</h4>
            <h1>1024</h1>
        </div>
    );
};

export default ItemDashBoard;