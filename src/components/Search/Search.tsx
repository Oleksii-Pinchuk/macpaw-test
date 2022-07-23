/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MoonLoader } from "react-spinners";
import { setBreed } from "../../features/breedsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ButtonBack from "../ButtonBack/ButtonBack";

import "./Search.scss";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { allBreeds, breedsName } = useAppSelector(state => state.breeds);
  const [breedsToShow, setBreedsToShow] = useState<Breed[][]>([]);
  const [loaded, setLoaded] = useState(false);
  const [searchedBreeds, setsearchedBreeds] = useState<Breed[]>([]);

  const prepeareBreedsToShow = () => {
    const loweredCaseBreedsName = breedsName.toLocaleLowerCase();
    const searchedBreeds = allBreeds.filter((breed: Breed) => breed.name.toLowerCase().includes(loweredCaseBreedsName));
    const chunkedBreeds = [];
    const length = searchedBreeds.length;
    for (let i = 0; i < length; i += 5) {
      const chunk = searchedBreeds.slice(i, i + 5);
      chunkedBreeds.push(chunk);
    }
    setsearchedBreeds(searchedBreeds);
    setBreedsToShow(chunkedBreeds);
    setLoaded(true);
  }

  const onClickBreedImage = (id: string) => {
    const searchedBreed = searchedBreeds.find(br => br.id === id) as Breed;
    dispatch(setBreed(searchedBreed));
    navigate(`/breeds/${searchedBreed.id}`);
  };

  useEffect(() => {
    setLoaded(false);
    prepeareBreedsToShow();
  }, [breedsName]);

  return (
    <section className="section search">
      <article className="section__main search__main">
        <div className="search__nav section__nav">
          <ButtonBack />
          <h2 className="section__title search__title">search</h2>
        </div>



        {!loaded && (
          <div className="section__loader">
            <MoonLoader size={100} color="#FBE0DC" />
          </div>
        )}

        {(loaded && searchedBreeds.length === 0) && (
          <div className="search__annoncement-not-found">
            No item found
          </div>
        )}

        {(loaded && searchedBreeds.length !== 0) && (
          <>
            <p className="search__paragraph">
              {`Search results for: `}
              <span className="search__name">{breedsName === '' ? 'all' : breedsName}</span>
            </p>
            <div className="section__image-gallery search__images-gallery">
              {breedsToShow.map((chunk) => (
                <div className="grid">
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
                        alt={breed.id}
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
          </>
        )}
      </article>
    </section>
  );
};

export default Search;