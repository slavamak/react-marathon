import React from 'react';

import cn from 'classnames';

const Wrapper = ({ className, children }) => {
  return (
    <div className={cn('wrapper', {[className]: className})}>
      { children }
    </div>
  )
}

export default Wrapper;