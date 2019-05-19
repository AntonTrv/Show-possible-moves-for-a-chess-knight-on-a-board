import React from 'react';
import '../scss/block.scss'

const Block = ({data,handleClick}) =>
<div className={data} onClick={handleClick}></div>

export default Block;
