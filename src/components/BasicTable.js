import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import Alert from "@material-ui/lab/Alert/Alert";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const [ip, setIp] = useState("");
  const classes = useStyles();
  const data = useSelector((state) => state.app.data);
  const LOW_RISK = "LOW_RISK";
  const MEDIUM_RISK = "MEDIUM_RISK";
  const HIGH_RISK = "HIGH_RISK";
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
  const lowRisk = (rowValue, rowMktCapRank) => {
   let rateSum = data.map(v => v.value/v['market_cap_rank']).reduce((acc, curr) => acc + curr);
   let inv = toNumber(ip);
   let rate = inv > 0 ? inv / rateSum : 0;
   return Math.round(rate * (rowValue/rowMktCapRank));
  };
  const mediumRisk = () => toNumber(ip) / data.length;
  const highRisk = (i) => {
    let oneToLen = 0;
    for (let j = 1; j <= data.length; j++) {
        oneToLen = oneToLen + j;
    }
    let inv = toNumber(ip);
    let rate = inv > 0 ? inv / oneToLen : 0;
    return Math.round(rate * (data.length - i));
  };

  const toNumber = (v) => {
    if (!Number.parseInt(v)) return 0;
    else return Number.parseInt(v).toFixed(0);
  };
  return (
    <Fragment>
      <Button
        variant="contained"
        onClick={() => setInvTyp(LOW_RISK)}
        color="primary"
      >
        Low Risk
      </Button>
      <Button variant="contained" onClick={() => setInvTyp(MEDIUM_RISK)}>
        Medium Risk
      </Button>
      <Button
        variant="contained"
        onClick={() => setInvTyp(HIGH_RISK)}
        color="secondary"
      >
        High Risk
      </Button>
      <div>
        <TextField
          type="number"
          label="Investment"
          defaultValue={ip}
          onChange={(e) => setIp(e.target.value)}
        />
      </div>
      <Alert severity="info" variant="filled">
          {invTyp}
      </Alert>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Market cap rank</TableCell>
              <TableCell>Market cap</TableCell>
              <TableCell>Investment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row["symbol"]}
                </TableCell>
                <TableCell>{row["name"]}</TableCell>
                <TableCell>{row["value"]}</TableCell>
                <TableCell>{row["market_cap_rank"]}</TableCell>
                <TableCell>{row["market_cap"]}</TableCell>
                <TableCell>{investWith(row.value, index, row["market_cap_rank"])}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
