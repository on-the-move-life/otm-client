import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';

const ImageWrapper = styled.div``;

const LazyImage = ({
  src,
  altText,
  hash,
  ImageWrapperClassName,
  ImageClassName,
}) => {
  const [isLoaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <ImageWrapper className={ImageWrapperClassName}>
      <LazyLoadImage
        key={src}
        src={src}
        alt={altText}
        onLoad={handleLoad}
        className={`${!isLoaded && 'absolute -z-10'}  ${ImageClassName}`}
      />
      {!isLoaded && (
        // <LazyLoadComponent>

        <Blurhash
          height="100%"
          width="100%" // Set width to 100% of the parent container
          hash={hash}
          punch={1}
          className="absolute top-0  "
        />

        // </LazyLoadComponent>
      )}
    </ImageWrapper>
    // <LazyLoadImage
    //   alt={altText ? altText : 'Image not found'}
    //   effect="blur"
    //   onLoad={() => hanldleLoad()}
    //   src={src}
    //
    // />
  );
};
export default LazyImage;
