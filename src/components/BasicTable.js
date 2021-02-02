import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, TextField, makeStyles, Grid, Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import Alert from "@material-ui/lab/Alert/Alert";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const LOW_RISK = "LOW_RISK";
const MEDIUM_RISK = "MEDIUM_RISK";
const HIGH_RISK = "HIGH_RISK";

const toNumber = (v) => {
  if (!Number.parseInt(v)) return 0;
  else return Number.parseInt(v).toFixed(0);
};

export default function BasicTable() {
  const data = useSelector((state) => state.app.data);
  console.log(data);
  const [ip, setIp] = useState("");
  const classes = useStyles();
  const [invTyp, setInvTyp] = useState(HIGH_RISK);
  const investWith = (rowValue, i, rowMktCapRank) => {
    switch (invTyp) {
      case LOW_RISK:
        return lowRisk(rowValue, rowMktCapRank);
      case MEDIUM_RISK:
        return mediumRisk();
      case HIGH_RISK:
        return highRisk(i);
      default:
        return 0;
    }
  };
  const tradingRate = (rowMktCap, rowTotalVol) => {
    return Math.round(rowTotalVol > 0 ? rowMktCap / rowTotalVol : 0);
  };
  const lowRisk = (rowValue, rowMktCapRank) => {
    let rateSum = data
      .map((v) => v.value / v["market_cap_rank"])
      .reduce((acc, curr) => acc + curr);
    let inv = toNumber(ip);
    let rate = inv > 0 ? inv / rateSum : 0;
    return Math.round(rate * (rowValue / rowMktCapRank));
  };
  const mediumRisk = () => {
    return toNumber(ip) / data.length;
  };
  const highRisk = (i) => {
    let oneToLen = 0;
    for (let j = 1; j <= data.length; j++) {
      oneToLen = oneToLen + j;
    }
    let inv = toNumber(ip);
    let rate = inv > 0 ? inv / oneToLen : 0;
    return Math.round(rate * (data.length - i));
  };

  return (
    <Fragment>
      <Grid container justify="center" spacing={0}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={10}>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => setInvTyp(LOW_RISK)}
                color="primary"
              >
                Low Risk
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => setInvTyp(MEDIUM_RISK)}
              >
                Medium Risk
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => setInvTyp(HIGH_RISK)}
                color="secondary"
              >
                High Risk
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="investment"
            type="number"
            name="investment"
            margin="normal"
            variant="outlined"
            label="Investment"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            fullWidth
            autoComplete="investment"
          />
        </Grid>
      </Grid>
      <Alert severity="info" variant="filled">
        {invTyp}
      </Alert>

      <TableContainer fullWidth component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Crypto</TableCell>
              <TableCell>Algo rate</TableCell>
              <TableCell>Manual rate</TableCell>
              <TableCell>Market Cap 24</TableCell>
              <TableCell>Price 7d% Change</TableCell>
              <TableCell>Price 24h% Change</TableCell>
              <TableCell>Total Vol</TableCell>
              <TableCell>Current Price</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Marketcap rank</TableCell>
              <TableCell>Marketcap</TableCell>
              <TableCell>Trading rate</TableCell>
              <TableCell>Investment</TableCell>
              <TableCell>marketcap_24h_percentage_change</TableCell>
              <TableCell>price_1h_percentage_change</TableCell>
              <TableCell>price_24h_percentage_change</TableCell>
              <TableCell>price_7d_percentage_change</TableCell>
              <TableCell>price_30d_percentage_change</TableCell>
              <TableCell>price_1y_percentage_change</TableCell>
              <TableCell>price_BTC</TableCell>
              <TableCell>predicted_price_24h</TableCell>
              <TableCell>predicted_price_14d</TableCell>
              <TableCell>predicted_percentage_change_14d</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Avatar alt={row.symbol} src={row.image} />
                  <strong>Name:&nbsp;</strong>{row["name"]}<br/>
                  <strong>Symbol:&nbsp;</strong>{row["symbol"]}
                </TableCell>
                <TableCell>{row["algorithmic_rating"]}</TableCell>
                <TableCell>{row["manual_rating"]}</TableCell>
                <TableCell>{row["marketcap_24h_percentage_change"]}</TableCell>
                <TableCell>{row["price_7d_percentage_change"]}</TableCell>
                <TableCell>{row["price_change_percentage_24h"]}</TableCell>
                <TableCell>{row["total_volume"]}</TableCell>
                <TableCell>{row["current_price"]}</TableCell>
                <TableCell>{row["value"]}</TableCell>
                <TableCell>{row["market_cap_rank"]}</TableCell>
                <TableCell>{row["market_cap"]}</TableCell>
                <TableCell>
                  {tradingRate(row["total_volume"], row["market_cap"])}
                </TableCell>
                <TableCell>
                  {investWith(row.value, index, row["market_cap_rank"])}
                </TableCell>
                <TableCell>{row["marketcap_24h_percentage_change"]}</TableCell>
                <TableCell>{row["price_1h_percentage_change"]}</TableCell>
                <TableCell>{row["price_24h_percentage_change"]}</TableCell>
                <TableCell>{row["price_7d_percentage_change"]}</TableCell>
                <TableCell>{row["price_30d_percentage_change"]}</TableCell>
                <TableCell>{row["price_1y_percentage_change"]}</TableCell>
                <TableCell>{row["price_BTC"]}</TableCell>
                <TableCell>{row["predicted_price_24h"]}</TableCell>
                <TableCell>{row["predicted_price_14d"]}</TableCell>
                <TableCell>{row["predicted_percentage_change_14d"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
