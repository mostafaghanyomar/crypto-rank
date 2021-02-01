import { useTranslation } from "react-i18next";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Footer(props) {
  const {t} = useTranslation();
  return (
    <footer>
      <Typography variant="body2" color="textSecondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          {t('app.name')}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  );
}