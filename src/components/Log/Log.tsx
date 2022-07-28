import classNames from 'classnames';
import React from 'react';

import "./Log.scss"

const Log: React.FC<{ log: VoteLog }> = ({ log }) => {
  return (
    <div
      className={classNames(
        'log',
        { 'log--added-to-likes': log.section === 'Likes' },
        { 'log--added-to-dislikes': log.section === 'Dislikes' },
        { 'log--added-to-favourites': log.action === 'added' && log.section === 'Favourites' },
      )}
    >
      <div className="log__time">
        {log.time}
      </div>
      <div>
        Image ID:&nbsp;
        <span style={{ color: '#1D1D1D', "fontWeight": "500" }}>
          {` ${log?.imageId}`}
        </span>&nbsp;
        {`was ${log?.action} ${log?.action === 'added' ? 'to' : 'from'} ${log?.section}`}
      </div>
    </div>
  );
};

export default Log;