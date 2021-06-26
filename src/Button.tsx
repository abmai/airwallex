import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {}

export default function Button(props: Props) {
  const { className = '', ...restProps } = props;

  return (
    <button
      className={`pt-3 pb-3.5 px-11 text-lg lg:text-2xl rounded-full
         bg-pastel-purple hover:bg-opacity-90 disabled:bg-gray-300
         transition-all text-white flex items-center justify-center
         focus:outline-none focus-visible:ring-2
         ${className}`}
      {...restProps}
    >
      {props.children}
    </button>
  );
}
