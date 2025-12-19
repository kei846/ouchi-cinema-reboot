// src/sanity/components/IFrame.tsx
import React from 'react';

interface IFrameProps {
  options: {
    url: string;
    reload?: {
      button?: boolean;
    };
  };
}

const IFrame = ({ options }: IFrameProps) => {
  const { url } = options;
  return (
    <iframe
      src={url}
      style={{
        width: '100%',
        height: '100%',
        border: 0,
      }}
    />
  );
};

export default IFrame;
