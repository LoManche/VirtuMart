// Programmer: Ng Tiffany 1155158907
// Date: 2024-04-11
// Purpose:
//    Handle errors caused by api calls

import { ServerError } from "../api";
export function getAlertMessage(status, message) {
  if (status === null) return { text: message ?? "Action staled", type: "warning" };
  if (status === true) return { text: message ?? "Action success!", type: "success" };
  if (status === false) return { text: message ?? "Action failed!", type: "error" };
}

export default function handleError(err, setAlertState = () => {}, verbose = true) {
  if (verbose) console.error(err);
  if (err instanceof ServerError) {
    if ([401, 403, 404].includes(err.code)) {
      setAlertState(getAlertMessage(false, err.message));
      return;
    }
  }
  setAlertState(getAlertMessage(false, "Unexpected Error"));
}
