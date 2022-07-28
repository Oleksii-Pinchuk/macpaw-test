/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { addLog, removeFromFavourites } from "../../features/favouritesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import ButtonBack from "../ButtonBack/ButtonBack";
import Log from "../Log/Log";
import NotFoundNotice from "../NotFoundNotice/NotFoundNotice";

import "./Favourites.scss";

const Favourites = () => {
  const dispatch = useAppDispatch();
  const { favourites, logs, loading } = useAppSelector(state => state.favourites);
  const [favouritesToShow, setFavouritesToShow] = useState<Favourite[][]>([]);

  const prepeareFavouritesToShow = () => {
    const chunkedFavourites = [];
    const length = favourites.length;

    for (let i = 0; i < length; i += 5) {
      const chunk = favourites.slice(i, i + 5);
      chunkedFavourites.push(chunk);
    }
    setFavouritesToShow(chunkedFavourites);
  };

  const onHandleRemoveButton = async (favourite: Favourite) => {
    await dispatch(removeFromFavourites(favourite.id));
    dispatch(addLog({
      time: new Date()
        .toLocaleString([], {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        }),
      imageId: favourite.image_id,
      action: 'removed',
      section: 'Favourites',
    }));
    prepeareFavouritesToShow();
  };

  useEffect(() => {
    prepeareFavouritesToShow();
  }, [logs]);


  return (
    <article className="section__main">
      <div className="favourites__nav section__nav">
        <ButtonBack />
        <div className="section__title favourites__title">favourites</div>
      </div>

      {loading && (
        <div className="section__loader">
          <MoonLoader size={100} color="#FBE0DC" />
        </div>
      )}

      {(!loading && favourites.length === 0) && (
        <>
          <NotFoundNotice />

          {logs.map((log, i) => (
            <Fragment key={i}>
              <Log log={log} />
            </Fragment>
          ))
          }
        </>
      )}

      {(!loading && favourites.length > 0) && (
        <>
          <div className="section__images-gallery favourites__images-gallery">
            {favouritesToShow.map((chunk, i) => (
              <div
                className={classNames(
                  'grid',
                  {
                    'grid--less-than-4': chunk.length <= 3,
                    'grid--less-than-3': chunk.length <= 2,
                  })}
                key={i}
              >
                {chunk.map((favourite, index) => (
                  <div
                    className={classNames(
                      'card',
                      'grid__item',
                      `grid__item--${index + 1}`,
                    )}
                    key={favourite.id}
                  >
                    <img
                      src={favourite.image.url}
                      alt={favourite.image.id}
                      className="card__image" />

                    <div className="card__hover-background">
                      <button
                        type="button"
                        className="card__button card__button--remove-from-fav"
                        onClick={() => onHandleRemoveButton(favourite)}
                      ></button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {logs.map((log, i) => (
            <Fragment key={i}>
              <Log log={log} />
            </Fragment>
          ))
          }
        </>
      )}
    </article>
  );
};

export default Favourites;