import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';

type Props = {
  privateRoute: boolean;
  userAuthenticated: boolean;
  path: string;
  label: string;
  className: string;
};

const RouterLink: React.FC<Props> = ({ privateRoute, userAuthenticated, path, label, className }) => {
  if (privateRoute && !userAuthenticated)
    return (
      <button className={`${className} actived-false`} disabled={true}>
        <Label label={label} />
      </button>
    );

  return (
    <Link key={label} className={className} to={path}>
      <Label label={label} />
    </Link>
  );
};

export default RouterLink;

const Label = ({ label }: { label: string }) => <Typography variant="h6">{label}</Typography>;
