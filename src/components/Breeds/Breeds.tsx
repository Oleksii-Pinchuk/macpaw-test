/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { request } from '../../api/api';

import { MoonLoader } from 'react-spinners';
import { setBreed } from '../../features/breedsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import ButtonBack from '../ButtonBack/ButtonBack';

import "./Breeds.scss"

const Breeds = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { allBreeds } = useAppSelector(state => state.breeds);

  const [breedsToShow, setBreedsToShow] = useState<Breed[][]>([]);
  const [order, setOrder] = useState<Order>('asc');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const fetchBreedsToShow = async () => {
    const recievedBreeds = await request(`breeds?api_key=c03feea5-7160-4ef0-a72f-c7e33b4c4895&limit=${limit}&page=${page}&order=${order}`);

    const length = recievedBreeds.length;

    if (length === 0) {
      setPage(page - 1);
    } else if (length !== 0) {
      const chunkedBreeds = [];
      for (let i = 0; i < length; i += 5) {
        const chunk = recievedBreeds.slice(i, i + 5);
        chunkedBreeds.push(chunk);
      }
      setBreedsToShow(chunkedBreeds);
      setLoaded(true);
    }
  };

  const onChangeBreedsSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const searchedBreed = allBreeds.find(br => br.id === value) as Breed;
    dispatch(setBreed(searchedBreed));
    navigate(`/breeds/${searchedBreed.id}`);
  }

  const onClickBreedImage = (id: string) => {
    const searchedBreed = allBreeds.find(br => br.id === id) as Breed;
    dispatch(setBreed(searchedBreed));
    navigate(`/macpaw-test/breeds/${searchedBreed.id}`);
  }

  const onChangeLimitSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setLimit(+value);
  }

  const OnHandlePrevButton = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const OnHandleNextButton = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchBreedsToShow();
  }, [limit, page, order]);

  return (
    <section className="breeds section">
      <article className="breeds__main section__main">
        <div className="breeds__nav section__nav">
          <ButtonBack />

          <div className="breeds__title section__title">breeds</div>

          {loaded && (
            <>
              <div className="breeds__breed-select-wrapper">
                <select
                  className="breeds__breed-select"
                  onChange={onChangeBreedsSelect}
                >
                  <option value={""}>
                    All breeds
                  </option>
                  {allBreeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                      {breed.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="breeds__limit-select-wrapper">
                <select
                  className="breeds__limit-select"
                  onChange={onChangeLimitSelect}
                >
                  <option value={5}>
                    Limit: 5
                  </option>
                  <option value={10}>
                    Limit: 10
                  </option>
                  <option value={15}>
                    Limit: 15
                  </option>
                  <option value={20}>
                    Limit: 20
                  </option>
                </select>
              </div>

              <button
                type="button"
                className="breeds__button-sort breeds__button-sort--down"
                onClick={() => setOrder('desc')}
              ></button>
              <button
                type="button"
                className="breeds__button-sort breeds__button-sort--up"
                onClick={() => setOrder('asc')}
              ></button>
            </>
          )}
        </div>

        {loaded ? (
          <>
            <div className="section__images-gallery breeds__images-gallery">
              {breedsToShow.map((chunk) => (
                <div className={classNames(
                  'grid',
                  {
                    'grid--less-than-4': chunk.length <= 3,
                    'grid--less-than-3': chunk.length <= 2,
                  })}>
                  {chunk.map((breed, index) => (
                    <div
                      className={classNames(
                        'card',
                        'grid__item',
                        `grid__item--${index + 1}`,
                      )}
                      key={breed.id}
                    >
                      <img
                        src={breed.image?.url}
                        alt={breed.name}
                        className="card__image"
                      />
                      <div
                        className="card__hover-background"
                        onClick={() => onClickBreedImage(breed.id)}
                      >
                        <div className="card__title">{breed.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="breeds__navigation navigation">
              <button
                type="button"
                className="navigation__button navigation__button--prev"
                onClick={OnHandlePrevButton}
              >
                prev
              </button>

              <button
                type="button"
                className="navigation__button navigation__button--next"
                onClick={OnHandleNextButton}
              >
                next
              </button>
            </div>
          </>
        ) : (
          <div className="section__loader">
            <MoonLoader size={100} color="#FBE0DC" />
          </div>
        )}
      </article>
    </section>
  )
}

export default Breeds;