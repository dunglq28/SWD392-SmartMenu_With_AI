import React, { useState } from 'react';

const Loading: React.FC = () => {
    const [openLoading, setOpenLoading] = useState(true);
    return (
        <h1>Loading....</h1>
    );
  };
  
  export default Loading;