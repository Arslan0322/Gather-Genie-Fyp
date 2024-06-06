//
import Card from './Card';
import Paper from './Paper';
import Input from './Input';
import Table from './Table';
import Typography from './Typography';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(Card(theme), Table(theme), Input(theme), Paper(theme), Typography(theme));
}
