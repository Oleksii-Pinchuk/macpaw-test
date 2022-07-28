/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { request } from '../../api/api';

import ButtonBack from '../ButtonBack/ButtonBack';
import { MoonLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addToFavourites, getFavourites, removeFromFavourites } from '../../features/favouritesSlice';

import "./BreedInfo.scss";

const BreedInfo: React.FC<{ breed: Breed }> = ({ breed }) => {
  const dispatch = useAppDispatch();

  const { favourites } = useAppSelector(state => state.favourites);
  const [breedImages, setBreedImages] = useState<Image[]>([]);
  const [image, setImage] = useState<Image>({} as Image);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const fetchBreedImages = async () => {
    const images = await request(`images/search?api_key=c03feea5-7160-4ef0-a72f-c7e33b4c4895&limit=20&page=0&breed_id=${breed.id}&order=asc`);

    setBreedImages(images);
    setImage(images[0]);
    setLoaded(true);
  }

  useEffect(() => {
    fetchBreedImages();
    dispatch(getFavourites);
  }, [])

  const onHandleDotClick = (index: number) => {
    const img = breedImages[index];
    setImage(img);
    setIndex(index);
  }

  const onHandleAddRemoveFavouriteButton = () => {
    if (favourites.some((fav) => fav.image_id === image.id)) {
      const favouriteItem = favourites.find((fav) => fav.image_id === image.id) as Favourite;

      dispatch(removeFromFavourites(favouriteItem.id))
    } else {
      dispatch(addToFavourites({ imageId: image.id, url: image.url }));
    }
  };

  return (
    <article className="section__main">
      <div className="breed-info__nav section__nav">
        <ButtonBack />

        <div className="breed-info__title">breeds</div>

        <div className="breed-info__id">{breed.id}</div>
      </div>

      {loaded ? (
        <>
          <div className="slideshow">
            <div className="slideshow__image-wrapper">
              <img
                src={image?.url}
                alt={''}
                className="slideshow__image card__image"
              />
              <div className="card__hover-background">
                <button
                  type="button"
                  className={classNames(
                    'card__button',
                    {
                      'card__button--add-to-fav': !favourites.some((fav) => fav.image_id === image.id),
                      'card__button--remove-from-fav': favourites.some((fav) => fav.image_id === image.id),
                    },
                  )}
                  onClick={() => onHandleAddRemoveFavouriteButton()}
                ></button>
              </div>
            </div>

            <div className="slideshow__dots">
              {breedImages.map((image, i) => (
                <div
                  key={i}
                  className={classNames(
                    'slideshow__dot',
                    { 'slideshow__dot--active': index === i },
                  )}
                  onClick={() => onHandleDotClick(i)}
                ></div>
              ))}
            </div>
          </div>

          <div className="wrapper">
            <div className="breed-info__name">{breed.name}</div>
          </div>

          <div className="breed-info__description">
            <p className="breed-info__fact">{breed.description.split('.')[0].split(',')[0] + '.'}</p>

            <p className="breed-info__temperament characteristic">
              <span className="characteristic__name"><b>Temperament: </b></span>
              {breed.temperament}
            </p>

            <p className="breed-info__origin characteristic">
              <span className="characteristic__name"><b>Origin: </b></span>{breed.origin}
            </p>

            <p className="breed-info__weight characteristic">
              <span className="characteristic__name"><b>Weight: </b></span> {breed.weight.metric} kgs
            </p>

            <p className="breed-info__life-span characteristic">
              <span className="characteristic__name"><b>Life span: </b></span>{breed.life_span} years
            </p>
          </div>
        </>
      ) : (
        <div className="section__loader">
          <MoonLoader size={100} color="#FBE0DC" />
        </div>
      )}
    </article>
  )
};

export default BreedInfo;