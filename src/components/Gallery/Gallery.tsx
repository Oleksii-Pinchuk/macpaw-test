/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { request } from '../../api/api';

import ButtonBack from '../ButtonBack/ButtonBack';
import UploadModal from '../UploadModal/UploadModal';
import { addToFavourites, removeFromFavourites } from '../../features/favouritesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import "./Gallery.scss";
import { MoonLoader } from 'react-spinners';

const Gallery = () => {
  const dispatch = useAppDispatch();
  const { allBreeds } = useAppSelector(state => state.breeds);
  const { favourites } = useAppSelector(state => state.favourites);

  const [imagesToShow, setImagesToShow] = useState<Image[][]>([]);
  const [order, setOrder] = useState('rand');
  const [type, setType] = useState('jpg,png');
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [breedId, setBreedId] = useState('');
  const [pageLoaded, setPageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchFilteredImages = async (
    limit: number,
    page: number,
    breedId: string,
    order: string,
    type: string,
  ) => {
    const filteredImages = await request(`images/search?api_key=c03feea5-7160-4ef0-a72f-c7e33b4c4895&limit=${limit}&page=${page}&breed_id=${breedId}&order=${order}&mime_types=${type}`);

    if (filteredImages.length === 0 && page !== 0) {
      setPage(page - 1);
    } else if (filteredImages.length !== 0) {
      const chunkedImages = [];
      const length = filteredImages.length;

      for (let i = 0; i < length; i += 5) {
        const chunk = filteredImages.slice(i, i + 5);
        chunkedImages.push(chunk);
      }

      setImagesToShow(chunkedImages);
      setPageLoaded(true);
    }
  };

  useEffect(() => {
    fetchFilteredImages(limit, page, breedId, order, type);
  }, [page]);

  const onChangeOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value);
  };

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setType(value);

    if (value === 'gif') {
      const select = document.querySelector('.gallery__breed-select') as Element;

      select.getElementsByTagName('option')[0].selected = true;
      setBreedId('');
    }
  };

  const onChangeBreed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBreedId(event.target.value);
  };

  const onChangeLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(+(event.target.value));
  };

  const onHandleAddRemoveFavouriteButton = (image: Image) => {
    if (favourites.some((fav) => fav.image_id === image.id)) {
      const favouriteItem = favourites.find((fav) => fav.image_id === image.id) as Favourite;

      dispatch(removeFromFavourites(favouriteItem.id))
    } else {
      dispatch(addToFavourites({ imageId: image.id, url: image.url }));
    }
  };

  const onHandleUploadButton = () => {
    const body = document.querySelector("body") as HTMLBodyElement;
    
    setModalOpen(true);
    body.style.overflow = "hidden";
  };

  return (
    <article className="section__main">
      <div className="breeds__nav section__nav">
        <ButtonBack />

        <div className="gallery__title section__title">gallery</div>

        {modalOpen && <UploadModal setOpenModal={setModalOpen} />}

        {pageLoaded && (
          <>
            <button
              type="button"
              className="gallery__button-upload"
              onClick={onHandleUploadButton}
            >upload</button>

            <div className="gallery__settings">
              <label htmlFor="order" className="label gallery__order-label">
                order
                <div className="select-wrapper">
                  <select
                    name="order"
                    id="order"
                    className="select"
                    onChange={onChangeOrder}
                  >
                    <option value={'rand'}>
                      Random
                    </option>
                    <option value={'asc'}>
                      Asc
                    </option>
                    <option value={'desc'}>
                      Desc
                    </option>
                  </select>
                </div>
              </label>

              <label htmlFor="type" className="label gallery__type-label">
                type
                <div className="gallery__type-select select-wrapper">
                  <select
                    name="type"
                    id="type"
                    className="select"
                    onChange={onChangeType}
                  >
                    <option value={'jpg,png,gif'}>
                      All
                    </option>
                    <option value={'jpg,png'} selected>
                      Static
                    </option>
                    <option value={'gif'}>
                      Animated
                    </option>
                  </select>
                </div>
              </label>

              <label htmlFor="breed" className="label gallery__breed-label">
                breed
                <div className="gallery__breed-select select-wrapper">
                  <select
                    name="breed"
                    id="breed"
                    className="select"
                    onChange={onChangeBreed}
                  >
                    <option value={''}>
                      None
                    </option>
                    {allBreeds.map((breed) => (
                      <option
                        key={breed.id}
                        value={breed.id}
                      >
                        {breed.name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <label htmlFor="limit" className="label gallery__limit-label">
                limit
                <div className="select-wrapper">
                  <select
                    name="limit"
                    id="limit"
                    className="select"
                    onChange={onChangeLimit}
                  >
                    <option value={5}>
                      {`${5} items per page`}
                    </option>
                    <option value={10}>
                      {`${10} items per page`}
                    </option>
                    <option value={15}>
                      {`${15} items per page`}
                    </option>
                    <option value={20}>
                      {`${20} items per page`}
                    </option>
                  </select>
                </div>
              </label>

              <button
                type="button"
                className="gallery__refresh-button"
                onClick={() => {
                  fetchFilteredImages(limit, 0, breedId, order, type);
                  setPage(0);
                }}
              ></button>
            </div>
          </>
        )}
      </div>

      {pageLoaded && (
        <>
          {(imagesToShow.length === 0) && (
            <div className="no-items-found-announcement">
              No item found
            </div>
          )}

          {(imagesToShow.length !== 0) && (
            <>
              <div className="section__images-gallery gallery__images-gallery">
                {imagesToShow.map((chunk, index) => (
                  <div className={classNames(
                    'grid',
                    {
                      'grid--less-than-4': chunk.length <= 3,
                      'grid--less-than-3': chunk.length <= 2,
                    })}
                    key={index}
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
                            onClick={() => onHandleAddRemoveFavouriteButton(image)}
                          ></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="gallery__navigation navigation">
                <button
                  type="button"
                  className="navigation__button navigation__button--prev"
                  onClick={() => {
                    if (page > 0) {
                      setPage(page - 1);
                    }
                  }}
                >
                  prev
                </button>

                <button
                  type="button"
                  className="navigation__button navigation__button--next"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  next
                </button>
              </div>
            </>
          )}
        </>
      )}

      {!pageLoaded && (
        <div className="section__loader">
          <MoonLoader size={100} color="#FBE0DC" />
        </div>
      )}
    </article>
  );
};

export default Gallery;