/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { request } from '../../api/api';
import { useAppSelector } from '../../hooks/hooks';

import ButtonBack from '../ButtonBack/ButtonBack';
import { MoonLoader } from 'react-spinners';

import "./Likes.scss";

const Likes = () => {
  const { votes } = useAppSelector(state => state.votes);
  const [likedImages, setLikedImages] = useState<Image[][]>([]);
  const [loaded, setLoaded] = useState(false);

  const getLikedImages = async () => {
    const likes = votes.filter((vote) => vote.value === 1);
    const images: Image[] = await Promise.all(likes.map(async (like) =>
      await request(`images/${like.image_id}`,
        {
          headers: {
            'x-api-key': 'c03feea5-7160-4ef0-a72f-c7e33b4c4895',
            'Content-type': 'application/json; charset=UTF-8',
          },
          method: 'GET',
        })));

    const chunkedImages = [];
    const length = images.length;

    for (let i = 0; i < length; i += 5) {
      const chunk = images.slice(i, i + 5);

      chunkedImages.push(chunk);
      setLikedImages(chunkedImages);
      setLoaded(true);
    }
  };

  useEffect(() => {
    getLikedImages();
  }, []);

  return (
    <section className="section likes">
      <article className="section__main likes__main">
        <div className="likes__nav section__nav">
          <ButtonBack />
          <div className="section__title likes__title">likes</div>
        </div>

        {!loaded && (
          <div className="section__loader">
            <MoonLoader size={100} color="#FBE0DC" />
          </div>
        )}

        {(likedImages.length === 0 && loaded) && (
          <div className="no-items-found-announcement">
            No item found
          </div>
        )}

        {(likedImages.length > 0 && loaded) && (
          <div className="section__images-gallery likes__images-gallery">
            {likedImages.map((chunk, i) => (
              <div
                className={classNames(
                  'grid',
                  {
                    'grid--less-than-4': chunk.length <= 3,
                    'grid--less-than-3': chunk.length <= 2,
                  })}
                key={i}
              >
                {chunk.map((image, index) => (
                  <div
                    className={classNames(
                      'card',
                      'grid__item',
                      `grid__item--${index + 1}`,
                    )}
                    key={image.id}
                  >
                    <img
                      src={image.url}
                      alt={image.id}
                      className="card__image" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </article>
    </section>
  );
};


export default Likes;