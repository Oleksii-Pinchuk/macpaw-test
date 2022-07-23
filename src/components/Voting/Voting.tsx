/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react';
import "./Voting.scss";
import { request } from '../../api/api';

import ButtonBack from '../ButtonBack/ButtonBack';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addToFavourites, getFavourites, removeFromFavourites } from '../../features/favouritesSlice';
import Log from '../Log/Log';
import { addLog } from '../../features/votingLogsSlice';
import { MoonLoader } from 'react-spinners';

const Voting = () => {
  const dispatch = useAppDispatch();
  const { favourites } = useAppSelector(state => state.favourites);
  const { logs } = useAppSelector(state => state.votingLogs);

  const [image, setImage] = useState<Image>({} as Image);
  const [loaded, setLoaded] = useState(false);

  const fetchImage = async () => {
    const [image] = await request(`images/search?api_key=c03feea5-7160-4ef0-a72f-c7e33b4c4895`);

    setImage(image);
    setLoaded(true);
  };

  const voting = async (value: 0 | 1) => request('votes',
    {
      headers: {
        'x-api-key': 'c03feea5-7160-4ef0-a72f-c7e33b4c4895',
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify({
        image_id: image.id,
        value,
        sub_id: "User-123",
      }),
    }
  );

  const onHandleVotingButton = async (voteReaction: 'Likes' | 'Dislikes') => {
    if (!logs.some(log =>
      log.imageId === image.id && (log.section === "Likes" || log.section === "Dislikes"))) {
      voteReaction === 'Likes' ? voting(1) : voting(0);
      dispatch(addLog({
        time: new Date()
          .toLocaleString([], {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          }),
        imageId: image.id,
        action: 'added',
        section: voteReaction,
      }));

      fetchImage();
    }
  };

  const onHandleAddRemoveFavouriteButton = async () => {
    if (favourites.some((fav) => fav.image_id === image.id)) {
      const itemToRemove = favourites.find((fav) => fav.image_id === image.id) as Favourite;

      dispatch(removeFromFavourites(itemToRemove.id))
      dispatch(addLog({
        time: new Date()
          .toLocaleString([], {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          }),
        imageId: image.id,
        action: 'removed',
        section: 'Favourites',
      }));
    } else {
      dispatch(addToFavourites({ imageId: image.id, url: image.url }));
      dispatch(addLog({
        time: new Date()
          .toLocaleString([], {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          }),
        imageId: image.id,
        action: 'added',
        section: 'Favourites',
      }));
    }
  };

  useEffect(() => {
    dispatch(getFavourites());
    fetchImage();
  }, []);

  return (
    <section className="voting section">
      <article className="voting__main">
        <div className="voting__nav">
          <ButtonBack />

          <div className="voting__title section__title">voting</div>
        </div>

        {loaded ? (
          <>
            <img
              src={image.url}
              alt="breed-representative"
              className="voting__image"
            />

            <div className="voting__buttons">
              <button
                className="voting__button voting__button--likes"
                onClick={() => onHandleVotingButton('Likes')}
              >
              </button>
              <button
                className="voting__button voting__button--favourites"
                onClick={onHandleAddRemoveFavouriteButton}
              >
              </button>
              <button
                className="voting__button voting__button--dislikes"
                onClick={() => onHandleVotingButton('Dislikes')}
              >
              </button>
            </div>

            {logs.map((log, i) => (
              <Fragment key={i}>
                <Log log={log} />
              </Fragment>
            ))
            }
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

export default Voting;