import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    profession,
    institution,
    locationTown,
    contracts,
    email,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} className='round-image' alt='' />
      <div>
        <h2>{name}</h2>

        <p>
          {profession} {institution && <span> at {institution} </span>}
        </p>

        <p>
          <i className='fas fa-envelope text-primary'></i> {email}
        </p>
        <p className='my-1'>{locationTown && <span>{locationTown}</span>}</p>
        <Link to={`/profile/${_id}`} className='button button-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {contracts.slice(0, 4).map((contracts, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i>
            {contracts}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
