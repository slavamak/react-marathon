import React from 'react';

import cn from 'classnames';

const Section = ({ className, children }) => {
  return (
    <section className={cn({[className]: className})}>
      { children }
    </section>
  )
}

export default Section;