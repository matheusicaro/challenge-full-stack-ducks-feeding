import React from 'react';

import TableHeadComponent from '@material-ui/core/TableHead';

import { StyledTableCell } from './styles';

type Props = {
  labels: Array<string>;
  children?: never;
};

/**
 * Main component dashboard header component
 *
 */
const TableHeader: React.FC<Props> = ({ labels }) => {
  return (
    <TableHeadComponent>
      {labels.map((value, index) => (
        <StyledTableCell key={index + value} align="center">
          {value}
        </StyledTableCell>
      ))}
    </TableHeadComponent>
  );
};

export default TableHeader;
