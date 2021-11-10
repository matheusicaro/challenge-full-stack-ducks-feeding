import React from 'react';

import { TableCell } from '@material-ui/core';
import TableBodyComponent from '@material-ui/core/TableBody';

import { AnimalFeeding } from '../../../../store/ducks/animal-feeding/types';

import { StyledTableRow } from './styles';

type Props = {
  elements: Array<AnimalFeeding>;
};

/**
 * Main component dashboard body component
 *
 */
const TableBody: React.FC<Props> = ({ elements }) => (
  <TableBodyComponent>
    {elements.map((e) => (
      <StyledTableRow key={e.id + e.createdAt}>
        <TableCell align="center">{e.createdAt.toUTCString()}</TableCell>
        <TableCell align="center">{e.user.name}</TableCell>
        <TableCell align="center">{e.user.email}</TableCell>
        <TableCell align="center">{e.animal.quantity}</TableCell>
        <TableCell align="center">{e.feeding.time}</TableCell>
        <TableCell align="center">{e.feeding.food.name}</TableCell>
        <TableCell align="center">{e.feeding.food.type}</TableCell>
        <TableCell align="center">{e.feeding.quantityKilosFormatted}</TableCell>
        <TableCell align="center">{e.feeding.location}</TableCell>
      </StyledTableRow>
    ))}
  </TableBodyComponent>
);

export default TableBody;
