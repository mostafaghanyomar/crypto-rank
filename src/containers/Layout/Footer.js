import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Footer(props) {
  return (
    <footer>
      <Typography variant="body2" color="textSecondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          Easy Trade
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  );
}